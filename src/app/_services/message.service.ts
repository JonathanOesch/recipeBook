import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng/api';

type Severities = 'success' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChange: Subject<Object> = new Subject<Object>();

  constructor(private msgService: MessageService) { }

  addNotification(severity: Severities, summary: string, detail: string) {
    this.msgService.add( { severity, summary, detail, life: 2000 } );
  }

  clearMsg() {
    this.msgService.clear();
  }

}
