# Notification Service

Este projeto é um **sistema de notificações assíncronas** desenvolvido utilizando NestJS, Node.js, TypesScript, Prisma, Docker, PostgreSQL e RabbitMQ. O projeto segue os princípios de **Clean Architecture, Clean Code e SOLID**.

---

## Tecnologias utilizadas

- **Backend:** Node.js, NestJS, TypeScript
- **Banco de dados:** PostgreSQL via Prisma ORM
- **Mensageria:** RabbitMQ
- **Containerização:** Docker e Docker Compose
- **Arquitetura:** Clean Architecture, SOLID Principles

---

## Estrutura do projeto

```
src/
├── domain/
│   ├── entities/        # Contém as entidades do domínio
│   ├── enums/           # Contém enums do domínio
│   ├── repositories/    # Abstrações de repositórios
│   ├── usecases/        # Casos de uso abstratos
│   └── messaging/       # Definições de eventos e mensagens do domínio
├── business/
│   └── usecases/        # Implementações concretas dos casos de uso
├── infrastructure/
│   ├── database/        # Conexão e implementação do banco de dados
│   └── messaging/       # Implementação de mensageria (ex: RabbitMQ)
├── main/
│   ├── shared/          # Utilitários e funções compartilhadas
│   ├── config/          # Arquivos de configuração do NestJS
│   └── main             # Ponto de entrada da aplicação
└── presentation/
    └── controllers/     # Controladores da camada de apresentação
```

> Essa estrutura mantém o domínio desacoplado de frameworks e facilita manutenção, testes e possíveis mudanças de mensageria ou banco de dados.

---

## Decisões arquiteturais

1. **Clean Architecture**
   - Separação clara entre **domínio**, **aplicação** e **infraestrutura**.
   - Casos de uso e regras de negócio independentes de frameworks externos.
   - Facilita testes unitários e mocks de dependências.

2. **Mensageria via RabbitMQ**
   - Uso de `@EventPattern` para listeners assíncronos.
   - Retry mecanismo implementado para processamento de mensagens com falhas temporárias.

3. **Persistência**
   - Prisma ORM com PostgreSQL.
   - Repositórios desacoplados das entidades do domínio.

4. **Clean Code e SOLID**
   - Classes pequenas, responsabilidades únicas.
   - Inversão de dependências: use cases dependem de interfaces abstratas.
   - Funções utilitárias reutilizáveis (ex.: retry com backoff).

---

## Instruções para execução

### 1. Pré-requisitos

- Docker & Docker Compose
- Node.js >= 20
- npm

### 2. Inicializar containers

```shell
$ docker-compose up -d
```

### 3. Configurar variáveis de ambiente

Crie um .env com:

```shell
DATABASE_URL=postgresql://user:password@localhost:5432/notifications
RABBITMQ_URL=amqp://guest:guest@localhost:5672
RABBITMQ_QUEUE_EVENTS=notification_queue_events
NODE_ENV=development
PORT=3000
```

### 4. Instalar dependências

```shell
$ npm install
```

### 5. Rodar migrations do Prisma

```shell
$ npm run prisma:migrate
```

### 6. Rodar a aplicação

```shell
$ npm run start:dev
```

## Dificuldades encontradas

- Ack/Nack no RabbitMQ.

- Mensagens falhando no processamento.

- Dificuldade de usar services com `@Injectable()` para os subscribers.

## Próximos passos e melhorias

- [ ] Implementar monitoramento das DLQs e mensagens processadas/falhas.
- [ ] Adicionar métricas e logging estruturado.
- [ ] Criar testes de integração e unitários.
- [ ] Adicionar Health checks para os serviços (RabbitMQ e PostgreSQL).
