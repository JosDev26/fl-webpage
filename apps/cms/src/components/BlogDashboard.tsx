'use client'

import React, { useEffect, useState } from 'react'

const YELLOW = '#FAD02C'
const DARK_BLUE = '#19304B'
const YELLOW_DIM = 'rgba(250, 208, 44, 0.12)'
const YELLOW_BORDER = 'rgba(250, 208, 44, 0.22)'

interface Stats {
  totalPosts: number
  publishedCount: number
  draftCount: number
  totalViews: number
  topPosts: { id: string; title: string; slug: string; views: number; status: string }[]
  thisMonthCount: number
  tagsBreakdown: { name: string; count: number }[]
  recent: { id: string; title: string; slug: string; published_date: string; views: number }[]
}

interface SubscriberStats {
  totalConfirmed: number
  topSubscribedTags: { name: string; count: number }[]
}

export const BlogDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [subStats, setSubStats] = useState<SubscriberStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/blog-posts/stats', { credentials: 'include' }).then((res) => {
        if (!res.ok) throw new Error('Error al cargar estadísticas del blog')
        return res.json()
      }),
      fetch('/api/subscribers/stats', { credentials: 'include' }).then((res) => {
        if (!res.ok) return null
        return res.json()
      }).catch(() => null),
    ])
      .then(([blogData, subscriberData]) => {
        setStats(blogData)
        setSubStats(subscriberData)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const maxTagCount = Math.max(...(stats?.tagsBreakdown.map((t) => t.count) ?? [1]), 1)

  return (
    <div style={s.root}>
      {/* Header */}
      <div style={s.header}>
        <span style={s.headerLabel}>Blog — Estadísticas</span>
        <div style={s.headerRule} />
      </div>

      {loading && <p style={s.stateText}>Cargando estadísticas...</p>}
      {!loading && (error || !stats) && (
        <p style={s.errorText}>{error || 'No se pudieron cargar las estadísticas'}</p>
      )}

      {!loading && stats && (
        <>
          {/* Stats strip */}
          <div style={s.strip}>
            {[
              { value: stats.totalPosts, label: 'Total' },
              { value: stats.publishedCount, label: 'Publicados' },
              { value: stats.draftCount, label: 'Borradores' },
              { value: stats.totalViews, label: 'Visitas' },
              { value: stats.thisMonthCount, label: 'Este mes' },
            ].map(({ value, label }) => (
              <div key={label} style={s.statCard}>
                <div style={s.statValue}>{value}</div>
                <div style={s.statLabel}>{label}</div>
              </div>
            ))}
          </div>

          {/* Two-column grid */}
          <div style={s.grid}>
            {/* Top Posts */}
            <div style={s.panel}>
              <div style={s.panelHeader}>
                <span style={s.panelTitle}>Más visitados</span>
              </div>
              {stats.topPosts.length === 0 ? (
                <p style={s.emptyText}>Sin datos aún</p>
              ) : (
                <table style={s.table}>
                  <thead>
                    <tr>
                      <th style={{ ...s.th, width: '32px' }}>#</th>
                      <th style={{ ...s.th, textAlign: 'left' as const }}>Título</th>
                      <th style={{ ...s.th, width: '64px' }}>Visitas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topPosts.map((post, i) => (
                      <tr key={post.id}>
                        <td style={{ ...s.td, color: YELLOW, fontWeight: 700 }}>{i + 1}</td>
                        <td style={{ ...s.td, textAlign: 'left' as const }}>
                          <a href={`/admin/collections/blog-posts/${post.id}`} style={s.link}>
                            {post.title}
                          </a>
                        </td>
                        <td style={s.td}>
                          <span style={s.badge}>{post.views}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Tags Breakdown */}
            <div style={s.panel}>
              <div style={s.panelHeader}>
                <span style={s.panelTitle}>Posts por etiqueta</span>
              </div>
              {stats.tagsBreakdown.length === 0 ? (
                <p style={s.emptyText}>Sin etiquetas</p>
              ) : (
                <div style={s.tagsList}>
                  {stats.tagsBreakdown.map((tag) => (
                    <div key={tag.name} style={s.tagRow}>
                      <span style={s.tagName}>{tag.name}</span>
                      <div style={s.tagTrack}>
                        <div
                          style={{
                            ...s.tagFill,
                            width: `${(tag.count / maxTagCount) * 100}%`,
                          }}
                        />
                      </div>
                      <span style={s.tagCount}>{tag.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Posts */}
          <div style={s.panel}>
            <div style={s.panelHeader}>
              <span style={s.panelTitle}>Publicaciones recientes</span>
            </div>
            {stats.recent.length === 0 ? (
              <p style={s.emptyText}>Sin publicaciones aún</p>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={{ ...s.th, textAlign: 'left' as const }}>Título</th>
                    <th style={{ ...s.th, width: '130px' }}>Fecha</th>
                    <th style={{ ...s.th, width: '64px' }}>Visitas</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent.map((post) => (
                    <tr key={post.id}>
                      <td style={{ ...s.td, textAlign: 'left' as const }}>
                        <a href={`/admin/collections/blog-posts/${post.id}`} style={s.link}>
                          {post.title}
                        </a>
                      </td>
                      <td style={s.td}>
                        {post.published_date
                          ? new Date(post.published_date).toLocaleDateString('es-CR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '—'}
                      </td>
                      <td style={s.td}>
                        <span style={s.badge}>{post.views}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Subscriber Stats */}
          {subStats && (
            <>
              <div style={{ ...s.header, marginTop: 'calc(var(--base) * 2.4)' }}>
                <span style={s.headerLabel}>Suscriptores — Estadísticas</span>
                <div style={s.headerRule} />
              </div>

              <div style={s.strip}>
                <div style={s.statCard}>
                  <div style={s.statValue}>{subStats.totalConfirmed}</div>
                  <div style={s.statLabel}>Confirmados</div>
                </div>
              </div>

              {subStats.topSubscribedTags.length > 0 && (
                <div style={s.panel}>
                  <div style={s.panelHeader}>
                    <span style={s.panelTitle}>Etiquetas más suscritas</span>
                  </div>
                  <div style={s.tagsList}>
                    {subStats.topSubscribedTags.map((tag) => {
                      const maxSubTag = Math.max(...subStats.topSubscribedTags.map((t) => t.count), 1)
                      return (
                        <div key={tag.name} style={s.tagRow}>
                          <span style={s.tagName}>{tag.name}</span>
                          <div style={s.tagTrack}>
                            <div
                              style={{
                                ...s.tagFill,
                                width: `${(tag.count / maxSubTag) * 100}%`,
                              }}
                            />
                          </div>
                          <span style={s.tagCount}>{tag.count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  root: {
    marginTop: 'calc(var(--base) * 2.4)',
    paddingTop: 'calc(var(--base) * 1.6)',
    borderTop: `3px solid ${YELLOW}`,
  },

  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 'calc(var(--base) * 0.8)',
    marginBottom: 'calc(var(--base) * 2)',
  },
  headerLabel: {
    fontSize: 'calc(var(--base) * 0.54)',
    fontWeight: 400,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: YELLOW,
    whiteSpace: 'nowrap' as const,
  },
  headerRule: {
    flex: 1,
    height: '1px',
    background: YELLOW_BORDER,
  },

  stateText: {
    color: 'var(--theme-elevation-500)',
    fontSize: 'calc(var(--base) * 0.85)',
    padding: 'calc(var(--base) * 1.6) 0',
    margin: 0,
  },
  errorText: {
    color: '#f87171',
    fontSize: 'calc(var(--base) * 0.85)',
    padding: 'calc(var(--base) * 1.6) 0',
    margin: 0,
  },
  emptyText: {
    color: 'var(--theme-elevation-500)',
    fontSize: 'calc(var(--base) * 0.77)',
    fontStyle: 'italic' as const,
    padding: 'calc(var(--base) * 0.6) 0',
    margin: 0,
  },

  // Stats strip — dark blue cards with yellow numbers
  strip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '2px',
    marginBottom: 'calc(var(--base) * 2.4)',
    background: YELLOW_BORDER,
  },
  statCard: {
    background: DARK_BLUE,
    padding: 'calc(var(--base) * 1.4) calc(var(--base) * 1) calc(var(--base) * 1.2)',
    textAlign: 'center' as const,
  },
  statValue: {
    fontSize: 'calc(var(--base) * 1.8)',
    fontWeight: 800,
    lineHeight: 1,
    color: YELLOW,
    letterSpacing: '-0.02em',
    margin: 0,
  },
  statLabel: {
    marginTop: 'calc(var(--base) * 0.4)',
    fontSize: 'calc(var(--base) * 0.5)',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.45)',
  },

  // Two-column grid
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'calc(var(--base) * 1.6)',
    marginBottom: 'calc(var(--base) * 1.6)',
  },

  // Panel — no card box, just a top accent line
  panel: {
    paddingTop: 'calc(var(--base) * 1.2)',
    borderTop: `1px solid ${YELLOW_BORDER}`,
    marginBottom: 'calc(var(--base) * 0.4)',
  },
  panelHeader: {
    marginBottom: 'calc(var(--base) * 1)',
  },
  panelTitle: {
    fontSize: 'calc(var(--base) * 0.54)',
    fontWeight: 400,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: YELLOW,
  },

  // Table — horizontal rules only
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 'var(--theme-baseline-body-size)',
  },
  th: {
    padding: `0 calc(var(--base) * 0.6) calc(var(--base) * 0.5) 0`,
    textAlign: 'center' as const,
    fontSize: 'calc(var(--base) * 0.5)',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--theme-elevation-500)',
    borderBottom: `1px solid ${YELLOW_BORDER}`,
  },
  td: {
    padding: `calc(var(--base) * 0.55) calc(var(--base) * 0.6) calc(var(--base) * 0.55) 0`,
    textAlign: 'center' as const,
    color: 'var(--theme-text)',
    borderBottom: '1px solid var(--theme-elevation-100)',
    fontSize: 'var(--theme-baseline-body-size)',
    margin: 0,
  },
  link: {
    color: 'var(--theme-text)',
    textDecoration: 'none',
    fontWeight: 500,
  },
  badge: {
    display: 'inline-block',
    background: YELLOW_DIM,
    color: YELLOW,
    padding: `calc(var(--base) * 0.15) calc(var(--base) * 0.5)`,
    fontWeight: 700,
    fontSize: 'calc(var(--base) * 0.6)',
    letterSpacing: '0.04em',
    border: `1px solid ${YELLOW_BORDER}`,
  },

  // Tags bar chart
  tagsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'calc(var(--base) * 0.6)',
  },
  tagRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'calc(var(--base) * 0.6)',
  },
  tagName: {
    minWidth: 'calc(var(--base) * 5.5)',
    fontSize: 'calc(var(--base) * 0.77)',
    fontWeight: 600,
    color: 'var(--theme-text)',
    textAlign: 'right' as const,
    flexShrink: 0,
  },
  tagTrack: {
    flex: 1,
    height: '6px',
    background: 'var(--theme-elevation-100)',
    overflow: 'hidden',
  },
  tagFill: {
    height: '100%',
    background: YELLOW,
    minWidth: '4px',
  },
  tagCount: {
    minWidth: 'calc(var(--base) * 1)',
    fontSize: 'calc(var(--base) * 0.6)',
    fontWeight: 700,
    color: YELLOW,
    textAlign: 'right' as const,
    flexShrink: 0,
  },
}
