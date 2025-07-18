// Reloj en tiempo real
function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('header-clock').textContent = `${hh}:${mm}:${ss}`;
}
setInterval(updateClock, 1000);
updateClock();

// Animación escalonada de la consola
document.querySelectorAll('.block .console-line').forEach((el, idx) => {
  el.style.opacity = 0;
  setTimeout(() => { el.style.opacity = 1; }, 120 + idx * 400);
});

// Typewriter prompt principal
const text = " ./información";
const typedCmd = document.getElementById('typed-cmd');
const cursor = document.getElementById('blinking-cursor');
let i = 0;
function typeWriter() {
  if (i <= text.length) {
    typedCmd.textContent = text.slice(0, i);
    i++;
    setTimeout(typeWriter, 43);
  } else {
    typedCmd.textContent = text;
    cursor.style.display = 'inline';
  }
}
typedCmd.textContent = '';
cursor.style.display = 'none';
typeWriter();

// Focus input terminal
window.onload = function() {
  const input = document.querySelector('.terminal-input');
  if(input){ input.focus(); }
};
// Footer: año dinámico
document.addEventListener("DOMContentLoaded", function() {
  var year = new Date().getFullYear();
  var span = document.getElementById("copyright-year");
  if (span) span.innerText = year;
});