import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Character } from '@breakingbad/api-interfaces';

@Component({
  selector: 'breakingbad-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent {
  currentCharacter: Character;
  originalName: string;

  @Input() set character(value: Character | null) {
    if (value) this.originalName = value.name;
    this.currentCharacter = Object.assign({}, value);
  }
  @Input() form: FormGroup;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  save(character: Character) {
    this.saved.emit(character);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    if (this.form.invalid) return;
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }
}
