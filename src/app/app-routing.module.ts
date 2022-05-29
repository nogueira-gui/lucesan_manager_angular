import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './imagen/lista.component';
import { NuevaComponent } from './imagen/nueva.component';
import { DetalleComponent } from './imagen/detalle.component';
import { CategoryComponent } from './imagen/category.component';
import { CampaignComponent } from './imagen/campaign.component';

const routes: Routes = [
  {path: '', component: ListaComponent},
  {path: 'product', component: NuevaComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'campaign', component: CampaignComponent},
  {path: 'detalle', component: DetalleComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
