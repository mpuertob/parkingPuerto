import { Component, OnInit } from "@angular/core";
import { DatosService } from "../share/datos.service";

@Component({
  selector: "app-plano",
  templateUrl: "./plano.page.html",
  styleUrls: ["./plano.page.scss"],
})
export class PlanoPage implements OnInit {
  numeroDeAparcamientosOcupados: Number;
  porcentajeOcupabilidad: Number;
  numeroTotalAparcamiento: number;
  matriculasActivas: Array<String> = [];
  constructor(private datosService: DatosService) {
    this.obtenerPorcentajeOcupabilidad();
    this.obtenerTodasLasMatriculas();
  }

  ngOnInit() {}
  private obtenerNumeroDeVehiculosAparcados() {
    let numero = this.datosService.obtenerNumeroDeAparcamientosOcupados();
    this.numeroDeAparcamientosOcupados = numero;
    return numero;
  }
  obtenerPorcentajeOcupabilidad() {
    let porcentajeTotal: number = 100;
    let porcentajeActivo: number;
    this.numeroTotalAparcamiento = <number>(
      this.datosService.obtenerNumeroTotalDeAparcamiento()
    );
    let numero = this.obtenerNumeroDeVehiculosAparcados();
    let numeroVehiculosAparcados = numero;
    porcentajeActivo =
      (numeroVehiculosAparcados * porcentajeTotal) /
      this.numeroTotalAparcamiento;
    this.porcentajeOcupabilidad = porcentajeActivo;
  }
  obtenerTodasLasMatriculas() {
    let matriculas = Array.from(this.datosService.obtenerTodasLasMatriculas());
    matriculas.forEach((matricula) => {
      this.matriculasActivas.push(matricula);
    });
  }
  matriculas() {
    return this.matriculasActivas.length > 0;
  }
}
