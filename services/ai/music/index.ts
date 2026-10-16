import { getAIProvider } from "../registry"; export async function generateMusic(prompt:string){ return getAIProvider().generate("music",prompt); }
