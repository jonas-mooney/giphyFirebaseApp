import { Component, OnInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchedGifs = [];
  constructor() { }

  ngOnInit(): void {
  }

  apiCall(searchInput) {
      axios
      // .get(`https://api.giphy.com/v1/gifs&api_key=KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz&limit=30&q=${searchInput}&rating=g\n`)
        .get(`https://api.giphy.com/v1/gifs/search?api_key=KkQIVU7CgUTlND28O2bDZveA3Z8Vl1kz&limit=30&q=${searchInput}&rating=pg`)
      .then(response => this.searchedGifs = response.data.data)
        console.log(this.searchedGifs)
  }

}
