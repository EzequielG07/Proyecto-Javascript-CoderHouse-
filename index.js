/* DESAFIO - Incorporar Eventos:
Para este desafio se incorporaron los siguientes eventos donde uno puede seleccionar las habitaciones y los descuentos que seran detallados es una secciona aparte de la pagina, y por otro lado se completa un formulario que una vez registrado muestra los datos a un constado, con la opcion de poder eliminarlo*/

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
  { nombre: "Normal", precio: 1000, personas: 1 },
  { nombre: "Matrimonial", precio: 2000, personas: 2 },
  { nombre: "Familiar", precio: 4000, personas: 4 },
];

const arrayDescuentos = [
  { descripcion: "Básico", detalle: `10%`, aplica: 0.1 },
  { descripcion: "Superior", detalle: `25%`, aplica: 0.25 },
  { descripcion: "Especial", detalle: `40%`, aplica: 0.4 },
  { descripcion: "Ninguno", detalle: `0%`, aplica: 0 },
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
    section.id = `columna-${HABITACIONES.nombre}`;
    section.innerHTML = `
      <div class="card">
      <div class="card-body">
      <p class="card-text textExample"><b>Tipo de Habitación:</b> ${HABITACIONES.nombre}</p>
      <p class="card-text textExample"><b>Capacidad de Personas:</b> ${HABITACIONES.personas}</p>
      <p class="card-text textExample"><b>Precio por día:</b> $${HABITACIONES.precio}</p>
               <div class="card-footer">
            <button class="btn btn-success" id="botonSeleccionar-${HABITACIONES.nombre}" >Seleccionar</button>
         </div>
      </div>
      </div>
      `;

    contenedorHabitaciones.append(section);

    let botonSeleccionar = document.getElementById(
      `botonSeleccionar-${HABITACIONES.nombre}`
    );
    botonSeleccionar.onclick = () => elegirHabitacion(HABITACIONES.nombre);
  }
}

function elegirHabitacion(nombreHabitacion) {
  let indiceSeleccionar = arrayHabitaciones.findIndex(
    (habitacion) => String(habitacion.nombre) === String(nombreHabitacion)
  );

  let section = document.createElement("div");
  section.className = "mt-3 ms-3";
  section.innerHTML = `
      <div class="card">
      <div class="card-body">
      <p class="card-text textExample"><b>Tipo de Habitación:</b> ${arrayHabitaciones[indiceSeleccionar].nombre}</p>
      <p class="card-text textExample"><b>Capacidad de Personas:</b> ${arrayHabitaciones[indiceSeleccionar].personas}</p>
      <p class="card-text textExample"><b>Precio por día:</b> $${arrayHabitaciones[indiceSeleccionar].precio}</p>
      </div>
      </div>
      `;

  contenedorSeleccion.append(section);
  /*comentario para futura funcionalidad*/
  // let valor = arrayHabitaciones[indiceSeleccionar].precio;
  //   console.log(indiceSeleccionar);
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
            <button class="btn btn-success" id="botonSeleccionado-${DESCUENTOS.descripcion}" >Seleccionar</button>
         </div>
      </div>
      </div>
   `;

    contenedorDescuentos.append(section);

    let botonSeleccionado = document.getElementById(
      `botonSeleccionado-${DESCUENTOS.descripcion}`
    );
    botonSeleccionado.onclick = () => elegirDescuento(DESCUENTOS.descripcion);
  }
}

function elegirDescuento(descripcionDescuento) {
  let indiceSeleccionar = arrayDescuentos.findIndex(
    (descuento) =>
      String(descuento.descripcion) === String(descripcionDescuento)
  );

  let section = document.createElement("div");
  section.className = "mt-3 ms-3";
  section.innerHTML = `
      <div class="card">
      <div class="card-body">
      <p class="card-text textExample"><b>Descuento:</b> ${arrayDescuentos[indiceSeleccionar].descripcion}</p>
      <p class="card-text textExample"><b>Total:</b> ${arrayDescuentos[indiceSeleccionar].detalle}</p>
      </div>
      </div>
      `;

  contenedorSeleccion.append(section);
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

  let reserva = new Reserva(id, apellido, email, celular, dias);

  reservas.push(reserva);
  formulario.reset();

  pintarReserva();
}

function eliminarProducto(idReserva) {
  let columnaBorrar = document.getElementById(`columna-${idReserva}`);
  let indiceBorrar = reservas.findIndex(
    (reserva) => Number(reserva.id) === Number(idReserva)
  );

  reservas.splice(indiceBorrar, 1);
  columnaBorrar.remove();
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

inicializarElementos();
inicializarEventos();
mostrarDescuentos();
mostrarHabitaciones();
