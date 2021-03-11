import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Vehiculo } from "../core/model/Vehiculo";
import { DatosService } from "../share/datos.service";

@Component({
  selector: "app-salir",
  templateUrl: "./salir.page.html",
  styleUrls: ["./salir.page.scss"],
})
export class SalirPage implements OnInit {
  mostrar: Boolean;
  matricula: string;
  frase: String = "Matricula Format: 1234-ABC";
  validador: string;
  noEncontrado: String;
  fallo: Boolean;
  constructor(private route: Router, private datosService: DatosService) {
    this.validador = this.datosService.getValidadorMatricula();
  }
  salir() {
    this.matricula = this.matricula.toUpperCase();
    let numeroAparcamiento = this.datosService.rastrear(this.matricula);
    let vehiculo: Vehiculo = this.datosService.obtenerVehiculo(this.matricula);
    if (vehiculo) {
      this.datosService.vaciarAparcamiento(numeroAparcamiento, vehiculo);
      this.datosService.borrarVehiculo(this.matricula);
      this.mostrar = null;
      this.matricula = null;
      alert("Hasta Pronto amigo 👍");
      this.volverHome();
    } else {
      this.mostrar = null;
      this.matricula = null;
      this.fallo = true;
      this.noEncontrado = "Lo siento, su vehículo no se ha encontrado.";
    }
  }
  validar() {
    this.mostrar = this.datosService.validarMatricula(this.matricula);
  }
  volverHome() {
    this.route.navigate([""]);
  }
  ngOnInit() {}
}
