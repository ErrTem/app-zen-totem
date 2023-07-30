import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from '@ngxs/store';
import { SetUserInfo } from '@core/ngxs/profile.actions';
import { USER_INFO } from '@shared/constants/localstorage-names';
import { UserInfoInterface } from '@core/interfaces/user.interface';
import { HeaderComponent } from '@shared/components';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent,HeaderComponent],
      imports: [NgxsModule.forRoot(), MatDialogModule, RouterTestingModule], // Import the NgxsModule
      providers: [{ provide: Store, useValue: storeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    storeMock = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch SetUserInfo action when user info is present in localStorage', () => {
    const userInfo: UserInfoInterface = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      websiteUrl: 'https://example.com',
      role: 'user',
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userInfo));

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith(USER_INFO);
    expect(storeMock.dispatch).toHaveBeenCalledWith(new SetUserInfo(userInfo));
  });

  it('should not dispatch SetUserInfo action when user info is not present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith(USER_INFO);
    expect(storeMock.dispatch).not.toHaveBeenCalled();
  });
});
