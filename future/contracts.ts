/**
 * Data contracts for the future Supabase/Discord integration.
 * UI currently uses constants/content.ts so Phase 1 stays fully static.
 */
export type CommunityProfile = { id:string; displayName:string; username:string; avatarUrl?:string; role?:string };
export type RuleRecord = { id:string; title:string; body:string; order:number; published:boolean };
export type GalleryRecord = { id:string; alt:string; imageUrl:string; createdAt:string };
export type ServerStatistics = { members:number; online:number; inviteUrl:string };
