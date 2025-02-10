export class Vaga{
    constructor(
        public id: string,
        public titulo: string,
        public descricao: string,
        public salario: number,
        public candidatos: string[] = [],
    ){}
}