import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Alert, AlertService } from './alert.service';
import { Dismiss } from 'flowbite';
import type { DismissOptions, DismissInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, AfterContentChecked {
  alert!: Alert;
  $targetEl?: HTMLElement | null;
  dismiss?: DismissInterface;

  options: DismissOptions = {
    transition: 'transition-opacity',
    duration: 5000,
    timing: 'ease-out',
  };

  instanceOptions: InstanceOptions = {
    id: 'alert',
    override: true,
  };

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.dismiss = new Dismiss(
      this.$targetEl,
      null,
      this.options,
      this.instanceOptions
    );
    this.setAlert();
    this.alertService.alert$.subscribe(() => this.setAlert());
  }

  ngAfterContentChecked(): void {
    this.setAlert();
  }

  setAlert() {
    this.$targetEl = document.getElementById('alert');

    let alert: any = localStorage.getItem('alert') || undefined;
    if (alert) {
      alert = JSON.parse(alert) as Alert | undefined;

      setTimeout(() => {
        this.onClose();
      }, 5000);
    }
    this.alert = alert;
  }

  onClose() {
    localStorage.removeItem('alert');
    if (this.dismiss) this.dismiss.hide();
  }
}
