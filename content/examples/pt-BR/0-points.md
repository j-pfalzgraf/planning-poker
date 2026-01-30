# 0 Story Points – Mudanças Triviais

> **Esforço:** Mínimo, geralmente menos de 15 minutos
> **Risco:** Quase nenhum
> **Testes:** Geralmente não necessários
> **Complexidade:** Nenhuma

---

## 📋 Exemplo 1: Habilitar Feature Flag

### História de Usuário

> Como **Product Owner** eu quero **habilitar o recurso Modo Escuro**, para que **nossos usuários possam começar a usá-lo imediatamente**.

### Contexto

O recurso Modo Escuro está totalmente implementado e testado, mas foi adiado para a última versão. Agora ele deve ser ativado alterando uma feature flag.

### Implementação

```json
// config/features.json
{
  "darkMode": true,  // ← Alteração: false → true
  "betaFeatures": false,
  "newCheckout": true
}
```

### Critérios de Aceite

- [ ] Definir feature flag em `config/features.json` como `true`
- [ ] Criar e mesclar PR
- [ ] Acionar deploy
- [ ] Testar Modo Escuro em produção

### Avaliação de Risco

| Aspecto             | Classificação        |
| ------------------- | -------------------- |
| Alteração de código | 1 linha              |
| Testes              | Smoke test           |
| Rollback            | Resetar feature flag |

---

## 📋 Exemplo 2: Ajustar Variável de Ambiente

### História de Usuário

> Como **Engenheiro DevOps** eu quero **aumentar o timeout da API**, para que **requisições lentas da API não falhem mais**.

### Contexto

Algumas chamadas de API para um serviço terceiro lento estão expirando. O timeout atual de 5 segundos deve ser aumentado para 10 segundos.

### Alteração

```bash
# .env.production
API_TIMEOUT=10000  # era: 5000
```

### Critérios de Aceite

- [ ] Definir `API_TIMEOUT=10000` em `.env.production`
- [ ] Nenhuma alteração de código necessária
- [ ] Fazer redeploy para ativar
- [ ] Monitorar erros de timeout

---

## 📋 Exemplo 3: Corrigir Erro de Digitação

### História de Usuário

> Como **Usuário** eu quero **ver texto correto no aplicativo**, para que **o produto pareça profissional**.

### Problema

O rodapé do site mostra **"Contato"** em vez de **"Contato"** (exemplo: "Conttato" → "Contato").

### Solução

```vue
<!-- app/components/Footer.vue -->
<template>
  <footer>
    <a href="/contact">Contato</a>  <!-- era: Conttato -->
  </footer>
</template>
```

### Critérios de Aceite

- [ ] Corrigir erro de digitação em `Footer.vue`
- [ ] Verificar se há o mesmo erro em outros lugares
- [ ] Verificar visualmente no navegador

---

## ✅ Por que 0 Pontos?

| Critério   | Avaliação                          |
| ---------- | ---------------------------------- |
| Lógica     | Nenhuma lógica afetada             |
| Isolamento | Atômico e isolado                  |
| Risco      | Quase nenhum                       |
| Tempo      | Pode ser feito durante uma reunião |
| Revisão    | Mínima, quase autoexplicativa      |

> 💡 **Dica:** Histórias de 0 pontos são ótimas para integração de novos membros da equipe ou como "aquecimento" pela manhã.
