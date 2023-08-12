import { Component, HostListener, OnInit } from '@angular/core';
import { BackendPersonInterface } from '@core/interfaces';
import { BackendService } from '@core/services/backend.service';
import { CHUNK_SIZE } from '@shared/constants';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-event-speakers',
  templateUrl: './event-speakers.component.html',
  styleUrls: ['./event-speakers.component.sass'],
})
export class EventSpeakersComponent implements OnInit {
  public allPeople: BackendPersonInterface[] = [];
  public displayedPeople: BackendPersonInterface[] = [];
  public currentChunkIndex = 0;

  public title = [
    { cols: 1 },
    { cols: 2 },
  ];

  constructor(
    private readonly backendService: BackendService,
    private readonly breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }
  public colspanForScreen(): number {
    if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      return 1; // On small screens, show 1 column
    }
    return 2; // On larger screens, show 2 columns
  }
  fetchData() {
    this.backendService.getPeople().subscribe((data) => {
      this.allPeople = data;
      this.loadNextChunk();
    });
  }

  loadNextChunk() {
    const startIndex = this.currentChunkIndex * CHUNK_SIZE;
    const endIndex = startIndex + CHUNK_SIZE;

    if (startIndex < this.allPeople.length) {
      this.displayedPeople = this.displayedPeople.concat(
        this.allPeople.slice(startIndex, endIndex)
      );
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
