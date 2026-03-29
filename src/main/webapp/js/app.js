// ============================================================
// DATOS EN MEMORIA (simulan la base de datos)
// ============================================================
let mascotas     = JSON.parse(localStorage.getItem("mascotas"))     || [];
let propietarios = JSON.parse(localStorage.getItem("propietarios")) || [];
let veterinarios = JSON.parse(localStorage.getItem("veterinarios")) || [];

// Índices para edición (-1 = ninguno en edición)
let editandoMascota     = -1;
let editandoPropietario = -1;
let editandoVeterinario = -1;

// ============================================================
// SESIÓN
// ============================================================

/**
 * Verifica si hay sesión activa al cargar el dashboard.
 * Si no hay sesión redirige al login.
 */
function verificarSesion() {
    const sesion = localStorage.getItem("sesion");
    if (!sesion) {
        window.location.href = "index.html";
        return;
    }
    const datos = JSON.parse(sesion);
    document.getElementById("nombreUsuario").textContent = "👤 " + datos.usuario;
}

/**
 * Cierra la sesión del usuario y redirige al login.
 */
function cerrarSesion() {
    if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
        localStorage.removeItem("sesion");
        window.location.href = "index.html";
    }
}

// ============================================================
// NAVEGACIÓN DINÁMICA
// ============================================================

/**
 * Carga una vista en el área de contenido dinámico.
 * @param {string} vista - nombre de la vista a cargar
 * @param {HTMLElement} btn - botón del menú clickeado
 */
function cargarVista(vista, btn) {
    // Ocultar bienvenida y todas las vistas
    document.getElementById("bienvenida").style.display = "none";
    document.querySelectorAll(".vista").forEach(v => v.style.display = "none");

    // Mostrar vista seleccionada
    document.getElementById("vista-" + vista).style.display = "block";

    // Marcar botón activo en el menú
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Renderizar tabla correspondiente
    if (vista === "mascotas")     renderMascotas();
    if (vista === "propietarios") renderPropietarios();
    if (vista === "veterinarios") renderVeterinarios();
}

// ============================================================
// UTILIDADES
// ============================================================

/**
 * Muestra un mensaje de error en un elemento.
 * @param {string} id - id del elemento de error
 * @param {string} msg - mensaje a mostrar
 */
function mostrarError(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.style.display = "block";
}

/**
 * Oculta el mensaje de error de un elemento.
 * @param {string} id - id del elemento de error
 */
function ocultarError(id) {
    const el = document.getElementById(id);
    el.textContent = "";
    el.style.display = "none";
}

/**
 * Guarda un array en localStorage.
 * @param {string} key - clave en localStorage
 * @param {Array} data - datos a guardar
 */
function guardarEnStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ============================================================
// CRUD MASCOTAS
// ============================================================

/**
 * Guarda o actualiza una mascota según si se está editando o creando.
 */
function guardarMascota() {
    const nombre      = document.getElementById("mascota-nombre").value.trim();
    const edad        = document.getElementById("mascota-edad").value.trim();
    const tipo        = document.getElementById("mascota-tipo").value;
    const propietario = document.getElementById("mascota-propietario").value.trim();

    // Validar campos
    if (!nombre || !edad || !tipo || !propietario) {
        mostrarError("error-mascota", "Todos los campos son obligatorios.");
        return;
    }

    ocultarError("error-mascota");

    const mascota = { nombre, edad: parseInt(edad), tipo, propietario };

    if (editandoMascota === -1) {
        // Crear nueva
        mascotas.push(mascota);
    } else {
        // Actualizar existente
        mascotas[editandoMascota] = mascota;
        editandoMascota = -1;
        document.getElementById("titulo-form-mascota").textContent = "Nueva Mascota";
    }

    guardarEnStorage("mascotas", mascotas);
    limpiarFormMascota();
    renderMascotas();
}

/**
 * Carga los datos de una mascota en el formulario para editar.
 * @param {number} index - índice de la mascota en el array
 */
function editarMascota(index) {
    const m = mascotas[index];
    document.getElementById("mascota-nombre").value      = m.nombre;
    document.getElementById("mascota-edad").value        = m.edad;
    document.getElementById("mascota-tipo").value        = m.tipo;
    document.getElementById("mascota-propietario").value = m.propietario;
    document.getElementById("titulo-form-mascota").textContent = "Editar Mascota";
    editandoMascota = index;
}

