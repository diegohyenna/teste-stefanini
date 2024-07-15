import { TestBed } from '@angular/core/testing';
import { AlertService, Alert } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit alert$ event and set item in localStorage on setMessage', () => {
    const alert: Alert = { type: 'success', message: 'Test message' };
    spyOn(service.alert$, 'emit');
    spyOn(localStorage, 'setItem');

    service.setMessage(alert);

    expect(service.alert$.emit).toHaveBeenCalledWith(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'alert',
      JSON.stringify(alert)
    );
  });
});
