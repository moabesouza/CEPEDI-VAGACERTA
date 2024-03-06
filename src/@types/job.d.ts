export type Empresa = {
  id: number;
  nome: string;
  localizacao: string;
  telefone: string;
  latitude: number;
  longitude: number;
  vagas: Vaga[];
};

export type Vaga = {
  id: number;
  titulo: string;
  descricao: string;
  salario: number;
};
