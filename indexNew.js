let contenedorHabitaciones;
let formulario;
let botonesCerrarModalAgregarReserva;
let modalAddReserva;
let botonAgregarReserva;
let modal;

const arrayHabitaciones = [
  { id: 1, nombre: "Normal", precio: 1000, personas: 1 },
  /* { id: 2, nombre: "Matrimonial", precio: 2000, personas: 2 },
  { id: 3, nombre: "Familiar", precio: 4000, personas: 4 },*/
];

function inicializarElementos() {
  contenedorHabitaciones = document.getElementById("containerHabitaciones");
  formulario = document.getElementById("formulario");

  botonesCerrarModalAgregarReserva = document.getElementsByClassName(
    "btnCerrarModalAgregarReserva"
  );
  modalAddReserva = document.getElementById("modalAddReserv");
  botonAgregarReserva = document.getElementById("btnAgregarReserva");

  modal = new bootstrap.Modal(modalAddReserva);
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
            </div>
      </div>
      `;

    contenedorHabitaciones.append(section);
  }
}

function inicializarEventos() {
  botonAgregarReserva.onclick = abrirModalAgregarReserva;
}

function abrirModalAgregarReserva() {
  modal.show();
}

/*function cerrarModalAgregarReserva() {
  formulario.reset();
  modal.hide();
}*/

inicializarElementos();
mostrarHabitaciones();
inicializarEventos();
