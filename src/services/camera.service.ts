import { Injectable } from '@angular/core';
import { DestinationType, EncodingType, MediaType, PictureSourceType } from '@/models/camera';

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
    ) { }

    async openCamera() {
        const options = {
            quality: 100,
            destinationType: DestinationType.DATA_URL,
            encodingType: EncodingType.PNG,
            mediaType: MediaType.PICTURE,
            saveToPhotoAlbum: true,
            sourceType: PictureSourceType.CAMERA,
            // targetWidth: 800, // required
            // targetHeight: 800 // required
        }
        navigator.camera.getPicture(
            (data: PhotoInfo) => {
                console.log('Camera.getPicture: ' +  JSON.stringify(data))
            },
            (error: any) => {
                console.log('openCamera error: ' + JSON.stringify(error))
            },
            options
        )
    }

}