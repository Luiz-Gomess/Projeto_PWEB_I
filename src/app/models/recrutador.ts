export class Recrutador{
    constructor(
        public cnpj: string,
        public nome: string,
        public email: string,
        public senha: string,
        public empresa: string,
        public vagasGererenciadas: string[],
    ){}
}