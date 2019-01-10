import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'toast-message',
  template: `<p-toast [style]="{marginTop: '80px'}" position="top-center"></p-toast>`
})
export class ToastMessageComponent implements OnInit {
  messageSubscription: Subscription;

  constructor(private messagesService: MessageService) { }

  ngOnInit() {
    this.messagesService.clear();
  }

}
