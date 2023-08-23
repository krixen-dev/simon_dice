const $cartelAvisoTurno = document.getElementById("aviso-turno");
const $btnEmpezarJuego = document.getElementById("btn-empezar-juego");
const $cuadros = document.querySelectorAll("[name=cuadro]");

let ronda = 0;

$btnEmpezarJuego.onclick = empezarJuego;

function empezarJuego() {
  mostrarElementoOculto($cartelAvisoTurno);
  ocultarElemento($btnEmpezarJuego);
  gestionarRonda();
}
function gestionarRonda() {
  turnoSimon();
  setTimeout(() => {
    turnoUsuario();
  }, (simon.secuencia.length + 1) * 1000);

}
function turnoSimon() {
  simon.avisarTurno();
  simon.bloquearInputsUsuario();
  simon.agregarCuadroASecuencia(simon.generarCuadroAlAzar());
  simon.mostrarSecuencia();
}
function turnoUsuario() {
  usuario.avisarTurno();
  usuario.desbloquearInputs();
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
  },
  bloquearInputsUsuario : function () {
    $cuadros.forEach($cuadro => {
      $cuadro.style.cursor = "not-allowed"
      $cuadro.onclick = function () {
      }
    });
  }
}

const usuario = {
  secuencia : [],
  avisarTurno : function () {
    $cartelAvisoTurno.textContent = "Turno del usuario";
  },
  desbloquearInputs : function () {
    const self = this;
    $cuadros.forEach(function ($cuadro) {
      $cuadro.style.cursor = "pointer"
      $cuadro.onclick = function (e) {
        self.verificarCoincidencias(e);
      }
    });
  },
  verificarCoincidencias : function (e) {
    const $cuadro = e.target;
    this.secuencia.push($cuadro);
    iluminarCuadro($cuadro);
    const $cuadroActualSimon = this.secuencia.length -1;
    if (this.secuencia.length === simon.secuencia.length) {
      this.secuencia = [];
      setTimeout(() => {
        gestionarRonda();
      }, 1000);
    }
    if ($cuadro.id !== simon.secuencia[$cuadroActualSimon].id) {
      alert("cuadro equivocado, pierde");
      return;
    }
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
