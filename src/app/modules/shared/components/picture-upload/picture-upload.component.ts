import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { last, switchMap } from 'rxjs/operators';

interface PictureUploadData {
  filePath: string;
}

@Component({
  selector: 'dw-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.scss'],
})
export class PictureUploadComponent implements OnInit, AfterViewChecked {
  private blob: Blob;
  private dataUrl: string;

  uploadProgress$: Observable<number>;

  uploading: boolean;
  imageSet: boolean;
  imageWidth: number;
  imageHeight: number;

  @ViewChild('video') video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  capture$: Subject<void>;
  switchCamera$: Subject<boolean>;

  constructor(
    private readonly storage: AngularFireStorage,
    private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(MAT_DIALOG_DATA) private readonly data: PictureUploadData,
    private readonly dialogRef: MatDialogRef<PictureUploadComponent>,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.capture$ = new Subject();
    this.switchCamera$ = new Subject();
    this.imageSet = false;
  }

  ngAfterViewChecked() {
    this.calculateWidth();
    this.cdRef.detectChanges();
  }

  private async blobToDataUrl(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }

  async uploadFile(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];
    this.blob = file;
    this.dataUrl = await this.blobToDataUrl(file);
    target.value = null;
    this.onceImageSet();
  }

  async onCapture(event: WebcamImage) {
    this.dataUrl = event.imageAsDataUrl;
    this.blob = await fetch(event.imageAsDataUrl, { method: 'GET' }).then((resp) => resp.blob());
    this.onceImageSet();
  }

  private onceImageSet() {
    this.imageSet = true;
  }

  clearImage() {
    this.blob = null;
    this.dataUrl = null;
    this.imageSet = false;
  }

  get image() {
    return this.dataUrl;
  }

  submit() {
    const fileRef = this.storage.ref(this.data.filePath);
    const task = this.storage.upload(this.data.filePath, this.blob);
    this.uploadProgress$ = task.percentageChanges();
    this.uploading = true;
    task.snapshotChanges().pipe(last(), switchMap(() => fileRef.getDownloadURL())).subscribe(downloadUrl => {
      this.dialogRef.close(downloadUrl);
    });
  }

  @HostBinding('window:resize')
  calculateWidth() {
    this.imageWidth = Math.min(360, this.elementRef.nativeElement.clientWidth);
    this.imageHeight = this.elementRef.nativeElement.clientHeight;
    this.cdRef.detectChanges();
  }
}
