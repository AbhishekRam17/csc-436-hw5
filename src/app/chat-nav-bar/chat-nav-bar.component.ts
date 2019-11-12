import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import * as _ from 'lodash';

import { ThreadsService } from './../thread/threads.service';
import { MessagesService } from './../message/messages.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { Thread } from './../thread/thread.model';
import { Message } from './../message/message.model';
import { combineLatest } from 'rxjs/operators';

@Component({
  selector: 'chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent implements OnInit {
  unreadMessagesCount: number;

  constructor(public messagesService: MessagesService,
    public threadsService: ThreadsService,
    public router : Router,
    public authservice : AuthService) {
  }

  ngOnInit(): void {
    this.messagesService.messages
      .pipe(combineLatest(
        this.threadsService.currentThread,
        (messages: Message[], currentThread: Thread) =>
          [currentThread, messages]))

      .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount =
          _.reduce(
            messages,
            (sum: number, m: Message) => {
              const messageIsInCurrentThread: boolean = m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              // note: in a "real" app you should also exclude
              // messages that were authored by the current user b/c they've
              // already been "read"
              if (m && !m.isRead && !messageIsInCurrentThread) {
                sum = sum + 1;
              }
              return sum;
            },
            0);
      });
  }
  logout(){
    this.authservice.logout();
      this.router.navigate(['/login']);
  }
}
