import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DatosService } from "../share/datos.service";
import { ValidatorService } from "./validator.service";

@Component({
  selector: "app-buscar-vehiculo",
  templateUrl: "./buscar-vehiculo.page.html",
  styleUrls: ["./buscar-vehiculo.page.scss"],
})
export class BuscarVehiculoPage implements OnInit {
  matricula: String;
  frase: String = "Matricula Format: 1234-ABC";
  validador: string;
  localizacionVehiculo: String;
  noEncontrado: String;
  mostrar: Boolean;
  ejemploForm: FormGroup;
  nombreControles;
  constructor(
    private datosService: DatosService,
    private validators: ValidatorService
  ) {
    this.ejemploForm = this.validators.getFormGroup();
    this.nombreControles = this.validators.nombreControles;
    this.validador = this.datosService.getValidadorMatricula();
  }

  rastrear() {
    this.matricula = this.matricula.toUpperCase();
    let numeroAparcamiento = this.datosService.rastrear(this.matricula);

    if (numeroAparcamiento != undefined) {
      this.localizacionVehiculo =
        "Su vehiculo ha sido encontrado en el Aparcamiento: " +
        numeroAparcamiento;
    } else {
      this.localizacionVehiculo = undefined;
      this.noEncontrado = "Lo siento, su vehículo no se ha encontrado.";
    }
  }
  validateControl(item) {
    this.mostrar = this.validators.validateControl(item);
    return this.validators.validateControl(item);
  }
  getErrorMessage(item) {
    return this.validators.getErrorMessage(item);
  }
  ngOnInit() {}
}
