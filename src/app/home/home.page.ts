import { CameraService } from '@/services/camera.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private cameraService: CameraService
  ) { }

  onClick() {
    this.cameraService.openCamera()
  }

}
