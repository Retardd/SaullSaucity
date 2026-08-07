import type { CommunityProfile, GalleryRecord, RuleRecord, ServerStatistics } from './contracts';
/** Interface intentionally has no implementation until a Supabase adapter is introduced. */
export interface CommunityRepository { getStaff():Promise<CommunityProfile[]>; getFeaturedMembers():Promise<CommunityProfile[]>; getRules():Promise<RuleRecord[]>; getGallery():Promise<GalleryRecord[]>; getStatistics():Promise<ServerStatistics>; }
