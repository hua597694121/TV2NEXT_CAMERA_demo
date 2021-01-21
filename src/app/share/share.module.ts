import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { PhotoViewerComponent } from '../components/photo-viewer/photo-viewer.component';
import { PhotoViewerContainer } from '../components/photo-viewer/photo-viewer-container';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        IonicStorageModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        IonicStorageModule,
        PhotoViewerComponent,
        PhotoViewerContainer
    ],
    declarations: [
        PhotoViewerComponent,
        PhotoViewerContainer
    ],
    providers: [],
    entryComponents: []
})
export class ShareModule { }
