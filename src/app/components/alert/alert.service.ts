import { EventEmitter, Injectable } from '@angular/core';

export interface Alert {
  type: 'success' | 'warning' | 'danger' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert$ = new EventEmitter<boolean>();

  constructor() {}

  setMessage(alert: Alert) {
    localStorage.setItem(
      'alert',
      JSON.stringify({
        type: alert.type,
        message: alert.message,
      })
    );
    this.alert$.emit(true);
  }
}
