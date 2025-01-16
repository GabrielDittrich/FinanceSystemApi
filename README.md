# ControleFinanceiro

ControleFinanceiro é um sistema de gerenciamento financeiro que permite o controle de transações financeiras, contas e categorias, com integração em uma API RESTful.<br>
O sistema foi desenvolvido utilizando C#, .NET, MySQL e React, oferecendo uma interface intuitiva para gestão de finanças pessoais ou empresariais.

## Tecnologias Utilizadas

- **Backend**: C# com .NET 8.0 (ASP.NET Core)
- **Banco de Dados**: MySQL
- **Frontend**: React (com Hooks, Axios)
- **ORM**: Entity Framework Core
- **Autenticação**: JWT (JSON Web Token)
  
## Funcionalidades

- Swagger http://localhost:(Porta_que_aparecer_no_terminal_do_backend)/swagger/index.html (opcional, para testar a API)
- Cadastro, edição e exclusão de **transações financeiras**.
- Cadastro de **contas** e **categorias**.
- Visualização de **relatórios** de transações.
- **Autenticação** segura com JWT.

## Pré-requisitos

Antes de rodar o projeto, tenha os seguintes pré-requisitos instalados:

- [Node.js](https://nodejs.org/) - Para o frontend (React)
- [.NET 8.0](https://dotnet.microsoft.com/download) - Para o backend (API)
- [MySQL](https://www.mysql.com/) - Banco de dados


## Como Rodar o Projeto

### Backend (API)

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/controle-financeiro.git
    cd controle-financeiro
    cd Backend
    ```

2. Configure o banco de dados MySQL com as credenciais corretas no arquivo `appsettings.json`.

3. Execute as migrations para configurar o banco de dados:
    ```bash
    dotnet ef database update
    ```

4. Inicie a API:
    ```bash
    dotnet run
    ```

A API estará disponível em `http://localhost:(Porta que aparecer no terminal)`.

### Frontend (React)

1. No diretório do frontend, instale as dependências:
    ```bash
    cd ../Frontend
    npm install
    ```

2. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```

A aplicação será acessível em `http://localhost:3000`.

## Estrutura do Projeto

- **Backend/**: Contém o código da API, incluindo os controladores e a configuração do banco de dados.
- **Frontend/**: Contém o código da interface do usuário, incluindo componentes React e gerenciamento de estado.
- **Migrations/**: Contém as migrações do banco de dados para manter o esquema atualizado.

## Como Contribuir

1. Faça um fork do repositório.
2. Crie uma branch para a sua feature (`git checkout -b feature/nome-da-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adicionando nova feature'`).
4. Envie para o seu fork (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request para o repositório original.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Se você tiver alguma dúvida ou sugestão, entre em contato comigo:

- **E-mail**: gdittrchcj@gmail.com
- **LinkedIn**: [https://www.linkedin.com/in/gabriel-dittrich](https://www.linkedin.com/in/gabriel-dittrich)
