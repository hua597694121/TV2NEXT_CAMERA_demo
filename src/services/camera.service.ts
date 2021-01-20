import { Injectable } from '@angular/core';
import { DestinationType, EncodingType, MediaType, PictureSourceType } from '@/models/camera';

declare let navigator: any;

@Injectable({
    providedIn: 'root'
})
export class CameraService {

    constructor(
    ) { }

    async openCamera() {
        const options = {
            quality: 100,
            destinationType: DestinationType.DATA_URL,
            encodingType: EncodingType.PNG,
            mediaType: MediaType.PICTURE,
            saveToPhotoAlbum: true,
            sourceType: PictureSourceType.CAMERA,
            targetWidth: 800, // required
            targetHeight: 800 // required
        }
        navigator.camera.getPicture(
            (data: string) => {
                console.log('Camera.getPicture: ' + data)
            },
            (error: any) => {
                console.log('openCamera error: ' + JSON.stringify(error))
            },
            options
        )
    }

}