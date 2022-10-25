let contenedorHabitaciones;
let formulario;
let botonesCerrarModalAgregarReserva;
let modalAddReserva;
let modal;

let contenedorReserva;
let inputId;
let inputApellido;
let inputEmail;
let inputCel;
let inputDias;
let reservas = [];

const arrayHabitaciones = [
  { id: 1, nombre: "Normal", precio: 1000, personas: 1 },
  { id: 2, nombre: "Matrimonial", precio: 2000, personas: 2 },
  { id: 3, nombre: "Familiar", precio: 4000, personas: 4 },
];

class Reserva {
  constructor(id, apellido, email, celular, dias) {
    this.id = id;
    this.apellido = apellido.toUpperCase();
    this.email = email;
    this.celular = celular;
    this.dias = dias;
  }
}

function inicializarElementos() {
  contenedorHabitaciones = document.getElementById("containerHabitaciones");
  formulario = document.getElementById("formulario");

  botonesCerrarModalAgregarReserva = document.getElementsByClassName(
    "btnCerrarModalAgregarReserva"
  );
  modalAddReserva = document.getElementById("modalAddReserv");
  modal = new bootstrap.Modal(modalAddReserva);

  contenedorReserva = document.getElementById("containerReserva");
  inputId = document.getElementById("inputId");
  inputApellido = document.getElementById("inputApellido");
  inputEmail = document.getElementById("inputEmail");
  inputCel = document.getElementById("inputCel");
  inputDias = document.getElementById("inputDias");
}

function mostrarHabitaciones() {
  for (const HABITACIONES of arrayHabitaciones) {
    let section = document.createElement("div");
    section.className = "mt-3";
    section.id = `columnaHab-${HABITACIONES.id}`;
    section.innerHTML = `
      <div class="card">
      <div class="card-body">
      <p class="card-text textExample"><b>Tipo de Habitación:</b> ${HABITACIONES.nombre}</p>
      <p class="card-text textExample"><b>Capacidad de Personas:</b> ${HABITACIONES.personas}</p>
      <p class="card-text textExample"><b>Precio por día:</b> $${HABITACIONES.precio}</p>
           <div class="card-footer">
               <button class="btn btn-success" id="btnAgregarReserva-${HABITACIONES.id}">Agregar Reserva</button> 
            </div>
      </div>
      </div>
      `;

    contenedorHabitaciones.append(section);

    let botonAgregarReserva = document.getElementById(
      `btnAgregarReserva-${HABITACIONES.id}`
    );

    botonAgregarReserva.onclick = abrirModalAgregarReserva;
  }
}

function abrirModalAgregarReserva() {
  modal.show();
}

function inicializarEventos() {
  formulario.onsubmit = (event) => validarReserva(event);
}

function validarReserva(event) {
  event.preventDefault();
  let id = inputId.value;
  let apellido = inputApellido.value;
  let email = inputEmail.value;
  let celular = parseInt(inputCel.value);
  let dias = parseInt(inputDias.value);

  const idExiste = reservas.some((reserva) => reserva.id === id);
  if (!idExiste) {
    let reserva = new Reserva(id, apellido, email, celular, dias);

    reservas.push(reserva);
    formulario.reset();
    actualizarReservasStorage();
    pintarReserva();
  } else {
    mostrarMensaje(`El id ya existe`);
  }
}

function mostrarMensaje(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
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
      eliminarProducto(idReserva);
      Swal.fire({
        title: "Borrado!",
        icon: "success",
        text: "La reserva ha sido eliminada",
      });
    }
  });
}

function eliminarProducto(idReserva) {
  let columnaBorrar = document.getElementById(`columna-${idReserva}`);
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
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3 ms-3";
    column.id = `columna-${dato.id}`;
    column.innerHTML = `
   <div class="card">
      <div class="card-body">
         <p class="card-text textReserva"> <b>ID: </b>${dato.id}</p>
         <p class="card-text textReserva"> <b>Apellido: </b>${dato.apellido}</p>
         <p class="card-text textReserva"> <b>Email: </b>${dato.email}</p>
         <p class="card-text textReserva"><b>Celular: </b> ${dato.celular}</p>
         <p class="card-text textReserva"><b>Estadia por: </b> ${dato.dias} <b>dias</b></p>
         <div class="card-footer">
            <button class="btn btn-danger" id="botonEliminarReser-${dato.id}" >Eliminar</button>
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

inicializarElementos();
mostrarHabitaciones();
inicializarEventos();
