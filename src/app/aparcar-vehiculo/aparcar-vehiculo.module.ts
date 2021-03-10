import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AparcarVehiculoPageRoutingModule } from './aparcar-vehiculo-routing.module';

import { AparcarVehiculoPage } from './aparcar-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AparcarVehiculoPageRoutingModule
  ],
  declarations: [AparcarVehiculoPage]
})
export class AparcarVehiculoPageModule {}
