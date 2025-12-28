import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  ViewContainerRef,
  WritableSignal,
  createComponent,
} from '@angular/core';
import { ModalComponent } from './modal.component';

export interface ModalOpenOptions {
  title?: string;
  message?: string;
}

export interface ModalRef {
  close: () => void;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private hostViewContainerRef: ViewContainerRef | undefined;
  private activeRef: ComponentRef<ModalComponent> | undefined;
  private activeHostElement: HTMLElement | undefined;

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly environmentInjector: EnvironmentInjector
  ) {}

  public registerHost(viewContainerRef: ViewContainerRef): void {
    this.hostViewContainerRef = viewContainerRef;
  }

  public open(options?: ModalOpenOptions): ModalRef {
    this.destroyActive();

    this.setActiveRef(options);
    this.setActiveRefInputs(options);

    return {
      close: () => this.destroyActive(),
    };
  }

  private destroyActive(): void {
    if (this.activeHostElement && this.activeRef) {
      this.appRef.detachView(this.activeRef.hostView);
      this.activeHostElement.remove();
      this.activeHostElement = undefined;
    }
    if (this.activeRef) {
      this.activeRef.destroy();
      this.activeRef = undefined;
    }
  }

  private setActiveRef(options?: ModalOpenOptions): void {
    if (this.hostViewContainerRef) {
      this.activeRef = this.hostViewContainerRef.createComponent(ModalComponent, {
        environmentInjector: this.environmentInjector,
      });
      return;
    }
    const host = document.createElement('div');
    host.classList.add('app-modal-host');
    document.body.appendChild(host);
    this.activeHostElement = host;
    this.activeRef = createComponent(ModalComponent, {
      environmentInjector: this.environmentInjector,
      hostElement: host,
    });
    this.appRef.attachView(this.activeRef.hostView);
  }

  private setActiveRefInputs(options?: ModalOpenOptions): void {
    if (!this.activeRef) {
      return;
    }

    if (options?.title) {
      (this.activeRef.instance.title as unknown as WritableSignal<string>).set(options.title);
    }
    if (options?.message) {
      (this.activeRef.instance.message as unknown as WritableSignal<string>).set(options.message);
    }
  }
}
