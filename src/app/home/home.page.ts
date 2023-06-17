import { Component, OnInit } from '@angular/core';
import { Ville } from 'src/app/common/ville';
import { Router } from '@angular/router'; 

import { VilleService } from 'src/app/services/ville.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  villes!: Ville[];
  filteredVilles!: Ville[];
  
  constructor(
    private villeService: VilleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listVilles();
  }

  listVilles() {
    this.villeService.getAllVilles().subscribe(
      data => {
        this.villes = data;
        this.filteredVilles = data.sort((a, b) => {
          if (a.villeName < b.villeName) {
            return -1;
          } else if (a.villeName > b.villeName) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    )
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredVilles = this.villes.filter((ville) => ville.villeName.toLowerCase().indexOf(query) > -1);
  }

  navigateToCommerceList(ville: Ville) {
    this.router.navigateByUrl(`/commerces/${ville.id}`); 
  }

}
