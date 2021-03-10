import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarVehiculoPageRoutingModule } from './buscar-vehiculo-routing.module';

import { BuscarVehiculoPage } from './buscar-vehiculo.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BuscarVehiculoPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [BuscarVehiculoPage]
})
export class BuscarVehiculoPageModule {}
