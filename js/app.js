const KEY = 'opticaUsuarios';
const $ = (selector) => document.querySelector(selector);

const reglas = {
  nombre: [/^[A-Za-zÀ-ÿÑñ\s]{3,60}$/, 'Usa solo letras y mínimo 3 caracteres.'],
  email: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Ingresa un correo válido.'],
  telefono: [/^\d{7,10}$/, 'Usa solo números, entre 7 y 10 dígitos.'],
  ciudad: [/^[A-Za-zÀ-ÿÑñ\s]{2,40}$/, 'Usa solo letras y mínimo 2 caracteres.'],
  contrasena: [/^(?=.*[A-ZÀ-ÝÑ])(?=.*\d).{8,}$/, 'Mínimo 8 caracteres, una mayúscula y un número.']
};

const usuarios = () => JSON.parse(localStorage.getItem(KEY) || '[]');
const limpiar = (texto) => texto.trim().replace(/\s+/g, ' ');

function error(campo, mensaje = '') {
  const input = $('#' + campo);
  const caja = $('#error-' + campo);
  if (!input || !caja) return;
  input.classList.toggle('is-invalid', Boolean(mensaje));
  caja.textContent = mensaje;
}

function registrar() {
  const datos = {};
  let valido = true;

  Object.keys(reglas).forEach((campo) => {
    datos[campo] = campo === 'contrasena' ? $('#' + campo).value : limpiar($('#' + campo).value);
    const [regex, mensaje] = reglas[campo];
    const falla = !regex.test(datos[campo]);
    error(campo, falla ? mensaje : '');
    valido = valido && !falla;
  });

  datos.email = datos.email.toLowerCase();
  if (valido && usuarios().some((u) => u.email === datos.email)) {
    error('email', 'Este correo ya fue registrado.');
    valido = false;
  }
  if (!valido) return;

  const lista = usuarios();
  lista.push({
    id: Date.now(),
    nombre: datos.nombre,
    email: datos.email,
    telefono: datos.telefono,
    ciudad: datos.ciudad
  });

  localStorage.setItem(KEY, JSON.stringify(lista));
  bootstrap.Modal.getInstance($('#registroModal'))?.hide();
  window.location.href = 'usuarios.html';
}

function cargarTabla() {
  const tbody = $('#usuariosTable tbody');
  if (!tbody) return;

  const lista = usuarios();
  $('#noUsers').style.display = lista.length ? 'none' : 'grid';
  $('#tableWrapper').style.display = lista.length ? 'block' : 'none';

  tbody.innerHTML = '';
  lista.forEach((u, i) => {
    const fila = document.createElement('tr');
    [i + 1, u.nombre, u.email, u.telefono, u.ciudad].forEach((dato) => {
      const celda = document.createElement('td');
      celda.textContent = dato;
      fila.appendChild(celda);
    });
    tbody.appendChild(fila);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  $('#registroForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    registrar();
  });

  $('#verColeccionBtn')?.addEventListener('click', () => $('#coleccion').scrollIntoView({ behavior: 'smooth' }));
  $('#btnVolver')?.addEventListener('click', () => window.location.href = 'index.html');
  $('#volverInicio')?.addEventListener('click', () => window.location.href = 'index.html');

  document.querySelectorAll('[data-route]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = link.dataset.route;
    });
  });

  cargarTabla();
});
