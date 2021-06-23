import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GenericListFilterComponent } from './generic-list-filter.component';



@NgModule({
  declarations: [GenericListFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule
  ],
  exports: [GenericListFilterComponent]
})
export class GenericListFilterModule { }
