import { Component, HostListener, OnInit } from '@angular/core';
import { SpeakerInterface } from '@core/interfaces';
import { BackendService } from '@core/services/backend.service';
import { CHUNK_SIZE } from '@shared/constants';
import { Select, Store } from '@ngxs/store';
import { GetSpeakersFromServer } from '@core/ngxs/speakers.actions';
import { SpeakersState } from '@core/ngxs/speakers.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-speakers',
  templateUrl: './event-speakers.component.html',
  styleUrls: ['./event-speakers.component.sass'],
})
export class EventSpeakersComponent implements OnInit {
  @Select(SpeakersState.getAllSpeakers) speakers$!: Observable<SpeakerInterface[]>;
  public speakers: SpeakerInterface[] = [];
  public displayedSpeakers: SpeakerInterface[] = [];
  public currentChunkIndex = 0;
  public selectedRating: number = 0;

  constructor(
    private readonly backendService: BackendService,
    private readonly store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetSpeakersFromServer());
    this.speakers$.subscribe((data: SpeakerInterface[]) => {
      this.speakers = data;
      this.loadNextChunk();
    })
  }

  public loadNextChunk() {
    const startIndex = this.currentChunkIndex * CHUNK_SIZE;
    const endIndex = startIndex + CHUNK_SIZE;

    if (startIndex < this.speakers.length) {
      this.displayedSpeakers = this.displayedSpeakers.concat(
        this.speakers.slice(startIndex, endIndex)
      );
      this.currentChunkIndex++;
    }
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
