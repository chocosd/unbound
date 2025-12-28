import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { TooltipPosition } from '../tooltip.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: '[app-tooltip]',
  standalone: true,
  styleUrl: './tooltip.component.scss',
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent {
  @HostBinding('class') public class = '';

  public content = input.required<string>();
  public position = input<TooltipPosition>(TooltipPosition.Top);

  constructor() {
    this.class = this.position();
  }
}
