import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import * as PhotoSwipe from 'photoswipe';

@Component({
  selector: 'photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss'],
})
export class PhotoViewerComponent {
  private readonly defaultWitdh = this.platform.width()
  private readonly defaultHeight = this.defaultWitdh * 3 / 4

  constructor(
    private platform: Platform
  ) { }

  open(urls: string[]): PhotoSwipe<PhotoSwipe.Options> {
    const images: PhotoSwipe.Item[] = []
    urls.forEach(url => {
      images.push(this.getPhotoOption(url))
    })

    const pswpEle = document.querySelectorAll('.pswp')[0] as HTMLElement
    const options: PhotoSwipe.Options = { index: 0 }

    const gallery = new PhotoSwipe(pswpEle, PhotoSwipeUI_Default, images, options)
    gallery.init()

    return gallery
  }

  private getPhotoOption(url: string) {
    const image = new Image()
    image.src = url
    let width = this.defaultWitdh
    let height = this.defaultHeight

    if (image.complete) {
      width = image.width
      height = image.height
    }

    return { src: url, w: width, h: height }
  }

}
