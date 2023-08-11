import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { EventSpeakersRoutingModule } from '@features/event-speakers/event-speakers-routing.module';
import { BACKEND_SERVICE_TOKEN, BackendService } from '@core/services/backend.service';
import { EventSpeakersComponent } from '@features/event-speakers/event-speakers/event-speakers.component';

@NgModule({
  declarations: [
    EventSpeakersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    EventSpeakersRoutingModule,
  ],
  providers: [{
    provide: BACKEND_SERVICE_TOKEN,
    useClass: BackendService,
  }],
  exports: [
    EventSpeakersRoutingModule,
  ],
})

export class EventSpeakersModule {
}
