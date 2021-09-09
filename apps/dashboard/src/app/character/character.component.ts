import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersFacade } from '@breakingbad/core-state';

@Component({
  selector: 'breakingbad-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  currentCharacter$ = this.charactersFacade.selectedCharacters$
  constructor(private charactersFacade: CharactersFacade, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const char_id = this.route.snapshot.params.char_id;
    this.loadCharacter(char_id)
  }

  loadCharacter(char_id: string) {
    this.charactersFacade.selectCharacter(char_id)
    this.charactersFacade.loadCharacter(char_id)
  }

  goBack() {
    this.router.navigate(['/characters']);
  }

}
