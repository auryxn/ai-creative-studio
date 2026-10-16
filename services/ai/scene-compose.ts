import type { Character, Location, Scene, Style } from "@/lib/types";
export function composeScenePrompts(input:{scene:Scene; character?:Character|null; location?:Location|null; style?:Style|null; camera?:string; lighting?:string; negative?:string}){
 const {scene,character,location,style,camera,lighting,negative}=input;
 const core=[character?.name&&`Character: ${character.name} — ${character.appearance || character.description}`, location?.name&&`Environment: ${location.name} — ${location.description}`, `Action: ${scene.description}`, lighting&&`Lighting: ${lighting}`, camera&&`Camera: ${camera}`, style?.prompt&&`Style: ${style.prompt}`, negative&&`Negative: ${negative}`].filter(Boolean).join("\n");
 return { image: core, video: `${core}\nMotion: cinematic pacing over ${scene.duration} seconds.`, voice: scene.narration || `Narrate: ${scene.title}`, music: `Mood music for ${scene.title}: ${scene.description}` };
}
