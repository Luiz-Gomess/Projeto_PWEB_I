export class Candidato{
    constructor(
        public id : string = '',
        public cpf : string,
        public nome : string,
        public email : string,
        public candidaturas : number[],
    ){}
}