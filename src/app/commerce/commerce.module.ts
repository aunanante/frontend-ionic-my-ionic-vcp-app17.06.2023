import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommercePageRoutingModule } from './commerce-routing.module';

import { CommercePage } from './commerce.page';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommercePageRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule, 
    MatFormFieldModule
  ],
  declarations: [CommercePage]
})
export class CommercePageModule {}
