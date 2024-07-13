import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTypes]',
})
export class TypesDirective {
  readonly Types: any = {
    grass: 'icon-grass',
    fire: 'icon-fire',
    lightning: 'icon-lightning',
    darkness: 'icon-darkness',
    fairy: 'icon-fairy',
    psychic: 'icon-psychic',
    metal: 'icon-metal',
    dragon: 'icon-dragon',
    water: 'icon-water',
    fighting: 'icon-fighting',
    colorless: 'icon-colorless',
  };

  @Input() type!: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setClass(this.type);
  }

  setClass(type: string) {
    if (type) {
      type = type.toLowerCase();
      let classe = this.Types[type];
      this.el?.nativeElement?.classList.remove();
      this.el?.nativeElement?.classList.add(classe);
    }
    return;
  }

  ngOnChanges(changes: any): void {
    this.setClass(changes.type.currentValue);
  }
}
