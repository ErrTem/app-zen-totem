import { Component, OnInit } from '@angular/core';
import { IexService } from '@core/services/iex.service';

@Component({
  selector: 'app-iex',
  templateUrl: './iex.component.html',
  styleUrls: ['./iex.component.sass'],
})
export class IexComponent implements OnInit {
  constructor(private readonly iexService: IexService) {}
  ngOnInit(): void {
    this.fetchStockQuote();
  }
  public fetchStockQuote() {
    this.iexService.getStockQuote().subscribe(
      (data) => {
        console.log('Stock Quote:', data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
