export class Candidato{
    constructor(
        public cpf : string,
        public nome : string,
        public email : string,
        public senha : string,
        public habilidades: string[] = [],
        public candidaturas : number[] = [],
    ){}
}