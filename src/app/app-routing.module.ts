import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifDetailsComponent } from './tarif-details/tarif-details.component';
import { TarifListComponent } from './tarif-list/tarif-list.component';
import { UploadTarifsComponent } from './upload-tarifs/upload-tarifs.component';

const routes: Routes = [
  { path: 'tarifs/upload', component: UploadTarifsComponent },
  { path: 'tarifs/:tarifId', component: TarifDetailsComponent },
  { path: 'tarifs', component: TarifListComponent },
  { path: '', redirectTo: 'tarifs', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
