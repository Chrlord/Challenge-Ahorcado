/* ============================================ 
 --------- VARIABLES - SELECTORES ------------ 
============================================ */
let iconoMenu = getID("iconoMenu");
let enlaces = document.querySelectorAll(".nav-item");
let lnkAcercaJuego = getClass(".acercaJuego");
let lnkContacto = getClass(".contacto");
const cardInfoJuego = getID("infoJuego");
const cardInfoContacto = getID("infoContacto");
const btnPlay = getID("play");
const btnNewWord = getID("newWord");
const inpNewWord = getID("inpNewWord");
const btnGuardarPalabra = getID("guardarPalabra");
const btnCancelar = getID("cancelar");
const loader = getID("loader");
let btnReiniciar = getClass(".reiniciar");
let btnSalirCanvas = getClass(".salir");
let btnSalirCardJuego = getClass(".salir-info-juego");
let btnSalirCardContacto = getClass(".salir-info-contacto");
let clsLightDark = getClass(".lightDark");
let contBtnsPpal = getClass(".container-btnsJuego");
let contBtnsPalabra = getClass(".container-btnsPalabra");
let contBtnsAhorcado = getClass(".container-btnsAhorcado");
let contCanvas = getClass(".container-ahorcado");
let msgs = getClass(".msgs");

/************************************************************
 * FUNCIÓNES PARA OBTENER EL ELEMENTO DE HTML POR ID Y CLASE.
 ***********************************************************/

function getID(nameID) {
  return document.getElementById(nameID);
}

function getClass(nameClass) {
  return document.querySelector(nameClass);
}

/******
 * CANVAS Y OTRAS VARIABLES.
 *****/

let tablero = getID("ahorcado").getContext("2d");
let palabras = [
  "itachi",
  "uchiha",
  "madara",
  "sasuke",
  "naruto",
  "uzumaki",
  "kakashi",
  "hatake",
  "sakura",
  "haruno",
  "jiraiya",
  "minato",
  "namikaze",
  "nagato",
  "obito",
  "hinata",
  "orochimaru",
  "tsunade",
  "neji",
  "shikamaru",
  "konohamaru",
];
let palabraSecreta =
  palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
let letraElegida = [];
let letrasIncorrectas = [];
let palabraCorrecta = "";
let letras = [];
let errores = 8;
let numDeErrores = 8;

/* var palabraSecreta = "";
let numeroDeErrores = 8; */

/* ======================================= 
 ---------- EVENTOS A BOTONES ----------- 
======================================= */
/******
 * LINK INFORMACIÓN DE CONTACTO.
 *****/

lnkContacto.addEventListener("click", () => {
  if (!cardInfoContacto.classList.contains("active")) {
    cardInfoContacto.classList.toggle("active");
    contBtnsPpal.classList.toggle("active");
    cardInfoJuego.classList.remove("active");
    cardInfoContacto.classList.remove("inactive");
  } else {
    contBtnsPpal.classList.remove("active");
    cardInfoContacto.classList.remove("active");
    cardInfoContacto.classList.toggle("inactive");
  }
});

/******
 * LINK ACERCA DEL JUEGO.
 *****/

lnkAcercaJuego.addEventListener("click", () => {
  if (!cardInfoJuego.classList.contains("active")) {
    cardInfoJuego.classList.toggle("active");
    contBtnsPpal.classList.toggle("active");
    cardInfoContacto.classList.remove("active");
    cardInfoJuego.classList.remove("inactive");
  } else {
    contBtnsPpal.classList.remove("active");
    cardInfoJuego.classList.remove("active");
    cardInfoJuego.classList.toggle("inactive");
  }
});

/******
 * BOTÓN PLAY
 *****/

btnPlay.addEventListener("click", () => {
  loader.style.display = "block";
  contBtnsPpal.style.display = "none";
  lnkAcercaJuego.style.pointerEvents = "none";
  lnkAcercaJuego.style.color = "Gray";
  lnkContacto.style.pointerEvents = "none";
  lnkContacto.style.color = "Gray";
  contCanvas.style.zIndex = -1;

  setTimeout(() => {
    contCanvas.style.display = "block";
    contBtnsAhorcado.style.opacity = 1;
    // btnReiniciar.disabled = true;
    iniciarJuego();
    dibujarLineas();
    loader.style.display = "none";
  }, 3000);
});

/******
 * BOTÓN NUEVA PALABRA
 *****/

