import React, { useEffect, useState } from "react";
import api from "./services/api";
import { Transacao } from './models/Transacao';  // Importando o modelo
import { Conta } from './models/Conta';  // Importando o modelo

function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [contas, setContas] = useState([]); // Estado para armazenar as contas
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [contaSelecionada, setContaSelecionada] = useState(""); // Nova conta selecionada
  const [erro, setErro] = useState(null);

  // Carregar transações e contas ao carregar o componente
  useEffect(() => {
    Promise.all([
      api.get("/transacoes"),
      api.get("/contas"),
    ])
      .then(([transacoesRes, contasRes]) => {
        const transacoesData = transacoesRes.data.map((transacaoData) => {
          const conta = new Conta(transacaoData.conta.id, transacaoData.conta.nome, transacaoData.conta.saldo);
          return new Transacao(transacaoData.id, transacaoData.descricao, transacaoData.valor, transacaoData.data, conta);
        });
        setTransacoes(transacoesData);
        setContas(contasRes.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  // Função para adicionar transação
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!descricao || !valor || !contaSelecionada) {
      setErro("Descrição, valor e conta são obrigatórios.");
      return;
    }

    const novaTransacao = {
      descricao,
      valor: parseFloat(valor),
      data: new Date().toISOString(),
      contaId: parseInt(contaSelecionada), // Associa a transação à conta selecionada
    };

    api.post("/transacoes", novaTransacao)
      .then((response) => {
        setTransacoes([...transacoes, response.data]);
        setDescricao("");
        setValor("");
        setContaSelecionada("");
        setErro(null);
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
        <div>
          <label>Conta:</label>
          <select
            value={contaSelecionada}
            onChange={(e) => setContaSelecionada(e.target.value)}
            required
          >
            <option value="">Selecione uma conta</option>
            {contas.map((conta) => (
              <option key={conta.id} value={conta.id}>
                {conta.nome} (Saldo: R$ {conta.saldo.toFixed(2)})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Adicionar Transação</button>
      </form>

      <h2>Transações</h2>
      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            {transacao.descricao} - R$ {transacao.valor.toFixed(2)}
            <br />
            <small>{new Date(transacao.data).toLocaleString()}</small>
            <br />
            <strong>Conta: {transacao.conta ? transacao.conta.nome : "Conta não disponível"}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
