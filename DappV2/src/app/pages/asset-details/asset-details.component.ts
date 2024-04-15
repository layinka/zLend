import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { toDp } from '../../utils/numbers';


@Component({
  standalone: true,
  selector: 'asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
  imports: [CommonModule]
})
export class AssetDetailsComponent implements OnInit {

  @Input() token : any;

  constructor() { }

  ngOnInit(): void {
  }

  todp(amount: any, dp : any){
    return toDp(amount, dp);
  }

}
