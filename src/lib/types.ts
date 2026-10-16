// Domain types for AI Creative Studio.
// These mirror the tables in supabase/migrations/schema.sql so the local
// (localStorage) repo and the Supabase repo stay interchangeable.

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export type ProjectStatus =
  | "idea"
  | "script"
  | "production"
  | "editing"
  | "completed"
  | "archived";

export interface Project extends BaseEntity {
  user_id: string;
  name: string;
  description: string;
  cover_url: string;
  type: string; // e.g. film, documentary, series
  status: ProjectStatus;
  // Derived (not stored) convenience for UI:
  scene_count?: number;
}

export type SceneStatus =
  | "draft"
  | "ready"
  | "generating"
  | "review"
  | "approved"
  | "completed";

export interface Scene extends BaseEntity {
  project_id: string;
  number: number;
  title: string;
  description: string;
  duration: number; // seconds
  narration: string;
  notes: string;
  status: SceneStatus;
}

export type PromptType =
  | "image"
  | "video"
  | "voice"
  | "music"
  | "negative"
  | "style"
  | "camera"
  | "system";

export type PromptBlockType =
  | "character"
  | "action"
  | "environment"
  | "lighting"
  | "camera"
  | "style"
  | "negative";

export interface Prompt extends BaseEntity {
  id: string;
  project_id: string | null;
  scene_id: string | null;
  type: PromptType;
  title: string;
  content: string; // composed full prompt
  model: string;
  status: string; // draft | active
}

export interface PromptBlock extends BaseEntity {
  prompt_id: string;
  type: PromptBlockType;
  content: string;
  sort_order: number;
}

export interface PromptVersion extends BaseEntity {
  prompt_id: string;
  version: number;
  content: string;
}

export type AssetType = "image" | "video" | "audio" | "music" | "reference";
export type AssetStatus =
  | "Draft"
  | "Generating"
  | "Generated"
  | "Approved"
  | "Rejected"
  | "Archived";

export interface Asset extends BaseEntity {
  project_id: string;
  scene_id: string | null;
  type: AssetType;
  url: string;
  thumbnail_url: string;
  version: number;
  status: AssetStatus;
}

export interface Character extends BaseEntity {
  project_id: string;
  name: string;
  description: string;
  appearance: string;
  role: string; // protagonist / antagonist / supporting / extra
  avatar_url: string;
}

export interface CharacterReference extends BaseEntity {
  character_id: string;
  asset_id: string;
  label: string;
}

export interface Location extends BaseEntity {
  project_id: string;
  name: string;
  description: string;
  reference_url: string;
}

export interface Style extends BaseEntity {
  project_id: string | null; // null = global style
  name: string;
  description: string;
  prompt: string; // reusable style block
  preview_url: string;
}

export interface Voiceover extends BaseEntity {
  project_id: string;
  scene_id: string | null;
  text: string;
  voice: string;
  language: string;
  status: string;
  asset_id: string | null;
}

export interface Music extends BaseEntity {
  project_id: string;
  name: string;
  mood: string;
  genre: string;
  duration: number;
  asset_id: string | null;
  status: string;
}

export interface Tag extends BaseEntity {
  name: string;
}

export interface PromptTag extends BaseEntity {
  prompt_id: string;
  tag_id: string;
}

// ---------- Collections / relational helpers ----------

export interface ProjectScenes {
  project: Project;
  scenes: Scene[];
  characters: Character[];
  locations: Location[];
  styles: Style[];
  assets: Asset[];
  prompts: Prompt[];
  voiceovers: Voiceover[];
  music: Music[];
}

export interface PromptWithDetails extends Prompt {
  blocks: PromptBlock[];
  versions: PromptVersion[];
}

export type SearchTargetType =
  | "project"
  | "scene"
  | "character"
  | "location"
  | "prompt"
  | "asset"
  | "style";

export interface SearchResult {
  id: string;
  type: SearchTargetType;
  title: string;
  subtitle: string;
  project_id: string | null;
  href: string;
}
