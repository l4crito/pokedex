import { Component } from '@angular/core';
import { PokemonService } from './client/pokemon.service';
import { Pokemon } from 'src/model/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedex';
  pokemons: string[] = [];
  filteredPokemons: string[] = [];
  pokemon: Pokemon | any = null;
  photo: string = '../assets/pokeball.png';
  showSearch: boolean = false;

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.getAllPokemon().subscribe((data: any) => {
      this.pokemons = data.pokemon_entries.map((pokemon: any) => pokemon.pokemon_species.name);
    })
  }

  getPokemonInfo(name: string) {
    this.showSearch = false;
    this.pokemonService.getPpkemon(name).subscribe((data: any) => {
      this.pokemon = data;
      this.photo = this.pokemon.sprites.other["official-artwork"].front_default || this.pokemon.sprites.other.dream_world.front_default || this.pokemon.sprites.front_default;
      console.log(this.pokemon);
    })
  }

}
