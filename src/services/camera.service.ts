import { Injectable } from '@angular/core';
import { DestinationType, EncodingType, MediaType, PictureSourceType } from '@/models/camera';
import { Storage } from '@ionic/storage';
import { PHOTO_KEY } from '@/utils/constants';
import { ModalService } from './modal.service';
import { ToastService } from './toast.service';
import { Ion_Color } from '@/models/enum';

declare let navigator: any;

export interface PhotoInfo {
    id: string
    name: string
    date: string
    timeStamp: number
    url: string
}

@Injectable({
    providedIn: 'root'
})
export class CameraService {

    constructor(
        private storage: Storage,
        private toastService:ToastService
    ) { }

    async openCamera() {
        const options = {
            quality: 80,
            destinationType: DestinationType.DATA_URL,
            encodingType: EncodingType.PNG,
            mediaType: MediaType.PICTURE,
            saveToPhotoAlbum: true,
            sourceType: PictureSourceType.CAMERA,
            targetWidth: 1200,
            targetHeight: 1600
        }
        navigator.camera.getPicture(
            (data: PhotoInfo) => {
                console.log('Camera.getPicture: ' + JSON.stringify(data))
                this.storagePhotoInfo(data)
                this.toastService.popToast('Photo alreay saved!', Ion_Color.Success)
            },
            (error: any) => {
                console.log('openCamera error: ' + JSON.stringify(error))
            },
            options
        )
    }

    private storagePhotoInfo(info: PhotoInfo) {
        this.storage.set(`${PHOTO_KEY}${info.id}`, info)
    }

}