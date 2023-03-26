import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent {
  heroes$: Observable<Hero[]> = this.heroService.getHeroes();

  constructor(private heroService: HeroService) { }

}
