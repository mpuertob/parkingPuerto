import { Injectable } from "@angular/core";
import { SqliteDbCopy } from "@ionic-native/sqlite-db-copy/ngx";
import { Platform } from "@ionic/angular";
@Injectable({
  providedIn: "root",
})
export class CopiaBBDDService {
  constructor(private sqlDbCopy: SqliteDbCopy, private platform: Platform) {}
  // constructor(private platform: Platform) {}

  async copiarBBDD(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.platform
        .ready()
        .then(() => {
          this.sqlDbCopy
            .copy("bbddParking.db", 0)
            .then(() => {
              resolve("Copia terminada");
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => {});
    });
  }
}
