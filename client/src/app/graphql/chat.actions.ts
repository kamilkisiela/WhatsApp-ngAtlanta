import { ID } from '../whatsapp';

export class ToggleStar {
  static type = '[Chat] toggle star';
  constructor(public id: ID) {}
}