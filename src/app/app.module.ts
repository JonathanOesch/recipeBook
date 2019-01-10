import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ToastMessageComponent } from './core/toast-message/toast-message.component';

// PrimeNg
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

//Pipes

@NgModule({
  declarations: [
    AppComponent,
    ToastMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
    AppRoutingModule,
    CoreModule,
    ToastModule
  ],
  bootstrap: [AppComponent],
  providers: [MessageService]
})
export class AppModule { }
