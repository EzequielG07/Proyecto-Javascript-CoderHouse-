/* DESAFIO - Fetch en tu proyecto
Para este desafio se agrego una nuevo objeto de lugares y utilizando mockapi se preparo un total de 10 objetos ramdom que son llamados al momento de iniciar el simulador, se aclara que es texto dummy pero cumple de ser una funcion asincrona*/

let contenedorHabitaciones;
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

let botonesCerrarModalAgregarReserva;
let modalAddReserva;
let modal;
let getPrecio;
let getHab;

const arrayHabitaciones = [
  { id: 1, nombre: "Normal", precio: 1000, personas: 1 },
  { id: 2, nombre: "Matrimonial", precio: 2000, personas: 2 },
  { id: 3, nombre: "Familiar", precio: 4000, personas: 4 },
];

class Reserva {
  constructor(id, apellido, email, celular, dias, precio, hab) {
    this.id = id;
    this.apellido = validarApellido(apellido.toUpperCase());
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
  } else if (document.getElementById(`nameHab`)) {
    mostrarMensaje("YA HAY HABITACION SELECCIONADA");
  } else {
    let newSection = document.createElement("div");
    newSection.className = "mt-3";
    newSection.id = `columnaNewHab-${arrayHabs.id}`;
    newSection.innerHTML = `
      <div class="card">
      <div class="card-body">
      <p class="card-text textExample" id="nameHab">${arrayHabs.nombre}</p>
      <p class="card-text textExample"><b>Capacidad de Personas:</b> ${arrayHabs.personas}</p>
       <p class="card-text textExample" id="precioXdia-${arrayHabs.nombre}">${arrayHabs.precio}</p></p>
      <div class="card-footer">
               <button class="btn btn-success" id="btnAgregarReserva-${arrayHabs.id}">Agregar Reserva</button> 
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

function abrirModalAgregarReserva() {
  modal.show();
}

function cerrarModalAgregarReserva() {
  formulario.reset();
  modal.hide();
}

function eliminarHab(arrayHabs) {
  const consulta = document.getElementById(`columnaNewHab-${arrayHabs.id}`)
    ? true
    : false;

  consulta
    ? document.getElementById(`columnaNewHab-${arrayHabs.id}`).remove()
    : mostrarMensaje("Aun no selecciono esta Habitación");
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
  for (const boton of botonesCerrarModalAgregarReserva) {
    boton.onclick = cerrarModalAgregarReserva;
  }
}

function validarApellido(valorX) {
  if (valorX === "") {
    alert("ingrese algo");
    return false;
  } else {
    return valorX;
  }
}

function validarReserva(event) {
  event.preventDefault();
  let id = inputId.value;
  let apellido = inputApellido.value;
  let email = inputEmail.value;
  let celular = parseInt(inputCel.value);
  let dias = parseInt(inputDias.value);
  let hab = document.getElementById("nameHab").textContent;
  let precio = parseInt(
    document.getElementById(`precioXdia-${hab}`).textContent
  );

  const idExiste = reservas.some((reserva) => reserva.id === id);
  if (!idExiste) {
    let reserva = new Reserva(id, apellido, email, celular, dias, precio, hab);

    let r;
    r = dias * precio;
    document.getElementById("resultado").innerHTML = r;

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
      eliminarReserva(idReserva);
      Swal.fire({
        title: "Borrado!",
        icon: "success",
        text: "La reserva ha sido eliminada",
      });
    }
  });
}

function eliminarReserva(idReserva) {
  let columnaBorrar = document.getElementById(`columna-${idReserva}`);
  let precioEstadiaBorrar = document.getElementById("resultado");
  let indiceBorrar = reservas.findIndex(
    (reserva) => Number(reserva.id) === Number(idReserva)
  );

  reservas.splice(indiceBorrar, 1);
  columnaBorrar.remove();
  precioEstadiaBorrar.innerHTML = "";
  actualizarReservasStorage();
}

function pintarReserva() {
  contenedorReserva.innerHTML = "";
  reservas.forEach((dato) => {
    let r;
    r = dato.dias * dato.precio;
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
         <p class="card-text textReserva"><b>PRECIO: </b> ${dato.precio}</p>
         <p class="card-text textReserva"><b>HABIT: </b> ${dato.hab}</p>
         <p class="card-text textReserva"><b>TOTAL: </b> ${r}</p>
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
mostrarHabitaciones();
obtenerReservasStorage();
consultarLugaresServer();
