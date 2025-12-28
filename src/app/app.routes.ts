import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ChatMainComponent } from './core/chat-main/chat-main.component';
import { UserService } from './core/user/user.service';

export const routes: Routes = [
  {
    path: '',
    component: ChatMainComponent,
    resolve: {
      currentUser: () => inject(UserService).fetchCurrentUser(),
    },
  },
];
