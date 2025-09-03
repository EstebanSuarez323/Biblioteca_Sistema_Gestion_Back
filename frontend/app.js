// frontend/app.js
// Manejo del UI + consumo del API

// ¡IMPORTANTE! Backend explícito, nada de /api relativo:
const API = 'http://localhost:3000/api';

// Helper para fetch que devuelve JSON o lanza error legible
async function fetchJSON(url, opts) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}

// ---------- Render helpers ----------
function formatDate(d) {
  if (!d) return '';
  // Evito problemas de zona horaria; me quedo con YYYY-MM-DD si viene con tiempo
  return String(d).slice(0, 10);
}

// ---------- Libros ----------
async function cargarLibros(q = '') {
  const tbody = document.getElementById('librosTabla');
  if (!tbody) return;
  tbody.innerHTML = '';

  const url = q ? `${API}/libros?q=${encodeURIComponent(q)}` : `${API}/libros`;
  const data = await fetchJSON(url);

  for (const l of data) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${l.ID_Libro}</td>
      <td>${l.Titulo}</td>
      <td>${l.Categoria ?? ''}</td>
      <td>${(l.Anio_Publicacion ?? l['Año_Publicacion'] ?? l['Año'] ?? '')}</td>
      <td>${l.ISBN ?? ''}</td>
    `;
    tbody.appendChild(tr);
  }
}

// ---------- Ejemplares disponibles ----------
async function cargarEjemplaresDisponibles() {
  const tbody = document.getElementById('ejemplaresTabla');
  const sel = document.getElementById('ejemplarSelect');
  if (tbody) tbody.innerHTML = '';
  if (sel) sel.innerHTML = '';

  const data = await fetchJSON(`${API}/ejemplares/disponibles`);

  for (const e of data) {
    if (tbody) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${e.ID_Ejemplar}</td><td>${e.Titulo}</td>`;
      tbody.appendChild(tr);
    }
    if (sel) {
      const opt = document.createElement('option');
      opt.value = e.ID_Ejemplar;
      opt.textContent = `${e.ID_Ejemplar} · ${e.Titulo}`;
      sel.appendChild(opt);
    }
  }
}

