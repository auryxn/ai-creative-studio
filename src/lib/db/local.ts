"use client";
import type { Repo, ProjectInput, Update } from "./repository";
import { createBase, loadDb, remove, saveDb, upsert } from "@/lib/local-db";
import type { Asset, Character, Location, Music, Project, Prompt, PromptBlock, PromptVersion, Scene, Style, Voiceover } from "@/lib/types";

export class LocalRepoAdapter implements Repo { private ready=false; async init(){ loadDb(); this.ready=true; } isReady(){return this.ready;} private db(){return loadDb()} private commit(db:ReturnType<typeof loadDb>){saveDb(db)}
 async listProjects(){ const db=this.db(); return db.projects.map(p=>({...p,scene_count:db.scenes.filter(s=>s.project_id===p.id).length})); }
 async getProject(id:string){ return (await this.listProjects()).find(p=>p.id===id)??null; }
 async createProject(input:ProjectInput){ const db=this.db(); const p:Project={...createBase("proj"),user_id:"user_demo",name:input.name,description:input.description,cover_url:input.cover_url??"",type:input.type??"film",status:input.status??"idea"}; db.projects.push(p); this.commit(db); return p; }
 async updateProject(u:Update<Project>){ const db=this.db(); const ex=db.projects.find(x=>x.id===u.id); if(!ex) throw Error("Project not found"); const row=upsert(db.projects,{...ex,...u}); this.commit(db); return row; }
 async deleteProject(id:string){ const db=this.db(); remove(db.projects,id); db.scenes=db.scenes.filter(s=>s.project_id!==id); this.commit(db); }
 async listScenes(projectId:string){ return this.db().scenes.filter(s=>s.project_id===projectId).sort((a,b)=>a.number-b.number); }
 async getScene(id:string){ return this.db().scenes.find(s=>s.id===id)??null; }
 async createScene(projectId:string,data:Partial<Omit<Scene,"id"|"project_id"|"created_at"|"updated_at">>){ const db=this.db(); const n=Math.max(0,...db.scenes.filter(s=>s.project_id===projectId).map(s=>s.number))+1; const s:Scene={...createBase("scene"),project_id:projectId,number:data.number??n,title:data.title??`Scene ${n}`,description:data.description??"",duration:data.duration??30,narration:data.narration??"",notes:data.notes??"",status:data.status??"draft"}; db.scenes.push(s); this.commit(db); return s; }
 async updateScene(u:Update<Scene>){ const db=this.db(); const ex=db.scenes.find(x=>x.id===u.id); if(!ex) throw Error("Scene not found"); const row=upsert(db.scenes,{...ex,...u}); this.commit(db); return row; }
 async deleteScene(id:string){ const db=this.db(); remove(db.scenes,id); this.commit(db); }
 async listCharacters(projectId:string){ return this.db().characters.filter(c=>c.project_id===projectId); }
 async getCharacter(id:string){ return this.db().characters.find(c=>c.id===id)??null; }
 async createCharacter(projectId:string,data:Partial<Character>){ const db=this.db(); const c:Character={...createBase("char"),project_id:projectId,name:data.name??"New Character",description:data.description??"",appearance:data.appearance??"",role:data.role??"supporting",avatar_url:data.avatar_url??""}; db.characters.push(c); this.commit(db); return c; }
 async updateCharacter(u:Update<Character>){ const db=this.db(); const ex=db.characters.find(x=>x.id===u.id); if(!ex) throw Error("Character not found"); const row=upsert(db.characters,{...ex,...u}); this.commit(db); return row; }
 async deleteCharacter(id:string){ const db=this.db(); remove(db.characters,id); this.commit(db); }
 async listLocations(projectId:string){ return this.db().locations.filter(l=>l.project_id===projectId); }
 async getLocation(id:string){ return this.db().locations.find(l=>l.id===id)??null; }
 async createLocation(projectId:string,data:Partial<Location>){ const db=this.db(); const l:Location={...createBase("loc"),project_id:projectId,name:data.name??"New Location",description:data.description??"",reference_url:data.reference_url??""}; db.locations.push(l); this.commit(db); return l; }
 async updateLocation(u:Update<Location>){ const db=this.db(); const ex=db.locations.find(x=>x.id===u.id); if(!ex) throw Error("Location not found"); const row=upsert(db.locations,{...ex,...u}); this.commit(db); return row; }
 async deleteLocation(id:string){ const db=this.db(); remove(db.locations,id); this.commit(db); }
 async listStyles(projectId?:string|null){ return this.db().styles.filter(s=>!projectId || s.project_id===projectId || s.project_id===null); }
 async getStyle(id:string){ return this.db().styles.find(s=>s.id===id)??null; }
 async createStyle(data:Partial<Style>){ const db=this.db(); const s:Style={...createBase("style"),project_id:data.project_id??null,name:data.name??"New Style",description:data.description??"",prompt:data.prompt??"",preview_url:data.preview_url??""}; db.styles.push(s); this.commit(db); return s; }
 async updateStyle(u:Update<Style>){ const db=this.db(); const ex=db.styles.find(x=>x.id===u.id); if(!ex) throw Error("Style not found"); const row=upsert(db.styles,{...ex,...u}); this.commit(db); return row; }
 async deleteStyle(id:string){ const db=this.db(); remove(db.styles,id); this.commit(db); }
 async listPrompts(projectId?:string|null,sceneId?:string|null){ return this.db().prompts.filter(p=>(projectId===undefined || p.project_id===projectId || (projectId===null && p.project_id===null)) && (sceneId===undefined || p.scene_id===sceneId)); }
 async getPrompt(id:string){ return this.db().prompts.find(p=>p.id===id)??null; }
 async createPrompt(data:Partial<Prompt>){ const db=this.db(); const p:Prompt={...createBase("prompt"),project_id:data.project_id??null,scene_id:data.scene_id??null,type:data.type??"image",title:data.title??"New Prompt",content:data.content??"",model:data.model??"no-op",status:data.status??"draft"}; db.prompts.push(p); this.commit(db); return p; }
 async updatePrompt(u:Update<Prompt>){ const db=this.db(); const ex=db.prompts.find(x=>x.id===u.id); if(!ex) throw Error("Prompt not found"); const row=upsert(db.prompts,{...ex,...u}); this.commit(db); return row; }
 async deletePrompt(id:string){ const db=this.db(); remove(db.prompts,id); this.commit(db); }
 async listPromptBlocks(promptId:string){ return this.db().prompt_blocks.filter(b=>b.prompt_id===promptId).sort((a,b)=>a.sort_order-b.sort_order); }
 async savePromptBlocks(promptId:string,blocks:PromptBlock[]){ const db=this.db(); db.prompt_blocks=db.prompt_blocks.filter(b=>b.prompt_id!==promptId).concat(blocks); this.commit(db); }
 async listPromptVersions(promptId:string){ return this.db().prompt_versions.filter(v=>v.prompt_id===promptId).sort((a,b)=>b.version-a.version); }
 async addPromptVersion(promptId:string,content:string){ const db=this.db(); const n=Math.max(0,...db.prompt_versions.filter(v=>v.prompt_id===promptId).map(v=>v.version))+1; const v:PromptVersion={...createBase("pv"),prompt_id:promptId,version:n,content}; db.prompt_versions.push(v); this.commit(db); return v; }
 async listAssets(projectId:string,sceneId?:string|null){ return this.db().assets.filter(a=>a.project_id===projectId && (sceneId===undefined || a.scene_id===sceneId)); }
 async getAsset(id:string){ return this.db().assets.find(a=>a.id===id)??null; }
 async createAsset(data:Partial<Asset>){ const db=this.db(); const a:Asset={...createBase("asset"),project_id:data.project_id!,scene_id:data.scene_id??null,type:data.type??"reference",url:data.url??"",thumbnail_url:data.thumbnail_url??"",version:data.version??1,status:data.status??"Draft"}; db.assets.push(a); this.commit(db); return a; }
 async updateAsset(u:Update<Asset>){ const db=this.db(); const ex=db.assets.find(x=>x.id===u.id); if(!ex) throw Error("Asset not found"); const row=upsert(db.assets,{...ex,...u}); this.commit(db); return row; }
 async deleteAsset(id:string){ const db=this.db(); remove(db.assets,id); this.commit(db); }
 async listVoiceovers(projectId:string){ return this.db().voiceovers.filter(v=>v.project_id===projectId); }
 async createVoiceover(data:Partial<Voiceover>){ const db=this.db(); const v:Voiceover={...createBase("vo"),project_id:data.project_id!,scene_id:data.scene_id??null,text:data.text??"",voice:data.voice??"Narrator",language:data.language??"en",status:data.status??"draft",asset_id:data.asset_id??null}; db.voiceovers.push(v); this.commit(db); return v; }
 async updateVoiceover(u:Update<Voiceover>){ const db=this.db(); const ex=db.voiceovers.find(x=>x.id===u.id); if(!ex) throw Error("Voiceover not found"); const row=upsert(db.voiceovers,{...ex,...u}); this.commit(db); return row; }
 async deleteVoiceover(id:string){ const db=this.db(); remove(db.voiceovers,id); this.commit(db); }
 async listMusic(projectId:string){ return this.db().music.filter(m=>m.project_id===projectId); }
 async getMusic(id:string){ return this.db().music.find(m=>m.id===id)??null; }
 async createMusic(data:Partial<Music>){ const db=this.db(); const m:Music={...createBase("music"),project_id:data.project_id!,name:data.name??"New Cue",mood:data.mood??"calm",genre:data.genre??"ambient",duration:data.duration??60,asset_id:data.asset_id??null,status:data.status??"draft"}; db.music.push(m); this.commit(db); return m; }
 async updateMusic(u:Update<Music>){ const db=this.db(); const ex=db.music.find(x=>x.id===u.id); if(!ex) throw Error("Music not found"); const row=upsert(db.music,{...ex,...u}); this.commit(db); return row; }
 async deleteMusic(id:string){ const db=this.db(); remove(db.music,id); this.commit(db); }
}
