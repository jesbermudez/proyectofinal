let tienda = document.getElementById("tienda");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let carrito = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

let generarTienda = () => {
  return (tienda.innerHTML = tiendaData
    .map((x) => {
      let { id, nombre, desc, img, precio } = x;
      let buscar = carrito.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h3>${nombre}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${precio} </h2>
          <div class="buttons">
            <i onclick="disminuir(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${
        buscar.item === undefined ? 0 : buscar.item}
      </div>
            <i onclick="aumentar(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

generarTienda();

/**
 * ! used to increase the selected product item quantity by 1
 */

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

  actualizar(itemSeleccionado.id);
  localStorage.setItem("data", JSON.stringify(carrito));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

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
  localStorage.setItem("data", JSON.stringify(carrito));
};

/**
 * ! To update the digits of picked items on each item card
 */

let actualizar = (id) => {
  let buscar = carrito.find((x) => x.id === id);
  document.getElementById(id).innerHTML = buscar.item;
  calcular();
};

/**
 * ! To calculate total amount of selected Items
 */

let calcular = () => {
  let carritoIcon = document.getElementById("cantidadCarrito");
  carritoIcon.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calcular();