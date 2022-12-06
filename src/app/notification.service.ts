import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type TypeOfNotification= 'success' | 'warning' | 'alert'

interface MessageProps {
  typeOfNotification: TypeOfNotification;
  message: string;
}

abstract class NotificationClass {
  abstract notify(messageProps: MessageProps): Promise<void>
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends NotificationClass {

  constructor(private toastController: ToastController) {super()}

  async notify({typeOfNotification, message}: MessageProps): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'top',
      cssClass: typeOfNotification,
    });

    await toast.present();
  }
}
