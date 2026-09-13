/**
 * RiseUpHelp Initiative Foundation - Image Compression & Storage Utility
 * Prevents QuotaExceededError and app crashes by automatically compressing device uploads.
 */

export const compressImageFile = (
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided.'));
      return;
    }

    const isImage =
      (file.type && file.type.startsWith('image/')) ||
      /\.(jpe?g|png|webp|gif|svg|avif|bmp|heic|jfif)$/i.test(file.name || '');

    if (!isImage) {
      reject(new Error('Please select a valid image file (JPG, PNG, WEBP, GIF, SVG).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file from device.'));
    reader.onload = (readerEvent) => {
      const resultStr = (readerEvent.target?.result as string) || '';

      // Direct fallback for SVG or empty
      if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
        resolve(resultStr);
        return;
      }

      const img = new Image();
      img.onerror = () => {
        // Even if Image decode fails, fallback to raw data URL so upload is never blocked
        if (resultStr.startsWith('data:image/')) {
          resolve(resultStr);
        } else {
          resolve(`data:${file.type || 'image/jpeg'};base64,${resultStr.split(',')[1] || resultStr}`);
        }
      };

      img.onload = () => {
        try {
          // Calculate scale preserving aspect ratio
          let width = img.width || 800;
          let height = img.height || 600;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          // Draw on offscreen HTML5 canvas
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(resultStr);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to lightweight JPEG data URL
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (err) {
          console.warn('Canvas compression fallback to raw reader result:', err);
          resolve(resultStr);
        }
      };

      img.src = resultStr;
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Crash-proof LocalStorage setter with quota safety and error handling
 */
export const safeLocalStorageSet = (key: string, data: any): boolean => {
  try {
    const serialized = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return true;
  } catch (err) {
    console.warn(`[LocalStorage Quota Warning] Failed to save key: "${key}".`, err);
    // If quota exceeded, try to clear old transient caches to free space
    try {
      localStorage.removeItem('ruh_temp_cache');
      const serialized = typeof data === 'string' ? data : JSON.stringify(data);
      localStorage.setItem(key, serialized);
      return true;
    } catch {
      return false;
    }
  }
};
