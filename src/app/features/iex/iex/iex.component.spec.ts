import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IexComponent } from './iex.component';

describe('IexComponent', () => {
  let component: IexComponent;
  let fixture: ComponentFixture<IexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
