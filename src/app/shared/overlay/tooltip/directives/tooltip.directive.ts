import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  inject,
  input,
} from '@angular/core';
import { RegisteredOverlayHandle, ViewContainerRefService } from '../../view-container-ref.service';
import { TooltipComponent } from '../components/tooltip.component';
import { TooltipPosition } from '../tooltip.types';

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  public readonly tooltip = input.required<string>();
  public readonly position = input<TooltipPosition>(TooltipPosition.Auto);

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer2 = inject(Renderer2);
  private readonly viewContainerRefService = inject(ViewContainerRefService);

  private tooltipComponentRef: ComponentRef<TooltipComponent> | null = null;
  private registeredHandle: RegisteredOverlayHandle | null = null;

  private readonly offsetPx = 8;
  private readonly viewportMarginPx = 6;

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    if (this.tooltipComponentRef !== null) {
      return;
    }

    const handle = this.viewContainerRefService.tryRegister('tooltip');
    if (handle === null) {
      return;
    }

    this.registeredHandle = handle;

    this.tooltipComponentRef = handle.viewContainerRef.createComponent(TooltipComponent);

    this.tooltipComponentRef.setInput('content', this.tooltip());

    const requestedPosition = this.position();
    const initialPosition =
      requestedPosition === TooltipPosition.Auto ? TooltipPosition.Top : requestedPosition;

    this.tooltipComponentRef.setInput('position', initialPosition);

    const tooltipElement = this.tooltipComponentRef.location.nativeElement as HTMLElement;

    this.renderer2.setStyle(tooltipElement, 'position', 'fixed');
    this.renderer2.setStyle(tooltipElement, 'pointer-events', 'none');
    this.renderer2.setStyle(tooltipElement, 'z-index', '10000');
    this.renderer2.setStyle(tooltipElement, 'left', '0px');
    this.renderer2.setStyle(tooltipElement, 'top', '0px');

    queueMicrotask((): void => {
      this.positionTooltip();
    });
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.destroyTooltip();
  }

  public ngOnDestroy(): void {
    this.destroyTooltip();
  }

  private destroyTooltip(): void {
    if (this.tooltipComponentRef !== null) {
      this.tooltipComponentRef.destroy();
      this.tooltipComponentRef = null;
    }

    if (this.registeredHandle !== null) {
      this.registeredHandle.release();
      this.registeredHandle = null;
    }
  }

  private positionTooltip(): void {
    if (this.tooltipComponentRef === null) {
      return;
    }

    const anchorElement = this.elementRef.nativeElement;
    const tooltipElement = this.tooltipComponentRef.location.nativeElement as HTMLElement;

    const anchorRect = anchorElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();

    const requestedPosition = this.position();
    const chosenPosition =
      requestedPosition === TooltipPosition.Auto
        ? this.chooseBestPosition(anchorRect, tooltipRect)
        : requestedPosition;

    this.tooltipComponentRef.setInput('position', chosenPosition);

    const coords = this.computeCoordinates(anchorRect, tooltipRect, chosenPosition);

    this.renderer2.setStyle(tooltipElement, 'left', `${coords.left}px`);
    this.renderer2.setStyle(tooltipElement, 'top', `${coords.top}px`);
  }

  private chooseBestPosition(anchorRect: DOMRect, tooltipRect: DOMRect): TooltipPosition {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const fitsTop = anchorRect.top - this.offsetPx - tooltipRect.height >= this.viewportMarginPx;
    const fitsBottom =
      anchorRect.bottom + this.offsetPx + tooltipRect.height <=
      viewportHeight - this.viewportMarginPx;
    const fitsLeft = anchorRect.left - this.offsetPx - tooltipRect.width >= this.viewportMarginPx;
    const fitsRight =
      anchorRect.right + this.offsetPx + tooltipRect.width <= viewportWidth - this.viewportMarginPx;

    if (fitsTop) {
      return TooltipPosition.Top;
    }

    if (fitsBottom) {
      return TooltipPosition.Bottom;
    }

    if (fitsRight) {
      return TooltipPosition.Right;
    }

    if (fitsLeft) {
      return TooltipPosition.Left;
    }

    const spaceTop = anchorRect.top;
    const spaceBottom = viewportHeight - anchorRect.bottom;
    const spaceLeft = anchorRect.left;
    const spaceRight = viewportWidth - anchorRect.right;

    const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);

    if (maxSpace === spaceTop) {
      return TooltipPosition.Top;
    }

    if (maxSpace === spaceBottom) {
      return TooltipPosition.Bottom;
    }

    if (maxSpace === spaceRight) {
      return TooltipPosition.Right;
    }

    return TooltipPosition.Left;
  }

  private computeCoordinates(
    anchorRect: DOMRect,
    tooltipRect: DOMRect,
    position: TooltipPosition,
  ): { left: number; top: number } {
    let left = 0;
    let top = 0;

    switch (position) {
      case TooltipPosition.Top:
        left = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
        top = anchorRect.top - tooltipRect.height - this.offsetPx;
        break;
      case TooltipPosition.Bottom:
        left = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
        top = anchorRect.bottom + this.offsetPx;
        break;
      case TooltipPosition.Left:
        left = anchorRect.left - tooltipRect.width - this.offsetPx;
        top = anchorRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
        break;
      case TooltipPosition.Right:
        left = anchorRect.right + this.offsetPx;
        top = anchorRect.top + anchorRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    left = Math.max(
      this.viewportMarginPx,
      Math.min(left, viewportWidth - tooltipRect.width - this.viewportMarginPx),
    );

    top = Math.max(
      this.viewportMarginPx,
      Math.min(top, viewportHeight - tooltipRect.height - this.viewportMarginPx),
    );

    return {
      left: Math.round(left),
      top: Math.round(top),
    };
  }
}
