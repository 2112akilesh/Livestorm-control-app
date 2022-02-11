import { Component, OnInit, Input } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
// import { lastValueFrom } from 'rxjs';

//importing chat services
import { PubsubService } from 'src/app/core/services/post/pubsub.service';

@Component({
  selector: 'app-text-message',
  templateUrl: './text-message.component.html',
  styleUrls: ['./text-message.component.scss'],
})
export class TextMessageComponent implements OnInit {

  @Input() orgId = '';
  @Input() ionContent: IonContent;


  messageControl: FormControl = new FormControl('', [Validators.required]);
  chatMessage = '';

  constructor(
    public pubsubService: PubsubService,
  ) { }

  uploadMessage(chatMessage) {

    const chat = this.messageControl.value;
    this.pubsubService.sendMessage(chat, this.orgId);
    this.chatMessage = '';


    setTimeout(() => {
      this.messageControl.setValue('');
      this.ionContent.scrollToBottom(0);
    });

  }

  ngOnInit() { }


}
