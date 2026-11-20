# MEMORY.md — CSV Cleaner
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- Cimientos creados: archivos vacíos, aún no hay código.
- Modelos: ERNIE escribe código; Ling planifica y revisa (provisional).

## Decisiones (y por qué)
- Duplicados con Set + huella: un archivo de 40.000 registros tardó 152 ms así, frente a 10.090 ms comparando contra todos los anteriores.
- Sin backend: los archivos del usuario nunca salen de su navegador.

## Aprendizajes y errores a evitar
- El resumen final de un agente puede describir un método distinto al de su código: verificar siempre el código.

## Próximos pasos
- Estructura e interfaz, parser, motor de limpieza, exportación, pruebas, GitHub Pages.