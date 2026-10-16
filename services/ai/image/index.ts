import { getAIProvider } from "../registry"; export async function generateImage(prompt:string){ return getAIProvider().generate("image",prompt); }
