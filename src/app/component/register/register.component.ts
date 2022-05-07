import { NotificationType } from './../../enum/notification-type.enum';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './../../service/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotfiticationService } from 'src/app/service/notfitication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotfiticationService
  ) {}

  ngOnInit(): void {}

  onRegister(user: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: User) => {
          this.showLoading = false;
          this.sendNotification(
            NotificationType.SUCCESS,
            `You created account with user name ${response.username}`
          );
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
          this.showLoading = false;
        }
      )
    );
  }
  sendNotification(type: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(type, message);
    } else {
      this.notificationService.notify(
        type,
        'An error occurred. Please try again'
      );
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }
}
