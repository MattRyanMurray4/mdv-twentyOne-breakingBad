export interface Character {
  char_id: string;
  name: string;
  nickname: string;
  birthday: string;
  status: string;
}

export const emptyCharacter = {
  char_id: '',
  name: '',
  nickname: '',
  birthday: '',
  status: '',
};
