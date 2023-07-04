import { Component } from '@angular/core';
import { PokemonService } from './client/pokemon.service';
import { Pokemon } from 'src/model/pokemon';
import { HotkeysService } from '@ngneat/hotkeys';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedex';


  constructor(private pokemonService: PokemonService, private hotkeys: HotkeysService, public dataService: DataService) {
  }
  ngOnInit() {

    this.hotkeys.addShortcut({ keys: 'meta.f', allowIn: ['INPUT', 'SELECT', 'TEXTAREA', 'CONTENTEDITABLE'] }).subscribe(() =>
      this.dataService.showSearch = true
    );
    this.hotkeys.addShortcut({ keys: 'esc', allowIn: ['INPUT', 'SELECT', 'TEXTAREA', 'CONTENTEDITABLE'] }).subscribe(() => {
      if (this.dataService.filter && this.dataService.showSearch) {
        this.dataService.clearSearch();
      } else {
        this.dataService.showSearch = false;
      }
    });
  }
  setPokemon(pokemon: Pokemon) {
    this.dataService.specie = null;
    this.dataService.showSearch = false;
    this.dataService.pokemon = pokemon;
    this.pokemonService.getSpecie(pokemon.species.url).subscribe((specie) => {
      const words:string[]= specie.flavor_text_entries.filter((flavor) => flavor.language.name === 'es').slice(0,1).map((flavor) => flavor.flavor_text).join(' ').split(' ');
      this.showDescription(words);
      this.dataService.specie = specie;
    });
  }

  showDescription(words: string[]) {
    let index = 0;
    const delay = 200; // Adjust the delay (in milliseconds) between each word
    this.dataService.pokemon.description = '';
    const intervalId = setInterval(() => {
      if (index < words.length) {
        this.dataService.pokemon.description = this.dataService.pokemon.description+words[index]+' ';
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, delay);
  }

}
