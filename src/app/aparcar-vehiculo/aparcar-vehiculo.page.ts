import { Component, OnInit } from "@angular/core";
import { Aparcamiento } from "../core/model/Aparcamiento";
import { Coche } from "../core/model/Coche";
import { Vehiculos } from "../core/model/enumVehiculos";
import { Moto } from "../core/model/Moto";
import { Vehiculo } from "../core/model/Vehiculo";
import { VehiculoAdaptado } from "../core/model/VehiculoAdaptado";
import { DatosService } from "../share/datos.service";

@Component({
  selector: "app-aparcar-vehiculo",
  templateUrl: "./aparcar-vehiculo.page.html",
  styleUrls: ["./aparcar-vehiculo.page.scss"],
})
export class AparcarVehiculoPage implements OnInit {
  tiposVehiculos: String[] = [];
  mapaVehiculos: Map<String, Vehiculo> = new Map<String, Vehiculo>();
  vehiculoSeleccionado: Vehiculo;
  aparcamientosLibres: Number[] = [];
  constructor(private datosService: DatosService) {
    this.tiposVehiculos = Object.values(Vehiculos);
    this.mapaVehiculos.set(Vehiculos.Coche, new Coche("", ""));
    this.mapaVehiculos.set(Vehiculos.Moto, new Moto("", ""));
    this.mapaVehiculos.set(
      Vehiculos.VehiculoAdaptado,
      new VehiculoAdaptado("", "")
    );
  }
  buscarAparcamiento(vehiculo: String) {
    this.vehiculoSeleccionado = this.mapaVehiculos.get(vehiculo);
    let b: Boolean = confirm(
      `¿Seguro que desea buscar aparcamiento de ${vehiculo}?`
    );
    if (b) {
      this.aparcamientosLibres = this.datosService.buscarAparcamiento(vehiculo);
    }
  }
  aparcar(numeroAparcamiento: Number) {
    let matricula: string = prompt(
      "Introduce tu matricula para asignarte dicho aparcamiento"
    );
    if (matricula) {
      matricula = matricula.toUpperCase();
      const valid = this.datosService.validarMatricula(matricula);
      if (valid) {
        this.vehiculoSeleccionado.matricula = matricula;
        this.datosService.insertarVehiculo(this.vehiculoSeleccionado);
        this.datosService.aparcarVehiculo(
          numeroAparcamiento,
          this.vehiculoSeleccionado
        );
        alert("Vehiculo aparcado");
        this.vehiculoSeleccionado = null;
      }
    }
  }

  ngOnInit() {}
}
