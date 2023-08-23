const $cartelAvisoTurno = document.getElementById("aviso-turno");
const $btnEmpezarJuego = document.getElementById("btn-empezar-juego");
const $cuadros = document.querySelectorAll("[name=cuadro]");

let secuenciaUsuario = [];
let ronda = 0;

$btnEmpezarJuego.onclick = empezarJuego;


function empezarJuego() {
  mostrarElementoOculto($cartelAvisoTurno);
  ocultarElemento($btnEmpezarJuego);
  gestionarRonda();
}
function gestionarRonda() {
  turnoSimon();
}
function turnoSimon() {
  simon.avisarTurno();
  simon.agregarCuadroASecuencia(simon.generarCuadroAlAzar());
  simon.agregarCuadroASecuencia(simon.generarCuadroAlAzar());
  simon.mostrarSecuencia();
}


const simon = {
  secuencia : [],
  avisarTurno : function () {
    $cartelAvisoTurno.textContent = "Turno de Simón";
  },
  generarCuadroAlAzar : function () {
    const indice = Math.floor(Math.random() * $cuadros.length);
    const $cuadro = $cuadros[indice];
    return $cuadro;
  },
  agregarCuadroASecuencia : function ($cuadro) {
    this.secuencia.push($cuadro);
  },
  mostrarSecuencia : function () {
    this.secuencia.forEach(function ($cuadro, indice) {
      const tiempoRetraso = (indice + 1) * 1000;
      setTimeout(() => {
        iluminarCuadro($cuadro)
      }, tiempoRetraso);
    })
  }
}

function iluminarCuadro($cuadro) {
  $cuadro.classList.remove("desactivo");
  $cuadro.classList.add("activo");
  setTimeout(() => {
    $cuadro.classList.remove("activo");
    $cuadro.classList.add("desactivo")
  }, 500);
}



function mostrarElementoOculto($elemento) {
  $elemento.classList.remove("d-none");
}
function ocultarElemento($elemento) {
  $elemento.classList.add("d-none")
}
