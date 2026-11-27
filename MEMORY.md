# MEMORY.md — CSV Cleaner
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- Fase 4 completa: Papa Parse 5.7.1 local, parser.js, vista previa de 5 filas, errores y botón "Try again" en app.js; probado en el móvil con 9 CSV.
- Siguen vacíos: cleaner.js, exporter.js y README.md. state-selected ya no está en el flujo.
- Modelos: ERNIE escribe código; Ling planifica y revisa (provisional).

## Decisiones (y por qué)
- Duplicados con Set + huella: un archivo de 40.000 registros tardó 152 ms así, frente a 10.090 ms comparando contra todos los anteriores.
- Sin backend: los archivos del usuario nunca salen de su navegador.
- Papa Parse local, no CDN: funciona sin internet y sin depender de terceros.
- Límite de 10 MB (constante MAX_FILE_SIZE_MB): leer más exige trocear o usar worker; ampliable en una versión pro.
- Las líneas totalmente vacías se ignoran y el archivo limpio conservará el separador original.
- Al elegir un archivo se pasa directo a la vista previa, sin state-selected.
- Las comillas sin cerrar (MissingQuotes) bloquean el archivo: limpiar datos mal leídos rompería la integridad.

## Aprendizajes y errores a evitar
- El resumen final de un agente puede describir un método distinto al de su código: verificar siempre el código.
- Ejecutar node --check tras cada edición de Pi: detectó un "(" sobrante que rompía app.js.
- Sin la opción header, Papa Parse no avisa de filas con distinto número de columnas.
- Entrar en ~/projects/csv-cleaner antes de descargar o crear archivos.

## Próximos pasos
- Fase 5: instalar SDD y redactar specs/001 del motor de limpieza.
- Después: exportación, integración (quitar el hash temporal y conectar botones) y GitHub Pages.
- Por decidir: codificación no UTF-8, BOM al exportar para Excel y botones de la vista previa.
- Investigación sin aprobar: notas/plan-motor-limpieza.md.