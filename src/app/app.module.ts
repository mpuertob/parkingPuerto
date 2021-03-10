import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { DatosService } from "./share/datos.service";
import { CopiaBBDDService } from "./share/copia-bbdd.service";
import { SqliteDbCopy } from "@ionic-native/sqlite-db-copy/ngx";
import { SQLite } from "@ionic-native/sqlite/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    SqliteDbCopy,
    CopiaBBDDService,
    DatosService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
