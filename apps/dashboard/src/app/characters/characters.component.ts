import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Character, emptyCharacter } from '@breakingbad/api-interfaces';
import { CharactersFacade } from '@breakingbad/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'breakingbad-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters$: Observable<Character[]> = this.charactersFacade.allCharacters$;
  selectedCharacter$: Observable<Character> =
    this.charactersFacade.selectedCharacters$;
  form: FormGroup;

  constructor(
    private charactersFacade: CharactersFacade,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.charactersFacade.loadCharacters();
    this.reset();
    const characterRouteId = this.route.snapshot.params['id'];
    if(characterRouteId){
     this.loadCharacter(characterRouteId)
    }
  }

  reset() {
    this.selectCharacter(emptyCharacter);
    this.form.reset();
  }

  selectCharacter(character: Character) {
    this.charactersFacade.selectCharacter(character.char_id);
    this.form.patchValue(character);
  }

  loadCharacter(char_id: string){
    this.charactersFacade.selectCharacter(char_id)
    this.charactersFacade.loadCharacter(char_id)
  }

  viewCharacter(char_id: string){
    this.router.navigate(['/character', char_id])
  }

  createCharacter(character: Character) {
    this.charactersFacade.createCharacter(character);
    this.reset();
  }

  updateCharacter(character: Character) {
    this.charactersFacade.updateCharacter(character);
    this.reset();
  }

  saveCharacter(character: Character) {
    character.char_id
      ? this.charactersFacade.updateCharacter(character)
      : this.charactersFacade.createCharacter(character);
  }

  deleteCharacter(character: Character) {
    this.charactersFacade.deleteCharacter(character);
    this.reset();
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      nickname: ['', Validators.required],
      birthday: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
}
