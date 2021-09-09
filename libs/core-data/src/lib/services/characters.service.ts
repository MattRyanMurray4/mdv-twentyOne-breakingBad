import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '@breakingbad/api-interfaces';
import { environment } from '@env/environments';
import { mapTo } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private model = 'characters';
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Character[]>(this.getApi(), { params: { limit: 5 } });
  }

  find(id: string) {
    return this.http.get<Character>(this.getApiById(id));
  }

  create(character: Character) {
    return this.http.post<Character>(this.getApi(), character);
  }

  update(character: Character) {
    return this.http.patch<Character>(
      this.getApiById(character.char_id),
      character
    );
  }

  delete(characterId: string) {
    return this.http
      .delete<string>(this.getApiById(characterId))
      .pipe(mapTo(characterId));
  }

  private getApi() {
    return `${environment.apiUrl}/${this.model}`;
  }

  private getApiById(id: string) {
    return `${this.getApi()}/${id}`;
  }
}
