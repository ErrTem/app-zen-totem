import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendPersonInterface } from '@core/interfaces';

@Component({
  selector: 'app-event-speakers',
  templateUrl: './event-speakers.component.html',
  styleUrls: ['./event-speakers.component.sass']
})
export class EventSpeakersComponent implements OnInit {
  allPeople: BackendPersonInterface[] = [];
  displayedPeople: BackendPersonInterface[] = [];
  chunkSize = 8;
  currentChunkIndex = 0;

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.fetchData();
  }
//todo refactor to backend.service; improve html; add correct sass; add loading by 8 pesons and loader; simulate api call by delay
  fetchData() {
    this.http.get<BackendPersonInterface[]>('assets/data/people.json').subscribe(data => {
      this.allPeople = data;
      this.loadNextChunk();
    });
  }

  loadNextChunk() {
    const startIndex = this.currentChunkIndex * this.chunkSize;
    const endIndex = startIndex + this.chunkSize;

    if (startIndex < this.allPeople.length) {
      this.displayedPeople = this.displayedPeople.concat(this.allPeople.slice(startIndex, endIndex));
      this.currentChunkIndex++;
    }
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
