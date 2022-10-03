/* DESAFIO - Segunda Entrega del Proyecto Final:
Para este desafio se incorporaron los siguientes eventos donde uno puede seleccionar las habitaciones y los descuentos que seran detallados es una secciona aparte de la pagina, y por otro lado se completa un formulario que una vez registrado muestra los datos a un constado, con la opcion de poder eliminarlo y a su vez esto queda guardado en el Local Storage de la página local*/

let contenedorHabitaciones;
let contenedorDescuentos;
let contenedorReserva;
let contenedorSeleccion;
let formulario;
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

function inicializarElementos() {
  contenedorHabitaciones = document.getElementById("containerHabitaciones");
  contenedorDescuentos = document.getElementById("containerDescuentos");
  contenedorReserva = document.getElementById("containerReserva");
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
    alert("YA SELECCIONO ESTA HABITACION");
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

/*function eliminarHab(arrayHabs) {
  if (document.getElementById(`columnaNewHab-${arrayHabs.id}`)) {
    document.getElementById(`columnaNewHab-${arrayHabs.id}`).remove();
  } else {
    alert("AUN NO SELECCIONO ESTA HABITACION");
  }
}*/

function eliminarHab(arrayHabs) {
  const consulta = document.getElementById(`columnaNewHab-${arrayHabs.id}`)
    ? true
    : false;

  consulta
    ? document.getElementById(`columnaNewHab-${arrayHabs.id}`).remove()
    : alert("AUN NO SELECCIONO ESTA HABITACION");
}

/*DESCUENTOS--------*/

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
    alert("YA SELECCIONO ESTE DESCUENTO");
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
    : alert("AUN NO SELECCIONO ESTE DESCUENTO");
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
    alert(`El id ya existe`);
  }
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
            <button class="btn btn-danger" id="botonEliminar-${dato.id}" >Eliminar</button>
         </div>
      </div>
   </div>
`;
    contenedorReserva.append(column);

    let botonEliminar = document.getElementById(`botonEliminar-${dato.id}`);
    botonEliminar.onclick = () => eliminarProducto(dato.id);
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
inicializarEventos();
mostrarDescuentos();
mostrarHabitaciones();
obtenerReservasStorage();
