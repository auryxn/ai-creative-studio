// Repository (adapter) interface for AI Creative Studio.
//
// Every data access in the UI flows through this interface. Under the hood we
// swap implementations without touching any UI code:
//   - LocalRepoAdapter  -> browser `localStorage` (default, self-contained MVP)
//   - SupabaseRepoAdapter -> real Postgres via Supabase (enable by setting env)
//
// See src/lib/db for implementations and README.md for the swap runbook.

import type {
  Asset,
  Character,
  CharacterReference,
  Location,
  Music,
  Project,
  Prompt,
  PromptBlock,
  PromptTag,
  PromptVersion,
  Scene,
  Style,
  Tag,
  Voiceover,
} from "@/lib/types";

/** Pick<T, "id"> & Partial<T> allows partial updates on an existing row. */
export type Update<T> = Partial<T> & { id: string };

export interface ProjectInput {
  name: string;
  description: string;
  type?: string;
  status?: Project["status"];
  cover_url?: string;
}

export interface Repo {
  // generic ready check
  isReady(): boolean;

  // projects
  listProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
  createProject(input: ProjectInput): Promise<Project>;
  updateProject(update: Update<Project>): Promise<Project>;
  deleteProject(id: string): Promise<void>;

  // scenes
  listScenes(projectId: string): Promise<Scene[]>;
  getScene(id: string): Promise<Scene | null>;
  createScene(
    projectId: string,
    data: Partial<Omit<Scene, "id" | "project_id" | "created_at" | "updated_at">>
  ): Promise<Scene>;
  updateScene(update: Update<Scene>): Promise<Scene>;
  deleteScene(id: string): Promise<void>;

  // characters
  listCharacters(projectId: string): Promise<Character[]>;
  getCharacter(id: string): Promise<Character | null>;
  createCharacter(
    projectId: string,
    data: Partial<Character>
  ): Promise<Character>;
  updateCharacter(update: Update<Character>): Promise<Character>;
  deleteCharacter(id: string): Promise<void>;

  // locations
  listLocations(projectId: string): Promise<Location[]>;
  getLocation(id: string): Promise<Location | null>;
  createLocation(
    projectId: string,
    data: Partial<Location>
  ): Promise<Location>;
  updateLocation(update: Update<Location>): Promise<Location>;
  deleteLocation(id: string): Promise<void>;

  // styles
  listStyles(projectId?: string | null): Promise<Style[]>;
  getStyle(id: string): Promise<Style | null>;
  createStyle(data: Partial<Style>): Promise<Style>;
  updateStyle(update: Update<Style>): Promise<Style>;
  deleteStyle(id: string): Promise<void>;

  // prompts
  listPrompts(projectId?: string | null, sceneId?: string | null): Promise<Prompt[]>;
  getPrompt(id: string): Promise<Prompt | null>;
  createPrompt(
    data: Partial<Prompt>
  ): Promise<Prompt>;
  updatePrompt(update: Update<Prompt>): Promise<Prompt>;
  deletePrompt(id: string): Promise<void>;

  // prompt blocks
  listPromptBlocks(promptId: string): Promise<PromptBlock[]>;
  savePromptBlocks(promptId: string, blocks: PromptBlock[]): Promise<void>;

  // prompt versions
  listPromptVersions(promptId: string): Promise<PromptVersion[]>;
  addPromptVersion(promptId: string, content: string): Promise<PromptVersion>;

  // assets
  listAssets(projectId: string, sceneId?: string | null): Promise<Asset[]>;
  getAsset(id: string): Promise<Asset | null>;
  createAsset(data: Partial<Asset>): Promise<Asset>;
  updateAsset(update: Update<Asset>): Promise<Asset>;
  deleteAsset(id: string): Promise<void>;

  // voiceovers
  listVoiceovers(projectId: string): Promise<Voiceover[]>;
  createVoiceover(data: Partial<Voiceover>): Promise<Voiceover>;
  updateVoiceover(update: Update<Voiceover>): Promise<Voiceover>;
  deleteVoiceover(id: string): Promise<void>;

  // music
  listMusic(projectId: string): Promise<Music[]>;
  getMusic(id: string): Promise<Music | null>;
  createMusic(data: Partial<Music>): Promise<Music>;
  updateMusic(update: Update<Music>): Promise<Music>;
  deleteMusic(id: string): Promise<void>;
}
