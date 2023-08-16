import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { IexComponent } from './iex/iex.component';
import { IexRoutingModule } from './iex-routing.module';
import { IEX_SERVICE_TOKEN, IexService } from '@core/services/iex.service';

@NgModule({
  declarations: [IexComponent],
  imports: [CommonModule, SharedModule, CoreModule, IexRoutingModule],
  providers: [
    {
      provide: IEX_SERVICE_TOKEN,
      useClass: IexService,
    },
  ],
  exports: [IexRoutingModule],
})
export class IexModule {}
