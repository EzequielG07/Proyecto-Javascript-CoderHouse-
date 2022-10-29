/* DESAFIO - Proyecto Final*/

// Variables contenedoras de datos para el HTML
let contenedorHabitaciones;
let contenedorSeleccion;
let contenedorReserva;
let contenedorLugares;

// Variables de información
let lugares = [];

// Variables para formulario de reserva
let formulario;
let inputId;
let inputApellido;
let inputEmail;
let inputCel;
let inputDias;
let getPrecio;
let getHab;
let reservas = [];
let modal;
let botonesCerrarModalAgregarReserva;
let modalAddReserva;

const arrayHabitaciones = [
  {
    id: 1,
    nombre: "Normal",
    precio: 1000,
    personas: 1,
    foto: "./img/habitacionNormal.jpg",
  },
  {
    id: 2,
    nombre: "Matrimonial",
    precio: 2000,
    personas: 2,
    foto: "./img/habitacionMatrimonial.jpg",
  },
  {
    id: 3,
    nombre: "Familiar",
    precio: 4000,
    personas: 4,
    foto: "./img/habitacionFamiliar.jpg",
  },
];

class Reserva {
  constructor(id, apellido, email, celular, dias, precio, hab) {
    this.id = id;
    this.apellido = apellido.toUpperCase();
    this.email = email;
    this.celular = celular;
    this.dias = dias;
    this.precio = precio;
    this.hab = hab;
  }
}

class Lugares {
  constructor(id, nombre, cuartosDisp, telefono, fechas) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.cuartosDisp = cuartosDisp;
    this.telefono = telefono;
    this.fechas = fechas;
  }
}

function inicializarElementos() {
  contenedorHabitaciones = document.getElementById("containerHabitaciones");
  contenedorReserva = document.getElementById("containerReserva");
  contenedorLugares = document.getElementById("containerLugares");
  contenedorSeleccion = document.getElementById("containerSeleccion");
  formulario = document.getElementById("formulario");
  inputId = document.getElementById("inputId");
  inputApellido = document.getElementById("inputApellido");
  inputEmail = document.getElementById("inputEmail");
  inputCel = document.getElementById("inputCel");
  inputDias = document.getElementById("inputDias");
  botonesCerrarModalAgregarReserva = document.getElementsByClassName(
    "btnCerrarModalAgregarReserva"
  );
  modalAddReserva = document.getElementById("modalAddReserv");
  modal = new bootstrap.Modal(modalAddReserva);
  getPrecio = document.getElementById("getPrecio");
  getHab = document.getElementById("getHab");
}

function inicializarEventos() {
  formulario.onsubmit = (event) => {
    validarReserva(event);
  };
  for (const boton of botonesCerrarModalAgregarReserva) {
    boton.onclick = cerrarModalAgregarReserva;
  }
}

// Funciones relacionadas a mostrar, seleccionar y completar la reserva de habitaciones.
function mostrarHabitaciones() {
  for (const HABITACIONES of arrayHabitaciones) {
    let section = document.createElement("div");
    section.className = "mt-3";
    section.id = `columnaHab-${HABITACIONES.id}`;
    section.innerHTML = `
      <div class="card cardHabitaciones">
      <div class="card-body">
      <p class="card-text"><b>Tipo de Habitación:</b> ${HABITACIONES.nombre}</p>
      <p class="card-text"><b>Capacidad de Personas:</b> ${HABITACIONES.personas}</p>
      <p class="card-text"><b>Precio por día:</b> $${HABITACIONES.precio}</p>
               <div class="card-footer">
               <button class="btn btnSelect" id="botonSeleccionar-${HABITACIONES.id}" >Seleccionar</button>
                  <button class="btn btnDelete" id="botonEliminar-${HABITACIONES.id}" >Eliminar</button>
         </div>
      </div>
      </div>
      `;

    contenedorHabitaciones.append(section);

    let botonSeleccionar = document.getElementById(
      `botonSeleccionar-${HABITACIONES.id}`
    );
    let botonEliminar = document.getElementById(
      `botonEliminar-${HABITACIONES.id}`
    );

    botonSeleccionar.onclick = () => seleccionarHab(HABITACIONES);
    botonEliminar.onclick = () => eliminarHab(HABITACIONES);
  }
}

