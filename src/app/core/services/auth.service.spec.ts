import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserInfoInterface } from '@core/interfaces/user.interface';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    authService.userLogout(); // Make sure the user is logged out before each test
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should set and get the logged-in role', () => {
    const role = 'admin';
    authService.setLoggedInRole(role);
    expect(authService.getLoggedInRole()).toBe(role);
  });

  it('should set and get the user info', () => {
    const userInfo: UserInfoInterface = {
      firstName: 'John',
      lastName: 'Doe',
    };
    authService.setUserInfo(userInfo);
    expect(authService.getUserInfo()).toEqual(userInfo);
  });

  it('should return true if the user is logged in', () => {
    const userInfo: UserInfoInterface = {
      firstName: 'John',
      lastName: 'Doe',
    };
    authService.setUserInfo(userInfo);
    expect(authService.isLoggedIn()).toBe(true);
  });

  it('should return false if the user is not logged in', () => {
    expect(authService.isLoggedIn()).toBe(false);
  });

  it('should clear the logged-in role and user info on logout', () => {
    authService.setLoggedInRole('admin');
    authService.setUserInfo({
      firstName: 'John',
      lastName: 'Doe',
    });

    authService.userLogout();

    expect(authService.getLoggedInRole()).toBeNull();
    expect(authService.getUserInfo()).toBeNull();
  });
});
