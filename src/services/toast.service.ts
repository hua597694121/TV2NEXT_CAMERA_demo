import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(
        private toastCtrl: ToastController,
    ) {
    }

    async popToast(message: string, color?: string) {
        const toast = await this.toastCtrl.create({
            message: message,
            color: color,
            position: 'middle',
            duration: 2000
        });
        await toast.present();
    }

}
