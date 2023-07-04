import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokedex, } from 'src/model/pokedex';
import { Pokemon } from 'src/model/pokemon';
import { DataService } from '../service/data.service';
import { PokmonSpecie } from 'src/model/specie';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient, private dataService: DataService) {
    this.getAllPokemon();
  }
  getAllPokemon() {
    return this.httpClient.get<Pokedex>(environment.apiUri + '/pokedex/1').subscribe((data: any) => {
      this.dataService.pokemons = data.pokemon_entries.map((pokemon: any) => pokemon.pokemon_species.name);
    })
  }
  getPokemonInfo(name: string) {
    return this.httpClient.get<Pokemon>(environment.apiUri + '/pokemon/' + name)
  }
  getSpecie(url: string) {
    return this.httpClient.get<PokmonSpecie>(url)
  }
}
