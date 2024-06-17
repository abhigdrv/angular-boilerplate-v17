import { Directive, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Directive({
  selector: '[pulseEffect]',
})
export class PulseEffectDirective implements OnInit {

  @Input('pulseEffect') isActive: any = false;

  constructor(
    private loaderService:LoaderService,
    private elementRef: ElementRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(typeof this.isActive == 'boolean' && changes['isActive']){
      this.updateClass(changes['isActive'].currentValue);
    }
  }

  ngOnInit(): void {
    if(typeof this.isActive != 'boolean'){
      this.loaderService.getData().subscribe((data) => {
        setTimeout(() => {
          this.updateClass(!!data)
        });
      });
    }
  }

  private updateClass(isActive: boolean): void {
    if (isActive) {
      this.elementRef.nativeElement.classList.add('animate-pulse');
      this.elementRef.nativeElement.classList.add('pointer-events-none');
      this.elementRef.nativeElement.classList.add('bg-[#e4e4e4]');
    } else {
      this.elementRef.nativeElement.classList.remove('animate-pulse');
      this.elementRef.nativeElement.classList.remove('pointer-events-none');
      this.elementRef.nativeElement.classList.remove('bg-[#e4e4e4]');
    }
  }

}
