export class Vaga{
    constructor(
        public id: string,
        public titulo: string,
        public descricao: string,
        public salario: number,
        public empresa: string,
        public local: string,
        public requisitos: string[] = [],
        public candidatos: string[] = [],
    ){}
}