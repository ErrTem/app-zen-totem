import { Component, OnInit } from '@angular/core';
import { IexService } from '@core/services/iex.service';
import { Select, Store } from '@ngxs/store';
import { FetchStocks } from '@core/ngxs/iex/iex.actions';
import { FinancialDatasetInterface } from '@core/interfaces';
import { IexState } from '@core/ngxs/iex/iex.state';
import { Observable } from 'rxjs';
//todo add resolver
@Component({
  selector: 'app-iex',
  templateUrl: './iex.component.html',
  styleUrls: ['./iex.component.sass'],
})
export class IexComponent implements OnInit {
  @Select(IexState.getStocks) stocks$!: Observable<FinancialDatasetInterface[]>;
  public pageNumbers: number[] = [];
  public symbols = ['AAPL', 'FB', 'TSLA']; // Example symbols
  public types = 'quote,news,chart'; // Example data types
  public pageSize = 10; // Number of data points to retrieve per page
  public currentPage = 1;
  public totalPages = 0;
  public displayedData = [];


  constructor(
    private readonly iexService: IexService,
    private readonly store: Store,
    ) {
  }

  ngOnInit(): void {
    this.fetchStocks();
  }

  public fetchStocks(): void {
    this.store.dispatch(new FetchStocks());
  }

  public test (): void {
    this.iexService.test().subscribe(data=> {
      console.log(data);
    });
  }
  public loadData(): void {
    // const startIdx = (this.currentPage - 1) * this.pageSize;
    // const endIdx = startIdx + this.pageSize;
    //
    // const symbolsStr = this.symbols.join(',');
    // const url = `/stock/market/batch?symbols=${symbolsStr}&types=${this.types}&range=${startIdx},${endIdx}`;
    //
    // this.http.get(url).subscribe((response: any) => {
    //   const numSymbols = Object.keys(response).length;
    //   this.totalPages = Math.ceil(numSymbols / this.pageSize);
    //   this.displayedData = Object.values(response);
    //   this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    // });
  }

  goToPage(pageNum: number): void {
    if (pageNum >= 1 && pageNum <= this.totalPages) {
      this.currentPage = pageNum;
      this.fetchStocks();
    }
  }
  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchStocks();
    }
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchStocks();
    }
  }
}
