import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('flipAnimation', [
      state('void', style({ transform: 'rotateY(90deg)' })),
      transition(':enter', [
        animate('0.5s', style({ transform: 'rotateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ transform: 'rotateY(90deg)' })),
      ]),
    ]),
  ],
})
export class ModalComponent {
  isModalOpen = false;

  toggleModal(event: MouseEvent) {
    event.stopPropagation();
    this.isModalOpen = !this.isModalOpen;
  }
}
