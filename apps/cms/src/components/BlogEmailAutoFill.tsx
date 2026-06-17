'use client'

import { useEffect, useRef } from 'react'
import { useAllFormFields } from '@payloadcms/ui'

/** Invisible UI field — auto-fills email marketing fields when toggle is activated */
export const BlogEmailAutoFill: React.FC = () => {
  const [fields, dispatchFields] = useAllFormFields()

  const prevToggle = useRef<boolean>(false)

  const isOn = Boolean(fields?.sendEmailCampaign?.value)
  const titleVal = (fields?.title?.value as string) || ''
  const excerptVal = (fields?.excerpt?.value as string) || ''
  const hasSubject = Boolean(fields?.emailSubject?.value)
  const hasPreheader = Boolean(fields?.emailPreheader?.value)
  const hasBody = Boolean(fields?.emailBodyText?.value)

  useEffect(() => {
    // Only auto-fill when toggle is just turned ON
    if (!isOn) {
      prevToggle.current = false
      return
    }

    if (prevToggle.current) return
    prevToggle.current = true

    // Use setTimeout to let conditional fields mount first
    setTimeout(() => {
      if (!hasSubject && titleVal) {
        dispatchFields({
          type: 'UPDATE',
          path: 'emailSubject',
          value: `Nuevo artículo: ${titleVal}`,
        } as any)
      }

      if (!hasPreheader && titleVal) {
        dispatchFields({
          type: 'UPDATE',
          path: 'emailPreheader',
          value: `Este artículo podría interesarte — ${titleVal}`,
        } as any)
      }

      if (!hasBody) {
        const bodyValue = excerptVal
          ? `Tenemos algo nuevo que podría interesarte:\n\n${excerptVal}`
          : titleVal
            ? `Acabamos de publicar un nuevo artículo: "${titleVal}". Haz clic abajo para leerlo.`
            : ''

        if (bodyValue) {
          dispatchFields({
            type: 'UPDATE',
            path: 'emailBodyText',
            value: bodyValue,
          } as any)
        }
      }
    }, 100)
  }, [isOn])

  return null
}
