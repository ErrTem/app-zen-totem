import { Component, HostListener, OnInit, } from '@angular/core';
import { SpeakerInterface } from '@core/interfaces';
import { BackendService, RatedSpeakerInterface } from '@core/services/backend.service';
import { Select, Store } from '@ngxs/store';
import {
  GetSpeakersFromServer,
  ResetFilters,
  FilterFavorites,
  SortMostPopular,
  SortMostUnpopular,
  UpdateChunkIndex
} from '@core/ngxs/speakers.actions';
import { SpeakersState } from '@core/ngxs/speakers.state';
import { Observable } from 'rxjs';
import { NotificationService } from '@core/services';

@Component({
  selector: 'app-event-speakers',
  templateUrl: './event-speakers.component.html',
  styleUrls: ['./event-speakers.component.sass'],
})
export class EventSpeakersComponent implements OnInit {
  @Select(SpeakersState.getFilteredSpeakers) speakers$!: Observable<SpeakerInterface[]>;
  public currentChunkIndex = 0;
  public selectedRating: number = 0;
  public isLoading = false;

  constructor(
    private readonly backendService: BackendService,
    private readonly store: Store,
    private readonly notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetSpeakersFromServer());
    this.speakers$.subscribe();
  }

  public loadNextChunk() {
    this.isLoading = true;
    this.store.dispatch(new UpdateChunkIndex());
  }

  public addToFavorites(speaker: SpeakerInterface): void {
    this.backendService.addToFavorites(speaker);
    this.showSnackBar(`You added ${speaker.name} to favorites 👍`);
  }

  public getFollowButtonBackground(speaker: SpeakerInterface): string {
    return this.backendService.isInFavorites(speaker)
      ? 'url("../../../../assets/speakers/wish-list-add.png")'
      : 'url("../../../../assets/speakers/wish-list.png")';
  }

  public onRatingUpdated(rating: number, speaker: SpeakerInterface): void {
    this.selectedRating = rating;
    this.backendService.updateRating(speaker, rating);
    this.showSnackBar(`You rated ${speaker.name} with ${rating}/5 ⭐`);
  }

  public getRatingForSpeaker(speaker: SpeakerInterface): number {
    return this.backendService.getRating(speaker);
  }

  public showSnackBar(message: string): void {
    this.notificationService.showSnackBar(message)
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

  public sortMostPopular(): void {
    const ratedSpeakers: RatedSpeakerInterface[] = this.backendService.getRatedSpeaker();
    this.store.dispatch(new SortMostPopular(ratedSpeakers));
  }

  public sortMostUnpopular(): void {
    const ratedSpeakers: RatedSpeakerInterface[] = this.backendService.getRatedSpeaker();
    this.store.dispatch(new SortMostUnpopular(ratedSpeakers));
  }

  public filterFavorites(): void {
    const favorites: string[] = this.backendService.getFavorites();
    this.store.dispatch(new FilterFavorites(favorites));
  }

  public resetFilters(): void {
    this.store.dispatch(new ResetFilters());
  }
}
