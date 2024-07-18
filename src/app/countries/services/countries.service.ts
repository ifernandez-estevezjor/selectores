import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];
  private baseUrl: string = 'https://restcountries.com/v3.1';

  constructor(
    private http: HttpClient
  ) { }

  //Mandar a llamar las regiones/continentes
  get regions(): Region[]{
    return [ ...this._regions ];
  }

  //Obtener países por region/continente
  getCountriesByRegion(region: Region): Observable<SmallCountry[]>{
    if(!region) return of([]);

    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.map(country => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? []
      }))),
      //tap(response => console.log({response}))
    )
  }
}
