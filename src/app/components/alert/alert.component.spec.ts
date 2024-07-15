import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { Dismiss } from 'flowbite';
import { of } from 'rxjs';
import { AlertService } from './alert.service';

class MockAlertService {
  alert$ = of();
}

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: MockAlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
      providers: [{ provide: AlertService, useClass: MockAlertService }],
    }).compileComponents();

    // alertService = TestBed.inject(AlertService) as MockAlertService;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize Dismiss on ngOnInit', () => {
    spyOn(Dismiss.prototype, 'hide');
    component.ngOnInit();
    expect(component.dismiss).toBeTruthy();
  });

  it('should set alert from localStorage on setAlert', () => {
    const alertMock: any = { message: 'Test Alert', type: 'success' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(alertMock));
    component.setAlert();
    expect(component.alert).toEqual(alertMock);
  });

  it('should call onClose after 5 seconds if alert is set', fakeAsync(() => {
    const alertMock = { message: 'Test Alert', type: 'success' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(alertMock));
    spyOn(component, 'onClose');
    component.setAlert();
    tick(5000);
    expect(component.onClose).toHaveBeenCalled();
  }));

  it('should remove alert from localStorage and hide dismiss on onClose', () => {
    spyOn(localStorage, 'removeItem');
    const dismissMock = jasmine.createSpyObj('Dismiss', ['hide']);
    component.dismiss = dismissMock;
    component.onClose();
    expect(localStorage.removeItem).toHaveBeenCalledWith('alert');
    expect(dismissMock.hide).toHaveBeenCalled();
  });
});
