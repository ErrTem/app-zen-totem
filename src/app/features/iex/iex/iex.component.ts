import { Component, OnInit } from '@angular/core';
import { IexService } from '@core/services/iex.service';
import { Select, Store } from '@ngxs/store';
import { FetchStocks } from '@core/ngxs/iex/iex.actions';
import { FinancialDatasetInterface } from '@core/interfaces';
import { IexState } from '@core/ngxs/iex/iex.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-iex',
  templateUrl: './iex.component.html',
  styleUrls: ['./iex.component.sass'],
})
export class IexComponent implements OnInit {
  @Select(IexState.getStocks) stocks$!: Observable<FinancialDatasetInterface[]>;

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

  public nextPage(): void {
    // Update state to fetch next page
  }

  public prevPage(): void {
    // Update state to fetch previous page
  }
}
