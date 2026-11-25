# L’Oréal Product-Aware Routine Builder

Student project by Tyrone Roundtree. Static GitHub Pages frontend plus a Cloudflare Worker for the OpenAI Responses API. Uses the 35-product GCA starter catalog, including original product descriptions and externally hosted images.

## Features

- Category and keyword filters work together.
- Click a product card or its accessible button to select or remove a product.
- Expand product details; remove individual selections or clear the list.
- Selections survive refresh through localStorage.
- Selected product JSON and full successful conversation history are sent to the Worker.
- AI follow-up chat, preferences, errors, and loading state.
- Extra features: product search, RTL layout toggle, optional web search with clickable citations.
- Responsive layout with keyboard focus indicators and semantic controls.

## Deployment

1. Create a GitHub repository named `loreal-routine-builder` and upload these files to its main branch.
2. In repository Settings → Pages, choose Deploy from a branch, main, /(root), and Save. Use the actual live URL GitHub returns in the assignment.
3. Deploy `worker.mjs` to Cloudflare Workers with Wrangler or the Cloudflare dashboard. Set `OPENAI_API_KEY` as an encrypted secret, never a repository variable or frontend value. With Wrangler: `npx wrangler secret put OPENAI_API_KEY`, then `npx wrangler deploy`.
4. Set `ALLOWED_ORIGIN` to your actual Pages origin (scheme and hostname only). Default is the connected account’s Pages origin. Set `OPENAI_MODEL` to an available Responses model that supports web search if using that feature.
5. Open the live frontend, expand Advisor connection, paste your Worker URL, and save. Select products and Generate routine.
6. Verify from a private browser: catalog, filtering, selection, reload persistence, removals, generation, and follow-up. Check mobile and RTL layout.

The Worker endpoint URL is public configuration, not a secret. The API key stays server-side. Origin restriction is not authentication: apply Cloudflare rate limits and provider budget controls before offering broad public use. External catalog image availability is outside this project’s control; failed images are hidden while names and descriptions remain available.

## Validation status

JavaScript syntax and mocked Worker request/response tests are provided. Actual AI generation, deployment, and private-browser/mobile checks require the configured endpoint and hosting; these are not claimed as completed.

## References

- Starter data: https://github.com/GCA-Classroom/09-prj-loreal-routine-builder
- Responses API: https://developers.openai.com/api/reference/resources/responses/methods/create
- Web search: https://developers.openai.com/api/docs/guides/tools-web-search

This project is unaffiliated with L’Oréal. Starter product descriptions are classroom data and may not reflect current labels or formulations.