btnNewWord.addEventListener("click", () => {
  contBtnsPpal.style.display = "none";
  contBtnsPalabra.style.display = "block";
  contBtnsPalabra.classList.remove("active");
  lnkContacto.style.pointerEvents = "none";
  lnkContacto.style.color = "Gray";
  lnkAcercaJuego.style.pointerEvents = "none";
  lnkAcercaJuego.style.color = "Gray";
});

/******
 * BOTÓN GUARDAR PALABRA
 *****/

btnGuardarPalabra.addEventListener("click", () => {
  let newWord = inpNewWord.value.toUpperCase();
  let maximo = 8;
  let minimo = 3;
  /**
   * (^) indica que el patrón debe iniciar con los caracteres dentro de los corchetes.
   * [A-Z] indica que los caracteres admitidos son letras del alfabeto.
   * (+) indica que los caracteres dentro de los corchetes se pueden repetir.
   * ($) indica que el patrón finaliza con los caracteres que están dentro de los corchetes.
   * (i) indica que validaremos letras mayúsculas y minúsculas (case-insensitive).
   */
  const validar = new RegExp("^[A-ZÑ]+$", "g");
  if (newWord === "") {
    inpNewWord.style.borderColor = "#e35050";
    Swal.fire({
      title: "No Ingresó Ninguna Palabra.",
      color: "#ffffff",
      showConfirmButton: false,
      showCloseButton: true,
      icon: "error",
      width: "80%",
      background: "rgba(255, 0, 0, 0.1)",
      toast: true,
      backdrop: false,
      position: "top",
      timer: "3500",
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    });
  } else if (newWord.length > maximo || newWord.length <= minimo) {
    inpNewWord.style.borderColor = "#e3cd50";
    Swal.fire({
      title: "Ingrese Máximo 9 Letras, Mínimo 4.",
      color: "#ffffff",
      showConfirmButton: false,
      showCloseButton: true,
      icon: "warning",
      width: "80%",
      background: "rgba(255, 166, 0, 0.1)",
      toast: true,
      backdrop: false,
      position: "top",
      timer: "3500",
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    });
  } else if (!validar.test(newWord)) {
    inpNewWord.style.borderColor = "#50e3d2";
    Swal.fire({
      title: "No Se Permiten Números.",
      color: "#ffffff",
      showConfirmButton: false,
      showCloseButton: true,
      icon: "info",
      width: "80%",
      background: "rgba(0, 251, 255, 0.1)",
      toast: true,
      backdrop: false,
      position: "top",
      timer: "3500",
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    });
  } else {
    palabras.push(newWord.trim());
    inpNewWord.style.borderColor = "#4fe854";
    Swal.fire({
      title: "Palabra Agregada Exitosamente.",
      color: "#ffffff",
      showConfirmButton: false,
      showCloseButton: true,
      icon: "success",
      width: "80%",
      background: "rgba(30, 255, 0, 0.1)",
      toast: true,
      backdrop: false,
      // toast: true,
      position: "top",
      timer: "3500",
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    });
  }
  setTimeout(() => {
    inpNewWord.style.borderColor = "#2c2b2b91";
    inpNewWord.value = "";
  }, 3500);
});

/******
 * BOTÓN CANCELAR
 *****/

btnCancelar.addEventListener("click", () => {
  contBtnsPpal.style.display = "block";
  contBtnsPalabra.style.display = "none";
  lnkContacto.style.pointerEvents = "auto";
  lnkContacto.style.color = "#091e68ea";
  lnkAcercaJuego.style.pointerEvents = "auto";
  lnkAcercaJuego.style.color = "#091e68ea";
});

/******
 * BOTÓN REINICIAR JUEGO
 *****/

btnReiniciar.addEventListener("click", () => {
  window.location.reload();
});

/******
 * BOTÓN SALIR
 *****/

btnSalirCanvas.addEventListener("click", () => {
  contCanvas.style.display = "none";
  contBtnsPpal.style.display = "block";
  contBtnsAhorcado.style.opacity = 0;
  lnkAcercaJuego.style.pointerEvents = "auto";
  lnkAcercaJuego.style.color = "#091e68ea";
  lnkContacto.style.pointerEvents = "auto";
  lnkContacto.style.color = "#091e68ea";
  window.location.reload();
});

/******
 * BOTÓN SALIR DE TARJETA INFORMACIÓN DE JUEGO.
 *****/

