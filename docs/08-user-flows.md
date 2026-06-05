# 08 — Fluxos de Usuário

---

## Persona 1: Morador interessado em participar

**Objetivo:** Entender o movimento e se cadastrar como membro.

```
[Google: "Jurerê Mais segurança"]
        ↓
[Home /]
  → Lê hero ("gestão urbana colaborativa")
  → Vê ImpactCounters (247 câmeras, R$ 2.4M)
  → Rola para Featured Projects
  → Clica em projeto "Monitoramento por Câmeras"
        ↓
[/projetos/monitoramento-cameras]
  → Lê sobre o projeto
  → Vê galeria de fotos, timeline
  → Vê resultados: "-34% ocorrências"
  → Convencido da seriedade do movimento
        ↓
[Clica CTA "Faça parte do movimento" no footer do projeto]
        ↓
[/participar]
  → Seleciona card "Morador"
        ↓
[Formulário multi-step]
  Step 1: Seleciona "Morador"
  Step 2: Preenche nome, email, telefone, bairro/condomínio
  Step 3: Seleciona interesses (Segurança, Qualidade de vida)
  Step 4: Revisa e confirma
        ↓
[Email de confirmação automático via Resend]
        ↓
[Página de obrigado: "Entraremos em contato em até 48h"]
        ↓
[Equipe recebe notificação no Payload CMS — status "NOVO"]
        ↓
[Equipe atualiza status para "EM_CONTATO" → "APROVADO"]
```

---

## Persona 2: Empresário avaliando parceria

**Objetivo:** Entender o valor de ser parceiro.

```
[LinkedIn: post sobre Jurerê Mais]
        ↓
[Home /]
  → Observa logos de parceiros reconhecidos
  → Clica em "Ver todos os parceiros"
        ↓
[/parceiros]
  → Filtra por "Restaurantes"
  → Vê parceiros existentes do setor
  → Clica em um parceiro para ver perfil
        ↓
[/parceiros/[slug-restaurante]]
  → Vê depoimento do parceiro: "Nossa visibilidade aumentou..."
  → Vê projetos em que o parceiro participou
        ↓
[Clica "Quero ser parceiro"]
        ↓
[/participar]
  → Seleciona "Empresa"
        ↓
[Formulário: nome, empresa, CNPJ, segmento, interesses, mensagem]
        ↓
[Confirmação + CTA para WhatsApp para resposta rápida]
```

---

## Persona 3: Jornalista / Imprensa

**Objetivo:** Encontrar dados, imagens e contato para pauta.

```
[Busca direta: "jureremais.org"]
        ↓
[Home /]
  → Vai direto ao header → "Notícias"
        ↓
[/noticias]
  → Filtra por "Eventos" ou "Segurança"
  → Abre post recente
        ↓
[/noticias/[slug]]
  → Lê conteúdo, copia fatos/dados
  → Quer fotos → vai para /projetos/[slug] → Galeria
        ↓
[/contato]
  → Seleciona assunto "Imprensa"
  → Preenche formulário
        ↓
[Equipe responde por email]
```

---

## Persona 4: Gestor público / Vereador

**Objetivo:** Entender as ações e buscar parceria institucional.

```
[Indicação de um servidor]
        ↓
[/o-movimento]
  → Lê sobre história, missão, governança
  → Vê organograma com membros da diretoria
        ↓
[/transparencia]
  → Baixa Relatório Anual 2024 (PDF)
  → Revisa demonstrativo financeiro
  → Vê breakdown de investimentos por projeto
        ↓
[/impacto]
  → Revisa o dashboard com todos os números
  → Exporta/imprime (print-friendly CSS)
        ↓
[/contato]
  → Assunto: "Parceria institucional"
  → Mensagem detalhada sobre interesse
        ↓
[Diretoria do movimento é notificada por email priority]
```

---

## Persona 5: Investidor imobiliário / Incorporador

**Objetivo:** Entender como o movimento valoriza a região.

```
[Google: "Jurerê Internacional gestão urbana qualidade de vida"]
        ↓
[/impacto]  ← landing direto via SEO
  → Vê BIG NUMBERS (R$ 2.4M, 247 câmeras, 89% cobertura)
  → Lê gráfico de evolução de investimentos
  → Vê mapa de cobertura de câmeras
        ↓
[/projetos]
  → Filtra "Concluídos"
  → Vê breadth de atuação
        ↓
[/transparencia]
  → Baixa relatório anual para due diligence
        ↓
[/contato]
  → Mensagem sobre interesse em apoio/parceria
```

---

## Persona 6: Visitante / Turista

**Objetivo:** Conhecer melhor Jurerê antes de visitar.

```
[Instagram: post do movimento com foto aérea Jurerê]
        ↓
[Home /]
  → Vê hero com foto aérea impressionante
  → Lê manifesto: "Jurerê merece mais"
  → Curiosidade sobre projetos
        ↓
[/projetos]
  → Vê projetos de orla, segurança, urbanismo
  → Impressão positiva sobre organização local
        ↓
[/noticias]
  → Lê sobre eventos da temporada
        ↓
[Compartilha nas redes sociais]
```

---

## Fluxo: Newsletter

```
[Qualquer página — footer]
        ↓
[Preenche email no NewsletterForm]
        ↓
[POST /api/newsletter]
  → Valida email (Zod)
  → Rate limiting (1 por IP/hora)
  → Verifica se já existe (evita duplicata)
  → Cria registro com status PENDING
  → Envia email de confirmação (Resend)
        ↓
[Link de confirmação no email]
        ↓
[GET /api/newsletter/confirm?token=xxx]
  → Valida token (JWT 24h)
  → Atualiza status para CONFIRMED
        ↓
[Página de confirmação: "Obrigado! Você está inscrito."]
```

---

## Fluxo: Download de relatório

```
[/transparencia]
        ↓
[Clica "Baixar" em um relatório]
        ↓
[POST /api/documents/download]
  → Registra download (DocumentDownload)
  → Retorna URL assinada do S3 (válida 60s)
        ↓
[Browser inicia download direto do S3]
```

---

## Fluxo: Admin CMS

```
[CMS admin: cms.jureremais.org/admin]
        ↓
[Login com email + senha]
        ↓
[Dashboard Payload]
  ├── Collections: Projects, Partners, News, etc.
  ├── Globals: Settings, HomePage, Navigation
  └── Media library
        ↓
[Edita / publica conteúdo]
        ↓
[afterChange hook dispara revalidação ISR]
        ↓
[Next.js revalida página em ~2s]
        ↓
[Conteúdo novo visível no site]
```

---

## Estados de erro e fallbacks

| Cenário | Comportamento |
|---------|--------------|
| CMS offline | Static fallback via cache ISR — site continua funcionando |
| Formulário falha | Toast de erro, dados preservados no form |
| Imagem quebrada | Placeholder blur + ícone de imagem |
| Página não encontrada | 404 customizado com links de navegação |
| Erro de servidor | Error boundary com mensagem amigável |
| Rate limit excedido | Mensagem "Tente novamente em X minutos" |
| JavaScript desabilitado | Conteúdo principal acessível (Server Components) |
