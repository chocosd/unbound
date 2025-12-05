import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsHeaderComponent } from './channels-header.component';

describe('ChannelsHeaderComponent', () => {
  let component: ChannelsHeaderComponent;
  let fixture: ComponentFixture<ChannelsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
