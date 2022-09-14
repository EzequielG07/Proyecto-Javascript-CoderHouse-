/* DESAFIO Primera Entrega del Proyecto Final:
Se realizo un simulador que consiste en averiguar cuanto sale quedarse en una de las habitaciónes (incluidas en un array) por día  y dependiendo si tiene descuento o no (los mismos incluidos en otro array), calcular el total de la estadia segun los dias y el descuento. Se aclara que si no se elige una de las opciones dadas al momento de elegir la habitacion o descuento, se repetira la consulta (ciclo) hasta que se elija una de las opciones correspondientes, similiar ocurre al momento de ingresar la cantidad de días a quedarse.
 A su vez, también se preparo aparte una opción por si desea registrar sus datos (en un objeto) para una reserva y que imprima esos datos en pantalla, se aclara que una vez dada la confirmacion  `¿Quiere registrar sus datos para una reserva?` se repetira el cilclo de solucitud si no se respetan las condiciones para cada dato a ingresar */

/*Sección dedicada para la consulta de habitaciones*/

const arrayHabitaciones = [
  { nombre: "Normal", precio: 1000, personas: 1 },
  { nombre: "Matrimonial", precio: 2000, personas: 2 },
  { nombre: "Familiar", precio: 4000, personas: 4 },
];

function mensajeHabitaciones() {
  let mensaje = `¿Cual habitación desea reservar?`;
  let count = 1;

  for (let habitacion of arrayHabitaciones) {
    mensaje += `\n${count}. ${habitacion.nombre} - Valor x día: $${habitacion.precio}`;
    count++;
  }
  mensaje += `\n${count}. Salir`;
  return mensaje;
}

const arrayDescuentos = [
  { descripcion: "Básico", detalle: `10%`, aplica: 0.1 },
  { descripcion: "Superior", detalle: `25%`, aplica: 0.25 },
  { descripcion: "Especial", detalle: `40%`, aplica: 0.4 },
  { descripcion: "Ninguno", detalle: `0%`, aplica: 0 },
];

function mensajeDescuentos() {
  let mensaje = `Seleccione si posee alguno de los siguientes descuentos:`;
  let count = 1;

  for (let dto of arrayDescuentos) {
    mensaje += `\n${count}. ${dto.descripcion} - ${dto.detalle} sobre el valor total de la estadia.`;
    count++;
  }
  mensaje += `\n${count}. Salir`;
  return mensaje;
}

function primeraConsulta() {
  const wishesToAsk = confirm(`¿Quiere realizar una consulta?`);
  return wishesToAsk;
}

function cantidadDiasConsulta(habitacion) {
  return prompt(
    `Cuantos días desea quedarse en la habitacion ${habitacion.nombre}.`
  );
}

function subtotal(dias, habitacion, dto) {
  if (isNaN(dias)) {
    alert(`Debe ingresar valores numéricos.`);
  } else if (dias == 0 || dias == null) {
    alert(`Debe ingresar al menos 1 día.`);
  } else {
    alert(
      `Eligio ${dias} días en la habitación ${
        habitacion.nombre
      } por un total de $${dias * habitacion.precio} con un descuento del ${
        dto.detalle
      }`
    );
    const PRECIO_DIA = dias * habitacion.precio;
    const DTO_DIA = PRECIO_DIA * dto.aplica;
    const SUBTOTAL = PRECIO_DIA - DTO_DIA;
    return SUBTOTAL;
  }
}

function mensajeFinal(total) {
  alert(`El total de su estadía será de $${total}`);
}

function procesarConsulta() {
  let preguntaDeEntrada = primeraConsulta();
  let habitacionElegida = 0;
  let descuentoElegido = 0;

  if (preguntaDeEntrada) {
    do {
      habitacionElegida = parseInt(prompt(mensajeHabitaciones()));

      if (habitacionElegida == 4) {
        alert(`De acuerdo, esperamos su consulta`);
      } else if (habitacionElegida >= 1 && habitacionElegida <= 3) {
        do {
          descuentoElegido = parseInt(prompt(mensajeDescuentos()));

          if (descuentoElegido == 5) {
            alert(`De acuerdo, esperamos su consulta`);
          } else if (descuentoElegido >= 1 && descuentoElegido <= 4) {
            let totalEstadia;
            do {
              totalEstadia = subtotal(
                cantidadDiasConsulta(arrayHabitaciones[habitacionElegida - 1]),
                arrayHabitaciones[habitacionElegida - 1],
                arrayDescuentos[descuentoElegido - 1]
              );
              if (totalEstadia) {
                return mensajeFinal(totalEstadia);
              }
            } while (!totalEstadia);
          } else {
            alert(`Opción invalida, ingrese nuevamente una de las opciones.`);
          }
        } while (
          descuentoElegido < 1 ||
          descuentoElegido > 5 ||
          isNaN(descuentoElegido)
        );
      } else {
        alert(`Opción invalida, ingrese nuevamente una de las opciones.`);
      }
    } while (
      habitacionElegida < 1 ||
      habitacionElegida > 4 ||
      isNaN(habitacionElegida)
    );
  } else {
    alert(`De acuerdo, esperamos su consulta`);
  }
}

/*Sección dedicada para la solicitud de datos para una reserva*/

class Reserva {
  constructor(apellido, email, celular) {
    this.apellido = apellido;
    this.email = email;
    this.celular = celular;
  }
}

function reservaConsulta() {
  const wishesToReserve = confirm(
    `¿Quiere registrar sus datos para una reserva?`
  );
  return wishesToReserve;
}

function validarApellido() {
  do {
    valorX = prompt(`Ingrese su apellido (debe ser mayor a 1 carácter)`);
  } while (valorX == null || valorX.length <= 1);
  return valorX;
}

function validarEmail(valorY) {
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  do {
    valorY = prompt(`Ingrese un correo (formato: "example@dominio.com")`);
  } while (!re.exec(valorY));
  return valorY;
}

function validarCel() {
  do {
    valorZ = prompt(
      `Ingrese su celular (debe ser un número y mayor a 5 caracteres)`
    );
  } while (isNaN(valorZ) || valorZ == null || valorZ.length <= 5);
  return valorZ;
}

function obtenerReserva() {
  let apellido = validarApellido();
  let y;
  let email = validarEmail(y);
  let celular = validarCel();

  const OBJETO_RESERVA = new Reserva(apellido, email, celular);
  return OBJETO_RESERVA;
}

function convertirObjetoEnTexto(objeto) {
  let texto = "";
  for (const clave in objeto) {
    if (typeof objeto[clave] !== "function")
      texto += clave + " : " + objeto[clave] + "\n";
  }
  return texto;
}

function procesarReserva() {
  let preguntaReserva = reservaConsulta();
  let miReserva;
  if (preguntaReserva) {
    miReserva = obtenerReserva();
    const OBJETO_TEXTO = convertirObjetoEnTexto(miReserva);
    alert(OBJETO_TEXTO);
  } else {
    alert(`De acuerdo, esperamos su reserva`);
  }
}

procesarConsulta();
procesarReserva();
