const combosComida = [
    { id: 1, name: "Pancho con gaseosa", price: 2000 },
    { id: 2, name: "Pancho con papas fritas y gaseosa", price: 2500 },
    { id: 3, name: "Hamburguesa completa con gaseosa", price: 3000 },
    { id: 4, name: "Hamburguesa completa con papas fritas y gaseosa", price: 3500 }
];

document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.btn-comprar');
  const listaCarrito = document.getElementById('lista-carrito');

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Mostrar productos guardados al cargar la página
  carrito.forEach(nombre => agregarAlDOM(nombre));

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const nombre = boton.getAttribute('data-nombre');
      carrito.push(nombre);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      agregarAlDOM(nombre);
    });
  });

  function agregarAlDOM(nombre) {
    const li = document.createElement('li');
    li.textContent = nombre + ' ';

    const x = document.createElement('button');
    x.textContent = 'X';
    x.onclick = () => {
      li.remove();
      const index = carrito.indexOf(nombre);
      if (index !== -1) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }
    };

    li.appendChild(x);
    listaCarrito.appendChild(li);
  }
});
