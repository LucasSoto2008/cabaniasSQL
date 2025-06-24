// Función para mostrar más información de las cabañas
function verMasCabana(nombreCabana) {
  console.log(`Consultando información de: ${nombreCabana}`);

  let mensaje = "";

  switch (nombreCabana) {
    case "Cabaña del Bosque":
      mensaje =
        `🌲 CABAÑA DEL BOSQUE 🌲\n\n` +
        `✅ Capacidad: 4 personas\n` +
        `✅ 2 dormitorios\n` +
        `✅ 1 baño completo\n` +
        `✅ Cocina equipada\n` +
        `✅ Chimenea a leña\n` +
        `✅ Deck privado\n` +
        `✅ Vista al bosque nativo\n` +
        `✅ WiFi gratuito\n\n` +
        `💰 Precio: Consultar disponibilidad`;
      break;

    case "Cabaña Vista Lago":
      mensaje =
        `🏔️ CABAÑA VISTA LAGO 🏔️\n\n` +
        `✅ Capacidad: 6 personas\n` +
        `✅ 3 dormitorios\n` +
        `✅ 2 baños completos\n` +
        `✅ Cocina completa\n` +
        `✅ Jacuzzi privado\n` +
        `✅ Terraza con parrilla\n` +
        `✅ Vista panorámica al Lago Lácar\n` +
        `✅ WiFi gratuito\n\n` +
        `💰 Precio: Consultar disponibilidad`;
      break;

    case "Cabaña Familiar":
      mensaje =
        `👨‍👩‍👧‍👦 CABAÑA FAMILIAR 👨‍👩‍👧‍👦\n\n` +
        `✅ Capacidad: 8 personas\n` +
        `✅ 3 dormitorios amplios\n` +
        `✅ 2 baños completos\n` +
        `✅ Cocina completa\n` +
        `✅ Sala de juegos\n` +
        `✅ Jardín privado\n` +
        `✅ Juegos infantiles\n` +
        `✅ Parrilla exterior\n` +
        `✅ WiFi gratuito\n\n` +
        `💰 Precio: Consultar disponibilidad`;
      break;
  }

  alert(mensaje);
}

// Función para procesar el formulario de consulta
function consultarDisponibilidad(event) {
  event.preventDefault();

  // Obtener datos del formulario
  const formData = new FormData(event.target);
  const datos = {
    fechaIngreso: formData.get("fechaIngreso"),
    fechaSalida: formData.get("fechaSalida"),
    mayores: formData.get("mayores"),
    menores: formData.get("menores"),
    nombreCompleto: formData.get("nombreCompleto"),
    telefono: formData.get("telefono"),
    email: formData.get("email"),
    mensaje: formData.get("mensaje"),
  };

  // Validar fechas
  const fechaIngreso = new Date(datos.fechaIngreso);
  const fechaSalida = new Date(datos.fechaSalida);
  const hoy = new Date();

  if (fechaIngreso < hoy) {
    alert("❌ La fecha de ingreso no puede ser anterior a hoy.");
    return;
  }

  if (fechaSalida <= fechaIngreso) {
    alert("❌ La fecha de salida debe ser posterior a la fecha de ingreso.");
    return;
  }

  // Calcular días de estadía
  const diasEstadia = Math.ceil(
    (fechaSalida - fechaIngreso) / (1000 * 60 * 60 * 24)
  );

  // Mostrar confirmación
  const confirmacion =
    `🏔️ CONSULTA RECIBIDA - CABAÑAS SQL 🏔️\n\n` +
    `👤 Nombre: ${datos.nombreCompleto}\n` +
    `📧 Email: ${datos.email}\n` +
    `📱 Teléfono: ${datos.telefono}\n\n` +
    `📅 Check-in: ${formatearFecha(fechaIngreso)}\n` +
    `📅 Check-out: ${formatearFecha(fechaSalida)}\n` +
    `🗓️ Días de estadía: ${diasEstadia}\n\n` +
    `👥 Huéspedes:\n` +
    `   • Mayores: ${datos.mayores}\n` +
    `   • Menores: ${datos.menores}\n` +
    `   • Total: ${
      Number.parseInt(datos.mayores) + Number.parseInt(datos.menores)
    }\n\n` +
    `💬 Mensaje: ${datos.mensaje || "Sin mensaje adicional"}\n\n` +
    `✅ Te contactaremos pronto con la disponibilidad y precios.`;

  alert(confirmacion);

  // Log para desarrollo
  console.log("Consulta de disponibilidad:", datos);
  console.log(`Días de estadía: ${diasEstadia}`);

  // Limpiar formulario
  event.target.reset();

  // Simular envío (en producción aquí iría la lógica de envío real)
  setTimeout(() => {
    alert(
      "📧 ¡Consulta enviada exitosamente!\n\nRecibirás una respuesta en las próximas 24 horas."
    );
  }, 1000);
}

// Función auxiliar para formatear fechas
function formatearFecha(fecha) {
  const opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return fecha.toLocaleDateString("es-AR", opciones);
}

// Smooth scroll para navegación
document.addEventListener("DOMContentLoaded", () => {
  const enlaces = document.querySelectorAll('a[href^="#"]');

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();

      const destino = document.querySelector(this.getAttribute("href"));
      if (destino) {
        destino.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Establecer fecha mínima en los campos de fecha
  const hoy = new Date().toISOString().split("T")[0];
  document.getElementById("fechaIngreso").setAttribute("min", hoy);
  document.getElementById("fechaSalida").setAttribute("min", hoy);

  // Actualizar fecha mínima de salida cuando cambia la fecha de ingreso
  document
    .getElementById("fechaIngreso")
    .addEventListener("change", function () {
      const fechaIngreso = this.value;
      const fechaSalida = document.getElementById("fechaSalida");
      fechaSalida.setAttribute("min", fechaIngreso);

      // Si la fecha de salida es anterior a la nueva fecha de ingreso, limpiarla
      if (fechaSalida.value && fechaSalida.value <= fechaIngreso) {
        fechaSalida.value = "";
      }
    });
});

// Función para mostrar información adicional al cargar la página
window.addEventListener("load", () => {
  console.log("🏔️ Bienvenido a Cabañas SQL - San Martín de los Andes");
  console.log("🌲 Página cargada correctamente");
  console.log("📧 Para consultas: info@cabanassql.com.ar");
  console.log("📱 WhatsApp: +54 9 2972 123456");
});
