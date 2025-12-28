import { Injectable, ViewContainerRef } from '@angular/core';

export type RegisteredOverlayHandle = {
  id: string;
  viewContainerRef: ViewContainerRef;
  release: () => void;
};

@Injectable({ providedIn: 'root' })
export class ViewContainerRefService {
  private rootViewContainerRef: ViewContainerRef | null = null;
  private registeredElements = new Map<string, true>();

  public registerRoot(viewContainerRef: ViewContainerRef): void {
    this.rootViewContainerRef = viewContainerRef;
  }

  public tryRegister(id: string): RegisteredOverlayHandle | null {
    if (this.rootViewContainerRef === null) {
      throw new Error('Root ViewContainerRef has not been registered.');
    }

    if (this.registeredElements.has(id)) {
      return null;
    }

    this.registeredElements.set(id, true);

    const release = (): void => {
      this.registeredElements.delete(id);
    };

    return {
      id,
      viewContainerRef: this.rootViewContainerRef,
      release,
    };
  }

  public clear(): void {
    this.registeredElements.clear();
  }
}
