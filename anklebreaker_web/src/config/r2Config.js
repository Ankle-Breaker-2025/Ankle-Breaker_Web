export const r2Config = {
  bucketName: import.meta.env.VITE_R2_BUCKET_NAME || '',
  accessKey: import.meta.env.VITE_R2_ACCESS_KEY || '',
  secretKey: import.meta.env.VITE_R2_SECRET_KEY || '',
  expiresIn: parseInt(import.meta.env.VITE_R2_EXPIRES_IN || '3600', 10), // 기본값
};