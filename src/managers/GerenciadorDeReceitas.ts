import { promises as fs } from 'fs';
import * as path from 'path';
import { Receita } from '../models/Receita';

export class GerenciadorDeReceitas {
  private receitas: Receita[] = [];
  private readonly dbPath = path.resolve(__dirname, '../../database/receitas.json');

  constructor() {
    this.carregarReceitas().catch(error => console.error("Erro ao carregar receitas:", error));
  }

  public gerarNovoId(): string {
    if (this.receitas.length === 0) {
      return '1';
    }
    const maiorId = Math.max(...this.receitas.map(r => parseInt(r.id, 10)));
    return (maiorId + 1).toString();
  }

  private async carregarReceitas(): Promise<void> {
    try {
      const data = await fs.readFile(this.dbPath, 'utf-8');
      const receitasSalvas = JSON.parse(data);
      this.receitas = receitasSalvas.map((r: any) =>
        new Receita(r.id, r.nome, r.ingredientes, r.calorias, r.tempoPreparo)
      );
    } catch (error) {
      this.receitas = [];
    }
  }

  private async salvarReceitas(): Promise<void> {
    await fs.mkdir(path.dirname(this.dbPath), { recursive: true });
    await fs.writeFile(this.dbPath, JSON.stringify(this.receitas, null, 2));
  }

  public async adicionarReceita(receita: Receita): Promise<void> {
    if (this.receitas.some(r => r.id === receita.id)) {
      console.log('Erro: Já existe uma receita com este ID.');
      return;
    }
    this.receitas.push(receita);
    await this.salvarReceitas();
    console.log(`Receita '${receita.nome}' adicionada com sucesso!`);
  }

  public listarTodasAsReceitas(): void {
    if (this.receitas.length === 0) {
      console.log('Nenhuma receita cadastrada.');
      return;
    }
    console.log('--- Lista de Todas as Receitas ---');
    this.receitas.forEach(r => r.exibirDetalhes());
  }

  public async deletarReceita(id: string): Promise<void> {
    const tamanhoInicial = this.receitas.length;
    this.receitas = this.receitas.filter(r => r.id !== id);

    if (this.receitas.length < tamanhoInicial) {
      await this.salvarReceitas();
      console.log('Receita deletada com sucesso!');
    } else {
      console.log('Receita não encontrada.');
    }
  }
}
