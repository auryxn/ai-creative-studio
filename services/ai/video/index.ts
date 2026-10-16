import { getAIProvider } from "../registry"; export async function generateVideo(prompt:string){ return getAIProvider().generate("video",prompt); }
