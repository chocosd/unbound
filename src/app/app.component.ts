import { Component, inject, signal, ViewContainerRef } from '@angular/core';
import { ChannelsSidebarComponent } from './core/channels-sidebar/channels-sidebar.component';
import { ChatMainComponent } from './core/chat-main/chat-main.component';
import { ServerSidebarComponent } from './core/server-sidebar/server-sidebar.component';
import { ViewContainerRefService } from './shared/overlay/view-container-ref.service';

@Component({
  selector: 'app-root',
  imports: [ServerSidebarComponent, ChannelsSidebarComponent, ChatMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected readonly title = signal('real-life-translate-chat-app');

  constructor(private readonly viewContainerRefService: ViewContainerRefService) {
    this.viewContainerRefService.registerRoot(inject(ViewContainerRef));
  }
}
