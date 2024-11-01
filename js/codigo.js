// Array con la lista de palabras para el juego (no pueden contener el carácter "_")
const palabras = [
    "HTML", 
    "JAVASCRIPT", 
    "CSS", 
    "PROGRAMACION", 
    "NAVEGADOR"
    ];

var palabraSecreta = "";      // Palabra secreta a adivinar
var letrasAdivinadas = [];    // Letras adivinadas de la palabra secreta
var errores = 0;              // Número de errores cometidos
const maxErrores = 6;         // Límite de errores para perder el juego

// Llama a la función iniciarJuego al inicio.
iniciarJuego();

// Inicializa el juego seleccionando una palabra y configurando la pantalla
function iniciarJuego() {
  palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)]; // Elige una palabra al azar
  letrasAdivinadas = Array(palabraSecreta.length).fill("_"); // Rellena con guiones bajos
  
  // Quita los mensajes y reinicia el numero de errores
  errores = 0;
  actualizarContenedorPalabra();
  actualizarContenedorLetras();
  document.getElementById("mensaje").textContent = "";
  document.getElementById("nerrores").textContent = "";
}

// Muestra las letras adivinadas hasta ahora en palabraContenedor
function actualizarContenedorPalabra() {
  document.getElementById("palabraContenedor").textContent = letrasAdivinadas.join(" ");
}

// Genera los botones de letras de la A a la Z
function actualizarContenedorLetras() {
    // Apunto al contenedor de letras y lo vacío
    const contenedorLetras = document.getElementById("letrasContenedor");
    contenedorLetras.innerHTML = "";
  
    // Cadena de todas las letras del alfabeto
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  
    // Iteramos sobre cada letra en la cadena
    letras.split("").forEach(
        // Para cada letra, llama a esta función en la que crea un botón nuevo
        function(letra) {
            const botonLetra = document.createElement("button");
            botonLetra.textContent = letra;
            botonLetra.onclick = revisarJugada; // Asigna la función de adivinar
            contenedorLetras.appendChild(botonLetra); // Agrego el botón de letra a letrasContenedor
        }
    );
  }

// Lógica para manejar cada intento de letra
function revisarJugada(evento) {
  const letra = evento.target.textContent; // Obtiene la letra del botón que la llamó
  evento.target.disabled = true; // Desactiva el botón de la letra al ser usado
  
  if (palabraSecreta.includes(letra)) {
    // Si la letra está en la palabra, actualiza letrasAdivinadas...
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (palabraSecreta[i] == letra) letrasAdivinadas[i] = letra;
    }
    actualizarContenedorPalabra();

    // ...y revisa si el jugador ganó
    if (!letrasAdivinadas.includes("_")) {
        document.getElementById("mensaje").textContent = "¡Ganaste!";
        document.getElementById("nerrores").textContent = "";
        desactivarBotones();
    }

  } else {
    // Si la letra no está, cuenta un error...
    errores++;
    document.getElementById("nerrores").textContent = "Te quedan "+(maxErrores - errores)+" intentos.";
    
    // ...y revisa si el jugador perdió
    if (errores == maxErrores) {
        document.getElementById("mensaje").textContent = `Perdiste! La palabra era: ${palabraSecreta}`;
        document.getElementById("nerrores").textContent = "";
        desactivarBotones();
    }
  }
}

// Desactiva todos los botones de letras
function desactivarBotones() {
  // Selecciona todos los botones dentro de letrasContenedor y los desactiva.
  const botones = document.querySelectorAll("#letrasContenedor button"); 
  botones.forEach(
    function (boton)
    { 
        boton.disabled = true // Recorre los botones uno por uno y los desactiva
    });
}