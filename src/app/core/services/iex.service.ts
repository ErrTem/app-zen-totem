import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const IEX_SERVICE_TOKEN = new InjectionToken<IexService>(
  'iex_service_token'
);
//todo where store apiKey
@Injectable({
  providedIn: 'root',
})
export class IexService {
  private apiKey = 'sk_111fa2d83ebf40cdb833cd318406ccc6';
  private apiUrl = 'https://cloud.iexapis.com/stable';

  //https://cloud.iexapis.com/stable/tops?token=YOUR_TOKEN_HERE&symbols=aapl
  constructor(private readonly http: HttpClient) {}

  getStockQuote() {
    const url = `${this.apiUrl}/tops?token=${this.apiKey}&symbols=aapl`;
    return this.http.get(url);
  }
}
