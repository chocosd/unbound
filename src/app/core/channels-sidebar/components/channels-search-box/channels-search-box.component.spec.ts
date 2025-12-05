import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsSearchBoxComponent } from './channels-search-box.component';

describe('ChannelsSearchBoxComponent', () => {
  let component: ChannelsSearchBoxComponent;
  let fixture: ComponentFixture<ChannelsSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsSearchBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelsSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
