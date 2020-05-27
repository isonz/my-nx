import { environment } from '../../environments/environment';

const crypto = require('crypto');

export function sha256(str: string) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

export function md5(str: string) {
  return crypto.createHash('md5').update(str).digest('hex');
}


export function idToUUID(data) {
  return toUUID(data, environment.idSecret);
}

export function idDeUUID(uuid) {
  return deUUID(uuid, environment.idSecret);
}

export function toUUID(data, key) {
  const encrypted = aesEncrypt(data, key);
  return encrypted.slice(0,8) + '-' + encrypted.slice(8,12) + '-' + encrypted.slice(12,16) + '-' + encrypted.slice(16,20) + '-' + encrypted.slice(20);
}

export function deUUID(uuid: string, key) {
  uuid = uuid.replace(/-/g, '');
  return aesDecrypt(uuid, key);
}

export function aesEncrypt(data, key) {
  data = data.toString();
  const cipher = crypto.createCipheriv('aes-128-cbc', key, environment.ivSecret);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, environment.ivSecret);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
