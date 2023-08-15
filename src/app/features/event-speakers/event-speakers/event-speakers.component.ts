import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnChanges,
  OnInit,
} from '@angular/core';
import { SpeakerInterface } from '@core/interfaces';
import { BackendService } from '@core/services/backend.service';
import { CHUNK_SIZE } from '@shared/constants';
import { Select, Store } from '@ngxs/store';
import {
  GetSpeakersFromServer,
  UpdateChunkIndex,
} from '@core/ngxs/speakers.actions';
import { SpeakersState } from '@core/ngxs/speakers.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-speakers',
  templateUrl: './event-speakers.component.html',
  styleUrls: ['./event-speakers.component.sass'],
})
export class EventSpeakersComponent implements OnInit {
  @Select(SpeakersState.getFilteredSpeakers) speakers$!: Observable<
    SpeakerInterface[]
  >;
  public currentChunkIndex = 0;
  public selectedRating: number = 0;

  //todo add notification service
  constructor(
    private readonly backendService: BackendService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GetSpeakersFromServer());
    this.speakers$.subscribe((data: SpeakerInterface[]) => {});
  }

  public loadNextChunk() {
    this.store.dispatch(new UpdateChunkIndex());
  }

  public addToFavorites(speaker: SpeakerInterface): void {
    this.backendService.addToFavorites(speaker);
  }

  public getFollowButtonBackground(speaker: SpeakerInterface): string {
    return this.backendService.isInFavorites(speaker)
      ? 'url("../../../../assets/speakers/wish-list-add.png")'
      : 'url("../../../../assets/speakers/wish-list.png")';
  }

  public onRatingUpdated(rating: number, speaker: SpeakerInterface): void {
    this.selectedRating = rating;
    this.backendService.updateRating(speaker, rating);
  }

  public getRatingForSpeaker(speaker: SpeakerInterface): number {
    return this.backendService.getRating(speaker);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition + windowHeight >= documentHeight - 300) {
      this.loadNextChunk();
    }
  }
}