/**
 * Elimina una mascota del array por su índice.
 * @param {number} index - índice de la mascota en el array
 */
function eliminarMascota(index) {
    if (confirm("¿Estás seguro que deseas eliminar esta mascota?")) {
        mascotas.splice(index, 1);
        guardarEnStorage("mascotas", mascotas);
        renderMascotas();
    }
}

/**
 * Cancela la edición y limpia el formulario de mascotas.
 */
function cancelarEdicionMascota() {
    editandoMascota = -1;
    document.getElementById("titulo-form-mascota").textContent = "Nueva Mascota";
    limpiarFormMascota();
    ocultarError("error-mascota");
}

/**
 * Limpia los campos del formulario de mascotas.
 */
function limpiarFormMascota() {
    document.getElementById("mascota-nombre").value      = "";
    document.getElementById("mascota-edad").value        = "";
    document.getElementById("mascota-tipo").value        = "";
    document.getElementById("mascota-propietario").value = "";
}

/**
 * Renderiza la tabla de mascotas usando el template HTML.
 */
function renderMascotas() {
    const tbody    = document.getElementById("tabla-mascotas");
    const template = document.getElementById("fila-mascota");
    tbody.innerHTML = "";

    if (mascotas.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5' style='text-align:center;color:#888;'>No hay mascotas registradas</td></tr>";
        return;
    }

    mascotas.forEach((m, index) => {
        const fila = template.content.cloneNode(true);
        fila.querySelector(".col-nombre").textContent      = m.nombre;
        fila.querySelector(".col-edad").textContent        = m.edad + " año(s)";
        fila.querySelector(".col-tipo").textContent        = m.tipo;
        fila.querySelector(".col-propietario").textContent = m.propietario;

        fila.querySelector(".btn-editar").addEventListener("click", () => editarMascota(index));
        fila.querySelector(".btn-eliminar").addEventListener("click", () => eliminarMascota(index));

        tbody.appendChild(fila);
    });
}

// ============================================================
// CRUD PROPIETARIOS
// ============================================================

/**
 * Guarda o actualiza un propietario.
 */
function guardarPropietario() {
    const nombre    = document.getElementById("propietario-nombre").value.trim();
    const telefono  = document.getElementById("propietario-telefono").value.trim();
    const direccion = document.getElementById("propietario-direccion").value.trim();

    if (!nombre || !telefono || !direccion) {
        mostrarError("error-propietario", "Todos los campos son obligatorios.");
        return;
    }

    ocultarError("error-propietario");

    const propietario = { nombre, telefono, direccion };

    if (editandoPropietario === -1) {
        propietarios.push(propietario);
    } else {
        propietarios[editandoPropietario] = propietario;
        editandoPropietario = -1;
        document.getElementById("titulo-form-propietario").textContent = "Nuevo Propietario";
    }

    guardarEnStorage("propietarios", propietarios);
    limpiarFormPropietario();
    renderPropietarios();
}

/**
 * Carga los datos de un propietario en el formulario para editar.
 * @param {number} index - índice del propietario en el array
 */
function editarPropietario(index) {
    const p = propietarios[index];
    document.getElementById("propietario-nombre").value    = p.nombre;
    document.getElementById("propietario-telefono").value  = p.telefono;
    document.getElementById("propietario-direccion").value = p.direccion;
    document.getElementById("titulo-form-propietario").textContent = "Editar Propietario";
    editandoPropietario = index;
}

/**
 * Elimina un propietario del array por su índice.
 * @param {number} index - índice del propietario en el array
 */
function eliminarPropietario(index) {
    if (confirm("¿Estás seguro que deseas eliminar este propietario?")) {
        propietarios.splice(index, 1);
        guardarEnStorage("propietarios", propietarios);
        renderPropietarios();
    }
}

/**
 * Cancela la edición y limpia el formulario de propietarios.
 */
function cancelarEdicionPropietario() {
    editandoPropietario = -1;
    document.getElementById("titulo-form-propietario").textContent = "Nuevo Propietario";
    limpiarFormPropietario();
    ocultarError("error-propietario");
}

/**
 * Limpia los campos del formulario de propietarios.
 */
function limpiarFormPropietario() {
    document.getElementById("propietario-nombre").value    = "";
    document.getElementById("propietario-telefono").value  = "";
    document.getElementById("propietario-direccion").value = "";
}

