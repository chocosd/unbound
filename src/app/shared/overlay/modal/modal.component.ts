import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  public title = input<string | undefined>(undefined);
  public message = input<string | undefined>(undefined);

  public closed = output<void>();

  protected close(): void {
    this.closed.emit();
  }
}
