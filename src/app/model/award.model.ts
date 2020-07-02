import { Content } from './content.model';
import { Actor } from './actor.model';
import { Category } from './category.model';

export class Award {
    constructor(public id: string, public name: string, public director: string, public date: Date, 
      public country: string, public description: string,public image: string, public category: Category, 
      public actor: Actor,public content: Content, public userID: string) {
    }
  
  }