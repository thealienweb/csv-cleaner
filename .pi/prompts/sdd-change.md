---
description: SDD · Nuevo requisito: primero la spec, luego el código (uso: /sdd-change 001-nombre requisito)
argument-hint: <NNN-nombre> <requisito nuevo>
---
Nuevo requisito para la spec specs/$1/. Argumentos completos: $ARGUMENTS (la primera palabra es el nombre de la carpeta; el resto es el requisito).

NO toques código. Solo puedes editar specs/$1/spec.md. Usa la skill sdd.

1. Actualiza spec.md: nuevo RF (o cambio de uno existente) en EARS, sus casos límite y lo que queda fuera de alcance.
2. Indica qué partes de plan.md y tasks.md habría que cambiar después, sin modificarlos.
3. Muéstrame el diff de la spec y espera mi aprobación.
