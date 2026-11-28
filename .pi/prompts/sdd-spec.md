---
description: SDD · Entrevista y genera la spec (uso - /sdd-spec 001-nombre idea inicial)
argument-hint: <NNN-nombre> <idea inicial>
---
NO escribas código en ningún momento. Solo puedes crear o editar archivos dentro de specs/$1/. Usa la skill sdd. Lee docs/constitution.md y MEMORY.md. Si existe notas/problemas-csv.md, léelo: son notas de investigación, NO son requisitos.

Carpeta de la spec: specs/$1/
Argumentos completos: $ARGUMENTS (la primera palabra es el nombre de la carpeta; el resto es la idea inicial).

Tu trabajo:
1. Hazme preguntas de UNA en UNA para eliminar ambigüedades (casos límite, errores, qué queda fuera). Máximo 5 preguntas. Espera mi respuesta antes de la siguiente.
2. Con mis respuestas, genera specs/$1/spec.md siguiendo la plantilla de la skill sdd, con requisitos en EARS y "Estado: borrador".
3. Solo el QUÉ y el POR QUÉ: nada de stack, arquitectura ni nombres de archivos.
4. No inventes requisitos: lo que no esté decidido va en "Dudas abiertas".
5. Al terminar, resume en 5 líneas como máximo y PARA. No avances a otra fase.
