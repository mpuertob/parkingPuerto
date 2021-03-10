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

  constructor(
    private platform: Platform,
    private copiaBBDD: CopiaBBDDService,
    private sqlite: SQLite
  ) {
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
  rastrear(matricula: String) {
    const sql =
      "select Aparcamientos.Numero from Aparcamientos where Aparcamientos.idVehiculo = (Select Vehiculos.id from Vehiculos where Vehiculos.Matricula = ?)";
    let localizacion: String[] = [];
    return new Promise<any>((resolve, reject) => {
      this.executeSentence(localizacion, sql, [matricula])
        .then((datos) => {
          resolve(datos);
        })
        .catch();
    });
  }
  buscarAparcamiento(tipo: String) {
    const sql =
      "select Aparcamientos.Numero from Aparcamientos where (Aparcamientos.idVehiculo is NULL) AND Aparcamientos.idTipoVehiculo = (select TipoVehiculos.id from TipoVehiculos where TipoVehiculos.Nombre = ?)";
    let listaAparcamientosLibres: String[] = [];
    return this.executeSentence(listaAparcamientosLibres, sql, [tipo]);
  }
  insertarVehiculo(vehiculo: Vehiculo) {
    let tipo: String = vehiculo.toString();
    let matricula: String = vehiculo.matricula;
    const sql =
      "INSERT INTO Vehiculos (Matricula,idTipoVehiculo) VALUES (?,?);";
    return this.executeSentence([], sql, [matricula, tipo]);
  }
  borrarVehiculo(matricula: String) {
    const sql = "DELETE FROM Vehiculos WHERE Matricula = ?;";
    return this.executeSentence([], sql, [matricula]);
  }

  aparcarVehiculo(numeroAparcamiento: Number, vehiculoSeleccionado: Vehiculo) {
    const sql =
      "UPDATE Aparcamientos SET idVehiculo=(Select Vehiculos.id from Vehiculos WHERE Vehiculos.Matricula = ?), idTipoVehiculo=(Select Vehiculos.idTipoVehiculo from Vehiculos WHERE Vehiculos.Matricula = ?) WHERE Numero=?;";

    return this.executeSentence([], sql, [
      vehiculoSeleccionado.matricula,
      vehiculoSeleccionado.matricula,
      numeroAparcamiento,
    ]);
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
  obtenerNumeroDeAparcamientosOcupados() {
    const sql =
      "Select count(*) as cuenta from Aparcamientos WHERE idVehiculo not NULL";
    return this.executeSentence([], sql, []);
  }
  obtenerNumeroTotalDeAparcamiento() {
    const sql = "Select count(*) as cuenta from Aparcamientos WHERE 1";
    return this.executeSentence([], sql, []);
  }
  obtenerTodasLasMatriculas() {
    const sql = "SELECT Vehiculos.Matricula from Vehiculos";
    return this.executeSentence([], sql, []);
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
}
