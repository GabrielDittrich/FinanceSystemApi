export class Transacao {
    constructor(id, descricao, valor, data, conta) {
      this.id = id;
      this.descricao = descricao;
      this.valor = valor;
      this.data = data;
      this.conta = conta; // Aqui você pode referenciar a instância da Conta, se necessário
    }
  }
  