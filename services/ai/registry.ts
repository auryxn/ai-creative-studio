export type GenerationResult = { id:string; status:"stub"; url:string; message:string; prompt:string };
export interface AIProvider { generate(kind:"image"|"video"|"voice"|"music", prompt:string): Promise<GenerationResult>; }
const noop:AIProvider={ async generate(kind,prompt){ return {id:`stub_${kind}_${Date.now()}`,status:"stub",url:"",message:`${kind} generation stub ready. Connect a provider to render media.`,prompt}; } };
let provider:AIProvider=noop;
export function setAIProvider(p:AIProvider){ provider=p; }
export function getAIProvider(){ return provider; }