btnSalirCardJuego.addEventListener("click", () => {
  if (cardInfoJuego.classList.contains("active")) {
    contBtnsPpal.classList.remove("active");
    cardInfoJuego.classList.remove("active");
    cardInfoJuego.classList.toggle("inactive");
  }
});

/******
 * BOTÓN SALIR DE TARJETA INFORMACIÓN DE CONTACTO.
 *****/

btnSalirCardContacto.addEventListener("click", () => {
  if (cardInfoContacto.classList.contains("active")) {
    contBtnsPpal.classList.remove("active");
    cardInfoContacto.classList.remove("active");
    cardInfoContacto.classList.toggle("inactive");
  }
});

/******
 * CAMBIAR A MODO OSCURO.
 *****/

clsLightDark.addEventListener("click", () =>
  document.body.classList.toggle("dark")
);

/* =================================
------------ FUNCIONES ------------
================================= */

/******
 * FUNCIÓN QUE ESCOGE LA PALABRA.
 *****/

function escogerPalabraSecreta() {
  palabraSecreta;
  return palabraSecreta;
}
console.log(palabraSecreta);

/******
 * FUNCIÓN QUE VERIFICA LA LETRA PRESIONADA.
 *****/

function verificarLetraPresionada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key);
    return false;
  } else {
    letras.push(key);
    return true;
  }
}

/******
 * FUNCIÓN QUE AGREGA LA LETRA CORRECTA.
 *****/

function agregarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase();
}

/******
 * FUNCIÓN QUE AGREGA LA LETRA INCORRECTA.
 *****/

function agregarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores -= 1;
  }
}

/******
 * FUNCIÓN QUE VERIFICA EL FIN DEL JUEGO.
 *****/

function verificarFinJuego(letra) {
  if (letraElegida.length < palabraSecreta.length) {
    letrasIncorrectas.push(letra);

    if (letrasIncorrectas.length > numDeErrores) {
      perdiste();
    } else if (letraElegida.length < palabraSecreta.length) {
      agregarLetraIncorrecta(letra);
      escribirLetraIncorrecta(letra, errores);
    }
  }
}

/******
 * FUNCIÓN QUE VERIFICA EL VENCEDOR.
 *****/

function verificarVencedor(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length == palabraSecreta.length) {
    ganaste();
  }
}

/******
 * FUNCIÓN QUE VERIFICA LA LETRA.
 *****/

function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}

/******
 * FUNCIÓN QUE INICIA EL JUEGO.
 *****/

function iniciarJuego() {
  // dibujarBaseHorca();
  escogerPalabraSecreta();
  dibujarLineas();

  document.onkeydown = (e) => {
    let letra = e.key.toUpperCase();
    if (letrasIncorrectas.length <= numDeErrores) {
      if (!verificarLetraPresionada(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          agregarLetraCorrecta(palabraSecreta.indexOf(letra));
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escribirLetraCorrecta(i);
              verificarVencedor(letra);
            }
          }
        } else {
          if (!verificarLetraPresionada(e.key) && !verificarVencedor(letra))
            return;
          dibujarAhorcado(errores);
          verificarFinJuego(letra);
        }
      }
    } else {
      Swal.fire({
        title: "Has Superado el Limite Máximo de Letras Incorrectas",
        color: "#ffffff",
        showConfirmButton: false,
        showCloseButton: true,
        icon: "warning",
        width: "80%",
        background: "rgba(255, 166, 0, 0.1)",
        backdrop: false,
        toast: true,
        position: "top",
        timer: "4000",
        timerProgressBar: true,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
    }
  };
}

/******
 * FUNCIÓN QUE DIBUJA LA BASE DE LA HORCA.
 *****/

/* function dibujarBaseHorca() {
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#091d68d3";
  tablero.beginPath();
  tablero.moveTo(220, 390);
  tablero.lineTo(380, 390);
  tablero.stroke();
  tablero.closePath();
} */

/******
 * FUNCIÓN QUE DIBUJA LAS LINEAS DE LA PALABRA SECRETA.
 *****/

function dibujarLineas() {
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#091d68d3";
  tablero.beginPath();
  let ancho = 300 / palabraSecreta.length;
  for (let i = 0; i < palabraSecreta.length; i++) {
    tablero.moveTo(140 + ancho * i, 460);
    tablero.lineTo(162 + ancho * i, 460);
  }
  tablero.stroke();
  tablero.closePath();
}

