# 13 Story Points – Mudanças Grandes

> **Esforço:** 3–5 dias
> **Risco:** Alto
> **Testes:** Cobertura completa de testes necessária
> **Complexidade:** Alta

---

## 📋 Exemplo 1: Assistente de Onboarding Multi-Etapas

### Epic

> Como **novo cliente** eu quero **ser guiado através de um processo de configuração** para que **eu possa usar o sistema produtivamente o mais rápido possível**.

### Contexto

Novos clientes atualmente precisam encontrar todas as configurações manualmente. Um assistente de 4 etapas deve guiá-los através dos passos mais importantes e reduzir o time-to-value.

### Fluxo do Assistente

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Etapa 1   │───▶│   Etapa 2   │───▶│   Etapa 3   │───▶│   Etapa 4   │
│   Empresa   │    │   Contato   │    │  Pagamento  │    │   Resumo    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
   Validação         Validação         Validação          Enviar
   salvar            salvar            salvar             todos dados
```

### Detalhes das Etapas

| Etapa                 | Campos                           | Validação                       |
| --------------------- | -------------------------------- | ------------------------------- |
| 1. Dados da Empresa   | Nome, Endereço, CNPJ             | Obrigatório, formato CNPJ       |
| 2. Pessoa de Contato  | Nome, Email, Telefone            | Formato email, Obrigatório      |
| 3. Forma de Pagamento | Boleto ou Cartão de Crédito      | Verificação número conta/cartão |
| 4. Resumo             | Todos os dados (somente leitura) | Confirmação                     |

### Componentes Técnicos

```typescript
// Gerenciamento de estado
interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  company: CompanyData | null;
  contact: ContactData | null;
  payment: PaymentData | null;
  isDirty: boolean;
  errors: Record<string, string[]>;
}

// Armazenamento intermediário
const STORAGE_KEY = 'onboarding_draft';
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
```

### Critérios de Aceite

- [ ] Indicador de progresso mostra etapa atual (1/4, 2/4, ...)
- [ ] Validação por etapa ao clicar Próximo
- [ ] Navegação para trás sem perda de dados
- [ ] Auto-save no LocalStorage a cada 30s e no blur
- [ ] Aviso ao sair da página com dados não salvos
- [ ] Resumo final com links de edição para cada etapa
- [ ] Tratamento de erro no envio (lógica de retry)
- [ ] Otimizado para mobile (stepper vertical)
- [ ] Navegação por teclado (Tab, Enter)

### Cenários de Teste

1. **Happy Path:** Preencher todas etapas → Concluído com sucesso
2. **Erro de Validação:** Número de conta inválido → Mostrar erro
3. **Abandono:** Fechar aba na etapa 2 → Restaurar dados ao reabrir
4. **Erro de Rede:** Envio falha → Mostrar botão de retry

---

## 📋 Exemplo 2: Dashboard Personalizável com Widgets

### História de Usuário

> Como **power user** eu quero **personalizar meu dashboard com widgets** para que **eu possa ver as informações importantes para mim de relance**.

### Escopo do Recurso

- **Biblioteca de Widgets:** 8 widgets predefinidos
- **Drag & Drop:** Posicionamento livre
- **Redimensionar:** Mudar tamanho via alça
- **Persistência:** Layout é salvo

### Widgets Disponíveis

| Widget              | Tamanhos      | Fonte de Dados           |
| ------------------- | ------------- | ------------------------ |
| Gráfico de Receita  | 1x1, 2x1, 2x2 | `/api/stats/revenue`     |
| Pedidos Recentes    | 1x2, 2x2      | `/api/orders?limit=10`   |
| Lista de Tarefas    | 1x1, 1x2      | `/api/tasks?status=open` |
| Tiles KPI           | 1x1, 2x1      | `/api/stats/kpis`        |
| Calendário          | 2x2           | `/api/events`            |
| Atividade da Equipe | 1x2           | `/api/activity`          |
| Ações Rápidas       | 1x1           | estático                 |
| Notas               | 1x1, 1x2      | `/api/notes`             |

### Sistema de Grid

```
┌──────────┬──────────┬──────────┬──────────┐
│  Widget  │  Widget  │       Widget        │
│   1x1    │   1x1    │        2x1          │
├──────────┼──────────┼──────────┬──────────┤
│       Widget        │  Widget  │  Widget  │
│        2x1          │   1x1    │   1x1    │
├──────────┬──────────┼──────────┴──────────┤
│  Widget  │  Widget  │       Widget        │
│   1x2    │   1x2    │        2x2          │
│          │          │                     │
└──────────┴──────────┴─────────────────────┘
```

### Critérios de Aceite

- [ ] Biblioteca de widgets com cards de preview
- [ ] Drag & drop para posicionamento (react-grid-layout ou vue-grid-layout)
- [ ] Redimensionar via alças de canto
- [ ] Detecção de colisão (widgets não se sobrepõem)
- [ ] Layout salvo no BD (com debounce, 500ms após mudança)
- [ ] Resetar para layout padrão (botão + confirmação)
- [ ] Responsivo: Grid adapta ao viewport
- [ ] Skeleton de carregamento para cada widget

---

## 📋 Exemplo 3: Central de Notificações In-App

### História de Usuário

> Como **usuário** eu quero **ver todas as notificações relevantes em um só lugar** para que **eu não perca nada importante**.

### Arquitetura do Componente

```
┌─────────────────────────────────────────────────┐
│                    Header                        │
│  Logo   Nav   Nav   Nav   [🔔 3]   Avatar       │
└─────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Dropdown de        │
                    │  Notificações       │
                    │  ┌───────────────┐  │
                    │  │ Novo Pedido   │  │
                    │  │ 2 min atrás   │  │
                    │  ├───────────────┤  │
                    │  │ Tarefa Pronta │  │
                    │  │ 1 hora atrás  │  │
                    │  └───────────────┘  │
                    │  [Marcar como lidas]│
                    │  [Ver todas →]      │
                    └─────────────────────┘
```

### Modelo de Dados

```typescript
interface Notification {
  id: string;
  type: 'order' | 'task' | 'system' | 'mention';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}
```

### Critérios de Aceite

- [ ] Ícone de sino com badge (contador de não lidas, máx 99+)
- [ ] Dropdown com últimas 10 notificações
- [ ] Marcar como lida (individual ou todas)
- [ ] Clique na notificação → navegar para página relevante
- [ ] Atualizações em tempo real via WebSocket
- [ ] Persistência no banco de dados
- [ ] Som em nova notificação (opcional, configurável)
- [ ] Página "Todas as notificações" com paginação e filtragem

---

## ✅ Por que 13 Pontos?

| Critério     | Avaliação                         |
| ------------ | --------------------------------- |
| Arquitetura  | Múltiplos sistemas integrados     |
| Estado       | Gerenciamento de estado complexo  |
| Componentes  | 10+ arquivos novos/alterados      |
| Persistência | Banco de dados + endpoints de API |
| Testes       | Alto esforço de teste             |
| Risco        | Casos extremos e cenários de erro |
