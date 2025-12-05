import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-server-item',
  imports: [],
  templateUrl: './server-item.component.html',
  styleUrl: './server-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerItemComponent {
  public server = input<{ id: string; name: string; initial: string; active: boolean } | null>(
    null
  );
}
