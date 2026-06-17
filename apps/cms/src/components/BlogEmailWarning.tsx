'use client'

import React, { useEffect, useState } from 'react'
import { useFormFields } from '@payloadcms/ui'

interface TagStat {
  name: string
  count: number
}

interface StatsResponse {
  totalConfirmed: number
  topSubscribedTags: TagStat[]
}

export const BlogEmailWarning: React.FC = () => {
  const sendEmail = useFormFields(([fields]) => fields.sendEmailCampaign)
  const tags = useFormFields(([fields]) => fields.tags)
  const linkedCampaignId = useFormFields(([fields]) => fields.linkedCampaignId)
  const emailSentAt = useFormFields(([fields]) => fields.emailSentAt)

  const toggle = Boolean(sendEmail?.value)
  const campaignId = linkedCampaignId?.value
  const sentDate = emailSentAt?.value as string | undefined

  const selectedTagIds: number[] = Array.isArray(tags?.value)
    ? (tags.value as any[]).map((t: any) => (typeof t === 'object' ? t.id ?? t.value : t))
    : []

  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [tagNames, setTagNames] = useState<Map<number, string>>(new Map())
  const [loading, setLoading] = useState(false)

  // Fetch subscriber stats once
  useEffect(() => {
    if (!toggle) return
    setLoading(true)
    fetch('/api/subscribers/stats', { credentials: 'include' })
      .then((r) => r.json())
      .then((data: StatsResponse) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [toggle])

  // Fetch tag names for selected IDs
  useEffect(() => {
    if (!toggle || selectedTagIds.length === 0) return

    const idsToFetch = selectedTagIds.filter((id) => !tagNames.has(id))
    if (idsToFetch.length === 0) return

    Promise.all(
      idsToFetch.map((id) =>
        fetch(`/api/tags/${id}`, { credentials: 'include' })
          .then((r) => r.json())
          .then((tag: any) => [id, tag.name] as [number, string])
          .catch(() => [id, `Tag ${id}`] as [number, string]),
      ),
    ).then((entries) => {
      setTagNames((prev) => {
        const next = new Map(prev)
        for (const [id, name] of entries) next.set(id, name)
        return next
      })
    })
  }, [toggle, selectedTagIds.join(',')])

  if (!toggle) return null

  // Already sent
  if (campaignId) {
    const formatted = sentDate
      ? new Date(sentDate).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : ''
    return (
      <div style={{ ...baseStyle, background: 'rgba(250, 208, 44, 0.12)', borderColor: '#FAD02C' }}>
        <span style={{ fontWeight: 700, color: '#FAD02C' }}>
          Email enviado{formatted ? ` el ${formatted}` : ''}
        </span>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ ...baseStyle, borderColor: '#666' }}>
        <span style={{ color: 'rgba(255,255,255,0.5)' }}>Cargando info de suscriptores...</span>
      </div>
    )
  }

  // No tags selected
  if (selectedTagIds.length === 0) {
    return (
      <div style={{ ...baseStyle, background: 'rgba(220, 53, 69, 0.1)', borderColor: '#dc3545' }}>
        <span style={{ color: '#dc3545', fontWeight: 600 }}>
          Asigna al menos un tag para activar el email marketing
        </span>
      </div>
    )
  }

  // Check subscriber overlap
  if (stats) {
    const subscribedTagNames = new Set(stats.topSubscribedTags.map((t) => t.name))
    const selectedNames = selectedTagIds.map((id) => tagNames.get(id) || '').filter(Boolean)
    const matchingTags = selectedNames.filter((name) => subscribedTagNames.has(name))

    if (matchingTags.length === 0) {
      return (
        <div style={{ ...baseStyle, background: 'rgba(255, 193, 7, 0.1)', borderColor: '#ffc107' }}>
          <span style={{ color: '#ffc107', fontWeight: 600 }}>
            Ningun suscriptor tiene estas etiquetas. Nadie recibira el email.
          </span>
        </div>
      )
    }

    // Count matching subscribers
    const matchCount = stats.topSubscribedTags
      .filter((t) => selectedNames.includes(t.name))
      .reduce((sum, t) => sum + t.count, 0)

    return (
      <div style={{ ...baseStyle, background: 'rgba(40, 167, 69, 0.1)', borderColor: '#28a745' }}>
        <span style={{ color: '#28a745', fontWeight: 600 }}>
          ~{matchCount} suscriptor{matchCount !== 1 ? 'es' : ''} recibira{matchCount !== 1 ? 'n' : ''} este email
        </span>
      </div>
    )
  }

  return null
}

const baseStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderLeft: '4px solid',
  marginBottom: '16px',
  borderRadius: '0 4px 4px 0',
  fontSize: '14px',
}
