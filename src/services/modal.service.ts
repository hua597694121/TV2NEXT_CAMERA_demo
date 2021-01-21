import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { PlatformService } from './platform.service';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(
        private platformService: PlatformService,
        private router: Router,
        private modalCtrl: ModalController
    ) {
        if (this.platformService.isiOSApp()) {
            this.subscribeRouter()
        }
    }

    async popup(component: any, cssClass: string | string[], data?: any, id?: string, animated = true) {
        const modal = await this.modalCtrl.create({
            component: component,
            cssClass: cssClass,
            animated: animated,
            swipeToClose: true,
            componentProps: data,
            mode: 'md',
            id: id
        })
        return await modal.present()
    }

    async dismiss(): Promise<boolean> {
        const overlay = await this.modalCtrl.getTop()
        if (overlay) {
            return await this.modalCtrl.dismiss()
        }
        return false
    }

    async getModal(): Promise<HTMLIonModalElement> {
        return this.modalCtrl.getTop()
    }

    private subscribeRouter() {
        this.router.events.pipe(
            tap(async event => {
                if (!(event instanceof NavigationEnd)) {
                    return
                }
                const modal = await this.getModal()
                if (!modal || modal.backdropDismiss === false) {
                    return
                }
                this.dismiss()
            }),
        ).subscribe()
    }

}