# AGENTS.md — CSV Cleaner
Web estática que limpia CSV en el navegador. Sin backend ni envío de archivos.
Prioridad: limpieza correcta e integridad del archivo.

## Stack
- HTML, CSS y JS puros + Papa Parse. Sin build ni frameworks.
- index.html, assets/styles.css, js/app.js, parser.js, cleaner.js, exporter.js

## Reglas del producto
- Duplicados: registros completos, tras trim, se conserva la primera aparición. Usar Set + huella (JSON.stringify). NUNCA comparar contra todos los anteriores.
- Encabezados separados de los registros; nunca se eliminan. Mantener el orden.
- Trim solo en bordes, sin tocar espacios internos.
- Contenido del CSV: nunca innerHTML, usar textContent.
- Exportar como nombre_cleaned.csv sin sobrescribir el original.
- Interfaz en inglés, oscura con acentos azules, mobile-first, 6 estados: inicial, archivo seleccionado, vista previa, procesamiento, resultados, error.

## Fuera de alcance
Pro, pagos, login, base de datos, backend, validar emails, fechas, limpieza por columna.

## Forma de trabajo
- Haz solo lo pedido; cambios pequeños (hay límite de peticiones diarias).
- Al terminar: resume y señala decisiones a revisar. El resumen no sustituye al código: el usuario verifica el código.
- Lee docs/constitution.md y MEMORY.md al empezar.

## Memoria
- Al terminar una tarea, actualiza MEMORY.md: estado actual, decisiones (con su porqué) y errores a evitar.
- Máximo ~50 líneas: resume o elimina lo que ya no aporte.
- Nunca guardes claves, tokens ni datos personales.

## Límites
- Siempre: respetar las reglas del producto; actualizar MEMORY.md al terminar cada tarea.
- Pregunta antes: dependencias nuevas, archivos nuevos, cambios de estructura.
- Nunca: backend, enviar datos a servidores, innerHTML con datos del CSV.

## Verificación
- Probar en el navegador con un CSV de ejemplo; tests con `node --test`.