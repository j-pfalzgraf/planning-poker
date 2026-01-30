# 1 Story Point – Mudanças Muito Pequenas

> **Esforço:** 1–2 horas
> **Risco:** Baixo
> **Testes:** Smoke test recomendado
> **Complexidade:** Mínima

---

## 📋 Exemplo 1: Substituir Ícone

### História de Usuário

> Como **Usuário** eu quero **ver um ícone de salvar moderno**, para que **a interface pareça mais contemporânea**.

### Contexto

O botão "Salvar" atualmente usa um ícone de disquete (`floppy-disk`). Como disquetes não são mais comuns, ele deve ser substituído por um ícone de marca de verificação.

### Detalhes Técnicos

```text
Arquivo afetado: app/components/SaveButton.vue
Biblioteca de ícones: @heroicons/vue
Ícone antigo: FloppyDiskIcon
Novo ícone: CheckIcon
```

### Critérios de Aceite

- [ ] Substituir ícone em `SaveButton.vue` de `FloppyDiskIcon` para `CheckIcon`
- [ ] Atualizar importação do ícone
- [ ] Tamanho permanece em `w-5 h-5`
- [ ] Verificação visual em desktop e mobile
- [ ] Sem alterações funcionais

### Definição de Pronto

- [ ] Code review concluído
- [ ] Testado em staging
- [ ] Screenshots documentados no ticket

---

## 📋 Exemplo 2: Adicionar Tooltip

### História de Usuário

> Como **Cliente** eu quero **entender se o preço inclui impostos**, para que **eu não tenha surpresas no checkout**.

### Contexto

O ícone de informação (`ℹ`) ao lado do campo de preço deve mostrar um tooltip com o texto "Inclui impostos" ao passar o mouse. O componente de tooltip já existe no projeto.

### Detalhes Técnicos

```vue
<template>
  <Tooltip text="Inclui impostos">
    <InfoIcon class="w-4 h-4 text-gray-400 cursor-help" />
  </Tooltip>
</template>
```

### Critérios de Aceite

- [ ] Usar componente tooltip de `@/components/ui/Tooltip.vue`
- [ ] Texto: "Inclui impostos"
- [ ] Tooltip aparece no hover e focus (acessibilidade)
- [ ] Atraso: 200ms antes de mostrar
- [ ] Posição: centro superior

---

## 📋 Exemplo 3: Ajuste de CSS conforme Guia de Estilo

### História de Usuário

> Como **Gerente de Marca** eu quero **ajustar a cor do botão para o novo guia de estilo**, para que **todos os produtos pareçam uniformes**.

### Contexto

O botão primário usa `#0066cc`, de acordo com o novo guia de estilo deveria ser `#0052a3`.

### Detalhes Técnicos

| Propriedade | Antigo    | Novo      |
| ----------- | --------- | --------- |
| Background  | `#0066cc` | `#0052a3` |
| Hover       | `#0055b3` | `#003d7a` |

**Arquivo:** `tailwind.config.ts`

```typescript
primary: {
  500: '#0052a3', // era: #0066cc
  600: '#003d7a', // era: #0055b3
}
```

### Critérios de Aceite

- [ ] Ajustar cor em `tailwind.config.ts`
- [ ] Todos os botões primários afetados (automaticamente via token)
- [ ] Manter taxa de contraste WCAG AA (mín. 4.5:1)
- [ ] Sem alterações funcionais

---

## ✅ Por que 1 Ponto?

| Critério | Avaliação            |
| -------- | -------------------- |
| Escopo   | Claramente definido  |
| Arquivos | 1–2 afetados         |
| Lógica   | Nenhuma nova lógica  |
| Testes   | Testável visualmente |
| Risco    | Mínimo               |
