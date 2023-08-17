import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FinancialDatasetInterface } from '@core/interfaces';
import { IexService } from '@core/services/iex.service';
import { FetchStocks } from '@core/ngxs/iex/iex.actions';
import { Observable, tap } from 'rxjs';

export interface IexStateModel {
  stocks: FinancialDatasetInterface[];
}

export const IEX_STATE_MODEL = new StateToken<IexStateModel>(
  'Iex State'
);

@State<IexStateModel>({
  name: 'IEX_STATE_MODEL',
  defaults: {
    stocks: [],
  },
})

@Injectable()
export class IexState {
  constructor(
    private readonly iexService: IexService,
  ) {
  }

  @Selector()
  static getStocks(state: IexStateModel): FinancialDatasetInterface[] {
    return state.stocks;
  }

  @Action(FetchStocks)
  fetchStocks(
    {setState}: StateContext<IexStateModel>,
  ): Observable<FinancialDatasetInterface[]> {
    return this.iexService.getStock().pipe(
      tap(stocks => {
        setState({
          stocks: stocks,
        });
      })
    );
  }
}

