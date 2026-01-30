# 3 Story Points – Mudanças Pequenas a Médias

> **Esforço:** 0,5–1 dia
> **Risco:** Moderado
> **Testes:** Testes unitários e de integração recomendados

---

## Exemplo 1: Lista Filtrável

**Título:** Filtrar Lista de Tarefas por Status

**Descrição:**
A lista de tarefas deve ser filtrável por status (Aberto, Em Progresso, Concluído). Botões de filtro acima da lista.

**Critérios de Aceite:**

- [ ] Botões de filtro para cada status
- [ ] Opção "Todos"
- [ ] Parâmetro de URL para filtro (`?status=open`)
- [ ] Exibição de estado vazio quando 0 resultados

---

## Exemplo 2: Formulário com Validação

**Título:** Formulário de Registro com Validação em Tempo Real

**Descrição:**
Campos: Email, Senha, Confirmação de senha. Validação no blur e no submit.

**Critérios de Aceite:**

- [ ] Validar formato de email
- [ ] Senha mínimo 8 caracteres
- [ ] Senhas devem coincidir
- [ ] Exibir erros inline

---

## Exemplo 3: Ordenação Simples com Drag & Drop

**Título:** Reordenar Tarefas via Drag & Drop

**Descrição:**
Tarefas em uma lista devem ser reordenáveis via drag & drop. Nova ordem é salva.

**Critérios de Aceite:**

- [ ] Alça de arraste em cada tarefa
- [ ] Preview visual durante o arraste
- [ ] Salvar após soltar
- [ ] Suporte a touch

---

## Por que 3 Pontos?

- Múltiplos estados para gerenciar
- Mudanças de UI e lógica
- Complexidade moderada
- Possíveis casos extremos
