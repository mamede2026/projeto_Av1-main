# Especificação do projeto - AV1

Elaborar uma solução de páginas de uma empresa que vende serviços de TI. A solução deve constar de **05 páginas**, e todas elas devem manter coerência de um padrão visual bem definido.

## 1. Página estática de apresentação da empresa

A página deve ter dois ou três links:

- Um link para a página de login dos clientes;
- Um link para a página de cadastro de um novo cliente;
- Um terceiro link, exibido somente após a realização do login, para a página de solicitação de serviços de TI.

### Estrutura da página

| Seção | Conteúdo |
|---|---|
| **Header** | Imagem que contenha o logo da empresa. |
| **Header** | Uma frase de apresentação da página. |
| **Header** | Os três links mencionados. |
| **Body** | Um texto com uma breve história da empresa. |
| **Body** | Um vídeo institucional de 1 minuto de duração sobre a empresa, **em streaming**, hospedado no YouTube. |
| **Body** | Uma galeria de, pelo menos, 4 fotos das instalações e/ou dos funcionários da empresa. |
| **Body** | Uma porção da página, de livre criação, com uma apresentação estática, não podendo ser vídeo, dos principais serviços de TI oferecidos pela empresa. |
| **Body** | Uma tabela com cargo, nome e breve CV dos 3 fundadores da empresa. |
| **Footer** | Um bloco com os contatos da empresa em forma de lista, com 3 itens: número de telefone fixo, número de WhatsApp e um link `mailto`. |
| **Footer** | Um bloco com o endereço da empresa em forma de texto. |
| **Footer** | Um bloco com figuras que representem as formas de pagamento suportadas pela empresa. |

## 2. Requisitos técnicos

### HTML

- Não usar tags de estilização *deprecated*.
- Usar marcações de blocos de conteúdo.
- Usar pelo menos uma tag que diferencie textos do texto padrão.
- O uso de tabelas, listas, tags para inserção de imagens, figuras e links está implícito na especificação funcional.
- Usar tabelas para, pelo menos em parte, definir um layout organizado e consistente para o conteúdo da página.

### CSS

- Usar todos os tipos de seletores aprendidos.
- Usar "acumulação" de estilos.
- Usar "sobrescrita" de estilos, isto é, o estilo mais próximo para uma mesma característica fica valendo.
- Usar estilos definidos em arquivos e na página, dentro da tag `<style>`.
- Usar livremente, mas de forma **bem moderada**, estilos dentro de tags.
- Diferenciar fontes de parágrafos e de cabeçalhos por estilos.
- Usar alguma técnica de alinhamento estudada.
- Usar controle de barra de rolagem automática para conteúdo longo.
- Usar pelo menos uma das técnicas de CSS Layout para, pelo menos em parte, definir um layout organizado e consistente para o conteúdo da página.

## 3. Página de login

A página de login deve conter:

- Identificação da página: **Login de clientes**;
- Logo da empresa;
- Link para uma página de troca de senha;
- Campo de entrada de texto para digitação do login;
- Campo de entrada de texto para digitação da senha;
- Botão **Realizar Login**;
- Botão **Limpar**;
- Link para a página de cadastro de cliente.

### Validações em JavaScript

- O login deve ser preenchido e ter formato de e-mail válido.
- A senha deve ser preenchida.
- O clique no botão **Realizar Login** deve:
  - Executar as validações da página;
  - Mostrar uma mensagem pertinente, em `alert` ou em um `label` específico, caso alguma validação não seja aprovada;
  - Mostrar a mensagem **"Validação realizada com sucesso"** caso todas as validações sejam aprovadas;
  - Navegar para a página de conteúdo após a validação bem-sucedida.
- O clique no botão **Limpar** deve:
  - Limpar os campos de entrada de texto;
  - Posicionar o foco no campo de login.

## 4. Página de troca de senha

A página deve conter:

- Identificação da página: **Troca de senha de clientes**;
- Logo da empresa;
- Campo de entrada de texto para digitação do login;
- Campo de entrada de texto para digitação da senha;
- Campo de entrada de texto para digitação da confirmação de senha;
- Campo de saída com instruções sobre as regras de composição da senha;
- Texto explícito com os caracteres especiais permitidos e os caracteres não permitidos;
- Botão **Troca Senha**;
- Botão **Limpar**.

### Validações em JavaScript

- O login deve ser preenchido e ter formato de e-mail válido.
- A senha deve ser preenchida.
- A confirmação de senha deve ser preenchida.
- A senha deve ter pelo menos 6 caracteres, contendo pelo menos:
  - Um caractere numérico;
  - Uma letra maiúscula;
  - Um dos caracteres especiais permitidos abaixo.

#### Caracteres especiais permitidos

```text
@ # $ % & * ! ? / \ | - _ + . =
```

#### Caracteres não permitidos

