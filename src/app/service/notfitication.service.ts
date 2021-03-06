import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root',
})
export class NotfiticationService {
  constructor(private notifier: NotifierService) {}

  public notify(type: NotificationType, message: string) {
    return this.notifier.notify(type, message);
  }
}
