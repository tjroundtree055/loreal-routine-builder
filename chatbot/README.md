# L’Oréal Beauty Advisor — Project 8

Student project by Tyrone Roundtree Jr. HTML, CSS, and plain JavaScript adapted from the GCA classroom starter. The provided logo is retained. This is not an official L’Oréal service.

## Current status
The interface and request handling are implemented. Live AI replies are PENDING a deployed Cloudflare Worker URL. The frontend is published under the routine-builder repository at /chatbot/. This is not yet a finished live submission. No API key is included or needed in browser code.

## Connect the backend
1. If your instructor supplies a class-hosted Worker URL, save it in Advisor connection on the page. Students using the class service should not handle API keys.
2. If you are instructed to deploy your own Worker, paste `RESOURCE_cloudflare-worker.js` into the Cloudflare Worker editor and deploy it.
3. Set `OPENAI_API_KEY` as a Cloudflare secret directly in its dashboard, never in project files or chat. Set `ALLOWED_ORIGIN` as a Worker variable to the exact frontend origin (for example, `https://yourusername.github.io`, with no trailing slash or repository path). The Worker uses gpt-4.1 and the Chat Completions API.
4. Save the returned HTTPS Worker URL in Advisor connection on the page.
5. Publish the frontend through GitHub Pages from the main branch, root directory. Never publish secrets. A local preview can be served with `python3 -m http.server 8000` (set the Worker origin appropriately when testing locally).

## Implemented features
- Branded responsive layout with the provided L’Oréal logo.
- Plain text message rendering and distinct user/assistant bubbles.
- Latest-question panel, replaced for each new question.
- In-memory conversation history, bounded request context, and New chat reset.
- A L’Oréal/beauty-only system prompt, also enforced in the supplied Worker.
- Request timeout, disabled controls while waiting, understandable errors, and failed-question recovery.
- The Worker validates request sizes and conversation content and never returns its secret.

## Checks before claiming completion
Mocked frontend tests cover success, history, latest-question replacement, errors, reset, and safe rendering. Worker tests cover allowed origin, malformed input, server-owned prompt, missing-secret errors, and upstream failures. Actual model behavior cannot be verified until connected. Check all of these with the live service:
- Ask for a routine and follow up with a preference; confirm the reply uses earlier context.
- Share a name, then ask the bot to recall it.
- Ask an unrelated math or coding question; confirm a polite redirect.
- Verify new chat clears the transcript and latest-question panel.
- Test at phone and desktop widths and in a private window.
- Confirm no API key appears in source or network requests to the frontend.

For public deployment, configure account-level rate limits/budgets. CORS is a browser restriction, not authentication or protection from direct API abuse.

References: https://github.com/GCA-Classroom/08-prj-loreal-chatbot ; https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create
