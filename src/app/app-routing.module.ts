import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'plano',
    loadChildren: () =>
      import('./plano/plano.module').then((m) => m.PlanoPageModule),
  },

  {
    path: 'buscar-vehiculo',
    loadChildren: () =>
      import('./buscar-vehiculo/buscar-vehiculo.module').then(
        (m) => m.BuscarVehiculoPageModule
      ),
  },
  {
    path: 'aparcar-vehiculo',
    loadChildren: () =>
      import('./aparcar-vehiculo/aparcar-vehiculo.module').then(
        (m) => m.AparcarVehiculoPageModule
      ),
  },
  {
    path: 'salir',
    loadChildren: () => import('./salir/salir.module').then( m => m.SalirPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
