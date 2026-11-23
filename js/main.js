  var anuncio = document.getElementById('anuncio');
  function anunciar(texto) { anuncio.textContent = ''; setTimeout(function () { anuncio.textContent = texto; }, 50); }

  /* Cookies: se muestran hasta que se responde */
  var cookies = document.getElementById('cookies');
  var respuestaCookies = null;
  try { respuestaCookies = localStorage.getItem('nf-cookies'); } catch (e) {}
  if (!respuestaCookies) cookies.hidden = false;
  cookies.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    try { localStorage.setItem('nf-cookies', b.dataset.respuesta); } catch (e) {}
    cookies.hidden = true;
    document.getElementById('contenido').focus();
  });

  /* Pop-up de preventa: diálogo nativo (Escape lo cierra y el foco queda dentro) */
  var preventa = document.getElementById('preventa');
  var vistoPreventa = null;
  try { vistoPreventa = sessionStorage.getItem('nf-preventa'); } catch (e) {}
  if (!vistoPreventa && typeof preventa.showModal === 'function') {
    setTimeout(function () { preventa.showModal(); }, 600);
  }
  /* Si el correo está vacío o mal escrito, no se cierra: se explica el error y el foco vuelve al campo */
  var formPreventa = document.getElementById('form-preventa');
  var correoPreventa = document.getElementById('correo-preventa');
  var errorPreventa = document.getElementById('e-preventa');
  formPreventa.addEventListener('submit', function (e) {
    if (e.submitter && e.submitter.value === 'cerrar') return;
    var valor = correoPreventa.value.trim();
    var mensaje = '';
    if (!valor) mensaje = 'Escribe tu correo para recibir el código.';
    else if (!correoPreventa.checkValidity()) mensaje = 'Revisa el correo: debe ser como nombre@ejemplo.com.';
    if (mensaje) {
      e.preventDefault();
      errorPreventa.textContent = mensaje;
      correoPreventa.setAttribute('aria-invalid', 'true');
      correoPreventa.focus();
    }
  });
  correoPreventa.addEventListener('input', function () {
    if (correoPreventa.getAttribute('aria-invalid') === 'true' && correoPreventa.checkValidity()) {
      correoPreventa.setAttribute('aria-invalid', 'false');
      errorPreventa.textContent = '';
    }
  });
  preventa.addEventListener('close', function () {
    try { sessionStorage.setItem('nf-preventa', '1'); } catch (e) {}
    if (preventa.returnValue === 'quiero') anunciar('Te enviaremos el código de preventa por correo.');
  });

  /* Menú móvil */
  var panel = document.getElementById('panel');
  var abrirMenu = document.getElementById('abrir-menu');
  var cerrarMenu = document.getElementById('cerrar-menu');
  function menu(abrir) {
    panel.classList.toggle('abierto', abrir);
    abrirMenu.setAttribute('aria-expanded', abrir);
    document.body.style.overflow = abrir ? 'hidden' : '';
    (abrir ? cerrarMenu : abrirMenu).focus();
  }
  abrirMenu.addEventListener('click', function () { menu(true); });
  cerrarMenu.addEventListener('click', function () { menu(false); });
  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') menu(false);
    if (e.key === 'Tab') {
      var f = panel.querySelectorAll('button, a'); var primero = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });
  panel.addEventListener('click', function (e) { if (e.target.closest('a')) menu(false); });

  /* Cinta: pausa manual (y parada automática con "reducir movimiento") */
  var pausa = document.getElementById('pausa');
  var cinta = document.getElementById('cinta');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cinta.classList.add('pausada'); pausa.setAttribute('aria-pressed', 'true'); pausa.textContent = 'Reanudar animación';
  }
  pausa.addEventListener('click', function () {
    var parada = cinta.classList.toggle('pausada');
    pausa.setAttribute('aria-pressed', parada);
    pausa.textContent = parada ? 'Reanudar animación' : 'Pausar animación';
  });

  /* Cuenta atrás: la visual va por segundos; la del lector se actualiza una vez por minuto y no interrumpe */
  var objetivo = new Date('2027-06-11T19:00:00+02:00').getTime();
  function cuenta() {
    var d = Math.max(0, objetivo - Date.now());
    var dd = Math.floor(d / 864e5), hh = Math.floor(d / 36e5) % 24, mm = Math.floor(d / 6e4) % 60, ss = Math.floor(d / 1e3) % 60;
    document.getElementById('cd-d').textContent = dd;
    document.getElementById('cd-h').textContent = ('0' + hh).slice(-2);
    document.getElementById('cd-m').textContent = ('0' + mm).slice(-2);
    document.getElementById('cd-s').textContent = ('0' + ss).slice(-2);
    if (ss === 0 || !cuenta.hecho) {
      document.getElementById('cuenta-texto').textContent = 'Faltan ' + dd + ' días, ' + hh + ' horas y ' + mm + ' minutos para el festival.';
      cuenta.hecho = true;
    }
  }
  cuenta(); setInterval(cuenta, 1000);

  /* Filtro del cartel */
  var botonesDia = document.querySelectorAll('.dia');
  var nombresDia = { todo: 'todos los días', vie: 'el viernes', sab: 'el sábado', dom: 'el domingo' };
  botonesDia.forEach(function (b) {
    b.addEventListener('click', function () {
      botonesDia.forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      var n = 0;
      document.querySelectorAll('.card').forEach(function (c) {
        var mostrar = b.dataset.dia === 'todo' || c.dataset.dia === b.dataset.dia;
        c.hidden = !mostrar; if (mostrar) n++;
      });
      anunciar('Mostrando ' + n + ' artistas de ' + nombresDia[b.dataset.dia] + '.');
    });
  });

  /* Favoritos */
  document.querySelectorAll('.fav').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on);
    });
  });

  /* Entradas y carrito */
  var total = 0;
  var contador = document.getElementById('contador');
  var carrito = document.querySelector('.btn-ico[href="#compra"]');
  function pintarCarrito() {
    contador.textContent = total;
    carrito.setAttribute('aria-label', 'Carrito: ' + total + (total === 1 ? ' entrada' : ' entradas'));
  }
  document.querySelectorAll('.ticket').forEach(function (t) {
    var out = t.querySelector('output');
    var menos = t.querySelector('.menos'), mas = t.querySelector('.mas'), anadir = t.querySelector('.anadir');
    if (!out) return;
    function cambiar(x) { out.textContent = Math.max(1, Math.min(6, parseInt(out.textContent, 10) + x)); }
    menos.addEventListener('click', function () { cambiar(-1); });
    mas.addEventListener('click', function () { cambiar(1); });
    anadir.addEventListener('click', function () {
      var n = parseInt(out.textContent, 10);
      total += n; pintarCarrito();
      anunciar('Añadidas ' + n + ' entradas de ' + t.dataset.nombre + '. Tienes ' + total + ' en el carrito.');
    });
  });
  pintarCarrito();

  /* Desplegables de fecha */
  var selDia = document.getElementById('dia'), selAnio = document.getElementById('anio');
  for (var i = 1; i <= 31; i++) selDia.add(new Option(i, i));
  for (var a = 2011; a >= 1940; a--) selAnio.add(new Option(a, a));

  /* Temporizador: avisa antes de acabar, se puede ampliar y nunca borra lo escrito */
  var resto = 15 * 60;
  var reloj = document.getElementById('reloj');
  var avisoTiempo = document.getElementById('aviso-tiempo');
  function pintarReloj() { reloj.textContent = Math.floor(resto / 60) + ':' + ('0' + resto % 60).slice(-2); }
  setInterval(function () {
    if (resto > 0) resto--;
    pintarReloj();
    if (resto === 120) avisoTiempo.textContent = 'Quedan 2 minutos de reserva. Puedes pedir más tiempo con el botón "Necesito más tiempo".';
    if (resto === 0) avisoTiempo.textContent = 'La reserva ha caducado. Tus datos siguen en el formulario; pulsa "Necesito más tiempo" para volver a reservar.';
  }, 1000);
  document.getElementById('mas-tiempo').addEventListener('click', function () {
    resto += 10 * 60; pintarReloj();
    avisoTiempo.textContent = 'Añadidos 10 minutos. Ahora tienes ' + reloj.textContent + '.';
  });

  /* Validación con mensajes de texto */
  var form = document.getElementById('form-compra');
  var resumen = document.getElementById('resumen-errores');
  var lista = document.getElementById('lista-errores');
  var reglas = [
    { id: 'nombre', error: 'e-nombre', ok: function (v) { return v.trim().length > 1; }, msg: 'Escribe tu nombre y apellidos.' },
    { id: 'correo', error: 'e-correo', ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, msg: 'Escribe un correo con el formato nombre@dominio.com.' },
    { id: 'telefono', error: 'e-telefono', ok: function (v) { return v.replace(/\D/g, '').length >= 9; }, msg: 'Escribe un teléfono de al menos 9 cifras.' },
    { id: 'codigo', error: 'e-codigo', ok: function (v) { return /^\d{5}$/.test(v); }, msg: 'El código postal tiene 5 cifras.' }
  ];
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fallos = [];
    reglas.forEach(function (r) {
      var campo = document.getElementById(r.id), err = document.getElementById(r.error);
      var bien = r.ok(campo.value);
      campo.setAttribute('aria-invalid', !bien);
      err.textContent = bien ? '' : r.msg;
      if (!bien) fallos.push({ id: r.id, msg: r.msg });
    });
    var nac = ['dia', 'mes', 'anio'].map(function (id) { return document.getElementById(id); });
    var nacBien = nac.every(function (s) { return s.value; });
    nac.forEach(function (s) { s.setAttribute('aria-invalid', !s.value); });
    document.getElementById('e-nac').textContent = nacBien ? '' : 'Elige día, mes y año de nacimiento.';
    if (!nacBien) fallos.push({ id: nac.find(function (s) { return !s.value; }).id, msg: 'Elige día, mes y año de nacimiento.' });

    lista.innerHTML = '';
    var estado = document.getElementById('estado-form');
    if (fallos.length) {
      fallos.forEach(function (f) {
        var li = document.createElement('li'), a = document.createElement('a');
        a.href = '#' + f.id; a.textContent = f.msg;
        a.addEventListener('click', function (ev) { ev.preventDefault(); document.getElementById(f.id).focus(); });
        li.appendChild(a); lista.appendChild(li);
      });
      resumen.hidden = false; resumen.focus();
      estado.textContent = '';
    } else {
      resumen.hidden = true;
      estado.textContent = 'Compra realizada. Te hemos enviado las entradas a ' + document.getElementById('correo').value + '.';
    }
  });

  /* Boletín */
  document.getElementById('form-boletin').addEventListener('submit', function (e) {
    e.preventDefault();
    var c = document.getElementById('correo-boletin'), msg = document.getElementById('msg-boletin');
    var bien = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value);
    c.setAttribute('aria-invalid', !bien);
    msg.textContent = bien ? '¡Dentro! Te escribiremos con el próximo anuncio.' : 'Escribe un correo con el formato nombre@dominio.com.';
    if (!bien) c.focus();
  });
