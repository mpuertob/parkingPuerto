import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
    this.datosService
      .obtenerIdVehiculo(this.matricula)
      .then((datos: Array<any>) => {
        if (datos.length > 0) {
          datos.forEach((el) => {
            this.datosService.vaciarAparcamiento(el.id).then(() => {
              this.datosService.borrarVehiculo(this.matricula);
              this.mostrar = null;
              this.matricula = null;
              alert("Hasta Pronto amigo 👍");
              this.volverHome();
            });
          });
        } else {
          this.mostrar = null;
          this.matricula = null;
          this.fallo = true;
          this.noEncontrado = "Lo siento, su vehículo no se ha encontrado.";
        }
      });
  }
  validar() {
    this.mostrar = this.datosService.validarMatricula(this.matricula);
  }
  volverHome() {
    this.route.navigate([""]);
  }
  ngOnInit() {}
}
