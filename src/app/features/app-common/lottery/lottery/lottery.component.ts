import { Component, OnInit } from '@angular/core';
import { LotteryService } from "@features/app-common/lottery/lottery.service";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { LotteryState } from "@ngxs/lottery.state";

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.sass']
})
export class LotteryComponent implements OnInit {
  public isLotteryStarted = false;

  @Select (LotteryState.getIsWin) isWinnerDetermined$!: Observable<boolean>;
  @Select (LotteryState.getIsMaxParticipantsReached) isMaxParticipantsReached$!: Observable<boolean>;
  @Select (LotteryState.getParticipantCount) participantCount$!: Observable<number>;

  constructor(
    private readonly lotteryService: LotteryService,
) {}

  ngOnInit(): void {
    this.lotteryService.initLotteryParticipants();
  }

  participate() {
    this.lotteryService.participate();


  }
}
