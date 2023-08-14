import { Component, HostListener, OnInit } from '@angular/core';
import { BackendPersonInterface } from '@core/interfaces';
import { BackendService } from '@core/services/backend.service';
import { CHUNK_SIZE } from '@shared/constants';

@Component({
  selector: 'app-event-speakers',
  templateUrl: './event-speakers.component.html',
  styleUrls: ['./event-speakers.component.sass'],
})
export class EventSpeakersComponent implements OnInit {
  public allPeople: BackendPersonInterface[] = [];
  public displayedPeople: BackendPersonInterface[] = [];
  public currentChunkIndex = 0;
  public selectedRating: number = 0;

  constructor(
    private readonly backendService: BackendService,
  ) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  public fetchData() {
    this.backendService.getPeople().subscribe((data) => {
      this.allPeople = data;
      this.loadNextChunk();
    });
  }

  public loadNextChunk() {
    const startIndex = this.currentChunkIndex * CHUNK_SIZE;
    const endIndex = startIndex + CHUNK_SIZE;

    if (startIndex < this.allPeople.length) {
      this.displayedPeople = this.displayedPeople.concat(
        this.allPeople.slice(startIndex, endIndex)
      );
      this.currentChunkIndex++;
    }
  }

  public addToFavorites(person: BackendPersonInterface): void {
    this.backendService.addToFavorites(person);
  }

  public getFollowButtonBackground(person: BackendPersonInterface): string {
    return this.backendService.isInFavorites(person)
      ? 'url("../../../../assets/speakers/wish-list-add.png")'
      : 'url("../../../../assets/speakers/wish-list.png")';
  }

  public onRatingUpdated(rating: number, person: BackendPersonInterface): void {
    this.selectedRating = rating;
    this.backendService.updateRating(person, rating);
  }

  public getRatingForPerson(person: BackendPersonInterface): number {
    return this.backendService.getRating(person);
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
