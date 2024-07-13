import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnChanges {
  @Input() type!: string;

  ngOnChanges(changes: any): void {
    this.type = changes?.type?.currentValue;
  }
}
