import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarifListComponent } from './tarif-list/tarif-list.component';
import { TarifListItemComponent } from './tarif-list/tarif-list-item/tarif-list-item.component';
import { TarifDetailsComponent } from './tarif-details/tarif-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadTarifsComponent } from './upload-tarifs/upload-tarifs.component';

@NgModule({
  declarations: [
    AppComponent,
    TarifListComponent,
    TarifListItemComponent,
    TarifDetailsComponent,
    UploadTarifsComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
