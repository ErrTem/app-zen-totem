import { Component, ViewChild } from '@angular/core';
import { NgxGlideComponent } from 'ngx-glide';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.sass']
})
export class SliderComponent {
  @ViewChild(NgxGlideComponent, { static: true }) ngxGlide!: NgxGlideComponent;

  constructor() {
  }

  ngAfterViewInit(): void {
    if (this.ngxGlide) {
      this.ngxGlide.play(4000);
      this.ngxGlide.animationDuration = 1000;
    }
  }
}
