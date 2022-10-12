/* DESAFIO - Fetch en tu proyecto
Para este desafio se agrego una nuevo objeto de lugares y utilizando mockapi se preparo un total de 10 objetos ramdom que son llamados al momento de iniciar el simulador, se aclara que es texto dummy pero cumple de ser una funcion asincrona*/

let contenedorHabitaciones;
let contenedorDescuentos;
let contenedorReserva;
let contenedorSeleccion;
let contenedorLugares;
let formulario;
let inputId;
let inputApellido;
let inputEmail;
let inputCel;
let inputDias;
let reservas = [];
let lugares = [];

const arrayHabitaciones = [
  { id: 1, nombre: "Normal", precio: 1000, personas: 1 },
  { id: 2, nombre: "Matrimonial", precio: 2000, personas: 2 },
  { id: 3, nombre: "Familiar", precio: 4000, personas: 4 },
];

const arrayDescuentos = [
  { id: 1, descripcion: "Ninguno", detalle: `0%`, aplica: 0 },
  { id: 2, descripcion: "Básico", detalle: `10%`, aplica: 0.1 },
  { id: 3, descripcion: "Superior", detalle: `25%`, aplica: 0.25 },
  { id: 4, descripcion: "Especial", detalle: `40%`, aplica: 0.4 },
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

class Lugares {
  constructor(id, nombre, cuartosDisp, telefono, fechas) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.cuartosDisp = cuartosDisp;
    this.telefono = telefono;
    this.fechas = fechas;
  }
}

function pintarLugares() {
  contenedorLugares.innerHTML = "";
  lugares.forEach((dato) => {
    let column = document.createElement("div");
    column.className = "col-md-auto mt-3 ms-3";
    column.id = `columnaLugares-${dato.id}`;
    column.innerHTML = `
   <div class="card">
      <div class="card-body">
         <p class="card-text textLugares"> <b>ID: </b>${dato.id}</p>
         <p class="card-text textLugares"> <b>Lugar: </b>${dato.nombre}</p>
         <p class="card-text textLugares"> <b>Cuartos Disponibles: </b>${dato.cuartosDisp}</p>
         <p class="card-text textLugares"><b>Tel: </b> ${dato.telefono}</p>
         <p class="card-text textLugares"><b>Fecha: </b> ${dato.fechas} </p>
      </div>
   </div>
`;
    contenedorLugares.append(column);
  });
}

function inicializarElementos() {
  contenedorHabitaciones = document.getElementById("containerHabitaciones");
  contenedorDescuentos = document.getElementById("containerDescuentos");
  contenedorReserva = document.getElementById("containerReserva");
  contenedorLugares = document.getElementById("containerLugares");
  contenedorSeleccion = document.getElementById("containerSeleccion");
  formulario = document.getElementById("formulario");
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
               <button class="btn btn-success" id="botonSeleccionar-${HABITACIONES.id}" >Seleccionar</button>
                  <button class="btn btn-danger" id="botonEliminar-${HABITACIONES.id}" >Eliminar</button>
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
  } else {
    let newSection = document.createElement("div");
    newSection.className = "mt-3";
    newSection.id = `columnaNewHab-${arrayHabs.id}`;
    newSection.innerHTML = `
      <div class="card">
      <div class="card-body">
      <p class="card-text textExample"><b>Tipo de Habitación:</b> ${arrayHabs.nombre}</p>
      <p class="card-text textExample"><b>Capacidad de Personas:</b> ${arrayHabs.personas}</p>
      <p class="card-text textExample"><b>Precio por día:</b> $${arrayHabs.precio}</p>
      </div>
      </div>
      `;

    contenedorSeleccion.append(newSection);
  }
}

function eliminarHab(arrayHabs) {
  const consulta = document.getElementById(`columnaNewHab-${arrayHabs.id}`)
    ? true
    : false;

  consulta
    ? document.getElementById(`columnaNewHab-${arrayHabs.id}`).remove()
    : mostrarMensaje("Aun no selecciono esta Habitación");
}

function mostrarDescuentos() {
  for (const DESCUENTOS of arrayDescuentos) {
    let section = document.createElement("div");
    section.className = "mt-3 ms-3";
    section.innerHTML = `
   <div class="card">
      <div class="card-body">
      <p class="card-text textExample"><b>Descuento:</b> ${DESCUENTOS.descripcion} </p>
      <p class="card-text textExample"><b>Total:</b> ${DESCUENTOS.detalle} </p>
<div class="card-footer">
               <button class="btn btn-success" id="botonSeleccionarDto-${DESCUENTOS.id}" >Seleccionar</button>
                  <button class="btn btn-danger" id="botonEliminarDto-${DESCUENTOS.id}" >Eliminar</button>
         </div>
      </div>
      </div>
   `;

    contenedorDescuentos.append(section);

    let botonSeleccionar = document.getElementById(
      `botonSeleccionarDto-${DESCUENTOS.id}`
    );
    let botonEliminar = document.getElementById(
      `botonEliminarDto-${DESCUENTOS.id}`
    );

    botonSeleccionar.onclick = () => seleccionarDto(DESCUENTOS);
    botonEliminar.onclick = () => eliminarDto(DESCUENTOS);
  }
}

function seleccionarDto(arrayDtos) {
  if (document.getElementById(`columnaNewDto-${arrayDtos.id}`)) {
    mostrarMensaje("YA SELECCIONO ESTE DESCUENTO");
  } else {
    let newSection = document.createElement("div");
    newSection.className = "mt-3";
    newSection.id = `columnaNewDto-${arrayDtos.id}`;
    newSection.innerHTML = `
      <div class="card">
      <div class="card-body">
      <p class="card-text textExample"><b>Descuento:</b> ${arrayDtos.descripcion}</p>
      <p class="card-text textExample"><b>Total:</b> ${arrayDtos.detalle}</p>
      </div>
      </div>
      `;

    contenedorSeleccion.append(newSection);
  }
}

function eliminarDto(arrayDtos) {
  const consulta = document.getElementById(`columnaNewDto-${arrayDtos.id}`)
    ? true
    : false;

  consulta
    ? document.getElementById(`columnaNewDto-${arrayDtos.id}`).remove()
    : mostrarMensaje("Aun no selecciono este Descuento");
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

inicializarElementos();
inicializarEventos();
mostrarDescuentos();
mostrarHabitaciones();
obtenerReservasStorage();
consultarLugaresServer();
