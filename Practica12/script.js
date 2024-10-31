class Nodo {
    constructor(auto) {
        this.auto = auto;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ColaCircularDoblementeLigada {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    insertar(auto) {
        const nuevo = new Nodo(auto);
        if (this.primero === null) {
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.primero.siguiente = this.primero;
            this.primero.anterior = this.ultimo;
        } else {
            this.ultimo.siguiente = nuevo;
            nuevo.anterior = this.ultimo;
            nuevo.siguiente = this.primero;
            this.primero.anterior = nuevo;
            this.ultimo = nuevo;
        }
        this.mostrarMensaje(`El auto con placas ${auto.placas} ha ingresado exitosamente.`, "success");
    }

    eliminar() {
        if (this.primero === null) {
            this.mostrarMensaje("El estacionamiento está vacío.", "error");
            return;
        }

        const auto = this.primero.auto;
        const horaSalida = new Date();
        const tiempoTotal = (horaSalida - auto.horaEntrada) / 1000; // tiempo en segundos
        const costo = tiempoTotal * 2;

        this.mostrarMensaje(`Salida de auto: 
            Placas: ${auto.placas}, Propietario: ${auto.propietario}, 
            Hora de entrada: ${auto.horaEntrada.toLocaleTimeString()}, 
            Hora de salida: ${horaSalida.toLocaleTimeString()}, 
            Tiempo: ${tiempoTotal.toFixed(2)} segundos, 
            Costo: $${costo.toFixed(2)}.`, "info");

        // Eliminar el auto de la cola
        if (this.primero === this.ultimo) {
            this.primero = null;
            this.ultimo = null;
        } else {
            this.primero = this.primero.siguiente;
            this.primero.anterior = this.ultimo;
            this.ultimo.siguiente = this.primero;
        }
    }

    mostrarMensaje(mensaje, tipo) {
        const log = document.getElementById("log");
        const p = document.createElement("p");
        p.className = tipo;
        p.innerText = mensaje;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight; // Auto-scroll al final
    }
}

const estacionamiento = new ColaCircularDoblementeLigada();

function entradaAuto() {
    const placas = document.getElementById("placas").value;
    const propietario = document.getElementById("propietario").value;
    if (placas && propietario) {
        const nuevoAuto = {
            placas: placas,
            propietario: propietario,
            horaEntrada: new Date(),
        };
        estacionamiento.insertar(nuevoAuto);
        document.getElementById("placas").value = "";
        document.getElementById("propietario").value = "";
    } else {
        estacionamiento.mostrarMensaje("Por favor ingrese las placas y el propietario.", "error");
    }
}

function salidaAuto() {
    estacionamiento.eliminar();
}
