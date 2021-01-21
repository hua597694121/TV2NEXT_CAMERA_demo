import { Component, enableProdMode } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalService } from '@/services/modal.service';

enableProdMode()

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private url: string
  private unsubscribe: Subject<void>

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private appMinimize: AppMinimize,
    private modalService: ModalService
  ) {
    this.initializeApp();
  }

  ngOnDestroy() {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  initializeApp() {
    this.unsubscribe = new Subject()
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.subscribeBackButon()
      this.subscribeRouter()
    });
  }

  private subscribeRouter() {
    this.router.events.pipe(
      tap(event => {
        if (event instanceof NavigationEnd) {
          this.url = event.url
        }
      }),
      takeUntil(this.unsubscribe)
    ).subscribe()
  }

  private subscribeBackButon() {
    this.platform.backButton.pipe(
      tap(async () => {
        if (!this.isRootRouter(this.url)) {
          return
        }
        const modalEle = await this.modalService.getModal()
        if (modalEle && modalEle.backdropDismiss) {
          this.modalService.dismiss()
        } else {
          this.appMinimize.minimize()
        }
      }),
      takeUntil(this.unsubscribe)
    ).subscribe()
  }

  private isRootRouter(url: string) {
    switch (url) {
      case '/':
      case '/home': {
        return true
      }
      default:
        return false
    }
  }

}
