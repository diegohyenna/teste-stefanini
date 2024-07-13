import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template:
    '<div class="flex items-center justify-center min-h-screen"><div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div></div>',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {}
