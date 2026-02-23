import { createServerClient } from '@/lib/supabase'
import { Lead } from '@/lib/types'
import Link from 'next/link'

async function getStats() {
  const supabase = createServerClient()
  const [trainingsRes, webinarsRes, offersRes, leadsRes, activeTrainingsRes, activeOffersRes] = await Promise.all([
    supabase.from('trainings').select('id', { count: 'exact' }),
    supabase.from('webinars').select('id', { count: 'exact' }),
    supabase.from('offers').select('id', { count: 'exact' }),
    supabase.from('leads').select('id', { count: 'exact' }),
    supabase.from('trainings').select('id', { count: 'exact' }).eq('is_active', true),
    supabase.from('offers').select('id', { count: 'exact' }).eq('is_active', true),
  ])

  return {
    trainings: trainingsRes.count || 0,
    webinars: webinarsRes.count || 0,
    offers: offersRes.count || 0,
    leads: leadsRes.count || 0,
    activeTrainings: activeTrainingsRes.count || 0,
    activeOffers: activeOffersRes.count || 0,
  }
}

async function getLeadsByType() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('leads')
    .select('form_type')

  const counts = {
    training: 0,
    webinar: 0,
    offer: 0,
    contact: 0,
  }

  data?.forEach((lead) => {
    if (lead.form_type in counts) {
      counts[lead.form_type as keyof typeof counts]++
    }
  })

  return counts
}

async function getRecentLeads(): Promise<Lead[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching recent leads:', error)
    return []
  }
  return (data as Lead[]) || []
}

async function getLeadsThisWeek() {
  const supabase = createServerClient()
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const { count } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', oneWeekAgo.toISOString())

  return count || 0
}

async function getLeadsToday() {
  const supabase = createServerClient()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', today.toISOString())

  return count || 0
}

async function getLeadsLastWeek() {
  const supabase = createServerClient()
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const { count } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', twoWeeksAgo.toISOString())
    .lt('created_at', oneWeekAgo.toISOString())

  return count || 0
}

async function getLeadsThisMonth() {
  const supabase = createServerClient()
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', startOfMonth.toISOString())

  return count || 0
}

async function getUpcomingWebinars() {
  const supabase = createServerClient()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data } = await supabase
    .from('webinars')
    .select('id, title, event_date, event_time')
    .eq('is_active', true)
    .gte('event_date', today.toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .limit(3)

  return data || []
}

