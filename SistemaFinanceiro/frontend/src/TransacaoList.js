import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransacaoList = () => {
   const [transacoes, setTransacoes] = useState([]);

   useEffect(() => {
      axios.get('http://localhost:5000/api/transacoes')
         .then(response => {
            setTransacoes(response.data);
         })
         .catch(error => console.error("Erro ao carregar transações", error));
   }, []);

   return (
      <div>
         <h2>Transações</h2>
         <ul>
            {transacoes.map(transacao => (
               <li key={transacao.id}>{transacao.descricao} - {transacao.valor}</li>
            ))}
         </ul>
      </div>
   );
}

export default TransacaoList;
