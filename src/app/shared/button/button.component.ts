import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { ButtonSizes } from './button-sizes.type';
import { ButtonThemes } from './button-themes.type';

@Component({
  selector: 'app-button',
  imports: [NgClass, LucideAngularModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public theme = input<ButtonThemes>('primary');
  public icon = input<string | LucideIconData | undefined>(undefined);
  public message = input<string>('');
  public disabled = input<boolean>(false);
  public size = input<ButtonSizes>('m');

  public modifierClasses = input<string | string[], string | string[]>('', {
    transform: this.transformModifierClasses,
  });

  protected classes = computed(() => {
    return [this.theme(), this.size(), this.modifierClasses()]
      .filter(Boolean)
      .map((className) => `button--${className}`)
      .join(' ');
  });

  private transformModifierClasses(classes: string | string[]): string {
    if (!classes?.length) {
      return '';
    }

    if (Array.isArray(classes)) {
      return classes.join(' ');
    }

    return classes;
  }
}
