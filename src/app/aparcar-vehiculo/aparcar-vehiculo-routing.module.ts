import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AparcarVehiculoPage } from './aparcar-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: AparcarVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AparcarVehiculoPageRoutingModule {}
