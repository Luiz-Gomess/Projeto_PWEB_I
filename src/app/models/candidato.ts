export class Candidato{
    constructor(
        public cpf : string,
        public nome : string,
        public email : string,
        public candidaturas : number[],
    ){}
}