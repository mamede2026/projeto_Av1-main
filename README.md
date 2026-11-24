# CesarSchoolTi – AV2

Projeto da AV1 reimplementado em **React**, com **backend REST (Node + Express)** e **banco de dados SQLite**.
A versão original da AV1 (HTML/CSS/JS) está na pasta [`av1/`](av1/).

## Como executar

Pré-requisito: **Node.js 20 ou superior**.

```bash
npm run instalar   # instala as dependências da raiz, do backend e do frontend
npm run dev        # sobe a API (porta 3001) e o React (porta 5173)
```

Abra **http://localhost:5173**.

O banco (`backend/dados/cesarschoolti.db`) é criado na primeira execução, já com:

- os 5 serviços de TI que eram fixos na AV1;
- um cliente de exemplo com 3 solicitações (login `admin@cesarschoolti.com.br`, senha `Admin@123`).

Para recomeçar do zero, apague a pasta `backend/dados/`.

## Estrutura

```
backend/src/
  db.js                        criação das tabelas e dados iniciais
  funcionalidades/
    clientes.js                autenticar, trocarSenha, cadastrarCliente
    servicosTi.js              cadastrarServico, consultarServicos
    solicitacoes.js            consultarSolicitacoes, atualizarSolicitacoes
  rotas.js                     endpoints REST, que usam as funcionalidades
  server.js                    servidor Express
frontend/src/
  paginas/                     um componente React por página
  componentes/                 componentes menores reutilizáveis
  hooks/                       useFormulario, useMensagem
  contexto/SessaoContext.jsx   usuário logado
  servicos/api.js              chamadas aos endpoints
  util/                        validações e formatação
  css/                         estilos da AV1
```

## Banco de dados

| Tabela | Campos |
|---|---|
| `cliente` | **id** (PK, autoincremento), login (único), senha, nome, cpf, data_nascimento, telefone, estado_civil, escolaridade |
| `servico_ti` | **id** (PK inteira, autoincremento), nome, preco, prazo_dias |
| `solicitacao_servico` | **numero** (PK, autoincremento), data_pedido, status, preco, data_prevista, **servico_id** (FK → servico_ti), **cliente_id** (FK → cliente) |

## Endpoints REST

As respostas seguem o formato `{ "status": "sucesso" | "erro", "mensagem": "..." }`, mais os dados de cada serviço.

| Serviço | Método e rota | Entrada | Retorno |
|---|---|---|---|
| Autenticação | `POST /api/autenticacao` | `{ login, senha }` | `{ status, autenticado }` |
| Troca de senha | `PUT /api/clientes/senha` | `{ login, senhaAtual, novaSenha }` | `{ status, mensagem }` |
| Cadastro de cliente | `POST /api/clientes` | dados do cliente | `{ status, mensagem }` |
| Cadastro de serviço de TI | `POST /api/servicos` | `{ nome, preco, prazo }` | `{ status, mensagem }` |
| Consulta de serviços de TI | `GET /api/servicos` | — | `{ status, servicos, mensagem }` |
| Leitura das solicitações | `GET /api/solicitacoes/:login` | login | `{ status, solicitacoes, mensagem }` |
| Atualização das solicitações | `PUT /api/solicitacoes/:login` | login + `{ solicitacoes }` | `{ status, mensagem }` |
| Dados do cliente (extra) | `GET /api/clientes/:login` | login | `{ status, cliente }` |

O endpoint extra é usado pelo carrinho para mostrar o nome do usuário logado, já que a autenticação retorna só o status do login.

## Páginas

| Rota | Componente | Endpoints usados |
|---|---|---|
| `/` | `PaginaInicial` | — |
| `/login` | `Login` | autenticação |
| `/troca-senha` | `TrocaSenha` | troca de senha |
| `/cadastro` | `CadastroCliente` | cadastro de cliente |
| `/carrinho` | `Carrinho` | consulta de serviços, leitura e atualização das solicitações |
| `/servicos/novo` | `CadastroServico` (página nova) | cadastro e consulta de serviços de TI |

## Requisitos técnicos

- O estado é controlado apenas com Hooks (`useState`, `useEffect`, `useContext` e os hooks próprios `useFormulario` e `useMensagem`).
- Não há uso do DOM: nada de `getElementById`, `querySelector`, `innerHTML`, `addEventListener`, `alert`, `.focus()` ou `useRef`. A única exceção é a linha `createRoot(document.getElementById("root"))`, obrigatória em todo app React.
- O botão **Limpar** coloca o foco de volta no primeiro campo sem usar o DOM: o campo tem `autoFocus` e uma `key` que muda a cada limpeza, então o React recria o campo.
