import stock from './stock.js';

let carroDeCompras = [];

function crearOpcionesLibros() {
const librosSelect = document.getElementById('libros');

for (const libroId in stock) {
    const libro = stock[libroId];
    const option = document.createElement('option');
    option.value = libroId;
    option.textContent = `${libro.titulo} - ${libro.autor} ($${libro.precio})`;
    librosSelect.appendChild(option);
}
}

function agregarAlCarro() {
const librosSelect = document.getElementById('libros');
const cantidadInput = document.getElementById('cantidad');

const libroId = librosSelect.value;
const cantidad = parseInt(cantidadInput.value);

if (libroId && cantidad) {
    const libroSeleccionado = stock[libroId];

if (libroSeleccionado) {
    let encontrado = false;
    for (const element of carroDeCompras) {
        if (element.producto === libroId) {
        element.cantidad += cantidad;
        encontrado = true;
        break;
        }
    }
    if (!encontrado) {
        carroDeCompras.push({ producto: libroId, cantidad: cantidad });
    }

    const { titulo, autor } = libroSeleccionado;
    const mensaje = `Se ha agregado ${cantidad} unidades de "${titulo}" de ${autor} al carrito de compras.`;
    mostrarMensaje(mensaje);
    } else {
    mostrarMensaje('El libro seleccionado no existe.');
    }
} else {
    mostrarMensaje('Debe seleccionar un libro y especificar una cantidad válida.');
}

cantidadInput.value = '';

  // Almacenar el carrito en localStorage
localStorage.setItem('carritoDeCompras', JSON.stringify(carroDeCompras));
}

function calcularPrecioTotal() {
let total = 0;
for (const element of carroDeCompras) {
    const { producto, cantidad } = element;
    const libroSeleccionado = stock[producto];

    if (libroSeleccionado) {
    const { precio } = libroSeleccionado;
      total += precio * cantidad;
    }
}

const precioTotalElement = document.getElementById('precioTotal');
precioTotalElement.textContent = `El precio total de tu compra es de $${total.toFixed(2)}.`;
}

function vaciarCarro() {
carroDeCompras = [];
mostrarMensaje('El carrito de compras ha sido vaciado.');

  // Almacenar el carrito vacío en localStorage
localStorage.setItem('carritoDeCompras', JSON.stringify(carroDeCompras));
}

function buscarProducto() {
const productoBuscadoInput = document.getElementById('productoBuscado');
const productoBuscado = productoBuscadoInput.value;
let encontrado = false;

for (const element of carroDeCompras) {
    if (element.producto === productoBuscado) {
    encontrado = true;
    mostrarMensaje(`El producto ${productoBuscado} está en tu carrito de compras.`);
    break;
    }
}

if (!encontrado) {
    mostrarMensaje(`El producto ${productoBuscado} no está en tu carrito de compras.`);
}

productoBuscadoInput.value = '';
}

function mostrarMensaje(mensaje) {
const mensajeElement = document.getElementById('mensaje');
mensajeElement.textContent = mensaje;
}

// Recuperar el carrito de compras almacenado en localStorage
const carritoAlmacenado = localStorage.getItem('carritoDeCompras');
if (carritoAlmacenado) {
carroDeCompras = JSON.parse(carritoAlmacenado);
}

window.addEventListener('DOMContentLoaded', () => {
crearOpcionesLibros();
calcularPrecioTotal();

const agregarButton = document.getElementById('agregar');
agregarButton.addEventListener('click', agregarAlCarro);

const vaciarButton = document.getElementById('vaciar');
vaciarButton.addEventListener('click', vaciarCarro);

const buscarButton = document.getElementById('buscar');
buscarButton.addEventListener('click', buscarProducto);
});