// ---------- Préstamos ----------
async function cargarPrestamos() {
  const tbody = document.getElementById('prestamosTabla');
  if (!tbody) return;
  tbody.innerHTML = '';

  const data = await fetchJSON(`${API}/prestamos`);

  for (const p of data) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.ID_Prestamo}</td>
      <td>${p.Usuario} ${p.TipoUsuario ? `(${p.TipoUsuario})` : ''}</td>
      <td>${p.Libro}</td>
      <td>${formatDate(p.Fecha_Prestamo)}</td>
      <td>${formatDate(p.F_Devolucion_Prevista)}</td>
      <td>${formatDate(p.F_Devolucion_Real)}</td>
      <td>${!p.F_Devolucion_Real ? `<button class="devolver" data-id="${p.ID_Prestamo}">Devolver</button>` : ''}</td>
    `;
    tbody.appendChild(tr);
  }

  // Delegación para botones "Devolver"
  tbody.querySelectorAll('button.devolver').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      await fetchJSON(`${API}/prestamos/${id}/devolver`, { method: 'PUT', body: JSON.stringify({}) });
      await Promise.all([cargarPrestamos(), cargarEjemplaresDisponibles()]);
    });
  });
}

// ---------- Usuarios ----------
let usuariosCache = [];

async function cargarUsuarios() {
  const data = await fetchJSON(`${API}/usuarios`);
  usuariosCache = data;

  // Llena el select de la sección "Crear nuevo préstamo"
  const sel = document.getElementById('usuarioSelect');
  if (sel) {
    sel.innerHTML = '';
    for (const u of usuariosCache) {
      const opt = document.createElement('option');
      opt.value = u.ID_Usuario;
      opt.textContent = `${u.ID_Usuario} · ${u.Nombre}${u.Tipo ? ` (${u.Tipo})` : ''}`;
      sel.appendChild(opt);
    }
  }
}

// Filtro en vivo del select según lo que se escriba en el buscador
function filtrarUsuariosEnSelect(texto) {
  const sel = document.getElementById('usuarioSelect');
  if (!sel) return;

  const filtro = texto.trim().toLowerCase();
  sel.innerHTML = '';

  const lista = filtro
    ? usuariosCache.filter(u => (u.Nombre || '').toLowerCase().includes(filtro))
    : usuariosCache;

  for (const u of lista) {
    const opt = document.createElement('option');
    opt.value = u.ID_Usuario;
    opt.textContent = `${u.ID_Usuario} · ${u.Nombre}${u.Tipo ? ` (${u.Tipo})` : ''}`;
    sel.appendChild(opt);
  }
}

// ---------- Eventos UI ----------
function wireEvents() {
  const buscarInput = document.getElementById('buscarInput');
  const buscarBtn = document.getElementById('buscarBtn');

  if (buscarBtn && buscarInput) {
    buscarBtn.addEventListener('click', async () => {
      await cargarLibros(buscarInput.value || '');
    });
    buscarInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        await cargarLibros(buscarInput.value || '');
      }
    });
  }

  const usuarioBuscar = document.getElementById('usuarioBuscar');
  if (usuarioBuscar) {
    usuarioBuscar.addEventListener('input', (e) => {
      filtrarUsuariosEnSelect(e.target.value);
    });
  }

  const agregarUsuarioBtn = document.getElementById('agregarUsuarioBtn');
  if (agregarUsuarioBtn) {
    agregarUsuarioBtn.addEventListener('click', async () => {
      const Tipo = document.getElementById('tipoUsuario')?.value || '';
      const Nombre = (document.getElementById('nombreUsuario')?.value || '').trim();

      if (!Tipo || !Nombre) {
        alert('Debes seleccionar un tipo y escribir el nombre');
        return;
      }

      await fetchJSON(`${API}/usuarios`, {
        method: 'POST',
        body: JSON.stringify({ Tipo, Nombre })
      });

      // Limpiar y recargar
      document.getElementById('tipoUsuario').value = '';
      document.getElementById('nombreUsuario').value = '';
      await cargarUsuarios();
    });
  }

  const crearPrestamoBtn = document.getElementById('crearPrestamoBtn');
  if (crearPrestamoBtn) {
    crearPrestamoBtn.addEventListener('click', async () => {
      const ID_Usuario = Number(document.getElementById('usuarioSelect')?.value || 0);
      const ID_Ejemplar = Number(document.getElementById('ejemplarSelect')?.value || 0);
      const Fecha_Prestamo = document.getElementById('fechaPrestamo')?.value || '';
      const F_Devolucion_Prevista = document.getElementById('fechaPrevista')?.value || '';

      if (!ID_Usuario || !ID_Ejemplar || !Fecha_Prestamo || !F_Devolucion_Prevista) {
        alert('Completa usuario, ejemplar y fechas');
        return;
      }

      await fetchJSON(`${API}/prestamos`, {
        method: 'POST',
        body: JSON.stringify({ ID_Usuario, ID_Ejemplar, Fecha_Prestamo, F_Devolucion_Prevista })
      });

      // Refrescar vistas
      await Promise.all([cargarPrestamos(), cargarEjemplaresDisponibles()]);
    });
  }
}

// ---------- Init ----------
async function init() {
  try {
    wireEvents();
    await Promise.all([
      cargarLibros(''),
      cargarUsuarios(),
      cargarEjemplaresDisponibles(),
      cargarPrestamos(),
    ]);
  } catch (err) {
    console.error('Error de inicio:', err);
    alert('No pude cargar datos del backend. Verifica que el servidor en http://localhost:3000 esté encendido.');
  }
}

document.addEventListener('DOMContentLoaded', init);
