#!/bin/bash
# Uso: ./guardar.sh "qué cambiaste"
if [ -z "$1" ]; then
  echo "Falta el mensaje. Ejemplo: ./guardar.sh \"añadí pantalla de resultados\""
  exit 1
fi
git add -A
git commit -m "$1" || { echo "No hay cambios que guardar."; exit 1; }
git push && echo "Guardado y subido a GitHub." || echo "Guardado en el móvil, pero no se pudo subir. Revisa tu conexión y ejecuta: git push"
