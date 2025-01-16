import React, { useEffect, useState } from "react";
import api from "./services/api";
import { Transacao } from './models/Transacao';  // Importando o modelo
import { Conta } from './models/Conta';  // Importando o modelo

function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [erro, setErro] = useState(null);

  // Carregar as transações ao carregar o componente
  useEffect(() => {
    api.get("/transacoes")
      .then((response) => {
        const transacoesData = response.data.map((transacaoData) => {
          const conta = new Conta(transacaoData.conta.id, transacaoData.conta.nome, transacaoData.conta.saldo);
          return new Transacao(transacaoData.id, transacaoData.descricao, transacaoData.valor, transacaoData.data, conta);
        });
        setTransacoes(transacoesData);
      })
      .catch((error) => {
        console.error("Erro ao buscar transações:", error);
      });
  });

  // Função para adicionar transação
  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!descricao || !valor) {
      setErro("Descrição e valor são obrigatórios");
      return;
    }
  
    const novaTransacao = {
      descricao,
      valor: parseFloat(valor),
      data: new Date().toISOString(),
      contaId: 1,  // Certifique-se de que este ID é válido e corresponde a uma conta existente no banco
    };
  
    console.log("Transação a ser enviada:", novaTransacao);  // Log para verificar a transação
  
    api.post("/transacoes", novaTransacao)
      .then((response) => {
        console.log("Resposta da API:", response);
        // Resto do código...
      })
      .catch((error) => {
        console.error("Erro ao adicionar transação:", error);
        setErro("Erro ao adicionar transação.");
      });
  };
  
  return (
    <div>
      <h1>Controle Financeiro</h1>
      
      {/* Exibir erro, se houver */}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {/* Formulário para adicionar transações */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Transação</button>
      </form>

      <h2>Transações</h2>
      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            {transacao.descricao} - R$ {transacao.valor ? transacao.valor.toFixed(2) : 'Valor não disponível'}
            <br />
            <small>{new Date(transacao.data).toLocaleString()}</small>
            <br />
            <strong>Conta: {transacao.conta.nome}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;