import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../logic/logic';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: [Coffee];
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getList(list => {
      this.list = list;
    });
  }

}
