import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ){}

  public countriesByRegion: SmallCountry[] = [];
  
  //Conectar campos con el formulario
  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })
  

  ngOnInit(): void {
    this.onRegionChanged();
  }
  
  //Obtener las regiones para cargarlas en el formulario
  get regions(): Region[]{
    return this.countriesService.regions;
  }

  onRegionChanged(): void{
    this.myForm.get('region')!.valueChanges
    .pipe(
      switchMap(region => this.countriesService.getCountriesByRegion(region)),
    )
    .subscribe(countries => {
      this.countriesByRegion = countries;
    });
  }

}
