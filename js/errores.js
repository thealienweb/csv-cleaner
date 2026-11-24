// Solo se activa en tu móvil (localhost), no en producción
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  const errores = [];

  function registrar(texto) {
    errores.push(new Date().toLocaleTimeString() + ' ' + texto);
  }

  window.addEventListener('error', e =>
    registrar(`${e.message} (${e.filename}:${e.lineno})`));
  window.addEventListener('unhandledrejection', e =>
    registrar('Promesa rechazada: ' + e.reason));

  const boton = document.createElement('button');
  boton.textContent = 'Copiar errores';
  boton.style.cssText = 'position:fixed;bottom:8px;right:8px;z-index:9999';
  boton.onclick = () =>
    navigator.clipboard.writeText(errores.join('\n') || 'Sin errores');
  window.addEventListener('DOMContentLoaded', () =>
    document.body.appendChild(boton));
}