import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  @ViewChild(IonTabs) tabs: IonTabs;
  selected = 'chat';
  onTab = false;

  constructor() {}

  ngOnInit() { }

  setSelectedTab(){
    //console.log('tab changed!');

    setTimeout(() => {
      this.selected = this.tabs.getSelected();
      //console.log('selected now: ', this.selected);
      this.onTab = this.selected === 'settings';

    });
  }
}
