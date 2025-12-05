import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ServerItemComponent } from './components/server-item/server-item.component';
import { ServerListComponent } from './components/server-list/server-list.component';

@Component({
  selector: 'app-server-sidebar',
  imports: [ServerItemComponent, ServerListComponent],
  templateUrl: './server-sidebar.component.html',
  styleUrl: './server-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerSidebarComponent {}