export default async function AdminDashboard() {
  const [stats, leadsByType, recentLeads, leadsThisWeek, leadsToday, leadsLastWeek, leadsThisMonth, upcomingWebinars] = await Promise.all([
    getStats(),
    getLeadsByType(),
    getRecentLeads(),
    getLeadsThisWeek(),
    getLeadsToday(),
    getLeadsLastWeek(),
    getLeadsThisMonth(),
    getUpcomingWebinars(),
  ])

  const totalLeadsByType = Object.values(leadsByType).reduce((a, b) => a + b, 0)
  const weeklyGrowth = leadsLastWeek > 0 ? Math.round(((leadsThisWeek - leadsLastWeek) / leadsLastWeek) * 100) : leadsThisWeek > 0 ? 100 : 0

  const typeColors = {
    training: '#0066cc',
    webinar: '#8b5cf6',
    offer: '#f59e0b',
    contact: '#10b981',
  }

  const typeLabels = {
    training: 'Training',
    webinar: 'Webinar',
    offer: 'Offer',
    contact: 'Contact',
  }

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div>
      {/* Welcome Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: '20px',
        padding: '32px 40px',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '40%',
          background: 'radial-gradient(circle at 100% 50%, rgba(0,102,204,0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 8px', fontSize: '14px' }}>
                {currentDate}
              </p>
              <h1 style={{ color: '#fff', margin: '0 0 8px', fontSize: '28px', fontWeight: 700 }}>
                Welcome to Admin Dashboard
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '15px' }}>
                Here&apos;s what&apos;s happening with your CMS today.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/" target="_blank" style={{
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <span>🌐</span> View Site
              </Link>
              <Link href="/admin/leads" style={{
                padding: '12px 20px',
                background: '#0066cc',
                color: '#fff',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>📋</span> All Leads
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
        marginBottom: '28px'
      }}>
        {/* Total Leads */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, rgba(0,102,204,0.1) 0%, transparent 70%)',
            borderRadius: '0 0 0 80px'
          }} />
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            📊
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Total Leads</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e' }}>{stats.leads}</div>
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#10b981', fontWeight: 500 }}>
            +{leadsToday} today
          </div>
        </div>

        {/* This Week */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          position: 'relative'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            📈
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>This Week</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e' }}>{leadsThisWeek}</div>
          <div style={{
            marginTop: '8px',
            fontSize: '12px',
            color: weeklyGrowth >= 0 ? '#10b981' : '#ef4444',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {weeklyGrowth >= 0 ? '↑' : '↓'} {Math.abs(weeklyGrowth)}% vs last week
          </div>
        </div>

        {/* This Month */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            📅
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>This Month</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e' }}>{leadsThisMonth}</div>
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
            leads captured
          </div>
        </div>

        {/* Active Programs */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            🎓
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Active Programs</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e' }}>{stats.activeTrainings}</div>
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
            of {stats.trainings} total
          </div>
        </div>

        {/* Active Offers */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            🏷️
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Active Offers</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e' }}>{stats.activeOffers}</div>
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
            of {stats.offers} total
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '28px'
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Recent Leads */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#1a1a2e' }}>Recent Leads</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>Latest form submissions</p>
              </div>
              <Link href="/admin/leads" style={{
                padding: '8px 16px',
                background: '#f1f5f9',
                color: '#1a1a2e',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500
              }}>
                View All →
              </Link>
            </div>

            {recentLeads.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentLeads.map((lead) => (
                  <div key={lead.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 20px',
                    background: '#f8fafc',
                    borderRadius: '14px',
                    gap: '16px',
                    transition: 'background 0.2s'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${typeColors[lead.form_type as keyof typeof typeColors] || '#666'} 0%, ${typeColors[lead.form_type as keyof typeof typeColors] || '#666'}dd 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '18px',
                      fontWeight: 600,
                      flexShrink: 0
                    }}>
                      {(lead.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: '#1a1a2e', marginBottom: '4px', fontSize: '15px' }}>
                        {lead.name || 'Unknown'}
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {lead.email}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        background: `${typeColors[lead.form_type as keyof typeof typeColors]}15`,
                        color: typeColors[lead.form_type as keyof typeof typeColors]
                      }}>
                        {lead.form_type}
                      </span>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
                        {new Date(lead.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                padding: '48px',
                textAlign: 'center',
                background: '#f8fafc',
                borderRadius: '14px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
                <p style={{ margin: 0, color: '#64748b' }}>No leads yet. Form submissions will appear here.</p>
              </div>
            )}
          </div>

          {/* Content Overview */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
          }}>
            <h2 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: 600, color: '#1a1a2e' }}>
              Content Overview
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <Link href="/admin/training" style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4ff 100%)',
                borderRadius: '16px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid #e0eeff',
                transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎓</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#0066cc', marginBottom: '4px' }}>{stats.trainings}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Training Programs</div>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#0066cc', fontWeight: 500 }}>Manage →</div>
              </Link>

              <Link href="/admin/webinars" style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                borderRadius: '16px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid #e9d5ff',
                transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📹</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#8b5cf6', marginBottom: '4px' }}>{stats.webinars}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Webinars</div>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#8b5cf6', fontWeight: 500 }}>Manage →</div>
              </Link>

              <Link href="/admin/offers" style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                borderRadius: '16px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid #fde68a',
                transition: 'transform 0.2s'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏷️</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#f59e0b', marginBottom: '4px' }}>{stats.offers}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Offers</div>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#f59e0b', fontWeight: 500 }}>Manage →</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Leads by Source */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
          }}>
            <h2 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: 600, color: '#1a1a2e' }}>
              Leads by Source
            </h2>

            {totalLeadsByType > 0 ? (
              <>
                {/* Donut-style visualization */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: `conic-gradient(
                      ${typeColors.training} 0deg ${(leadsByType.training / totalLeadsByType) * 360}deg,
                      ${typeColors.webinar} ${(leadsByType.training / totalLeadsByType) * 360}deg ${((leadsByType.training + leadsByType.webinar) / totalLeadsByType) * 360}deg,
                      ${typeColors.offer} ${((leadsByType.training + leadsByType.webinar) / totalLeadsByType) * 360}deg ${((leadsByType.training + leadsByType.webinar + leadsByType.offer) / totalLeadsByType) * 360}deg,
                      ${typeColors.contact} ${((leadsByType.training + leadsByType.webinar + leadsByType.offer) / totalLeadsByType) * 360}deg 360deg
                    )`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a2e' }}>{totalLeadsByType}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Total</div>
                    </div>
                  </div>
                </div>

                {/* Stats List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(Object.keys(leadsByType) as Array<keyof typeof leadsByType>).map((type) => {
                    const percentage = totalLeadsByType > 0 ? Math.round((leadsByType[type] / totalLeadsByType) * 100) : 0
                    return (
                      <div key={type} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: '#f8fafc',
                        borderRadius: '10px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '4px',
                            background: typeColors[type]
                          }} />
                          <span style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a2e' }}>
                            {typeLabels[type]}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e' }}>
                            {leadsByType[type]}
                          </span>
                          <span style={{
                            fontSize: '12px',
                            color: '#64748b',
                            background: '#f1f5f9',
                            padding: '2px 8px',
                            borderRadius: '4px'
                          }}>
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
                No lead data yet
              </div>
            )}
          </div>

          {/* Upcoming Webinars */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#1a1a2e' }}>
                Upcoming Events
              </h2>
              <Link href="/admin/webinars" style={{ color: '#8b5cf6', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
                View All →
              </Link>
            </div>

            {upcomingWebinars.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {upcomingWebinars.map((webinar: { id: string; title: string; event_date: string; event_time: string }) => (
                  <div key={webinar.id} style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                    borderRadius: '12px',
                    border: '1px solid #e9d5ff'
                  }}>
                    <div style={{ fontWeight: 600, color: '#1a1a2e', marginBottom: '8px', fontSize: '14px' }}>
                      {webinar.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#64748b' }}>
                      <span>📅 {webinar.event_date ? new Date(webinar.event_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'TBA'}</span>
                      {webinar.event_time && <span>🕐 {webinar.event_time}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px', color: '#64748b', background: '#f8fafc', borderRadius: '12px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📅</div>
                <div style={{ fontSize: '13px' }}>No upcoming events</div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 600, color: '#fff' }}>
              Quick Actions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/admin/training/new" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background 0.2s'
              }}>
                <span style={{ fontSize: '18px' }}>➕</span>
                Add Training Program
              </Link>
              <Link href="/admin/webinars/new" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background 0.2s'
              }}>
                <span style={{ fontSize: '18px' }}>📹</span>
                Schedule Webinar
              </Link>
              <Link href="/admin/offers/new" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background 0.2s'
              }}>
                <span style={{ fontSize: '18px' }}>🏷️</span>
                Create New Offer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
