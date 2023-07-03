import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokedex, } from 'src/model/pokedex';
import { Pokemon } from 'src/model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient:HttpClient) { }
  getAllPokemon() {
    return this.httpClient.get<Pokedex>(environment.apiUri + '/pokedex/1')
  }
  getPpkemon(name:string) {
    return this.httpClient.get<Pokemon>(environment.apiUri + '/pokemon/'+ name)
  }
}
