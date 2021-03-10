import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DatosService } from "../share/datos.service";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  url: String = "";
  titulo: String = "Bienvenido al Parking Puerto";
  eslogan: String = "Tu aparcamiento al mejor precio";

  vehiculo: String;
  constructor(private route: Router, private datosService: DatosService) {}

  encontrarVehiculo() {
    this.route.navigate(["buscar-vehiculo"]);
  }
  verPlano() {
    this.route.navigate(["plano"]);
  }
  aparcar() {
    this.route.navigate(["aparcar-vehiculo"]);
  }
  salir() {
    this.route.navigate(["salir"]);
  }
}
