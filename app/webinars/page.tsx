import PageNavbar from '@/components/PageNavbar'
import PageFooter from '@/components/PageFooter'
import { createServerClient } from '@/lib/supabase'
import { Webinar } from '@/lib/types'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

async function getWebinars(): Promise<Webinar[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('webinars')
    .select('*')
    .eq('is_active', true)
    .order('event_date', { ascending: true })

  if (error) {
    console.error('Error fetching webinars:', error)
    return []
  }
  return (data as Webinar[]) || []
}

async function getWebinarStats() {
  const supabase = createServerClient()
  const { count: totalWebinars } = await supabase
    .from('webinars')
    .select('*', { count: 'exact', head: true })

  return {
    totalWebinars: totalWebinars || 0
  }
}

export default async function WebinarsPage() {
  const webinars = await getWebinars()
  const stats = await getWebinarStats()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingWebinars = webinars.filter(w => {
    if (!w.event_date) return true
    return new Date(w.event_date) >= today
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <PageNavbar />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        paddingTop: '160px',
        paddingBottom: '140px',
        position: 'relative',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 70% 30%, rgba(139,92,246,0.2) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0,102,204,0.15) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        {/* Decorative Grid Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px', position: 'relative', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '32px'
              }}>
                <div style={{ width: '40px', height: '3px', background: '#8b5cf6', borderRadius: '2px' }} />
                <span style={{ color: '#a78bfa', fontSize: '14px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
                  Live Events
                </span>
              </div>
              <h1 style={{
                fontSize: 'clamp(48px, 5vw, 68px)',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '28px',
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}>
                Learn from Industry<br />
                <span style={{ color: '#a78bfa' }}>Experts</span>
              </h1>
              <p style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '18px',
                lineHeight: 1.8,
                marginBottom: '44px',
                maxWidth: '520px'
              }}>
                Join our live webinars and workshops to learn about the latest in BIM technology, architectural design, and industry best practices.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
                <a href="#upcoming" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#8b5cf6',
                  color: '#fff',
                  padding: '18px 36px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '16px',
                  boxShadow: '0 4px 24px rgba(139,92,246,0.4)',
                  transition: 'transform 0.2s'
                }}>
                  View Events
                  <span style={{ fontSize: '18px' }}>→</span>
                </a>
                <a href="#register" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  padding: '18px 36px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '16px',
                  border: '2px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  Register Now
                </a>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(139,92,246,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    📹
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>{stats.totalWebinars}+</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Webinars</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(16,185,129,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    👥
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>500+</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Participants</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div style={{ position: 'relative' }}>
              {/* Main Image Container */}
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <img
                  src="/images/11_solibri_BIM_talk_communication-landscape.avif"
                  alt="Live Webinars"
                  style={{
                    width: '100%',
                    height: '420px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {/* Overlay Gradient */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(26,26,46,0.8) 100%)',
                  pointerEvents: 'none'
                }} />
              </div>

              {/* Floating Card - Live Badge */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: '#fff',
                borderRadius: '16px',
                padding: '20px 24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  🔴
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: '14px' }}>Live Sessions</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Interactive Learning</div>
                </div>
              </div>

              {/* Floating Card - Free Badge */}
              <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '-30px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '16px',
                padding: '20px 24px',
                boxShadow: '0 20px 40px rgba(16,185,129,0.3)',
                color: '#fff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 700 }}>Free</div>
                  <div style={{ fontSize: '13px', lineHeight: 1.3, opacity: 0.9 }}>Most<br />Sessions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: '#fff', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 8px 50px rgba(0,0,0,0.1)',
            marginTop: '-60px',
            overflow: 'hidden'
          }}>
            {[
              { value: `${stats.totalWebinars}+`, label: 'Webinars Conducted', color: '#8b5cf6' },
              { value: '500+', label: 'Participants', color: '#10b981' },
              { value: '20+', label: 'Expert Speakers', color: '#0066cc' },
              { value: 'Free', label: 'Most Sessions', color: '#f59e0b' }
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '44px 28px',
                textAlign: 'center',
                borderRight: i < 3 ? '1px solid #f0f0f0' : 'none'
              }}>
                <div style={{ fontSize: '48px', fontWeight: 700, color: stat.color, marginBottom: '8px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinars Section */}
      <section id="upcoming" style={{ padding: '120px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(139,92,246,0.1)',
              padding: '10px 24px',
              borderRadius: '50px',
              marginBottom: '20px'
            }}>
              <span style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                Upcoming Events
              </span>
            </div>
            <h2 style={{
              fontSize: '46px',
              fontWeight: 700,
              color: '#1a1a2e',
              marginBottom: '18px'
            }}>
              Join Our Next Webinar
            </h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', fontSize: '17px', lineHeight: 1.7 }}>
              Don&apos;t miss out on valuable learning opportunities. Register now and get notified.
            </p>
          </div>

          {upcomingWebinars.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              alignItems: 'stretch'
            }}>
              {upcomingWebinars.map((webinar, index) => (
                <div key={webinar.id} style={{
                  background: '#fff',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}>
                  {/* Date Header */}
                  <div style={{
                    background: index === 0
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                      : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    padding: '32px',
                    color: '#fff',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    {index === 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: '#10b981',
                        padding: '6px 14px',
                        borderRadius: '50px',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Next Event
                      </div>
                    )}
                    <div style={{ fontSize: '13px', textTransform: 'uppercase', opacity: 0.85, marginBottom: '8px', fontWeight: 500 }}>
                      {webinar.event_date ? new Date(webinar.event_date).toLocaleDateString('en-IN', { weekday: 'long' }) : 'Date TBA'}
                    </div>
                    <div style={{ fontSize: '56px', fontWeight: 700, lineHeight: '1' }}>
                      {webinar.event_date ? new Date(webinar.event_date).getDate() : '--'}
                    </div>
                    <div style={{ fontSize: '16px', marginTop: '8px', fontWeight: 500, opacity: 0.9 }}>
                      {webinar.event_date ? new Date(webinar.event_date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : ''}
                    </div>
                    {webinar.event_time && (
                      <div style={{
                        marginTop: '16px',
                        padding: '8px 18px',
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        display: 'inline-block'
                      }}>
                        🕐 {webinar.event_time}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      marginBottom: '12px',
                      color: '#1a1a2e',
                      lineHeight: 1.3
                    }}>
                      {webinar.title}
                    </h3>
                    {webinar.subtitle && (
                      <div style={{
                        color: '#8b5cf6',
                        marginBottom: '16px',
                        fontSize: '15px',
                        fontWeight: 600
                      }}>
                        {webinar.subtitle}
                      </div>
                    )}
                    <div style={{ flex: 1, minHeight: '60px' }}>
                      {webinar.description && (
                        <p style={{
                          color: '#64748b',
                          lineHeight: 1.7,
                          fontSize: '14px',
                          margin: 0
                        }}>
                          {webinar.description}
                        </p>
                      )}
                    </div>

                    {webinar.venue_name && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginTop: '20px',
                        padding: '14px 16px',
                        background: '#f8fafc',
                        borderRadius: '12px'
                      }}>
                        <span style={{ fontSize: '18px' }}>📍</span>
                        <div>
                          <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '2px', fontWeight: 500, textTransform: 'uppercase' }}>Venue</div>
                          <div style={{ fontSize: '14px', color: '#1a1a2e', fontWeight: 500 }}>{webinar.venue_name}</div>
                        </div>
                      </div>
                    )}

                    {/* Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '14px',
                      marginTop: '24px',
                      paddingTop: '24px',
                      borderTop: '1px solid #f0f0f0'
                    }}>
                      <a
                        href="#register"
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '16px 20px',
                          background: '#fff',
                          color: '#1a1a2e',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          fontWeight: 600,
                          fontSize: '14px',
                          border: '2px solid #e2e8f0',
                          transition: 'all 0.2s'
                        }}
                      >
                        Learn More
                      </a>
                      <Link
                        href={`/webinars/${webinar.id}`}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '16px 20px',
                          background: '#8b5cf6',
                          color: '#fff',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          fontWeight: 600,
                          fontSize: '14px',
                          boxShadow: '0 4px 14px rgba(139,92,246,0.3)',
                          transition: 'all 0.2s'
                        }}
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '100px 40px',
              background: '#fff',
              borderRadius: '24px',
              boxShadow: '0 4px 30px rgba(0,0,0,0.06)'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>📅</div>
              <h3 style={{ fontSize: '26px', marginBottom: '12px', color: '#1a1a2e', fontWeight: 700 }}>
                No Upcoming Webinars
              </h3>
              <p style={{ color: '#64748b', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px', fontSize: '16px' }}>
                We&apos;re planning new webinars. Register below to get notified about upcoming events.
              </p>
              <a href="#register" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                background: '#8b5cf6',
                color: '#fff',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(139,92,246,0.3)'
              }}>
                Get Notified
              </a>
            </div>
          )}
        </div>
      </section>

      {/* What You'll Gain Section */}
      <section style={{ padding: '120px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(139,92,246,0.1)',
                padding: '10px 24px',
                borderRadius: '50px',
                marginBottom: '20px'
              }}>
                <span style={{ color: '#8b5cf6', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Why Join Us
                </span>
              </div>
              <h2 style={{
                fontSize: '42px',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '24px',
                lineHeight: 1.2
              }}>
                What You&apos;ll Gain from Our Webinars
              </h2>
              <p style={{ color: '#64748b', fontSize: '17px', lineHeight: 1.8, marginBottom: '40px' }}>
                Join our expert-led sessions and gain valuable insights, practical knowledge, and industry connections.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { icon: '🎓', title: 'Expert Knowledge', desc: 'Learn from industry professionals with real-world experience' },
                  { icon: '💬', title: 'Live Q&A', desc: 'Get your questions answered directly by experts' },
                  { icon: '📜', title: 'Certificates', desc: 'Receive participation certificates for your portfolio' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1a1a2e', marginBottom: '6px', fontSize: '17px' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              {[
                { icon: '🔄', title: 'Latest Trends', description: 'Stay updated with newest technologies' },
                { icon: '🤝', title: 'Networking', description: 'Connect with industry professionals' },
                { icon: '📹', title: 'Recordings', description: 'Access session recordings anytime' },
                { icon: '🆓', title: 'Free Access', description: 'Most sessions are completely free' }
              ].map((item, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid #e9d5ff',
                  transition: 'transform 0.2s'
                }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    marginBottom: '18px',
                    boxShadow: '0 4px 12px rgba(139,92,246,0.1)'
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: '#1a1a2e'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    lineHeight: 1.6,
                    fontSize: '14px',
                    margin: 0
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(139,92,246,0.15) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(16,185,129,0.2)',
                padding: '10px 24px',
                borderRadius: '50px',
                marginBottom: '24px'
              }}>
                <span style={{ color: '#34d399', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Register Now
                </span>
              </div>
              <h2 style={{
                fontSize: '46px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '24px',
                lineHeight: 1.15
              }}>
                Get Notified About Upcoming Events
              </h2>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '17px',
                lineHeight: 1.8,
                marginBottom: '40px'
              }}>
                Register your interest and we&apos;ll notify you about upcoming webinars,
                workshops, and exclusive learning opportunities.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  'Free registration for most events',
                  'Early access to premium webinars',
                  'Exclusive content for registered members',
                  'Certificate of participation'
                ].map((text, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: '#fff',
                      fontWeight: 700
                    }}>
                      ✓
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: 'rgba(139,92,246,0.2)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px'
                }}>
                  📧
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '4px', fontWeight: 500 }}>Email Us</div>
                  <a href="mailto:sathish@mycosmicstar.com" style={{ color: '#fff', textDecoration: 'none', fontSize: '17px', fontWeight: 600 }}>
                    sathish@mycosmicstar.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <LeadForm
                formType="webinar"
                sourcePage="/webinars"
                title="Register for Updates"
                subtitle="Get notified about upcoming webinars and events"
                buttonText="Register Now"
                showCompany={true}
                showMessage={false}
                variant="card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 0',
        background: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#1a1a2e',
            marginBottom: '16px'
          }}>
            Want to Host a Webinar with Us?
          </h2>
          <p style={{
            color: '#64748b',
            marginBottom: '32px',
            fontSize: '17px',
            lineHeight: 1.7
          }}>
            Partner with CosmicStar to organize webinars and training sessions for your organization.
          </p>
          <Link href="/contact" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '18px 36px',
            background: '#1a1a2e',
            color: '#fff',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '16px',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(26,26,46,0.2)'
          }}>
            Get in Touch
            <span>→</span>
          </Link>
        </div>
      </section>

      <PageFooter />
    </div>
  )
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
