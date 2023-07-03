import { Injectable } from '@angular/core';
import { Pokemon } from 'src/model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  pokemons: string[] = [];
  filter: string = '';
  filteredPokemons: string[] = [];
  pokemon: Pokemon | any = null;
  showSearch: boolean = false;
  clearSearch() {
    this.filter = '';
    this.filteredPokemons = [];
  }
}
