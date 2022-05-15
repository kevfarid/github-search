import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  word: string = '';

  constructor() {}

  ngOnInit(): void {}

  onChangeAndClick() {
    this.search.emit(this.word);
  }
}
