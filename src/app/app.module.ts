import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { GithubService } from './services/github.service';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [AppComponent, TableComponent, LoadingComponent, SearchComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [GithubService],
  bootstrap: [AppComponent],
})
export class AppModule {}
