export class Candidato{
    constructor(
        public id : string = '',
        public cpf : string,
        public nome : string,
        public email : string,
        public habilidades: string[],
        public candidaturas : number[],
    ){}
}