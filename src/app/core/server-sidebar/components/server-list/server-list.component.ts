import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ServerItemComponent } from '../server-item/server-item.component';

@Component({
  selector: 'app-server-list',
  imports: [ServerItemComponent],
  templateUrl: './server-list.component.html',
  styleUrl: './server-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerListComponent {
  public serverList = signal([
    {
      id: '1',
      name: 'Test Server',
      initial: 'TS',
      active: false,
    },
    {
      id: '2',
      name: 'Another Server',
      initial: 'AS',
      active: true,
    },
  ]);
}
