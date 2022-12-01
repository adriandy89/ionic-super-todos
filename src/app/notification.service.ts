import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type TypeOfNotification= 'success' | 'warning' | 'alert'

interface MessageProps {
  typeOfNotification: TypeOfNotification;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) {}

  async notify({typeOfNotification, message}: MessageProps) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'top',
      cssClass: typeOfNotification,
    });

    await toast.present();
  }
}
