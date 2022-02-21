import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TextareaToolsService {

  currentMessage: Observable<any>;
  private messageSource = new BehaviorSubject('default message');

  constructor() {
    this.currentMessage = this.messageSource.asObservable();
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }


}