function seleccionarHab(arrayHabs) {
  if (document.getElementById(`columnaNewHab-${arrayHabs.id}`)) {
    mostrarMensaje("YA SELECCIONO ESTA HABITACION");
  } else if (document.getElementById(`nameHab`)) {
    mostrarMensaje("YA HAY HABITACION SELECCIONADA");
  } else {
    let newSection = document.createElement("div");
    newSection.className = "mt-3";
    newSection.id = `columnaNewHab-${arrayHabs.id}`;
    newSection.innerHTML = `
      <div class="card cardSeleccion">
      <div class="card-body">
      <img src=${arrayHabs.foto} class="card-img-top img-thumbnail imgRoom" alt="Foto de habitacion según selección">
      <p class="card-text" id="nameHab">${arrayHabs.nombre}</p>
      <p class="card-text"><b>Capacidad de Personas:</b> ${arrayHabs.personas}</p>
      <div>Precio x Día
      <p class="card-text" id="precioXdia-${arrayHabs.nombre}">${arrayHabs.precio}</p>
      </div>
      <div class="card-footer">
               <button class="btn btnAddBooking" id="btnAgregarReserva-${arrayHabs.id}">Agregar Reserva</button> 
            </div>
      </div>
      </div>
      `;

    contenedorSeleccion.append(newSection);

    let botonAgregarReserva = document.getElementById(
      `btnAgregarReserva-${arrayHabs.id}`
    );

    botonAgregarReserva.onclick = abrirModalAgregarReserva;
  }
}

function eliminarHab(arrayHabs) {
  const consulta = document.getElementById(`columnaNewHab-${arrayHabs.id}`)
    ? true
    : false;

  consulta
    ? document.getElementById(`columnaNewHab-${arrayHabs.id}`).remove()
    : mostrarMensaje("AUN NO SELECCIONO ESTA HABITACIÓN");
}

function abrirModalAgregarReserva() {
  modal.show();
}

function cerrarModalAgregarReserva() {
  formulario.reset();
  modal.hide();
}

// Funciones relacionadas para agregar y eliminar distintas reservas.
function validarReserva(event) {
  event.preventDefault();
  let id = inputId.value;
  let apellido = inputApellido.value;
  if (apellido === "" || apellido.length <= 1) {
    mostrarMensaje("Debe ingresar mas de un caracter en su Apellido");
    return;
  }
  let email = inputEmail.value;
  let celular = parseInt(inputCel.value);
  if (isNaN(celular) || celular === "") {
    mostrarMensaje(`Debe ingresar al menor un valor numerico en su Celular`);
    return;
  }
  let dias = parseInt(inputDias.value);
  let hab = document.getElementById("nameHab").textContent;
  let precio = parseInt(
    document.getElementById(`precioXdia-${hab}`).textContent
  );

  const idExiste = reservas.some((reserva) => reserva.id === id);
  if (!idExiste) {
    let reserva = new Reserva(id, apellido, email, celular, dias, precio, hab);

    reservas.push(reserva);
    formulario.reset();
    actualizarReservasStorage();
    pintarReserva();
  } else {
    mostrarMensaje(`EL ID YA EXISTE`);
  }
}

function eliminarReserva(idReserva) {
  let columnaBorrar = document.getElementById(`columnaReserva-${idReserva}`);
  let indiceBorrar = reservas.findIndex(
    (reserva) => Number(reserva.id) === Number(idReserva)
  );

  reservas.splice(indiceBorrar, 1);
  columnaBorrar.remove();
  actualizarReservasStorage();
}

