import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ChipFilterListComponent } from './components/chip-filter-list/chip-filter-list.component';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [ChipFilterListComponent, ReversePipe],
  imports: [CommonModule, MatChipsModule],
  exports: [ChipFilterListComponent, ReversePipe],
})
export class SharedModule {}
