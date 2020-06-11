import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges
{
  @Input() rating;
  starWidth: number;
  @Output() ratingClicked: EventEmitter<string> =
new EventEmitter<string>();

  // Watches changes to input properties
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.starWidth = this.rating * 75 / 5;
   }

   onClick() {
     this.ratingClicked.emit('Star rating clicked');
   }
}
