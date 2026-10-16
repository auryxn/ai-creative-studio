import { getAIProvider } from "../registry"; export async function generateVoice(prompt:string){ return getAIProvider().generate("voice",prompt); }
