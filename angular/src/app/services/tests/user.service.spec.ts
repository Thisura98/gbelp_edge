import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { UserService } from "../user.service";

describe('UserService', () => {

  let service: UserService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => { 
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(UserService);
    service.clearCredentials();
  });

  it('should persist login state', () => {
    service.setLoggedIn({
      user_id: '1',
      user_name: 'T N DODANGODA',
      user_type_name: 'admin',
      token: 'empty'
    });

    let result = service.getUserAndToken();
    let expectedResult = {
      user: {
        userId: '1',
        userName: 'T N DODANGODA',
        userTypeName: 'admin'
      },
      token: 'empty'
    }

    expect(result).withContext('saved login data').toEqual(expectedResult);
  });

  it('should route of if logged out', () => {
    service.clearCredentials();
    service.routeOutIfLoggedOut();

    expect(routerSpy.navigate).toHaveBeenCalled();
  });

});