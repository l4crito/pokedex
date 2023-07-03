import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonService } from 'src/app/client/pokemon.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() pokemonSelected: EventEmitter<string> = new EventEmitter<string>();
  pokemons: string[] = [];
  filteredPokemons: string[] = [];
  filter: string = '';
  constructor(private pokemonService: PokemonService) {
    this.pokemonService.getAllPokemon().subscribe((data: any) => {
      this.pokemons = data.pokemon_entries.map((pokemon: any) => pokemon.pokemon_species.name);
    })
  }

  filterPokemons() {
    this.filteredPokemons = this.pokemons.filter((pokemon) => pokemon.includes(this.filter)).slice(0, 10);
  }
  selectPokemon(pokemon: string) {
    this.filter = pokemon;
    this.filteredPokemons = [];
    this.pokemonSelected.emit(pokemon);
  }
}
