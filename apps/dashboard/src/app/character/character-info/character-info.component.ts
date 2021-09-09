import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '@breakingbad/api-interfaces';
import { CharactersFacade } from '@breakingbad/core-state';

@Component({
  selector: 'breakingbad-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss']
})
export class CharacterInfoComponent {
  @Input() character: Character | null;
  constructor(private charactersFacade: CharactersFacade, private route: ActivatedRoute, private router: Router) { }

  goBack() {
    this.router.navigate(['/characters']);
  }

}
