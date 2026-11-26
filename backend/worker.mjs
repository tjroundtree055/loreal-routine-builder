import chat from './chat.mjs';
import routine from './routine.mjs';

// One deployment serves both coursework projects. Secrets stay in Cloudflare.
export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;
    const headers = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
      'Vary': 'Origin'
    };
    const reply = (data, status = 200) => Response.json(data, { status, headers });
    if (request.method === 'GET' && (path === '/' || path === '/health')) {
      return reply({service:'L’Oréal project advisor',configured:Boolean(env.OPENAI_API_KEY),routes:['/chat','/routine']});
    }
    if (!['/chat','/routine'].includes(path)) return reply({error:'Route not found.'},404);
    if (request.headers.get('Origin') !== env.ALLOWED_ORIGIN) return reply({error:'Origin not allowed.'},403);
    if (request.method === 'OPTIONS') return new Response(null,{status:204,headers});
    if (request.method !== 'POST') return reply({error:'Use POST.'},405);
    if (!env.OPENAI_API_KEY) return reply({error:'The project owner still needs to add the OpenAI API secret.'},503);
    if (!env.REQUEST_LIMITER) return reply({error:'Request limit configuration is unavailable.'},503);
    const limited = await env.REQUEST_LIMITER.limit({key:request.headers.get('CF-Connecting-IP')||'unknown'});
    if (!limited.success) return reply({error:'Too many questions. Please try again in a minute.'},429);
    // Bound streamed input even when Content-Length is absent or inaccurate.
    const reader=request.body?.getReader();
    if (!reader) return reply({error:'A JSON body is required.'},400);
    const chunks=[];let size=0;
    while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>60000){await reader.cancel();return reply({error:'Request too large.'},413)}chunks.push(value)}
    const bytes=new Uint8Array(size);let offset=0;
    for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength}
    const bounded=new Request(request.url,{method:'POST',headers:request.headers,body:bytes});
    try {
      const response=await (path==='/chat'?chat:routine).fetch(bounded,env,ctx);
      console.log(JSON.stringify({event:'advisor_request',route:path,status:response.status}));
      return response;
    } catch {
      console.error(JSON.stringify({event:'advisor_failure',route:path}));
      return reply({error:'The advisor could not complete the request. Please try again.'},502);
    }
  }
};