/******
 * FUNCIÓN QUE ESCRIBE LA LETRA CORRECTA.
 *****/

function escribirLetraCorrecta(index) {
  tablero.font = "bold 40px Inter";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#091d68d3";

  let ancho = 300 / palabraSecreta.length;
  
  tablero.fillText(palabraSecreta[index], 136 + ancho * index, 450);
  tablero.stroke();
}

/******
 * FUNCIÓN QUE ESCRIBE LA LETRA INCORRECTA.
 *****/

function escribirLetraIncorrecta(letra, errorsLeft) {
  tablero.lineWidth = 6;
  tablero.font = "bold 20px Inter";
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#091d68d3";
  tablero.fillText(letra, 100 + 20 * (10 - errorsLeft), 520, 30);
}

/******
 * FUNCIÓN QUE DIBUJA EL MUÑECO.
 *****/

function dibujarAhorcado(puntaje) {
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "091d68d3";
  if (puntaje === 8) {
    //COLUMNA
    tablero.moveTo(300, 390);
    tablero.lineTo(300, 90);
  }
  if (puntaje === 7) {
    //BASE DE CUERDA
    tablero.moveTo(420, 90);
    tablero.lineTo(300, 90);
  }
  if (puntaje === 6) {
    //CUERDA
    tablero.moveTo(420, 90);
    tablero.lineTo(420, 120);
  }
  if (puntaje === 5) {
    //ROSTRO
    tablero.moveTo(420, 150);
    tablero.arc(420, 152, 25, 0, Math.PI * 2);
  }
  if (puntaje === 4) {
    //CUERPO
    tablero.moveTo(420, 183);
    tablero.lineTo(420, 290);
  }
  if (puntaje === 3) {
    //PIERNA IZQUIERDA
    tablero.moveTo(420, 290);
    tablero.lineTo(400, 340);
  }
  if (puntaje === 2) {
    //PIERNA DERECHA
    tablero.moveTo(420, 290);
    tablero.lineTo(440, 340);
  }
  if (puntaje === 1) {
    //BRAZO IZQUIERDO
    tablero.moveTo(420, 181);
    tablero.lineTo(400, 240);
  }
  if (puntaje === 0) {
    //BRAZO DERECHO
    tablero.moveTo(420, 181);
    tablero.lineTo(440, 240);
  }
  tablero.stroke();
  tablero.closePath();
}

/******
 * FUNCIÓN PARA MOSTRAR EL MENSAJE DE PERDISTE.
 *****/

function perdiste() {
  Swal.fire({
    title: "Lo siento Haz Perdido",
    color: "#ffffff",
    html: `La Palabra Era: ${palabraSecreta}`,
    showConfirmButton: false,
    imageUrl: "/Image/LoL-Defeat.png",
    imageWidth: "100%",
    imageHeight: "100%",
    background: "rgba(255, 0, 0, 0.1)",
    toast: true,
    position: "top",
    timer: "4000",
    timerProgressBar: true,
    showClass: {
      popup: "animate__animated animate__fadeInTopLeft",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutTopLeft",
    },
  });
}

/******
 * FUNCIÓN PARA MOSTRAR EL MENSAJE DE GANASTE.
 *****/

function ganaste() {
  Swal.fire({
    title: "Felicidades, Haz Acertado La Palabra.",
    color: "#ffffff",
    showConfirmButton: false,
    imageUrl: "/Image/LoL-Victory.png",
    imageWidth: "100%",
    imageHeight: "100%",
    background: "rgba(30, 255, 0, 0.1)",
    toast: true,
    position: "top",
    timer: "4000",
    timerProgressBar: true,
    showClass: {
      popup: "animate__animated animate__lightSpeedInLeft",
    },
    hideClass: {
      popup: "animate__animated animate__lightSpeedOutLeft",
    },
  });
}

// function recargar() {
//   location.reload();
// }

// dibujarLineas(escogerPalabraSecreta());
/* ----------------------------------
--------- MENU RESPONSIVE ---------
---------------------------------- */

// iconoMenu.addEventListener("click", () => {
//   if (contador === 0) {
//     enlaces.forEach(enlace => {
//       enlace.classList.add("active");
//     });
//     contador++;
//   } else {
//     enlaces.forEach(enlace => {
//       enlace.classList.remove("active");
//     });
//     contador = 0;
//   }
// });
