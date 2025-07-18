// terminal.js
document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".terminal-input");
  const output = document.getElementById("terminal-output");

  // Historial
  const history = [];
  let historyIndex = -1;
  let currentUptime = Date.now();

  const virtualFiles = {
    "README.md":
      "Bienvenido a mi web personal estilo terminal.<br>Explora mis comandos o ejecuta <b>help</b>.",
    "notas.txt":
      "Recuerda: #KeepHacking<br>La creatividad consiste en no dejar nunca de aprender.",
    "contacto.txt": "Email: glitchbane [arroba] protonmail.com",
    "demo.txt": "Esto es un archivo virtual creado con touch.",
  };
  const directory = ["portfolio/", "contacto/", "notas.txt", "README.md"];

  const commandsList = [
  "help", "sobre-mi", "proyectos", "skills", "habilidades", "contacto",
  "ls", "cat", "touch", "whoami", "clear", "motd", "fortune", "echo",
  "uptime", "date", "history", "man", "sudo", "exit"
];
// ----- AUTOCOMPLETADO TAB Y SUGERENCIAS -----
let suggestionBox = null;

function showSuggestions(matches) {
  // Limpia sugerencias previas
  if (suggestionBox) suggestionBox.remove();
  if (matches.length <= 1) return;

  suggestionBox = document.createElement("div");
  suggestionBox.className = "suggestion-box";
  suggestionBox.innerHTML = matches.map(cmd =>
    `<div class="suggestion-item">${cmd}</div>`
  ).join("");
  // Ubica el box justo bajo el input
  const termFunc = document.querySelector(".terminal-functional");
  termFunc.appendChild(suggestionBox);

  // Click en sugerencia para autocompletar
  Array.from(suggestionBox.children).forEach(child => {
    child.addEventListener("click", function() {
      input.value = this.textContent + " ";
      suggestionBox.remove();
      suggestionBox = null;
      input.focus();
    });
  });
}

input.addEventListener("blur", () => {
  if (suggestionBox) suggestionBox.remove();
});
input.addEventListener("input", () => {
  if (suggestionBox) suggestionBox.remove();
});

