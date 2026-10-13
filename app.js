const listaTareas = document.getElementById("listaTareas");
const botonNuevaTarea = document.getElementById("nuevaTarea");
const inputTarea = document.getElementById("inputTarea");
let lecturaCorrecta = true;

// Obtener tareas desde LocalStorage
function obtenerTareasGuardadas() {
    try {
        const tareas = JSON.parse(localStorage.getItem("tareas"));

        if (tareas === null) {
            lecturaCorrecta = true;
            return [];
        }

        const sonValidas =
            Array.isArray(tareas) &&
            tareas.every(tarea =>
                tarea !== null &&
                typeof tarea === "object" &&
                typeof tarea.title === "string" &&
                typeof tarea.completed === "boolean"
            );

        if (!sonValidas) {
            throw new Error("El formato de las tareas no es válido.");
        }
        lecturaCorrecta = true;
        return tareas;
    } catch (error) {
        lecturaCorrecta = false;
        console.warn("No se pudieron leer las tareas guardadas:", error);
        return [];
    }
}

// Guardar tareas en LocalStorage
function guardarTareas(tareas) {
    if (!lecturaCorrecta) {
    alert(
        "No se pudo leer la lista guardada. " +
        "No se guardarán cambios para evitar sobrescribir tus datos."
    );
    return false;
}
    try {
        localStorage.setItem("tareas", JSON.stringify(tareas));
        return true;
    } catch (error) {
        console.error("No se pudieron guardar las tareas:", error);
        alert(
            "No se pudo guardar el cambio. " +
            "Comprueba que el navegador permita almacenar datos."
        );
        return false;
    }
}

// Mostrar tareas en pantalla
function mostrarTareas(tareas) {
    listaTareas.innerHTML = "";
    document.getElementById("mensajeVacio").hidden = tareas.length > 0;
    tareas.forEach((tarea, index) => {
        const li = document.createElement("li");
        const titulo = document.createElement("span");
        titulo.className = "titulo-tarea";
        titulo.textContent = tarea.title;
        li.appendChild(titulo);
        if (tarea.completed) {
            li.classList.add("completed");
        }

// Casilla para alternar el estado completado
const casilla = document.createElement("input");
casilla.type = "checkbox";
casilla.checked = tarea.completed;
casilla.setAttribute(
    "aria-label",
    `Marcar como completada: ${tarea.title}`
);

casilla.addEventListener("change", () => {
    const tareasActualizadas = tareas.map((actual, posicion) =>
    posicion === index
        ? { ...actual, completed: casilla.checked }
        : actual
);

if (!guardarTareas(tareasActualizadas)) {
    casilla.checked = tarea.completed;
    return;
}

mostrarTareas(tareasActualizadas);

    // Recuperar el foco después de reconstruir la lista
    listaTareas.children[index]
        .querySelector('input[type="checkbox"]')
        .focus();
});

li.prepend(casilla);

        // Botón de eliminar tarea
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.setAttribute("aria-label", `Eliminar tarea: ${tarea.title}`);
        btnEliminar.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que el evento de li se dispare
            if (confirm("¿Estás seguro de eliminar esta tarea?")) {
                const tareasActualizadas = tareas.filter(
    (_, posicion) => posicion !== index
);

if (!guardarTareas(tareasActualizadas)) {
    return;
}

mostrarTareas(tareasActualizadas);
                if (listaTareas.children.length > 0) {
    const siguienteIndice = Math.min(
        index,
        listaTareas.children.length - 1
    );

    listaTareas.children[siguienteIndice]
        .querySelector('input[type="checkbox"]')
        .focus();
} else {
    inputTarea.focus();
}
            }
        });

        // Botón de editar tarea
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "✏️";
        btnEditar.setAttribute("aria-label", `Editar tarea: ${tarea.title}`);
        btnEditar.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que el evento de li se dispare
            const nuevoTitulo = prompt("Editar tarea:", tarea.title);
            if (nuevoTitulo !== null && nuevoTitulo.trim() !== "") {
                const tareasActualizadas = tareas.map((actual, posicion) =>
    posicion === index
        ? { ...actual, title: nuevoTitulo.trim() }
        : actual
);

if (!guardarTareas(tareasActualizadas)) {
    return;
}

mostrarTareas(tareasActualizadas);
                listaTareas.children[index]
                    .querySelector("button")
                    .focus();
            }
        });

        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
        listaTareas.appendChild(li);
    });
}

// Agregar nueva tarea
function agregarNuevaTarea() {
    const tareas = obtenerTareasGuardadas();
    const tituloTarea = inputTarea.value.trim();

    if (tituloTarea === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    const nuevaTarea = { title: tituloTarea, completed: false };
    tareas.push(nuevaTarea);

if (!guardarTareas(tareas)) {
    return;
}

mostrarTareas(tareas);
    inputTarea.focus(); 
    inputTarea.value = ""; // Limpiar el campo de entrada
}

// Evento para añadir nueva tarea
botonNuevaTarea.addEventListener("click", agregarNuevaTarea);

// Permitir agregar tarea con la tecla Enter
inputTarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        agregarNuevaTarea();
    }
});

// Cargar tareas al inicio
document.addEventListener("DOMContentLoaded", () => {
    mostrarTareas(obtenerTareasGuardadas());
});