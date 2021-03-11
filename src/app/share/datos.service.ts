import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";
import { Vehiculo } from "../core/model/Vehiculo";
import { CopiaBBDDService } from "./copia-bbdd.service";

@Injectable({
  providedIn: "root",
})
export class DatosService {
  private db: SQLiteObject;
  private mapaVehiculos: Map<String, Vehiculo> = new Map<String, Vehiculo>();
  private mapaAparcamientos: Map<String, Number> = new Map<String, Number>();
  private mapaAparcamientosTipos: Map<String, Array<Number>> = new Map<
    String,
    Array<Number>
  >();
  constructor(
    private platform: Platform,
    private copiaBBDD: CopiaBBDDService,
    private sqlite: SQLite
  ) {
    this.crearMapaAparcamientosTipo();
    this.platform
      .ready()
      .then(() => {
        this.copiaBBDD
          .copiarBBDD()
          .then(() => {})
          .catch(() => {});
      })
      .catch(() => {});
  }
  private crearMapaAparcamientosTipo() {
    this.mapaAparcamientosTipos.set("VehiculoAdaptado", [1, 2, 3, 4, 5, 6]);
    this.mapaAparcamientosTipos.set("Moto", [7, 8, 9]);
    this.mapaAparcamientosTipos.set("Coche", [
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ]);
  }
  executeSentence(target: any[], sqlSentence: string, searchParam: any[]) {
    return new Promise<any>((resolveUno, rejectUno) => {
      let consultable = true;
      new Promise((resolve, reject) => {
        if (!this.db) {
          this.openDB()
            .then(() => {
              resolve(consultable);
            })
            .catch(() => {
              consultable = false;
              reject(consultable);
            });
        } else {
          resolve(consultable);
        }
      })
        .then((bandera) => {
          if (bandera) {
            this.db
              .executeSql(sqlSentence, searchParam)
              .then((data) => {
                for (let i = 0; i < data.rows.length; i++) {
                  let obj = data.rows.item(i);
                  target.push(obj);
                }
                resolveUno(target);
              })
              .catch((e) => {});
          }
        })
        .catch((err) => {});
    });
  }
  rastrear(matricula: String): Number {
    return this.mapaAparcamientos.get(matricula);
  }
  buscarAparcamiento(tipo: String) {
    return this.mapaAparcamientosTipos.get(tipo);
  }
  insertarVehiculo(vehiculo: Vehiculo) {
    this.mapaVehiculos.set(vehiculo.matricula, vehiculo);
    alert("Vehiculo insertado correctamente");
  }
  borrarVehiculo(matricula: String) {
    alert("Vehiculo borrado correctamente");
    this.mapaVehiculos.delete(matricula);
  }

  aparcarVehiculo(numeroAparcamiento: Number, vehiculoSeleccionado: Vehiculo) {
    this.mapaAparcamientos.set(
      vehiculoSeleccionado.matricula,
      numeroAparcamiento
    );
    let arrayAparcamientos = this.mapaAparcamientosTipos.get(
      vehiculoSeleccionado.toString()
    );
    arrayAparcamientos = this.eliminarAparcamiento(
      arrayAparcamientos,
      numeroAparcamiento
    );
    this.mapaAparcamientosTipos.set(
      vehiculoSeleccionado.toString(),
      arrayAparcamientos
    );
  }
  vaciarAparcamiento(id: number) {
    const sql =
      "UPDATE Aparcamientos SET  idVehiculo = NULL WHERE Numero = (SELECT Numero FROM Aparcamientos WHERE idVehiculo = ?);";
    return this.executeSentence([], sql, [id]);
  }
  obtenerIdVehiculo(matricula: String) {
    const sql =
      "Select Vehiculos.id from Vehiculos WHERE Vehiculos.Matricula = ?;";
    return this.executeSentence([], sql, [matricula]);
  }
  obtenerNumeroDeAparcamientosOcupados(): number {
    return this.mapaVehiculos.size;
  }
  obtenerNumeroTotalDeAparcamiento() {
    let aparcamientosFinales: Array<Number> = this.mapaAparcamientosTipos.get(
      "Coche"
    );
    let longitud = aparcamientosFinales.length - 1;
    let aparcamientoFinal = aparcamientosFinales[longitud];
    return aparcamientoFinal;
  }
  obtenerTodasLasMatriculas() {
    return this.mapaVehiculos.keys();
  }
  openDB(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.platform
        .ready()
        .then(() => {
          this.sqlite
            //si la bbdd no existe la crea y la abre y si existe la abre
            .create(this.getConector())
            .then((db: SQLiteObject) => {
              this.db = db;
              resolve("BBDD preparada");
            })
            .catch((err) => {
              reject("Error en la preparación de la bbdd: " + err);
            });
        })
        .catch();
    });
  }
  private getConector() {
    return {
      name: "bbddParking.db",
      location: "default",
      createFromLocation: 1,
    };
  }
  validarDato(datoAvalidar: string, pattern: RegExp): Boolean {
    return pattern.test(datoAvalidar);
  }
  getValidadorMatricula() {
    let validador: string = "^\\d{4}[-][a-zA-Z]{3}$";
    return validador;
  }
  validarMatricula(matricula: string): Boolean {
    const validador = /^\d{4}[-][a-zA-Z]{3}$/;
    return this.validarDato(matricula, validador);
  }
  private eliminarAparcamiento(
    array: Array<Number>,
    numeroAparcamiento: Number
  ): Array<Number> {
    let posicion = array.indexOf(numeroAparcamiento);
    if (posicion !== -1) {
      array.splice(posicion, 1);
    }
    return array;
  }
}
