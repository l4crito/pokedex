import { Injectable } from '@angular/core';
import { Pokemon } from 'src/model/pokemon';
import { PokmonSpecie } from 'src/model/specie';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  pokemons: string[] = [];
  filter: string = '';
  filteredPokemons: string[] = [];
  pokemon: Pokemon | any = null;
  specie: PokmonSpecie | any = null;
  showSearch: boolean = false;
  clearSearch() {
    this.filter = '';
    this.filteredPokemons = [];
  }
}
