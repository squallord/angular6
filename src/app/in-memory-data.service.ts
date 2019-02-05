import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(): {heroes: Hero[]} {
    const heroes: Hero[] = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    if (heroes.length == 0)
      return 11;
    
    let max: number = 0;
    for (let i: number = 0; i < heroes.length; i++) {
      if (heroes[i].id > max) {
        max = heroes[i].id;
      }
    }
    return ++max;
  }

}