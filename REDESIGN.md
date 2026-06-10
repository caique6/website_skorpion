# Redesign — site-resgate-membros

Reformulação completa do design system da home, feita seção por seção. As funcionalidades foram preservadas; apenas a camada visual mudou.

## Design system

- Paleta: tokens `skorpion-*` em `tailwind.config.ts` (`red #F21B42`, `darkRed #D9183B`, `yellow #F2CE16`, `darkYellow #F2BD1D`, `black #1A1A1A`, `white #FFFFFF`).
- Easing compartilhado em `src/lib/animation.ts` (`EASE_OUT`, `TILE_FADE_UP`).
- Copy e dados sempre na camada `data/` de cada feature (sem texto hardcoded nos componentes).
- Animações em CSS quando há repetição/performance (`src/app/globals.css`): `marquee-left`, `heroShine`, `waveSway`, `cardShine`, e as classes do marquee (`wave-track`, `wave-chip`).

## Estrutura da home (`src/app/page.tsx`)

1. **Hero** (`features/hero`) — full-screen, intro animada em 3 esmaecidos (provider `features/intro`), botões "Já é inscrito?" (canais) e "Quero ser membro!".
2. **Marquee Skorpionários** (`features/marquee` — `WaveMarquee`) — vermelho, label amarelo, onda branca no topo.
3. **Planos** (`features/members` — `PlansSection` + `PlanCard`) — 3 tiers, Skorpionário dourado em destaque no meio com brilho.
4. **Marquee Skorpiões** — vermelho, label branco.
5. **Canal + Loja** (`features/showcase` — `ChannelStoreSection`) — bento 3x3: canal/stats (1x1), loja (1x2), vídeos com thumb 16:9 completa, e tiles "Em breve" preenchendo vazios. Ancora `#channel`.
6. **Marquee Skorpionzinhos** — vermelho, label cinza.
7. **Footer** (`features/footer`) — fundo `skorpion-black`, onda vermelha no topo, destaque do Discord (`DiscordCallout`).

## Performance do marquee (`WaveMarquee`)

- Zoom no hover e pause são **CSS puro** (sem framer-motion por avatar).
- Avatares limitados a `MAX_VISIBLE_MEMBERS` (DOM constante independente do nº de membros).
- Loop infinito e contínuo via medição de largura + `--marquee-offset`; `will-change: transform` e `prefers-reduced-motion`.

## Notas

- `globals.css` força `body { background-color: #E6193B !important }`; cada seção define seu próprio fundo.
- `next start` local exige que nenhum dev server compartilhe `.next` (senão ocorre `Cannot find module './vendor-chunks/*'`). O build de produção (`next build`) é limpo.
- Segurança: `SUPABASE_SERVICE_ROLE_KEY` é server-only; nenhum Client Component importa `@/lib/supabase`/`supabase-server`. Serviços públicos não selecionam email/telefone.
