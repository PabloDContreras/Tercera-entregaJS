const stockProductos = [
    {id: 1, nombre: "Bombay Sapphire 750ml", cantidad: 1, desc: "Gin", precio: 6750, img: "./imagenes/GIN-bombay.jpg"},
    {id: 2, nombre: "Tanqueray London 750ml", cantidad: 1, desc: "Gin", precio: 6670,img: "./imagenes/GIN-tanqueray.jpeg"},
    {id: 3, nombre: "Aconcagua Dry 750ml", cantidad: 1, desc: "Gin", precio: 3500, img: "./imagenes/GIN-aconcagua.jpeg"},
    {id: 4, nombre: "Absolut 500ml", cantidad: 1, desc: "Vodka", precio: 3300, img: "./imagenes/VODKA-absolut.jpg"},
    {id: 5, nombre: "Finlandia 750ml", cantidad: 1, desc: "Vodka", precio: 19300, img: "./imagenes/VODKA-finlandia.jpg"},
    {id: 6, nombre: "Smirnoff 700ml", cantidad: 1, desc: "Vodka", precio: 1820, img: "./imagenes/VODKA-smirnoff.jpg"},
    {id: 7, nombre: "Jose Cuervo 750ml", cantidad: 1, desc: "Tequila", precio: 9500, img: "./imagenes/TEQUILA-josecuervo.jpg"},
    {id: 8, nombre: "Don Julio 750ml", cantidad: 1, desc: "Tequila", precio: 53000, img: "./imagenes/TEQUILA-donjulio.jpg"},
    {id: 9, nombre: "Silver Patrón 750ml", cantidad: 1, desc: "Tequila", precio: 36000, img: "./imagenes/TEQUILA-patron.jpg"},
    {id: 10, nombre: "Branca 750ml", cantidad: 1, desc: "Fernet", precio: 2300, img: "./imagenes/FERNET-branca.jpg"},
];

let carrito = [];

const activarFuncion = document.querySelector("#activarFuncion");
if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
});

const formulario = document.querySelector('#procesar-pago');
if(formulario){
    formulario.addEventListener('submit', enviarCompra)
}

const vaciarCarrito = document.querySelector("#vaciarCarrito");
if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
    });
}

const procesarCompra = document.querySelector("#procesarCompra");
if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
            });
        } 
    });
}
const contenedor = document.querySelector("#contenedor");
stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
        contenedor.innerHTML += `
        <div class="card mt-3" style="width: 18rem;">
        <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: $${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
    </div>`;
    }
});

const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
    if(existe){
    const prod = carrito.map(prod => {
    if(prod.id === id){
    prod.cantidad++
        }
})} else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
    }
    mostrarCarrito()
};

const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
        const { id, nombre, precio, img, cantidad } = prod;
        modalBody.innerHTML += `
        <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
        </div>`;
    });
}

const carritoContenedor = document.querySelector("#carritoContenedor");
if (carrito.length === 0){
modalBody.innerHTML = `
<p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>`;
    }
carritoContenedor.textContent = carrito.length;

const precioTotal = document.querySelector("#precioTotal");
if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio, 0);
}
guardarStorage();
};

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
    const bebidasId = id;
    carrito = carrito.filter((bebidas) => bebidas.id !== bebidasId);
    mostrarCarrito();
}

const totalProceso = document.querySelector("#totalProceso");
function procesarPedido() {
    carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const {nombre, precio, cantidad } = prod;
    if (listaCompra) {
    const row = document.createElement("tr");
        row.innerHTML += `
            <td>${nombre}</td>
            <td>$${precio}</td>
            <td>${cantidad}</td>
            <td>$${precio * cantidad}</td>`;
listaCompra.appendChild(row);
    }});
totalProceso.innerText = carrito.reduce(
(acc, prod) => acc + prod.cantidad * prod.precio,
    0
    );
}
function enviarCompra(e){
e.preventDefault()
const cliente = document.querySelector('#cliente').value
const email = document.querySelector('#correo').value

if(email === '' || cliente == ''){
Swal.fire({
        title: "¡Debes completar tu email y nombre!",
        text: "Rellena el formulario",
        icon: "error",
        confirmButtonText: "Aceptar",
})
} else {

    const btn = document.getElementById('button');  
btn.value = 'Enviando...';

const serviceID = 'default_service';
const templateID = 'template_qxwi0jn';

emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
        btn.value = 'Finalizar compra';
}, (err) => {
    btn.value = 'Finalizar compra';
});

const spinner = document.querySelector('#spinner')
spinner.classList.add('d-flex')
spinner.classList.remove('d-none')

setTimeout(() => {
spinner.classList.remove('d-flex')
spinner.classList.add('d-none')
formulario.reset()

const alertExito = document.createElement('p')
alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
alertExito.textContent = 'Felicitaciones, ya es tuya la compra!'
formulario.appendChild(alertExito)

setTimeout(() => {
    alertExito.remove()
        }, 3000)  
}, 3000)
    }localStorage.clear()
}