```text
¨ { } [ ] ´ ` ~ ^ : ; < > , “ ‘
```

### Comportamento dos botões

- O clique no botão **Troca Senha** deve:
  - Executar as validações da página;
  - Mostrar uma mensagem pertinente, em `alert` ou em um `label` específico, caso alguma validação não seja aprovada;
  - Mostrar a mensagem **"Validação realizada com sucesso"** caso todas as validações sejam aprovadas;
  - Navegar para a página anterior após a validação bem-sucedida.
- O clique no botão **Limpar** deve:
  - Limpar os campos de entrada de texto;
  - Posicionar o foco no campo de login.

## 5. Página de cadastro de cliente

A página deve conter:

- Identificação da página: **Cadastro de clientes**;
- Logo da empresa;
- Campo de entrada de texto para digitação do e-mail, que também será o login do cliente;
- Campo de entrada de texto para digitação da senha;
- Campo de entrada de texto para digitação da confirmação de senha;
- Campo de saída com instruções sobre as regras de composição da senha;
- Texto explícito com os caracteres especiais permitidos e os caracteres não permitidos;
- Campo de entrada de texto para digitação do nome;
- Campo de entrada de texto para digitação do CPF;
- Campo de entrada de data para a data de nascimento;
- Campo de entrada de texto para digitação do telefone celular/WhatsApp;
- Conjunto de *radio buttons* com as opções de estado civil:
  - Solteiro(a), marcado como padrão;
  - Casado(a);
  - Divorciado(a);
  - Viúvo(a).
- *Combo box* para seleção de escolaridade, com as opções:
  - 1º grau incompleto;
  - 1º grau completo;
  - 2º grau completo, selecionado como padrão;
  - Nível superior;
  - Pós-graduado.
- Botão **Incluir**;
- Botão **Limpar**;
- Botão **Voltar**.

### Validações em JavaScript

- Para os campos e-mail, senha e confirmação de senha, usar as mesmas validações da página de troca de senha.
- O nome deve ser preenchido.
- O nome deve ter pelo menos duas palavras, e a primeira palavra deve ter pelo menos 2 caracteres.
- Não são permitidos caracteres especiais no nome. Devem ser considerados especiais os caracteres presentes nas duas listas anteriores.
- O CPF deve ser preenchido.
- O campo CPF deve usar a máscara `NNN.NNN.NNN-NN`.
- A digitação no campo CPF deve ser restrita a dígitos de `0` a `9`.
- O CPF deve ser válido, conforme o algoritmo de dígito verificador.
- A data de nascimento deve ser preenchida.
- A diferença entre a data atual e a data de nascimento deve ser maior ou igual a 18 anos, ou seja, o cliente deve ser maior de idade.
- O telefone/WhatsApp é opcional, mas, se preenchido, deve ter formato de telefone nacional.
- O designer pode usar um campo com máscara ou um campo sem máscara com validação do formato digitado.

### Comportamento dos botões

- O clique no botão **Incluir** deve:
  - Executar as validações da página;
  - Mostrar uma mensagem pertinente, em `alert` ou em um `label` específico, caso alguma validação não seja aprovada;
  - Mostrar a mensagem **"Validação realizada com sucesso"** caso todas as validações sejam aprovadas.
- O clique no botão **Limpar** deve:
  - Limpar os campos de entrada de texto e de data;
  - Restaurar os *radio buttons* e o *combo box* para seus valores padrão;
  - Posicionar o foco no campo de e-mail.
- O botão **Voltar** deve retornar para a página anterior.

## 6. Página de carrinho para solicitação de serviços de TI

- A página é de livre criação, mas o problema deve ser resolvido em apenas uma página HTML, com várias seções.

### Dados do usuário logado

Deve existir uma seção que apresente, em `labels`:

- Nome do usuário logado;
- Login, ou e-mail, do usuário logado.

Nesta versão, os valores devem ser fixos.

### Solicitações já realizadas

Deve existir uma seção que apresente, em formato de tabela, as solicitações de serviços de TI já realizadas pelo usuário logado.

A tabela deve conter:

- Data do pedido;
- Número da solicitação;
- Serviço de TI solicitado;
- Status da solicitação;
- Preço cobrado;
- Data prevista de realização;
- Uma última coluna com um botão para excluir a linha atual. Esse botão já deve funcionar nesta versão.

Requisitos adicionais:

- A lista de solicitações deve ser apresentada em ordem crescente de data do pedido.
- Nesta versão, a tabela deve ser preenchida com valores fictícios fixos.

### Inclusão de nova solicitação

Deve existir uma seção na qual o usuário possa inserir os dados de uma solicitação de serviço.

Os campos devem ser:

- **Serviço de TI:** selecionado em um *combo box* com uma lista inicialmente fixa de serviços de TI disponíveis.
- **Preço:** um `label` preenchido conforme o serviço de TI selecionado. Cada serviço terá um preço distinto e inicialmente fixo.
- **Prazo de atendimento:** um `label` preenchido conforme o serviço de TI selecionado. Cada serviço terá um prazo distinto e inicialmente fixo.
- **Data prevista de atendimento:** um `label` que exibe a data prevista, calculada pela soma da data atual com o prazo de atendimento.
- **Status:** um `label` inicialmente preenchido com o valor fixo **EM ELABORAÇÃO**.
- **Botão de inclusão:** um botão para incluir a solicitação na tabela. Essa funcionalidade já deve operar nesta versão.
