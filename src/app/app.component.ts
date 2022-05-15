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
  title: string = 'Github Search';

  infoApi = {
    loading: false,
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

  search(word: string) {
    if (word.length < 1) {
      this.dataTable.rows = [];
      return;
    }

    if (word.length < 3) return;

    this.infoApi.loading = true;

    this.githubService.getUsersByWord(word).subscribe({
      next: (users) => {
        this.dataTable.rows = users as unknown as IRow[];
      },
      error: (_) => {
        this.githubService.getAllUsers(word).subscribe((users) => {
          this.dataTable.rows = users as unknown as IRow[];
          this.infoApi.loading = false;
        });
      },
      complete: () => {
        this.infoApi.loading = false;
      },
    });
  }
}