input.addEventListener("keydown", function(e) {
  // AUTOCOMPLETADO TAB
  if (e.key === "Tab") {
    e.preventDefault();
    const typed = input.value.trim();
    if (!typed) return;

    // Autocompleta solo el comando inicial
    const tokens = typed.split(" ");
    if (tokens.length > 1) return; // Solo el comando principal

    const matches = commandsList.filter(cmd => cmd.startsWith(tokens[0]));
    if (matches.length === 1) {
      input.value = matches[0] + " ";
      if (suggestionBox) suggestionBox.remove();
    } else if (matches.length > 1) {
      showSuggestions(matches);
    }
  }
});


  // RESPONSE BLOCKS
  function sobreMiHTML() {
    return `
      <div>
        <span class="nombre">Israel Zamora Tejero</span>
        <span class="alias">(GlitchBane)</span>
      </div>
      <div class="user-desc">
        Me gusta el mundo de la informática desde que tenía apenas 6 años, he sido autodidacta toda mi vida, toqué mi primera terminal con apenas 9 años con Debian en una librería de un amigo de mi abuelo, me interesó el mundo de los sistemas operativos, el hardware, la seguridad y actualmente soy desarrollador web.
      </div>
      <div class="social-links">
        <a class="social-link" href="https://www.linkedin.com/in/glitchbane" target="_blank" rel="noopener">LinkedIn</a>
        <a class="social-link" href="https://github.com/glitchbane" target="_blank" rel="noopener">GitHub</a>
        <a class="social-link" href="https://instagram.com/glitchbane" target="_blank" rel="noopener">Instagram</a>
      </div>
    `;
  }
  function getHelp() {
    return `
    <span style="color:#4ecfe0"><b>Comandos disponibles:</b></span><br>
    <b>help</b> ............... Muestra esta ayuda<br>
    <b>sobre-mi</b> .......... Información personal<br>
    <b>proyectos</b> ......... Proyectos realizados<br>
    <b>skills</b> / <b>habilidades</b> ... Habilidades técnicas<br>
    <b>contacto</b> .......... Información de contacto<br>
    <b>ls</b> ................ Listar archivos/directorios<br>
    <b>cat [archivo]</b> ..... Mostrar el contenido de un archivo<br>
    <b>touch [archivo]</b> ... Crear archivo virtual<br>
    <b>whoami</b> ............ Mostrar usuario actual<br>
    <b>clear</b> ............. Limpiar el área de info<br>
    <b>motd</b> .............. Mensaje del día<br>
    <b>fortune</b> ........... Frase aleatoria<br>
    <b>echo [texto]</b> ...... Repetir texto<br>
    <b>uptime</b> ............ Tiempo de uso de la terminal<br>
    <b>date</b> .............. Fecha y hora actual<br>
    <b>history</b> ........... Ver tus comandos anteriores<br>
    <b>man [comando]</b> ..... Breve ayuda de comando<br>
    <b>sudo [comando]</b> .... Simular sudo (broma)<br>
    <b>exit</b> .............. Ocultar/desactivar terminal
  `;
  }
  function getProyectos() {
    return `
      <ul>
        <li>Administración de servidores Linux (SSH, backups, permisos)<br><span class="text-muted">Automatización y personalización de entornos.</span></li>
        <li>Desarrollo de glitchbane.info<br><span class="text-muted">Web portfolio: diseño "hacker", escalable y responsive.</span></li>
        <li>Cyberpunk UIs y desarrollos para otras comunidades.<br><span class="text-muted">UI/UX, scripts y proyectos opensource.</span></li>
      </ul>
    `;
  }
  function getSkills() {
    return `
      <span style="color:#4ecfe0"><b>Habilidades:</b></span><br>
      - Linux avanzado (bash, SSH, permisos, procesos)<br>
      - Seguridad informática y redes<br>
      - Programación web (HTML, CSS, JS, Node.js)<br>
      - Frontend cyberpunk UI<br>
      - Automatización y scripting<br>
      - Responsive multiplataforma<br>
    `;
  }
  function getContacto() {
    return `
      <span style="color:#4ecfe0"><b>Contacto:</b></span><br>
      Email: glitchbane [arroba] protonmail.com<br>
      Twitter: <a href="https://twitter.com/glitchbane" target="_blank" class="social-link">twitter.com/glitchbane</a><br>
      Telegram: <a href="https://t.me/glitchbane" target="_blank" class="social-link">@glitchbane</a>
    `;
  }
  function getMOTD() {
    return `Bienvenido, GlitchBane. Hoy es un buen día para hackear el futuro.`;
  }
  function getFortune() {
    const fortunes = [
      "Quien nunca falla, es porque nunca lo intenta.",
      "El mejor comando es el que resuelve tu problema.",
      "Recuerda: rm -rf / no es una broma.",
      "En el mundo digital, la curiosidad es tu mejor aliada.",
      "Usa <b>help</b> si te pierdes.",
      "El conocimiento no ocupa lugar en el disco duro de tu mente.",
      "¿Probaste apagar y encender?",
    ];
    return fortunes[Math.floor(Math.random() * fortunes.length)];
  }
  function getWhoami() {
    return `<span style="color:#4ecfe0"><b>glitchbane</b></span>`;
  }
  function getDate() {
    return `<span style="color:#4ecfe0"><b>Fecha:</b></span> ${new Date().toLocaleString(
      "es-ES"
    )}`;
  }
  function getUptime() {
    const diff = Date.now() - currentUptime;
    const min = Math.floor(diff / 60000);
    const sec = Math.floor((diff % 60000) / 1000);
    return `Terminal activa desde hace ${min}m ${sec}s.`;
  }

  // Descripciones "man"
  const manuales = {
    help: "help: muestra todos los comandos disponibles.",
    "sobre-mi":
      "sobre-mi: información sobre Israel Zamora Tejero (GlitchBane).",
    proyectos: "proyectos: áreas y proyectos en los que he trabajado.",
    habilidades: "habilidades: muestra mis habilidades técnicas.",
    skills: "skills: alias de 'habilidades'.",
    contacto: "contacto: cómo contactarme.",
    ls: "ls: muestra el contenido del directorio virtual.",
    cat: "cat [archivo]: muestra el contenido de un archivo.",
    touch: "touch [archivo]: crea un archivo virtual.",
    echo: "echo [texto]: repite el texto proporcionado.",
    fortune: "fortune: muestra una frase/fortuna aleatoria.",
    motd: "motd: mensaje del día personalizado.",
    uptime: "uptime: tiempo desde el inicio de esta terminal.",
    date: "date: muestra la fecha y hora actual.",
    history: "history: historial de comandos usados.",
    whoami: "whoami: tu usuario en esta terminal.",
    man: "man [comando]: muestra una corta ayuda del comando.",
    sudo: "sudo [comando]: simula sudo.",
    clear: "clear: limpia el área de información.",
    exit: "exit: oculta/inhabilita la terminal.",
  };

  function renderOutput(title, html) {
    output.innerHTML = `<div class="section-title">${title}</div><div class="user-info user-info-content">${html}</div>`;
  }

  // Comienzo del historial
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (history.length === 0) return;
      if (e.key === "ArrowUp") {
        historyIndex = historyIndex > 0 ? historyIndex - 1 : 0;
      } else {
        historyIndex =
          historyIndex < history.length - 1
            ? historyIndex + 1
            : history.length - 1;
      }
      input.value = history[historyIndex];
      e.preventDefault();
    }
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const raw = input.value;
      const commandLine = raw.trim();
      if (!commandLine) return;

      history.push(commandLine);
      if (history.length > 60) history.shift();
      historyIndex = history.length;

      processCommand(commandLine);

      input.value = "";
    }
  });

  function processCommand(commandLine) {
    const parts = commandLine.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command === "clear") {
      renderOutput("📄", `<span style="color:#4ecfe0;">Bloque limpio.</span>`);
      return;
    }
    if (command === "exit") {
      renderOutput(
        "TERMINAL",
        `<span style="color:#4ecfe0;">Terminal finalizada. Refresca la página para volver a usarla.</span>`
      );
      input.disabled = true;
      input.style.opacity = 0.52;
      return;
    }
    if (command === "help") {
      renderOutput("AYUDA", getHelp());
      return;
    }
    if (command === "sobre-mi") {
      renderOutput("SOBRE MÍ", sobreMiHTML());
      return;
    }
    if (command === "proyectos") {
      renderOutput("PROYECTOS", getProyectos());
      return;
    }
    if (command === "skills" || command === "habilidades") {
      renderOutput("HABILIDADES", getSkills());
      return;
    }
    if (command === "contacto") {
      renderOutput("CONTACTO", getContacto());
      return;
    }
    if (command === "motd") {
      renderOutput("MENSAJE DEL DÍA", getMOTD());
      return;
    }
    if (command === "fortune") {
      renderOutput("FORTUNA", getFortune());
      return;
    }
    if (command === "whoami") {
      renderOutput("USUARIO", getWhoami());
      return;
    }
    if (command === "date") {
      renderOutput("FECHA Y HORA", getDate());
      return;
    }
    if (command === "uptime") {
      renderOutput("UPTIME", getUptime());
      return;
    }
    if (command === "history") {
      renderOutput(
        "HISTORIAL",
        history
          .map(
            (x, i) =>
              `<span style="color:#4ecfe0;">${
                i + 1
              }</span> <span style="color:#eae7ff;">${x}</span>`
          )
          .join("<br>")
      );
      return;
    }
    if (command === "ls") {
      renderOutput(
        "DIRECTORIO",
        directory
          .map((item) =>
            item.endsWith("/")
              ? `<span style="color:#4ecfe0;font-weight:bold;">${item}</span>`
              : `<span style="color:#a58cdb;">${item}</span>`
          )
          .join("  ")
      );
      return;
    }
    if (command === "cat") {
      if (!args[0]) {
        renderOutput("USO DE CAT", "Uso: cat [archivo]");
        return;
      }
      const filename = args[0].toLowerCase();
      const niceFilename = filename.replace(/^\//, "").toUpperCase();
      if (virtualFiles[filename] || virtualFiles[niceFilename]) {
        renderOutput(
          `ARCHIVO ${args[0]}`,
          virtualFiles[filename] || virtualFiles[niceFilename]
        );
      } else {
        renderOutput(
          "ARCHIVO",
          `<span style="color:#4ecfe0;">Archivo no encontrado: <b>${args[0]}</b></span>`
        );
      }
      return;
    }
    if (command === "touch") {
      if (!args[0]) {
        renderOutput("USO DE TOUCH", "Uso: touch [archivo]");
        return;
      }
      const filename = args[0].toLowerCase();
      if (directory.includes(filename)) {
        renderOutput(
          "TOUCH",
          `<span style="color:#4ecfe0;">El archivo ya existe: <b>${args[0]}</b></span>`
        );
      } else {
        directory.push(filename);
        virtualFiles[filename] = "Esto es un archivo virtual creado con touch.";
        renderOutput(
          "TOUCH",
          `<span style="color:#4ecfe0;">Archivo <b>${filename}</b> creado (virtualmente).</span>`
        );
      }
      return;
    }
    if (command === "echo") {
      renderOutput("ECHO", args.length ? args.join(" ") : "");
      return;
    }
    if (command === "man") {
      const subject = args[0] ? args[0].toLowerCase() : null;
      if (subject && manuales[subject]) {
        renderOutput("MANUAL", manuales[subject]);
      } else if (subject) {
        renderOutput("MANUAL", `No existe el manual de ${subject}.`);
      } else {
        renderOutput("MANUAL", "Uso: man [comando]");
      }
      return;
    }
    if (command === "sudo") {
      renderOutput("SUDO", "Permiso denegado: No eres root aquí 😉");
      return;
    }

    // No reconocido
    renderOutput(
      "COMANDO NO RECONOCIDO",
      `<span style="color:#4ecfe0;">Comando no reconocido: <b>${commandLine}</b></span>`
    );
  }

  // Mostrar SOBRE MÍ por defecto
  renderOutput("SOBRE MÍ", sobreMiHTML());
});
