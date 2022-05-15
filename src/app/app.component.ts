import { Component, OnInit } from '@angular/core';
import ITable from './models/ITable';
import { IRow } from './models/ITable';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'githubSearch';
  form = {
    word: '',
  };

  dataTable: ITable = {
    cols: [
      { id: 1, label: 'Avatar', type: 'image', key: 'avatar_url' },
      { id: 2, label: 'Username', type: 'text', key: 'login' },
      { id: 3, label: 'Type', type: 'text', key: 'type' },
      { id: 4, label: 'Score', type: 'number', key: 'score' },
      { id: 5, label: 'Level', type: 'text', key: 'level' },
    ],
    rows: [],
  };

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.githubService.getAllUsers().subscribe((users) => users);
  }

  search() {
    if (this.form.word.length < 1) {
      this.dataTable.rows = [];
      return;
    }

    if (this.form.word.length < 3) return;

    this.githubService.getUsersByWord(this.form.word).subscribe(
      (users) => {
        this.dataTable.rows = users as unknown as IRow[];
      },
      (error) => {
        this.githubService.getAllUsers(this.form.word).subscribe((users) => {
          this.dataTable.rows = users as unknown as IRow[];
        });
      }
    );
  }
}
