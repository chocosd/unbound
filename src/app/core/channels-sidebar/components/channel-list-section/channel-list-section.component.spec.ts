import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelListSectionComponent } from './channel-list-section.component';

describe('ChannelListSectionComponent', () => {
  let component: ChannelListSectionComponent;
  let fixture: ComponentFixture<ChannelListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelListSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
