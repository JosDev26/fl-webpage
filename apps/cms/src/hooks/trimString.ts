import type { FieldHook } from 'payload'

export const trimString: FieldHook = ({ value }) =>
  typeof value === 'string' ? value.trim() : value
