/**
 * RiseUpHelp Initiative Foundation - Multi-Device State & Media Sync Utility
 * Synchronizes uploaded photos, patient profiles, spotlights, and drives across
 * local PC, tablet, and mobile browsers over Wi-Fi (Vite Connect Server).
 */

import type {
  DriveItem,
  PatientProfile,
  LeaderboardDonor,
  ChildSpotlightProfile,
  MediaPhotoCard,
  FoundationStats,
  SevaScheduleEvent,
  HospitalNode,
  HeroContentConfig,
  StoryContentConfig,
  GalleryItem,
  VolunteerSubmission,
  InaugurationConfig,
} from '../types';
import { compressImageFile } from './imageUtils';

export interface ReceiptConfig {
  urn80g: string;
  cinNumber: string;
  receiptPrefix: string;
  signatoryName: string;
  signatoryTitle: string;
  signatureImage?: string;
  stampImage?: string;
}

export interface SiteStatePayload {
  driveItems: DriveItem[];
  patientProfiles: PatientProfile[];
  leaderboardDonors: LeaderboardDonor[];
  childSpotlights: { left: ChildSpotlightProfile; right: ChildSpotlightProfile };
  wardProfiles?: ChildSpotlightProfile[];
  mediaPhotosRow1: MediaPhotoCard[];
  mediaPhotosRow2: MediaPhotoCard[];
  foundationStats: FoundationStats;
  scheduleEvents: SevaScheduleEvent[];
  galleryItems?: GalleryItem[];
  heroContent?: HeroContentConfig;
  storyContent?: StoryContentConfig;
  partnerHospitals?: HospitalNode[];
  receiptConfig?: ReceiptConfig;
  volunteers?: VolunteerSubmission[];
  inaugurationConfig?: InaugurationConfig;
  lastUpdated?: number;
  initialized?: boolean;
}

export interface ServerSyncResponse {
  initialized: boolean;
  data: SiteStatePayload | null;
  lastUpdated?: number;
}

/**
 * Fetch the centralized site state from the server disk (public/site-state.json).
 */
export const fetchServerState = async (): Promise<ServerSyncResponse> => {
  try {
    const res = await fetch(`/api/site-state?t=${Date.now()}`, {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const json = await res.json();
      if (json && (json.initialized || json.data)) {
        return json;
      }
    }
  } catch (err) {
    console.warn('[ServerSync] API endpoint warning, trying static fallback:', err);
  }

  // Production fallback for static hosting (Vercel, Netlify, Hostinger, cPanel)
  try {
    const staticRes = await fetch(`/site-state.json?t=${Date.now()}`, {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (staticRes.ok) {
      const data = await staticRes.json();
      return { initialized: true, data, lastUpdated: data?.lastUpdated };
    }
  } catch (staticErr) {
    console.warn('[ServerSync] Static fallback failed:', staticErr);
  }

  return { initialized: false, data: null };
};

export const getAdminAuthHeaders = (): Record<string, string> => {
  const token = sessionStorage.getItem('ruh_admin_token') || '';
  const pin = sessionStorage.getItem('ruh_admin_pin') || localStorage.getItem('ruh_admin_pin') || '';
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (pin) {
    headers['x-admin-pin'] = pin;
  }
  return headers;
};

/**
 * Push the full site state to the server disk. Base64 photos are automatically
 * extracted by the server into static files in public/uploads/.
 */
export const pushServerState = async (
  state: Partial<SiteStatePayload>
): Promise<{ success: boolean; data?: SiteStatePayload; error?: string }> => {
  try {
    const authHeaders = getAdminAuthHeaders();
    const res = await fetch('/api/save-site-state', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify(state),
    });
    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }
    const result = await res.json();
    return { success: true, data: result.data };
  } catch (err: any) {
    console.error('[ServerSync] Failed to push state to server:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
};

/**
 * Upload an image file directly to the server's public/uploads/ directory.
 * Returns the permanent static URL (e.g. /uploads/img_....jpg).
 */
export const uploadImageToServer = async (
  fileOrBase64: File | string,
  nameHint = 'photo'
): Promise<{ success: boolean; url: string }> => {
  try {
    let base64String = '';
    if (typeof fileOrBase64 === 'string') {
      base64String = fileOrBase64;
    } else {
      base64String = await compressImageFile(fileOrBase64, 1200, 1200, 0.8);
    }

    const authHeaders = getAdminAuthHeaders();
    const res = await fetch('/api/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify({ image: base64String, name: nameHint }),
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }

    const json = await res.json();
    if (json.url) {
      return { success: true, url: json.url };
    }
    return { success: true, url: base64String };
  } catch (err) {
    console.warn('[ServerSync] Upload to server failed, falling back to local base64:', err);
    // If server upload failed, fallback to base64 so user action never fails
    if (typeof fileOrBase64 === 'string') {
      return { success: false, url: fileOrBase64 };
    }
    try {
      const fallback = await compressImageFile(fileOrBase64, 1000, 1000, 0.75);
      return { success: false, url: fallback };
    } catch {
      return { success: false, url: '' };
    }
  }
};

/**
 * Detects if a browser's localStorage contains custom user uploads
 * (such as base64 images or server /uploads/ references).
 */
export const hasCustomUploadedContent = (): boolean => {
  try {
    const keysToCheck = [
      'ruh_media_r1_v2',
      'ruh_media_r2_v2',
      'ruh_child_spotlights_v2',
      'ruh_patients_v2',
      'ruh_drives_v2',
    ];

    for (const key of keysToCheck) {
      const val = localStorage.getItem(key);
      if (val) {
        if (val.includes('data:image/') || val.includes('/uploads/')) {
          return true;
        }
      }
    }
    return false;
  } catch {
    return false;
  }
};
