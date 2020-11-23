import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ChipFilterListComponent } from './components/chip-filter-list/chip-filter-list.component';

@NgModule({
  declarations: [ChipFilterListComponent],
  imports: [CommonModule, MatChipsModule],
  exports: [ChipFilterListComponent],
})
export class SharedModule {}
