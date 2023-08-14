import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.sass']
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Input() starCount: number = 5;
  @Output() ratingUpdated = new EventEmitter<number>();

  constructor() {
  }

  public onClick(rating: number): void {
    this.ratingUpdated.emit(rating);
    this.rating = rating;
  }

  get ratingArr(): number[] {
    return Array.from({length: this.starCount}, (_, i) => i);
  }

  public showIcon(index: number): string {
    return this.rating >= index + 1 ? 'star' : 'star_border';
  }
}

