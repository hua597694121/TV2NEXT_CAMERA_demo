import { Component, Input, ViewChild } from '@angular/core';
import { PhotoViewerComponent } from './photo-viewer.component';

@Component({
    selector: 'photo-viewer-container',
    template: `<photo-viewer></photo-viewer>`
})
export class PhotoViewerContainer {
    @ViewChild(PhotoViewerComponent) photoViewer: PhotoViewerComponent
    @Input() imgUrl: string
    @Input() onDestory: () => void

    ngAfterViewInit() {
        setTimeout(() => {
            const gallery = this.photoViewer.open([this.imgUrl])
            if (gallery) {
                gallery.listen('destroy', () => this.onDestory())
            }
        }, 0)
    }

}