import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { LucideAngularModule, Paperclip, Plus, Smile } from 'lucide-angular';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-chat-input',
  imports: [LucideAngularModule, ButtonComponent],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  protected readonly PlusIcon = Inject(Plus);
  protected readonly PaperclipIcon = Inject(Paperclip);
  protected readonly SmileIcon = Inject(Smile);
}
