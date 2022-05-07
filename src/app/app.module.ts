import { UserComponent } from './component/user/user.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NotfiticationService } from './service/notfitication.service';
import { AuthenticationGuardInterceptor } from './interceptor/authentication-guard.interceptor';
import { UserService } from './service/user.service';
import { AuthenticationService } from './service/authentication.service';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationModule } from './notification.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
  ],
  providers: [
    NotfiticationService,
    AuthenticationGuard,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationGuardInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
