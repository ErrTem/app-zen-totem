import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-host',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.sass']
})
export class SingleProductComponent implements OnInit {
  public dialogId!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.dialogId = this.route.snapshot.paramMap.get('dialogId') || '';
  }
}
