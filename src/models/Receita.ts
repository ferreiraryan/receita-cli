import type IReceita = require("../interfaces/IReceita");

export class Receita implements IReceita.IReceita {
  id: string;
  nome: string;
  ingredientes: string[];
  calorias: number;
  tempoPreparo: number;

  constructor(id: string, nome: string, ingredientes: string[], calorias: number, tempoPreparo: number) {
    this.id = id;
    this.nome = nome;
    this.ingredientes = ingredientes;
    this.calorias = calorias;
    this.tempoPreparo = tempoPreparo;
  }

  public exibirDetalhes(): void {
    console.log(`
      --- Detalhes da Receita ---
      ID: ${this.id}
      Nome: ${this.nome}
      Ingredientes: ${this.ingredientes.join(', ')}
      Calorias: ${this.calorias} kcal
      Tempo de Preparo: ${this.tempoPreparo} minutos
      ---------------------------
    `);
  }
}
