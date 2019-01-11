import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Components
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";

// Modules
import { AppRoutingModule } from "src/app/app-routing.module";
import { SharedModule } from "../shared/shared.module";

// Interceptors
import { AuthInterceptor } from "src/app/auth/auth.interceptor";
import { LoggingInterceptor } from "src/app/_services/logging.interceptor";
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        FooterComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
    ]
})
export class CoreModule {}