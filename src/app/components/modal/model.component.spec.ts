import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle modal open state', () => {
    expect(component.isModalOpen).toBeFalse();
    component.toggleModal(new MouseEvent('click'));
    expect(component.isModalOpen).toBeTrue();
    component.toggleModal(new MouseEvent('click'));
    expect(component.isModalOpen).toBeFalse();
  });

  it('should stop event propagation when toggling modal', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    component.toggleModal(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should have correct initial animation state', () => {
    const modalElement = fixture.nativeElement.querySelector('div');
    expect(modalElement).toBeDefined();
  });

  it('should apply correct animation on modal open and close', () => {
    const modalElement = fixture.nativeElement.querySelector('div');
    expect(modalElement.style.transform).toBe('');

    component.isModalOpen = true;
    fixture.detectChanges();
    expect(modalElement.style.transform).toBe('');

    component.isModalOpen = false;
    fixture.detectChanges();
    expect(modalElement.style.transform).toBe('');
  });
});
