import { Component, OnInit, ViewChild   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ville } from 'src/app/common/ville';
import { VilleService } from 'src/app/services/ville.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Commerce } from 'src/app/common/commerce';
import { CommerceService } from 'src/app/services/commerce.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-commerce',
  templateUrl: './commerce.page.html',
  styleUrls: ['./commerce.page.scss'],
})
export class CommercePage implements OnInit {

  villes!: Ville[];
  ville_id: any;
  villeName!: string;

  dataSourceCommerce: MatTableDataSource<Commerce>;
  displayedColumnsCommerce: string[] = ['id', 'commerceName', 'proprietaireName', 'adresse', 'telephone'];
  @ViewChild('TableCommercePaginator', { static: true }) tableCommercePaginator!: MatPaginator;
  @ViewChild('TableCommerceSort', { static: true }) tableCommerceSort!: MatSort;

  static villeId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private villeService: VilleService,
    private commerceService: CommerceService,
    private router: Router
  ) {
    this.dataSourceCommerce = new MatTableDataSource<Commerce>();
   }

  ngOnInit() {
    this.ville_id = this.route.snapshot.paramMap.get('villeId');
    this.listVilles();
    this.ionViewWillEnter();
    this.listCommerces(+this.ville_id);

    this.dataSourceCommerce.paginator = this.tableCommercePaginator;
    this.dataSourceCommerce.sort = this.tableCommerceSort;
  }

  listVilles() {
    this.villeService.getAllVilles().subscribe(
      data => {
        this.villes = data;
      }
    )
  }

  ionViewWillEnter() {
    this.villeService.getAllVilles().subscribe(
      data => {
        this.villes = data;
        const villeId = this.route.snapshot.paramMap.get('villeId');
        if (villeId) {
          const selectedVille = this.villes.find(ville => ville.id === parseInt(villeId));
          if (selectedVille) {
            this.villeName = selectedVille.villeName;
          }
          console.log('id = ', villeId, 'ville = ', this.villeName)
        }
      }
    )

  }

  listCommerces(arg0: number) {
    
    this.commerceService.getCommerceByVilleId(arg0).subscribe(
      data => {
        // console.log('Liste des Commerces =' + JSON.stringify(data));
        this.dataSourceCommerce.data = data as Commerce[];
        
      }
    );
  }

  onRowClicked(row: Commerce) {
    console.log('clic sur la line: ',row.id);
    this.router.navigateByUrl(`products/${row.id}`); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCommerce.filter = filterValue.trim().toLowerCase();
  }


}

// Could not read the default style file within the project (@angular/material/prebuilt-themes/indigo-pink.css)