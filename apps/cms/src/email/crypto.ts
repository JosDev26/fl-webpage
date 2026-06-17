import crypto from 'node:crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16
const AUTH_TAG_LENGTH = 16

function getKey(): Buffer {
  const hex = process.env.ENCRYPTION_KEY
  if (!hex || hex.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes)')
  }
  return Buffer.from(hex, 'hex')
}

export function hashEmail(email: string): string {
  return crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex')
}

export function encryptEmail(plaintext: string): { encrypted: string; iv: string; hash: string } {
  const key = getKey()
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  const normalized = plaintext.toLowerCase().trim()
  let encrypted = cipher.update(normalized, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const authTag = cipher.getAuthTag()
  const encryptedWithTag = encrypted + authTag.toString('hex')

  return {
    encrypted: encryptedWithTag,
    iv: iv.toString('hex'),
    hash: hashEmail(normalized),
  }
}

export function decryptEmail(encryptedWithTag: string, ivHex: string): string {
  const key = getKey()
  const iv = Buffer.from(ivHex, 'hex')

  const authTagHex = encryptedWithTag.slice(-AUTH_TAG_LENGTH * 2)
  const encryptedHex = encryptedWithTag.slice(0, -AUTH_TAG_LENGTH * 2)

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'))

  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}
