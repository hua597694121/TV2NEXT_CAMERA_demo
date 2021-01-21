import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PlatformService {
    /**
    * | Platform Name   | Description                        |
    * |-----------------|------------------------------------|
    * | android         | on a device running Android.       |
    * | cordova         | on a device running Cordova.       |
    * | ios             | on a device running iOS.           |
    * | ipad            | on an iPad device.                 |
    * | iphone          | on an iPhone device.               |
    * | phablet         | on a phablet device.               |
    * | tablet          | on a tablet device.                |
    * | electron        | in Electron on a desktop device.   |
    * | pwa             | as a PWA app.                      |
    * | mobile          | on a mobile device.                |
    * | mobileweb       | on a mobile device in a browser.   |
    * | desktop         | on a desktop device.               |
    * | hybrid          | is a cordova or capacitor app.     |
    */

    isAndroid: boolean
    isIOS: boolean
    isIphone: boolean
    isIpad: boolean

    isMobile: boolean
    isMobileweb: boolean
    isPhablet: boolean
    isTablet: boolean
    isDesktop: boolean

    constructor(
        private platform: Platform
    ) {
        this.init()
    }

    init() {
        this.isAndroid = this.platform.is('android')
        this.isIOS = this.platform.is('ios')
        this.isIphone = this.platform.is('iphone')
        this.isIpad = this.platform.is('ipad')

        this.isMobile = this.platform.is('mobile')
        this.isMobileweb = this.platform.is('mobileweb')
        this.isPhablet = this.platform.is('phablet')
        this.isTablet = this.platform.is('tablet')
        this.isDesktop = this.platform.is('desktop')

        console.log('is android: ' + this.isAndroid)
        console.log('is ios: ' + this.isIOS)
        console.log('is ipad: ' + this.isIpad)
        console.log('is iphone: ' + this.isIphone)

        console.log('is mobile: ' + this.isMobile)
        console.log('is mobileweb: ' + this.isMobileweb)
        console.log('is phablet: ' + this.isPhablet)
        console.log('is tablet: ' + this.isTablet)
        console.log('is desktop: ' + this.isDesktop)
    }

    getPlatformInstance() {
        return this.platform
    }

    isMobileApp() {
        if (this.isAndroidApp() || this.isiOSApp()) {
            return true
        }
        return false
    }

    isAndroidApp(): boolean {
        if (this.isAndroid && !this.isMobileweb) {
            return true
        }
        return false
    }

    isiOSApp(): boolean {
        if (this.isIOS && !this.isMobileweb) {
            return true
        }
        return false
    }

    isDesktopBrowser(): boolean {
        if (this.isMobileweb || this.isDesktop) {
            return true
        }
        return false
    }

}
