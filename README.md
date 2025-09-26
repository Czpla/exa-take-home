# 💳 API de Gestão de Pagamentos

Este projeto implementa uma **API RESTful** para gerenciar o ciclo de vida de cobranças, utilizando o **NestJS** e seguindo os princípios de **Clean Architecture** para garantir escalabilidade e manutenibilidade. A API é especializada no processamento de pagamentos via **PIX** e **Cartão de Crédito**.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (Versão recomendada: 20.x ou superior)
- **npm** (Node Package Manager)
- **Docker e Docker Compose** (Para rodar o banco de dados e as dependências)

### Passo a Passo

1.  **Clone o Repositório:**

    ```bash
    git clone https://github.com/Czpla/exa-take-home
    cd exa-take-home
    ```

2.  **Instale as Dependências:**

    ```bash
    npm install
    ```

3.  **Configure o Ambiente:**
    Crie um arquivo `.env` na raiz do projeto, configurando as credenciais do **PostgreSQL** e as chaves de integração do **Mercado Pago**.

4.  **Inicie o Banco de Dados (PostgreSQL):**

    ```bash
    docker compose up -d
    ```

5.  **Gere e Execute as Migrações do Prisma:**
    Após o banco de dados estar ativo, aplique as migrações:

    ```bash
    npm run prisma:migrate:dev
    ```

6.  **Inicie a API:**
    ```bash
    npm run start:dev
    ```

O servidor NestJS estará rodando em `http://localhost:3000` (ou na porta configurada).

---

## ⚙️ Nota Importante sobre Webhooks Locais

Para que a integração do Cartão de Crédito funcione completamente, o **Mercado Pago** precisa enviar o resultado da transação para o seu endpoint de webhook (`/api/mercadopago/webhook`).

Como os sistemas externos exigem uma **URL pública e com HTTPS** para enviar callbacks, a execução em ambiente de desenvolvimento local (como `localhost:3000`) requer um **túnel seguro**.

**Sugestão:** Utilize o **ngrok** para expor sua porta local (e.g., `3000`) com um domínio HTTPS público. A URL gerada pelo ngrok deve ser cadastrada nas configurações de Webhook da sua conta de desenvolvedor do Mercado Pago.

---

## 🏗️ Arquitetura, Tecnologias e Estratégias

### 💡 Padrões e Arquitetura

O projeto adota a **Clean Architecture**, com os seguintes mapeamentos de camadas:

| Camada              | Propósito                                                                                                                                          |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Domain**          | Contém Entidades, Enums, Classes Abstratas (Contratos) e Use Cases Abstratos. É o coração das regras de negócio.                                   |
| **Business**        | Contém a implementação concreta dos Use Cases (Ex: `CreatePayment`, `ProcessPayment`). Orquestra a lógica de negócio.                              |
| **Infrastructure)** | Lida com detalhes externos, como banco de dados (**Prisma**) e integrações (**Mercado Pago Gateway**). Implementa as classes abstratas do Domínio. |
| **Presentation)**   | Controllers (endpoints REST) e DTOs de entrada/saída.                                                                                              |

### 🎯 Estratégias de Design

- **Strategy Pattern:** Usado para processar diferentes `paymentMethods`. O `GetPaymentStrategy` injeta e seleciona a implementação correta (`PixStrategy` ou `CreditCardStrategy`).
- **Gateway Pattern:** As integrações externas (Mercado Pago) são encapsuladas por classes abstratas (`PaymentGateway`), **desacoplando o core do sistema**.
- **Dependency Injection (DI):** Implementada nativamente pelo NestJS.

---

## 🌐 Endpoints da API REST

A API é acessível através da rota base `/api`.

### 1. Adicionar Pagamento

Cria um novo pagamento no sistema. A resposta fornece o `id` local e o link de pagamento, se aplicável.

| Método | Rota           | Payload de Exemplo (POST Body)                                                                               |
| :----- | :------------- | :----------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/payment` | `{"cpf": "99999999999", "description": "Compra de teste", "amount": 100.00, "paymentMethod": "credit_card"}` |

**Resposta de Sucesso (Exemplo):**

```json
{
  "id": "4512e987-30fc-44de-b3c3-9c116682c14b",
  "paymentLink": "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=d119986f-dd0b-480e-bd9c-36dd0244bbf5"
}
```

### 2. Webhook de Processamento de Pagamento

Este endpoint é o ponto de integração passivo que o Mercado Pago chama para nos notificar sobre o status final da transação.

| Método | Rota                       | Função                                                                                                                        |
| :----- | :------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/mercadopago/webhook` | Recebe a notificação (via Query Parameter `id`) e aciona o `ProcessPaymentUseCase` para atualizar o status no banco de dados. |

### 3. Outros Endpoints de Gestão

| Método  | Rota               | Descrição                                                                                            |
| :------ | :----------------- | :--------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/payment/:id` | Retorna detalhes de um pagamento específico.                                                         |
| `GET`   | `/api/payment`     | Lista pagamentos paginados, suportando filtros por `cpf` e `paymentMethod` (`credit_card` ou `pix`). |
| `PATCH` | `/api/payment/:id` | Atualiza dados de um pagamento existente.                                                            |

---

## 💼 Regras de Negócio e Integrações

### Regra: Atualização de Status via Webhook

Para pagamentos via **Cartão de Crédito** (`credit_card`):

1.  A estratégia `CreditCardStrategy` registra o pagamento como **PENDING** e gera o `paymentLink` via Mercado Pago.
2.  Após a conclusão do pagamento pelo cliente, o Mercado Pago envia o callback para a URL configurada (seu endpoint `/api/mercadopago/webhook`).
3.  O `MercadoPagoController` recebe essa chamada e executa o `ProcessPaymentUseCase`, que busca a transação externa e atualiza o status do pagamento no banco de dados para **PAID** ou **FAIL**.

### Fluxo PIX

A estratégia **PIX** (`pix`) apenas cria o registro de pagamento com status: **PENDING**, sem integração externa imediata.
