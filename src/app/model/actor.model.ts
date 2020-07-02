import { Role } from './role.model';

export class Actor {
    constructor(public id: string, public name: string, public aka: string, public biography: string,
                public dateOfBirth: Date, public country: string, public height: number, public image: string,
                public userId: string, public roles: Role[] ) {
    }
  
  }