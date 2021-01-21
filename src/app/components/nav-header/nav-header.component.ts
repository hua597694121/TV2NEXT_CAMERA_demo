import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  @Input() title: string
  show: boolean

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.show = true
   }

  back() {
    this.show = false
    this.navCtrl.back()
  }

}
