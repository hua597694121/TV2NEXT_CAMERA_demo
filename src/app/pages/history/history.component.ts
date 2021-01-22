import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PHOTO_KEY, URI_SCHEME_BASE64_PNG } from '@/utils/constants';
import { PhotoInfo } from '@/services/camera.service';
import { NavController } from '@ionic/angular';
import { PlatformService } from '@/services/platform.service';
import { ModalService } from '@/services/modal.service';
import { PhotoViewerComponent } from '@/app/components/photo-viewer/photo-viewer.component';
import { PhotoViewerContainer } from '@/app/components/photo-viewer/photo-viewer-container';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @ViewChild(PhotoViewerComponent) photoViewer: PhotoViewerComponent

  itemList: PhotoInfo[]

  show = true

  constructor(
    private nav: NavController,
    private storage: Storage,
    private platformService: PlatformService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    if (this.platformService.isAndroidApp()) {
      this.show = false
    } else {
      this.show = true
    }
    this.listPhotoInfo()

    // this.fakeData()
  }


  private async listPhotoInfo() {
    this.itemList = []
    try {
      const keyList = await this.storage.keys()
      console.log('keyList: ' + JSON.stringify(keyList))
      keyList.forEach(async key => {
        if (key.indexOf(PHOTO_KEY) !== -1) {
          const info: PhotoInfo = await this.storage.get(key)
          if (info) {
            info.url = `${URI_SCHEME_BASE64_PNG}${info.url}`
            this.itemList.push(info)
          }
        }
      })
      this.itemList = this.itemList.reverse()
    } catch (error) { }

  }

  back() {
    this.nav.back()
  }

  openPhotoViewer(url: string) {
    if (this.platformService.isAndroidApp()) {
      this.modalService.popup(
        PhotoViewerContainer,
        ['photo_swipe'],
        {
          imgUrl: url,
          onDestory: () => this.modalService.dismiss()
        },
        'photo-swipe',
        false
      )
    } else {
      this.photoViewer.open([url])
    }
  }

  private fakeData() {
    this.itemList = [
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' },
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' },
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' },
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' },
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' },
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' },
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' },
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' },
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' },
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' },
      { id: '123', name: 'IMG_20201201_132213.png', date: '2020-12-01 13:22:13', timeStamp: 1611210127000, url: 'https://st-cn.meishij.net/r/181/98/13899681/s13899681_161103556366125.jpg' }
    ]
  }
}
