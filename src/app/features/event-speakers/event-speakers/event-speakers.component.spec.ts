import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSpeakersComponent } from './event-speakers.component';

describe('EventSpeakersComponent', () => {
  let component: EventSpeakersComponent;
  let fixture: ComponentFixture<EventSpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSpeakersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
