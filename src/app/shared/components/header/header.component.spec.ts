import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NotificationService } from '@core/services';
import { AuthService } from '@core/services/auth.service';
import { ProfileState } from '@core/ngxs/profile.state';
import { CartState } from '@core/ngxs/cart.state';
import { ClearUserInfo } from '@core/ngxs/profile.actions';
import { CartComponent } from '@shared/components';
import { Store, NgxsModule } from '@ngxs/store';
import { LimitTotalPricePipe } from '@shared/pipes/limit-total-price.pipe';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  // Mock the required services and Store
  const notificationServiceMock = jasmine.createSpyObj('NotificationService', ['error$', 'success$']);
  const authServiceMock = jasmine.createSpyObj('AuthService', ['userLogout', 'isLoggedIn']);
  const storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);
  const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

  beforeEach(async () => {
    notificationServiceMock.error$ = of(null); // Mock as an observable
    notificationServiceMock.success$ = of(null); // Mock as an observable

    // Mock the Select decorators using store.select
    storeMock.select.withArgs(ProfileState.getUserInfo).and.returnValue(of({firstName: 'John', lastName: 'Doe'}));
    storeMock.select.withArgs(CartState.getTotalPrice).and.returnValue(of(100));
    storeMock.select.withArgs(CartState.getTotalQuantity).and.returnValue(of(5));

    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ProfileState, CartState])
      ],
      declarations: [HeaderComponent, LimitTotalPricePipe],
      providers: [
        {provide: NotificationService, useValue: notificationServiceMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: Store, useValue: storeMock},
        {provide: Router, useValue: routerMock},
        {provide: MatDialog, useValue: dialogMock},
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ignore unrecognized elements and attributes
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display customerNameAbbreviation when userInfo is available', () => {
    fixture.detectChanges();

    expect(component.customerNameAbbreviation).toBe('JO');
  });

  it('should call authService userLogout and navigate to login page on logout', () => {
    component.logout();
    expect(authServiceMock.userLogout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
    expect(storeMock.dispatch).toHaveBeenCalledOnceWith(new ClearUserInfo());
  });

  it('should call authService isLoggedIn', () => {
    authServiceMock.isLoggedIn.and.returnValue(true);
    const isLoggedIn = component.isLoggedIn();
    expect(isLoggedIn).toBeTrue();
    expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
  });

  it('should open cart dialog when openDialog is called', () => {
    component.openDialog();
    expect(dialogMock.open).toHaveBeenCalledOnceWith(CartComponent, {
      panelClass: 'app-cart-dialog',
      position: {top: '0', right: '0'},
    });
  });

  it('should close errorMessage and successMessage on closeBanner', () => {
    component.errorMessage = 'Some error message';
    component.successMessage = 'Some success message';
    component.closeBanner();
    expect(component.errorMessage).toBeNull();
    expect(component.successMessage).toBeNull();
  });

  it('should unsubscribe from errorSubscription and successSubscription on ngOnDestroy', () => {
    const errorSubscriptionSpy = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    const successSubscriptionSpy = jasmine.createSpyObj('Subscription', ['unsubscribe']);

    component['errorSubscription'] = errorSubscriptionSpy;
    component['successSubscription'] = successSubscriptionSpy;

    component.ngOnDestroy();
    expect(errorSubscriptionSpy.unsubscribe).toHaveBeenCalled();
    expect(successSubscriptionSpy.unsubscribe).toHaveBeenCalled();
  });
});