function pintarReserva() {
  contenedorReserva.innerHTML = "";
  reservas.forEach((dato) => {
    let total;
    total = dato.dias * dato.precio;
    let column = document.createElement("div");
    column.className = "mx-auto my-3";
    column.id = `columnaReserva-${dato.id}`;
    column.innerHTML = `
   <div class="card cardReservas">
      <div class="card-body">
         <p class="card-text "> <b>ID: </b>${dato.id}</p>
         <p class="card-text "> <b>Apellido: </b>${dato.apellido}</p>
         <p class="card-text "> <b>Email: </b>${dato.email}</p>
         <p class="card-text "><b>Celular: </b> ${dato.celular}</p>
         <p class="card-text "><b>Estadia por: </b> ${dato.dias} <b>días</b></p>
         <p class="card-text "><b>Precio x día: </b> $${dato.precio}</p>
         <p class="card-text "><b>Tipo Habitación: </b> ${dato.hab}</p>
         <p class="card-text "><b> TOTAL A PAGAR: $${total} </b> </p>
         <div class="card-footer">
            <button class="btn btnDeleteBooking" id="botonEliminarReser-${dato.id}" >Eliminar</button>
         </div>
      </div>
   </div>
`;

    contenedorReserva.append(column);

    let botonEliminar = document.getElementById(
      `botonEliminarReser-${dato.id}`
    );
    botonEliminar.onclick = () => confirmarEliminacion(dato.id);
  });
}

// Funciones relacionadas para mostrar mensajes customizados (uso de librerias).
function mostrarMensaje(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    style: {
      background:
        "linear-gradient(45deg, rgba(4,16,62,1) 10%, rgba(41,75,125,1) 81%)",
    },
  }).showToast();
}

function confirmarEliminacion(idReserva) {
  Swal.fire({
    title: "¿Está seguro de eliminar su reserva?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarReserva(idReserva);
      Swal.fire({
        title: "Borrado!",
        icon: "success",
        text: "La reserva ha sido eliminada",
      });
    }
  });
}

// Funciones relacionadas para guadar las reservas en el LocalStorage.
function actualizarReservasStorage() {
  let reservasJSON = JSON.stringify(reservas);
  localStorage.setItem("reservas", reservasJSON);
}

function obtenerReservasStorage() {
  let reservasJSON = localStorage.getItem("reservas");
  if (reservasJSON) {
    reservas = JSON.parse(reservasJSON);
    pintarReserva();
  }
}

// Funciones relacionadas para mostar lugares mediante la utilizacion de una API (mockAPI).
async function consultarLugaresServer() {
  try {
    const response = await fetch(
      "https://6347210b04a6d45757a114c4.mockapi.io/api/v1/lugares"
    );
    const data = await response.json();
    lugares = [...data];
    pintarLugares();
  } catch (error) {
    console.log(error);
  }
}

function pintarLugares() {
  contenedorLugares.innerHTML = "";
  lugares.forEach((dato) => {
    let column = document.createElement("div");
    column.className = "mx-auto my-3";
    column.id = `columnaLugares-${dato.id}`;
    column.innerHTML = `
   <div class="card cardLugares">
      <div class="card-body">
         <p class="card-text"> <b>ID: </b>${dato.id}</p>
         <p class="card-text"> <b>Lugar: </b>${dato.nombre}</p>
         <p class="card-text"> <b>Cuartos Disponibles: </b>${dato.cuartosDisp}</p>
         <p class="card-text"><b>Tel: </b> ${dato.telefono}</p>
         <p class="card-text"><b>Fecha: </b> ${dato.fechas} </p>
      </div>
   </div>
`;
    contenedorLugares.append(column);
  });
}

// Función Inicializadora.
function main() {
  inicializarElementos();
  inicializarEventos();
  mostrarHabitaciones();
  obtenerReservasStorage();
  consultarLugaresServer();
}

main();
