import CryptoJS from 'crypto-js';
import { r2Config } from '../config/r2Config';

export function generateSignedUrl(objectKey) {
  const { bucketName, accessKey, secretKey, expiresIn } = r2Config;
  const host = `${bucketName}.r2.cloudflarestorage.com`;
  const expires = Math.floor(Date.now() / 1000) + expiresIn;

  // 서명 문자열 생성
  const stringToSign = `GET\n\n\n${expires}\n/${bucketName}/${objectKey}`;
  const signature = CryptoJS.HmacSHA1(stringToSign, secretKey).toString(CryptoJS.enc.Base64);

  return `https://${host}/${objectKey}?AWSAccessKeyId=${accessKey}&Expires=${expires}&Signature=${encodeURIComponent(signature)}`;
}