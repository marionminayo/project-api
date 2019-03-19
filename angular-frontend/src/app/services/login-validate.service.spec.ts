import { TestBed } from '@angular/core/testing';

import { LoginValidateService } from './login-validate.service';

describe('LoginValidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginValidateService = TestBed.get(LoginValidateService);
    expect(service).toBeTruthy();
  });
});
