export class User{
  constructor(
    public _id:string,
    public name:string,
    public email:string,
    public password:string,
    public confirmPass:string,
    public imagen:string,
    public role:string
    ){}
}
