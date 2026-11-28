# Problemas de CSV y soluciones

Estado: borrador. Estas notas NO son requisitos: se deciden en specs/001.
Etiquetas: [comprobado] lo vimos en el proyecto · [documentado] sale de la
documentación de Papa Parse · [inferido] razonado, falta verificar.

## 1. Mojibake (el archivo ya trae "CafÃ©")
- Síntoma: acentos y eñes aparecen como Ã©, Ã±.
- Causa: [inferido] alguien guardó el archivo mal: texto UTF-8 leído como
  Windows-1252 y vuelto a guardar. El daño ya está dentro del archivo.
- Hoy: no se detecta; se muestra tal cual.
- Decisión: POR DECIDIR (¿avisar o reparar? reparar choca con "integridad").
- Prueba: test-mojibake.csv con "CafÃ©".

## 2. Windows-1252 se ve como �
- Síntoma: acentos sustituidos por �.
- Causa: [inferido] el archivo no es UTF-8 (Excel antiguo) y hoy el parser
  lo lee como UTF-8. Los bytes inválidos se pierden al leer, así que
  detectarlo exige mirar los bytes ANTES de interpretar el texto.
- Hoy: [comprobado] el parser fuerza UTF-8.
- Decisión: POR DECIDIR (detectar y leer bien, o solo avisar).
- Prueba: test-cp1252.csv guardado en Windows-1252.

## 3. Todo en una sola columna (separador distinto)
- Síntoma: una única columna enorme.
- Causa: el separador real (; o tabulador) no es el esperado.
- Hoy: [comprobado] Papa Parse autodetecta; ; funciona. Si no puede, usa
  coma y avisa (UndetectableDelimiter, no bloquea).
- Decisión: cubierto; falta probar tabulador.
- Prueba: test-2-puntoycoma.csv (existe) y test-tabulador.csv (nuevo).

## 4. Comillas sin cerrar
- Síntoma: el archivo no se importa; el resto se "traga" en un campo.
- Hoy: [comprobado] se BLOQUEA con MissingQuotes.
- Decisión: POR DECIDIR (mantener bloqueo + explicar el error, o intentar
  reparar; reparar datos puede alterar contenido).
- Prueba: test-6-comillas.csv (existe).

## 5. Filas con distinto número de columnas
- Hoy: [comprobado] no avisa; se muestran tal cual.
- Decisión: POR DECIDIR (sugerido: preservar sin rellenar ni recortar).
- Prueba: test-8-columnas.csv (existe).

## 6. BOM y Excel
- Síntoma: Excel muestra mal los acentos al abrir un UTF-8 sin BOM.
- Hoy: [comprobado] el BOM de entrada se quita del primer encabezado.
- Decisión: POR DECIDIR (¿el archivo limpio lleva BOM?).
- Prueba: test-7-bom.csv (existe).

## 7. Saltos de línea CRLF
- Síntoma: ninguno visible, pero el exportador debe elegir.
- Causa: [inferido] Papa Parse detecta el salto al leer; al exportar,
  Papa.unparse usa \r\n por defecto. Verificar.
- Decisión: POR DECIDIR (¿conservar el del original?).
- Prueba: test-crlf.csv (nuevo).

## Pendiente de verificar con Perplexity (fuentes oficiales)
- Detectar codificación con TextDecoder (fatal: true) en Brave/Android.
- Si Excel actual necesita BOM para UTF-8.
- Valor por defecto de newline en Papa.unparse.

## Fuera del MVP
- Informe de reparaciones y evaluación de venta (Pro y pagos están fuera
  de alcance).