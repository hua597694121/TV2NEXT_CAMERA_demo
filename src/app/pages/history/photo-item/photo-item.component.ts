
import { PhotoInfo } from '@/services/camera.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.scss'],
})
export class PhotoItemComponent implements OnInit {

  @Input() item: PhotoInfo
  @Output() onSelectUrl: EventEmitter<string>
  imgUrl: string

  constructor() {
    this.onSelectUrl = new EventEmitter()
  }

  ngOnInit() {
    this.imgUrl = this.item.url
  }

  onImgLoadError(e: CustomEvent) { }

  viewImage() {
    this.onSelectUrl.emit(this.imgUrl)
  }

}
