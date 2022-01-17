import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

import SwiperCore from 'swiper';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  @ViewChild(IonTabs) tabs: IonTabs;
  selected = 'event';
  onTab = false;

  constructor() {}

  ngOnInit() { }

  setSelectedTab(){
    console.log('tab changed: ' + this.tabs.getSelected());

    setTimeout(() => {
      this.selected = this.tabs.getSelected();
      //console.log('selected now: ', this.selected);
      this.onTab = this.selected === 'settings';
      //this.onTab = this.selected === 'event';
    });
  }
}
