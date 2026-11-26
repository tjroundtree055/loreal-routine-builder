# Shared L’Oréal advisor backend

Cloudflare Worker: `loreal-project-advisor`.

- `/chat`: Project 8; Chat Completions API; returns `choices[0].message.content`.
- `/routine`: Project 9; Responses API; selected product context and optional web search.
- `/health`: reports whether the OpenAI secret is configured without exposing its value.

Required secret: `OPENAI_API_KEY`. Add a replacement key directly in Cloudflare Settings > Variables and Secrets. Never put a key in source or chat.

Bindings: `ALLOWED_ORIGIN=https://tjroundtree055.github.io`, `OPENAI_MODEL=gpt-4.1-mini`, and `REQUEST_LIMITER` (10 requests per 60 seconds per IP at a Cloudflare location). Rate limits and CORS reduce casual abuse; they are not account-wide spending caps. Logs contain route/status only, not question or answer contents.

Worker origin: https://loreal-project-advisor.tjroundtree-beauty.workers.dev

Worker code is deployed through the connected Cloudflare API. This directory contains its three ES modules. Both GitHub Pages frontends use the matching route by default.
