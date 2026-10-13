# Gestor de tareas

Aplicación creada con HTML, CSS y JavaScript.

## Cómo ejecutarla

Abre la carpeta en VSCode y ejecuta index.html con Live Server.

## Funciones

- Añadir, editar, completar y eliminar tareas.
- Conservar las tareas al recargar mediante localStorage.
- Usar los controles con teclado.
- Ajustar la interfaz a ventanas estrechas.
- Detectar errores de lectura y guardado.
- Impedir el guardado cuando los datos existentes no pueden leerse.

## Almacenamiento

Las tareas se guardan en este navegador y en el mismo origen
(dirección y puerto). No se sincronizan entre dispositivos.
Borrar los datos del sitio elimina las tareas guardadas.

## Comprobaciones realizadas

Se verificaron las operaciones principales, la persistencia,
la cancelación, los títulos vacíos, la navegación con teclado
y el comportamiento ante fallos de almacenamiento.
