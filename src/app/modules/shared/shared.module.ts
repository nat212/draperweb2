import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WebcamModule } from 'ngx-webcam';
import { ChipFilterListComponent } from './components/chip-filter-list/chip-filter-list.component';
import { PictureUploadComponent } from './components/picture-upload/picture-upload.component';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [ChipFilterListComponent, ReversePipe, PictureUploadComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatButtonModule,
    WebcamModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  exports: [ChipFilterListComponent, ReversePipe, PictureUploadComponent],
})
export class SharedModule {}
