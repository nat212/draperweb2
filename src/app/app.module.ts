import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, USE_EMULATOR as AUTH_EMULATOR } from '@angular/fire/auth';
import { AngularFirestoreModule, USE_EMULATOR as FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';

@NgModule({
  declarations: [AppComponent, MessageDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule.forRoot(),
    BrowserAnimationsModule,
    MatNativeDateModule,
    FlexLayoutModule,
    GridModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    {
      provide: FIRESTORE_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 8282],
    },
    {
      provide: AUTH_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 9099],
    },
  ],
  entryComponents: [MessageDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
