import { NotificationType } from './../../enum/notification-type.enum';
import { HeaderType } from './../../enum/header-type.enum';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NotfiticationService } from './../../service/notfitication.service';
import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public showLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotfiticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }

  public onLogin(user: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          if (token) this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body as any);
          this.router.navigateByUrl('/user/management');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse.error.message);
          this.sendErrorNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.showLoading = false;
        }
      )
    );
  }

  sendErrorNotification(
    notificationType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(
        notificationType,
        'An error occurred. Please try again.'
      );
    }
  }
}
