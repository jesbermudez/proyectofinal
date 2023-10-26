let tienda = document.getElementById("tienda");


let carrito = JSON.parse(localStorage.getItem("data")) || [];


let generarTienda = () => {
  return (tienda.innerHTML = tiendaData
    .map((x) => {
      let { id, nombre, desc, img, precio } = x;
      let buscar = carrito.find((y) => y.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
      <img width="223px" height="280px" src=${img} alt="">
      <div class="detalles">
        <h3>${nombre}</h3>
        <p>${desc}</p>
        <div class="cantidad-precio">
          <h2>$ ${precio} </h2>
          <div class="botones">
            <i onclick="disminuir(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="">${buscar.item === undefined ? 0 : buscar.item}
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


let actualizar = (id) => {
  let buscar = carrito.find((x) => x.id === id);
  document.getElementById(id).innerHTML = buscar.item;
  calcular();
};


let calcular = () => {
  let carritoIcon = document.getElementById("cantidadCarrito");
  carritoIcon.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calcular();

