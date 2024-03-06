import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { oneOrTwoControlFilledValidator, rangeDateValidator } from '../validators/validator-functions';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/Movie.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.scss'
})
export class SearchMovieComponent {

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    //initialisation de fiche via un patchValue à l'ouverture du formulaire
    this.searchMovieForm.patchValue({
      fiche: 'courte'
    })

    //souscription aux changements de searchMovieForm pour afficher les modif dans la console
    this.subscribeToFormChanges();
  }

  today: Date = new Date();
  thisYear: number = this.today.getFullYear();
  myMovie?: Movie;
  searchMovieFormValueChangeSubscription?: Subscription;

  searchMovieForm = this.fb.group({
    idAndTitle: this.fb.group(
      {
        id: [''],
        title: ['']
      },
      {
        validator: oneOrTwoControlFilledValidator('id', 'title')
      }
    ),
    type: ['serie'],
    year: ['', [Validators.required, rangeDateValidator(1900, this.thisYear)]],
    fiche: ['']
  })

  get idAndTitle(): FormGroup {
    return this.searchMovieForm.get('idAndTitle') as FormGroup;
  }


  subscribeToFormChanges(): void {
    this.searchMovieFormValueChangeSubscription = this.searchMovieForm.valueChanges.subscribe(value => {
      console.log('searchForm value change :', value);
    })
  }

  onSubmit(): void {
    this.myMovie = this.searchMovieForm.value as Movie;
    console.log("myMovie : ", this.myMovie);

  }

  ngOnDestroy(): void {
    this.searchMovieFormValueChangeSubscription?.unsubscribe();
  }

}
