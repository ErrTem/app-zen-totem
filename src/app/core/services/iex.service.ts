import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_IEX_URL } from '@shared/constants/iex/iex-endpoints';
import { FinancialDatasetInterface } from '@core/interfaces';

export const IEX_SERVICE_TOKEN = new InjectionToken<IexService>(
  'iex_service_token'
);

//todo store apiKey in os.environment

@Injectable({
  providedIn: 'root',
})
export class IexService {
  private apiKey = 'sk_111fa2d83ebf40cdb833cd318406ccc6';

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getStock() {
    const url = `${BASE_IEX_URL}/time-series?token=${this.apiKey}`;
    return this.http.get<FinancialDatasetInterface[]>(url);
  }

  public getLast() {
    const url = `${BASE_IEX_URL}/tops/last?token=${this.apiKey}`;
    return this.http.get(url);
  }
}
