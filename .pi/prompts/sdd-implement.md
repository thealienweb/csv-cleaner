---
description: SDD · Implementa UNA tarea, tests primero (uso - /sdd-implement 001-nombre T3)
argument-hint: <NNN-nombre> <Tn>
---
Implementa SOLO la tarea $2 de specs/$1/tasks.md, siguiendo specs/$1/plan.md, docs/constitution.md, AGENTS.md y la skill sdd. NO leas js/vendor/papaparse.min.js (es minificado y gasta peticiones).

1. Escribe primero los tests y comprueba que fallan.
2. Escribe el código hasta que pasen.
3. Ejecuta node --test y muéstrame el resultado.
4. Ejecuta node --check en cada archivo JS que hayas editado.
5. Marca $2 como hecha en tasks.md e indica qué RF cubre.
6. Si es la última tarea de la spec, actualiza MEMORY.md.

Reglas:
- Los archivos nuevos que el plan lista están autorizados; para cualquier otro archivo nuevo, pregunta antes.
- Si la tarea o el plan son incorrectos o imposibles, PARA y explícalo. No improvises otra solución.
- Después PARA. No empieces la siguiente tarea.

Responde con: tarea completada y RF que cubre, archivos modificados, resultado de node --test y decisiones que el plan no cubría.
