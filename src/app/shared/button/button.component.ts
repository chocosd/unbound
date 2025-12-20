import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { ButtonSizes, Themes } from './button-sizes.enum';

export function AddButtonPrefix<T>(classes: string | keyof T): string {
  return `button--${String(classes)}`;
}

@Component({
  selector: 'app-button',
  imports: [NgClass, LucideAngularModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public theme = input<Themes | string, string>(Themes.Primary, {
    transform: AddButtonPrefix,
  });
  public icon = input<string | LucideIconData | undefined>(undefined);
  public message = input<string>('');
  public disabled = input<boolean>(false);
  public size = input<string | ButtonSizes, string>(ButtonSizes.Medium, {
    transform: AddButtonPrefix,
  });

  public modifierClasses = input<string | string[], string | string[]>('', {
    transform: this.transformModifierClasses,
  });

  protected classes = computed(() => {
    return [this.theme(), this.size(), this.modifierClasses()].filter(Boolean).join(' ');
  });

  private transformModifierClasses(classes: string | string[]): string {
    if (!classes?.length) {
      return '';
    }

    if (Array.isArray(classes)) {
      return classes.map((v) => AddButtonPrefix(v)).join(' ');
    }

    return AddButtonPrefix(classes);
  }
}
