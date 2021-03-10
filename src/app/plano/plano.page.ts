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
    return new Promise<number>((resolve, reject) => {
      this.datosService
        .obtenerNumeroDeAparcamientosOcupados()
        .then((datos) => {
          let numero = datos[0].cuenta;
          this.numeroDeAparcamientosOcupados = numero;
          resolve(numero);
        })
        .catch(() => {
          reject(0);
        });
    });
  }
  obtenerPorcentajeOcupabilidad() {
    let porcentajeTotal: number = 100;
    let porcentajeActivo: number;
    this.datosService.obtenerNumeroTotalDeAparcamiento().then((datos) => {
      this.numeroTotalAparcamiento = datos[0].cuenta;
      this.obtenerNumeroDeVehiculosAparcados().then((numero) => {
        let numeroVehiculosAparcados = numero;
        porcentajeActivo =
          (numeroVehiculosAparcados * porcentajeTotal) /
          this.numeroTotalAparcamiento;
        this.porcentajeOcupabilidad = porcentajeActivo;
      });
    });
  }
  obtenerTodasLasMatriculas() {
    this.datosService.obtenerTodasLasMatriculas().then((datos) => {
      datos.forEach((obj) => {
        this.matriculasActivas.push(obj.Matricula);
      });
    });
  }
  matriculas() {
    return this.matriculasActivas.length > 0;
  }
}
