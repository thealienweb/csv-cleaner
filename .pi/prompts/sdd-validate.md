---
description: SDD · Valida la spec RF por RF (solo revisa, no arregla)
argument-hint: <NNN-nombre>
---
Valida specs/$1/ SIN modificar ningún archivo. Usa la skill sdd. Solo puedes ejecutar node --test, git diff y git status.

1. Lee spec.md, plan.md y tasks.md, y los cambios (git diff).
2. Ejecuta node --test.
3. Recorre spec.md requisito por requisito: indica qué test cubre cada RF y su resultado.
4. Los RF de interfaz que no se puedan probar con node --test NO los des por verificados: lístalos en "Verificación manual pendiente" con los pasos exactos para probarlos en el navegador del móvil.
5. Comprueba los criterios de finalización y docs/constitution.md.

Empieza siempre con una de estas dos líneas (el veredicto solo cubre lo verificado):
- VEREDICTO: APROBADO
- VEREDICTO: CAMBIOS NECESARIOS

Si hay cambios necesarios, lista numerada: archivo:línea, qué incumple (tarea, RF o principio) y qué se espera. Las sugerencias que no incumplen la spec van aparte, en "Opcional". NO arregles nada.