/**
 * Renderiza la tabla de propietarios usando el template HTML.
 */
function renderPropietarios() {
    const tbody    = document.getElementById("tabla-propietarios");
    const template = document.getElementById("fila-propietario");
    tbody.innerHTML = "";

    if (propietarios.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4' style='text-align:center;color:#888;'>No hay propietarios registrados</td></tr>";
        return;
    }

    propietarios.forEach((p, index) => {
        const fila = template.content.cloneNode(true);
        fila.querySelector(".col-nombre").textContent    = p.nombre;
        fila.querySelector(".col-telefono").textContent  = p.telefono;
        fila.querySelector(".col-direccion").textContent = p.direccion;

        fila.querySelector(".btn-editar").addEventListener("click", () => editarPropietario(index));
        fila.querySelector(".btn-eliminar").addEventListener("click", () => eliminarPropietario(index));

        tbody.appendChild(fila);
    });
}

// ============================================================
// CRUD VETERINARIOS
// ============================================================

/**
 * Guarda o actualiza un veterinario.
 */
function guardarVeterinario() {
    const nombre       = document.getElementById("veterinario-nombre").value.trim();
    const especialidad = document.getElementById("veterinario-especialidad").value.trim();
    const contacto     = document.getElementById("veterinario-contacto").value.trim();

    if (!nombre || !especialidad || !contacto) {
        mostrarError("error-veterinario", "Todos los campos son obligatorios.");
        return;
    }

    ocultarError("error-veterinario");

    const veterinario = { nombre, especialidad, contacto };

    if (editandoVeterinario === -1) {
        veterinarios.push(veterinario);
    } else {
        veterinarios[editandoVeterinario] = veterinario;
        editandoVeterinario = -1;
        document.getElementById("titulo-form-veterinario").textContent = "Nuevo Veterinario";
    }

    guardarEnStorage("veterinarios", veterinarios);
    limpiarFormVeterinario();
    renderVeterinarios();
}

/**
 * Carga los datos de un veterinario en el formulario para editar.
 * @param {number} index - índice del veterinario en el array
 */
function editarVeterinario(index) {
    const v = veterinarios[index];
    document.getElementById("veterinario-nombre").value       = v.nombre;
    document.getElementById("veterinario-especialidad").value = v.especialidad;
    document.getElementById("veterinario-contacto").value     = v.contacto;
    document.getElementById("titulo-form-veterinario").textContent = "Editar Veterinario";
    editandoVeterinario = index;
}

/**
 * Elimina un veterinario del array por su índice.
 * @param {number} index - índice del veterinario en el array
 */
function eliminarVeterinario(index) {
    if (confirm("¿Estás seguro que deseas eliminar este veterinario?")) {
        veterinarios.splice(index, 1);
        guardarEnStorage("veterinarios", veterinarios);
        renderVeterinarios();
    }
}

/**
 * Cancela la edición y limpia el formulario de veterinarios.
 */
function cancelarEdicionVeterinario() {
    editandoVeterinario = -1;
    document.getElementById("titulo-form-veterinario").textContent = "Nuevo Veterinario";
    limpiarFormVeterinario();
    ocultarError("error-veterinario");
}

/**
 * Limpia los campos del formulario de veterinarios.
 */
function limpiarFormVeterinario() {
    document.getElementById("veterinario-nombre").value       = "";
    document.getElementById("veterinario-especialidad").value = "";
    document.getElementById("veterinario-contacto").value     = "";
}

/**
 * Renderiza la tabla de veterinarios usando el template HTML.
 */
function renderVeterinarios() {
    const tbody    = document.getElementById("tabla-veterinarios");
    const template = document.getElementById("fila-veterinario");
    tbody.innerHTML = "";

    if (veterinarios.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4' style='text-align:center;color:#888;'>No hay veterinarios registrados</td></tr>";
        return;
    }

    veterinarios.forEach((v, index) => {
        const fila = template.content.cloneNode(true);
        fila.querySelector(".col-nombre").textContent       = v.nombre;
        fila.querySelector(".col-especialidad").textContent = v.especialidad;
        fila.querySelector(".col-contacto").textContent     = v.contacto;

        fila.querySelector(".btn-editar").addEventListener("click", () => editarVeterinario(index));
        fila.querySelector(".btn-eliminar").addEventListener("click", () => eliminarVeterinario(index));

        tbody.appendChild(fila);
    });
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
verificarSesion();


