import { GerenciadorDeReceitas } from './managers/GerenciadorDeReceitas';
import { Receita } from './models/Receita';
import * as readline from 'readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const gerenciador = new GerenciadorDeReceitas();

async function main() {
  while (true) {
    console.log(`
    ====== Gerenciador de Receitas ======
    1. Adicionar Receita
    2. Listar Todas as Receitas
    3. Deletar Receita
    4. Sair
    =====================================
    `);

    const opcao = await rl.question('Escolha uma opção: ');

    switch (opcao) {
      case '1':
        const nome = await rl.question('Nome da receita: ');
        const ingredientesStr = await rl.question('Ingredientes (separados por vírgula): ');
        const ingredientes = ingredientesStr.split(',').map(item => item.trim());
        const calorias = parseInt(await rl.question('Calorias: '), 10);
        const tempoPreparo = parseInt(await rl.question('Tempo de preparo (minutos): '), 10);

        const novoId = gerenciador.gerarNovoId();
        const novaReceita = new Receita(novoId, nome, ingredientes, calorias, tempoPreparo);
        await gerenciador.adicionarReceita(novaReceita);
        break;
      case '2':
        gerenciador.listarTodasAsReceitas();
        break;
      case '3':
        const idDeletar = await rl.question('ID da receita para deletar: ');
        await gerenciador.deletarReceita(idDeletar);
        break;
      case '4':
        console.log('Saindo...');
        rl.close();
        return;
      default:
        console.log('Opção inválida.');
    }
  }
}

main();
