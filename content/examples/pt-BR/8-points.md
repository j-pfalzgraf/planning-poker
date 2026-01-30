# 8 Story Points – Mudanças Maiores

> **Esforço:** 2–3 dias
> **Risco:** Médio a alto
> **Testes:** Suíte de testes abrangente necessária
> **Complexidade:** Média-Alta

---

## 📋 Exemplo 1: Notificações por Email

### História de Usuário

> Como **novo usuário** eu quero **receber um email de confirmação** para que **eu possa verificar meu endereço de email e ativar minha conta**.

### Contexto

Após o registro, o usuário deve confirmar seu endereço de email antes de poder usar totalmente a aplicação. Isso aumenta a segurança e reduz registros de spam.

### Arquitetura Técnica

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   Serviço   │
│   Registro  │     │   API       │     │   de Email  │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Banco de   │     │   SMTP/SES  │
                    │  Dados(Token)│    │             │
                    └─────────────┘     └─────────────┘
```

### Template de Email

```html
<!-- templates/email/confirm-registration.html -->
<h1>Bem-vindo ao {{appName}}!</h1>
<p>Clique no botão para confirmar seu email:</p>
<a href="{{confirmUrl}}" class="button">Confirmar Email</a>
<p><small>Link válido por 24 horas.</small></p>
```

### Endpoints da API

| Endpoint                        | Método | Descrição                    |
| ------------------------------- | ------ | ---------------------------- |
| `/api/auth/register`            | POST   | Criar usuário + enviar email |
| `/api/auth/confirm/{token}`     | GET    | Validar token + ativar conta |
| `/api/auth/resend-confirmation` | POST   | Reenviar email               |

### Critérios de Aceite

- [ ] Criar template de email (HTML + fallback texto puro)
- [ ] Link de ativação baseado em token com string aleatória de 64 caracteres
- [ ] Armazenar token em Redis/BD com TTL de 24 horas
- [ ] Página de erro para token inválido ou expirado
- [ ] Botão de reenvio na página de login (apenas se não ativado)
- [ ] Rate limiting: Máx 3 reenvios por hora
- [ ] Log de email para debugging

### Aspectos de Segurança

- [ ] Token é criptograficamente seguro
- [ ] Token é invalidado após uso
- [ ] Proteção contra força bruta no endpoint de confirmação

---

## 📋 Exemplo 2: Busca Full-Text com Destaque

### História de Usuário

> Como **usuário** eu quero **buscar artigos e ver correspondências destacadas** para que **eu possa encontrar rapidamente informações relevantes**.

### Solução Técnica

```typescript
// Busca com destaque
const searchArticles = async (query: string) => {
  const response = await fetch(`/api/articles/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Formato de resposta
interface SearchResult {
  id: string;
  title: string;
  titleHighlighted: string;  // Com tags <mark>...</mark>
  excerpt: string;
  excerptHighlighted: string;
  score: number;
}
```

### Critérios de Aceite

- [ ] Campo de busca com debounce (300ms entre entradas)
- [ ] Busca em título e descrição
- [ ] Destaque dos termos de busca com tags `<mark>`
- [ ] Mínimo 2 caracteres necessários para busca
- [ ] Exibição de estado vazio quando 0 resultados
- [ ] Botão "Carregar mais" para > 20 resultados
- [ ] Performance: < 200ms para 10.000+ artigos (índice necessário)

---

## 📋 Exemplo 3: Sistema de Comentários

### História de Usuário

> Como **leitor do blog** eu quero **escrever comentários e responder a outros** para que **eu possa participar da discussão**.

### Modelo de Dados

```typescript
interface Comment {
  id: string;
  postId: string;
  parentId: string | null;  // null = comentário de nível superior
  authorId: string;
  authorName: string;
  content: string;          // máx 1000 caracteres
  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
}
```

### Estrutura da UI

```
┌─────────────────────────────────────────────────┐
│ 💬 3 Comentários                                 │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ 👤 João Silva · 2 horas atrás              │ │
│ │ "Ótimo artigo! Obrigado pelas dicas."      │ │
│ │ [Responder] [Editar] [Excluir]             │ │
│ │                                             │ │
│ │   ┌─────────────────────────────────────┐   │ │
│ │   │ 👤 Maria S. · 1 hora atrás         │   │ │
│ │   │ "Concordo, muito útil!"            │   │ │
│ │   │ [Responder]                         │   │ │
│ │   └─────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Critérios de Aceite

- [ ] Escrever comentário (máx 1000 caracteres, contador de caracteres)
- [ ] Respostas aninhadas (1 nível de profundidade)
- [ ] Editar próprios comentários (com badge "editado")
- [ ] Excluir próprios comentários (soft delete, mostra "[excluído]")
- [ ] Timestamps relativos ("5 minutos atrás", "ontem")
- [ ] Avatar + nome do autor
- [ ] Atualizações em tempo real opcional (WebSocket para comentários ao vivo)

---

## ✅ Por que 8 Pontos?

| Critério     | Avaliação                              |
| ------------ | -------------------------------------- |
| Arquitetura  | Múltiplos sistemas integrados          |
| Complexidade | Frontend + Backend + serviços externos |
| Segurança    | Aspectos de segurança a considerar     |
| Testes       | Suíte de testes abrangente necessária  |
| Risco        | Risco aumentado devido a dependências  |
