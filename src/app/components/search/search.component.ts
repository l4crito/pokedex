import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HotkeysService } from '@ngneat/hotkeys';
import { PokemonService } from 'src/app/client/pokemon.service';
import { DataService } from 'src/app/service/data.service';
import { Pokemon } from 'src/model/pokemon';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('txtSearch') txt: ElementRef | undefined;
  @Output() pokemonSelected: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  selectedIndex = 0;
  constructor(public dataService: DataService, private pokemonService: PokemonService, private hotkeys: HotkeysService) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.focusSearch();
    }, 100);
  }

  filterPokemons() {
    this.dataService.filteredPokemons = this.dataService.pokemons.filter((pokemon) => pokemon.includes(this.dataService.filter)).slice(0, 10);
  }
  selectPokemon(pokemon: string) {
    this.dataService.filter = pokemon;
    this.getPokemonInfo(pokemon);

  }
  getPokemonInfo(name: string) {
    this.pokemonService.getPokemonInfo(name).subscribe((pokemon: Pokemon) => {
      pokemon.sprites.other.dream_world.front_default = pokemon.sprites.other.dream_world.front_default ||
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.other.dream_world.front_default ||
        pokemon.sprites.front_default;
      this.pokemonSelected.emit(pokemon);
    }, () => {
      this.dataService.pokemons.filter((pokemon) => pokemon !== name);
      this.dataService.filteredPokemons.filter((pokemon) => pokemon !== name);
    })
  }

  focusSearch() {
    this.txt?.nativeElement.focus();
  }
  moveSelectionUp() {
    this.selectedIndex = Math.max(0, this.selectedIndex - 1);
    this.focusSelectedDiv();
  }

  moveSelectionDown() {
    this.selectedIndex = Math.min(this.dataService.filteredPokemons.length - 1, this.selectedIndex + 1);
    this.focusSelectedDiv();
  }

  focusSelectedDiv() {
    const selectedDiv = document.getElementById(`div_${this.selectedIndex}`);
    if (selectedDiv) {
      selectedDiv.focus();
    }
  }
  clearAndFocus() {
    this.dataService.clearSearch();
    this.focusSearch();
  }

}
