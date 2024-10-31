// Lista de palabras para el juego
const palabras = ["HTML", "JAVASCRIPT", "CSS", "PROGRAMACION", "NAVEGADOR"];
var palabraSeleccionada = ""; // Palabra seleccionada al azar
var letrasAdivinadas = [];    // Letras adivinadas (mostradas como guiones bajos)
var errores = 0;              // Número de errores cometidos
const maxErrores = 6;         // Límite de errores para perder el juego

// Inicializa el juego seleccionando una palabra y configurando la pantalla
function iniciarJuego() {
  palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)]; // Elige una palabra al azar
  letrasAdivinadas = Array(palabraSeleccionada.length).fill("_"); // Rellena con guiones bajos
  errores = 0;
  actualizarContenedorPalabra();
  actualizarContenedorLetras();
  document.getElementById("mensaje").textContent = ""; // Limpia el mensaje
  document.getElementById("nerrores").textContent = "";
}

// Muestra la palabra con letras adivinadas o guiones bajos
function actualizarContenedorPalabra() {
  document.getElementById("palabraContenedor").textContent = letrasAdivinadas.join(" ");
}

// Genera los botones de letras de la A a la Z
function actualizarContenedorLetras() {
  const contenedorLetras = document.getElementById("letrasContenedor");
  contenedorLetras.innerHTML = "";
  for (let i = 65; i <= 90; i++) { // Códigos ASCII de A a Z
    const botonLetra = document.createElement("button");
    botonLetra.textContent = String.fromCharCode(i);
    botonLetra.onclick = manejarIntento; // Asigna la función para adivinar
    contenedorLetras.appendChild(botonLetra);
  }
}

// Lógica para manejar cada intento de letra
function manejarIntento(evento) {
  const letra = evento.target.textContent;
  evento.target.disabled = true; // Desactiva el botón de la letra al ser usado
  if (palabraSeleccionada.includes(letra)) {
    // Si la letra está en la palabra, actualiza letrasAdivinadas
    for (let i = 0; i < palabraSeleccionada.length; i++) {
      if (palabraSeleccionada[i] === letra) letrasAdivinadas[i] = letra;
    }
    actualizarContenedorPalabra();
    verificarVictoria();
  } else {
    // Si la letra no está, cuenta un error
    errores++;
    document.getElementById("nerrores").textContent = "Te quedan "+(maxErrores - errores)+" intentos.";
    verificarDerrota();
  }
}

// Verifica si el jugador ha ganado (todas las letras adivinadas)
function verificarVictoria() {
  if (!letrasAdivinadas.includes("_")) {
    document.getElementById("mensaje").textContent = "¡Ganaste!";
    desactivarBotones();
  }
}

// Verifica si el jugador ha perdido (límite de errores alcanzado)
function verificarDerrota() {
  if (errores === maxErrores) {
    document.getElementById("mensaje").textContent = `Perdiste! La palabra era: ${palabraSeleccionada}`;
    desactivarBotones();
  }
}

// Desactiva todos los botones de letras
function desactivarBotones() {
  // Selecciona todos los botones dentro de letrasContenedor y los desactiva.
  const botones = document.querySelectorAll("#letrasContenedor button"); 
  botones.forEach(boton => boton.disabled = true);
}

// Asigna la función de reinicio al botón y ejecuta la inicialización al cargar
document.getElementById("reiniciarBtn").onclick = iniciarJuego;
iniciarJuego();
