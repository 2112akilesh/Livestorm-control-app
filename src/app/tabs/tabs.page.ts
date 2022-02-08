import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';
import SwiperCore from 'swiper';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  @ViewChild(IonTabs) tabs: IonTabs;
  selected = 'events';
  onTab = false;
  onSettings = false;
  constructor(
    private router: Router,
    ) {}

  ngOnInit() { }

  setSelectedTab(){
    console.log('tab changed: ' + this.tabs.getSelected());

    setTimeout(() => {
      this.selected = this.tabs.getSelected();

      //get router url
      const url = this.router.url;
      const urlArray = url.split('/');
      const urlLast = urlArray[urlArray.length - 2];
      //console.log(urlLast);
      //console.log('selected now: ', this.selected);


      this.onTab = this.selected === 'settings';
      this.onSettings = urlLast === 'chat';
    });
  }
}
