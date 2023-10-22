let label = document.getElementById("label");
let carritoCompras = document.getElementById("carrito-compras");

let carrito = JSON.parse(localStorage.getItem("data")) || [];

let calcular = () => {
    let carritoIcon = document.getElementById("cantidadCarrito");
    carritoIcon.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calcular();

let generarCarritoItems = () => {
    if (carrito.length !== 0) {
        return (carritoCompras.innerHTML = carrito
            .map((x) => {
                let { id, item } = x;
                let buscar = tiendaData.find((y) => y.id === id) || [];
                let {nombre, img, precio} = buscar;
                return `
      <div class="cart-item">
        <img width="100" src=${img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${nombre}</p>
                <p class="cart-item-price">$ ${precio}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
              <i onclick="disminuir(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="aumentar(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>$ ${item * precio}</h3>
        </div>
      </div>
      `;
            })
            .join(""));
    } else {
        carritoCompras.innerHTML = ``;
        label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
    }
};

generarCarritoItems();

let aumentar = (id) => {
    let itemSeleccionado = id;
    let buscar = carrito.find((x) => x.id === itemSeleccionado.id);

    if (buscar === undefined) {
        carrito.push({
            id: itemSeleccionado.id,
            item: 1,
        });
    } else {
        buscar.item += 1;
    }

    generarCarritoItems();
    actualizar(itemSeleccionado.id);
    localStorage.setItem("data", JSON.stringify(carrito));
};
let disminuir = (id) => {
    let itemSeleccionado = id;
    let buscar = carrito.find((x) => x.id === itemSeleccionado.id);

    if (buscar === undefined) return;
    else if (buscar.item === 0) return;
    else {
        buscar.item -= 1;
    }
    actualizar(itemSeleccionado.id);
    carrito = carrito.filter((x) => x.item !== 0);
    generarCarritoItems();
    localStorage.setItem("data", JSON.stringify(carrito));
};

let actualizar = (id) => {
    let search = carrito.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calcular();
    total();
};

let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    carrito = carrito.filter((x) => x.id !== selectedItem.id);
    generarCarritoItems();
    total();
    localStorage.setItem("data", JSON.stringify(carrito));
};

let limpiarCarrito = () => {
    carrito = [];
    generarCarritoItems();
    localStorage.setItem("data", JSON.stringify(carrito));
};

let total = () => {
    if (carrito.length !== 0) {
        let cantidad = carrito
            .map((x) => {
                let { item, id } = x;
                let buscar = tiendaData.find((y) => y.id === id) || [];

                return item * buscar.precio;
            })
            .reduce((x, y) => x + y, 0);
        label.innerHTML = `
    <h2>Total Bill : $ ${cantidad}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="limpiarCarrito()" class="removeAll">Clear Cart</button>
    `;
    } else return;
};

total();