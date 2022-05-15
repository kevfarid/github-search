import { Component, Input, OnInit } from '@angular/core';
import ITable from 'src/app/models/ITable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: ITable;

  constructor() {
    this.data = {} as ITable;
  }

  ngOnInit(): void {}
}
