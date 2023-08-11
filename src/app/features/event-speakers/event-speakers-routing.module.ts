import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventSpeakersComponent } from '@features/event-speakers/event-speakers/event-speakers.component';

const routes: Routes = [
  {
    path: '',
    component: EventSpeakersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventSpeakersRoutingModule {
}
