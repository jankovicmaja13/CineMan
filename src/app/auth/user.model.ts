export class User {
    // tslint:disable-next-line: variable-name
    constructor(public id: string, public email: string, private _token: string, private tokenExpirationDate: Date) {
    }

    get token() {
        if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
            return null;
        }
        return this._token;
    }
}
