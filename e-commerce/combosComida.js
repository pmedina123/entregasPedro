const combosComida = [
    { id: 1, name: "Pancho con gaseosa", price: 2000 },
    { id: 2, name: "Pancho con papas y gaseosa", price: 2500 },
    { id: 3, name: "Hamburguesa con gaseosa", price: 3000 },
    { id: 4, name: "Hamburguesa completa con papas y gaseosa", price: 3500 }
];

document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.btn-comprar');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalDOM = document.getElementById('total');
  const finalizarBtn = document.getElementById('finalizar-compra');
  const mensajeFinal = document.getElementById('mensaje-final');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  carrito.forEach(producto => agregarAlDOM(producto));
  actualizarTotal();
 
  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const nombre = boton.getAttribute('data-nombre');
      const combo = combosComida.find(c => c.name === nombre);
      if (combo) {
        carrito.push(combo);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        agregarAlDOM(combo);
        actualizarTotal();
        limpiarMensaje();
      }
    });
  });

  finalizarBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
      mostrarMensaje("El carrito está vacío. Agregá algo para comprar.", "red");
    } else {
      const total = calcularTotal();
      mostrarMensaje(`Gracias por tu compra. Total a pagar: $${total}`, "green");

      carrito = [];
      localStorage.removeItem('carrito');
      listaCarrito.innerHTML = '';
      actualizarTotal();
    }
  });

  function agregarAlDOM(producto) {
    const li = document.createElement('li');
    li.textContent = `${producto.name} - $${producto.price} `;

    const x = document.createElement('button');
    x.textContent = 'X';
    x.onclick = () => {
      li.remove();
      const index = carrito.findIndex(p => p.name === producto.name);
      if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarTotal();
        limpiarMensaje();
      }
    };

    li.appendChild(x);
    listaCarrito.appendChild(li);
  }

  function calcularTotal() {
    return carrito.reduce((acc, producto) => acc + producto.price, 0);
  }

  function actualizarTotal() {
    totalDOM.textContent = "Total: $" + calcularTotal();
    //Este apartado es para ir actualizando el total en base a si el cliente quita o agrega productos.
  }

  function mostrarMensaje(texto, color) {
    mensajeFinal.textContent = texto;
    mensajeFinal.style.color = color;
  }

  function limpiarMensaje() {
    mensajeFinal.textContent = "";
  }
});
