import { Component, OnInit } from '@angular/core';
import { LotteryService } from "@features/app-common/lottery/lottery.service";
import { Select, Store } from "@ngxs/store";
import { ProfileState } from "@ngxs/profile.state";
import { Observable } from "rxjs";
import { UserInfoInterface } from "@core/interfaces/user.interface";
import { LotteryState } from "@ngxs/lottery.state";
import { SetParticipantCount } from "@ngxs/lottery.actions";

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.sass']
})
export class LotteryComponent implements OnInit {

  @Select (LotteryState.getIsWinnerDetermined) isWinnerDetermined$!: Observable<boolean>;
  @Select (LotteryState.getParticipantCount) participantCount$!: Observable<number>;

  constructor(
    private readonly lotteryService: LotteryService,
) {}

  public isLotteryStarted = false;

  ngOnInit(): void {
    this.lotteryService.initLotteryParticipants();
  }

  participate() {
    this.lotteryService.participate();


  }
}
