import MenuNav from '@/components/MenuNav'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createServerClient } from '@/lib/supabase'
import { Webinar } from '@/lib/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getWebinar(id: string): Promise<Webinar | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('webinars')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching webinar:', error)
    return null
  }
  return data as Webinar
}

interface Props {
  params: { id: string }
}

export default async function WebinarDetailPage({ params }: Props) {
  const webinar = await getWebinar(params.id)

  if (!webinar) {
    notFound()
  }

  return (
    <>
      <MenuNav />
      <div id="luxy" className="page-wrapper">
        <Navbar />

        {/* Hero Section */}
        <div className="section hero-section" style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          padding: '120px 0 80px',
          minHeight: '50vh'
        }}>
          <div className="wrapper">
            <Link href="/webinars" style={{
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              &larr; Back to Webinars
            </Link>
            {webinar.subtitle && (
              <div className="subtitle" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
                {webinar.subtitle}
              </div>
            )}
            <h1 className="large-heading" style={{ color: '#fff', marginBottom: '20px' }}>
              {webinar.title}
            </h1>

            {/* Event Info */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '30px',
              marginTop: '30px'
            }}>
              {webinar.event_date && (
                <div style={{ color: '#fff' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '4px' }}>Date</div>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>
                    {new Date(webinar.event_date).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              )}
              {webinar.event_time && (
                <div style={{ color: '#fff' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '4px' }}>Time</div>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>{webinar.event_time}</div>
                </div>
              )}
              {webinar.venue_name && (
                <div style={{ color: '#fff' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '4px' }}>Venue</div>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>{webinar.venue_name}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="section" style={{ padding: '80px 0', background: '#f8f9fa' }}>
          <div className="wrapper">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '40px'
            }}>
              {/* Left Column - Details */}
              <div>
                {/* Description */}
                {webinar.description && (
                  <div style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '40px',
                    marginBottom: '30px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1a1a2e' }}>About This Event</h2>
                    <p style={{ color: '#555', lineHeight: '1.8', fontSize: '16px' }}>
                      {webinar.description}
                    </p>
                  </div>
                )}

                {/* Features */}
                {webinar.features && webinar.features.length > 0 && (
                  <div style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '40px',
                    marginBottom: '30px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1a1a2e' }}>What You&apos;ll Learn</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {webinar.features.map((feature, index) => (
                        <li key={index} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          marginBottom: '16px',
                          color: '#555'
                        }}>
                          <span style={{ color: '#1a1a2e', fontWeight: '600' }}>&#10003;</span>
                          <div>
                            <strong style={{ color: '#1a1a2e' }}>{feature.title}</strong>
                            {feature.description && <p style={{ margin: '4px 0 0', opacity: 0.8 }}>{feature.description}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* FAQ */}
                {webinar.faq && webinar.faq.length > 0 && (
                  <div style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '40px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1a1a2e' }}>Frequently Asked Questions</h2>
                    {webinar.faq.map((item, index) => (
                      <div key={index} style={{
                        borderBottom: index < webinar.faq!.length - 1 ? '1px solid #eee' : 'none',
                        paddingBottom: '20px',
                        marginBottom: '20px'
                      }}>
                        <h4 style={{ color: '#1a1a2e', marginBottom: '8px' }}>{item.question}</h4>
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>{item.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div>
                {/* Registration Card */}
                <div style={{
                  background: '#1a1a2e',
                  borderRadius: '16px',
                  padding: '40px',
                  color: '#fff',
                  marginBottom: '30px',
                  position: 'sticky',
                  top: '100px'
                }}>
                  <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Register Now</h3>
                  <p style={{ opacity: 0.8, marginBottom: '24px', lineHeight: '1.6' }}>
                    Don&apos;t miss this opportunity to learn from industry experts.
                  </p>
                  <Link href="/contact" className="button white-outline w-inline-block" style={{ width: '100%', textAlign: 'center' }}>
                    <div className="button-text">Register for Free</div>
                  </Link>
                </div>

                {/* Venue Card */}
                {webinar.venue_name && (
                  <div style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '30px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}>
                    <h3 style={{ marginBottom: '16px', fontSize: '18px', color: '#1a1a2e' }}>Venue Details</h3>
                    <p style={{ fontWeight: '600', color: '#1a1a2e', marginBottom: '8px' }}>{webinar.venue_name}</p>
                    {webinar.venue_address && (
                      <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>{webinar.venue_address}</p>
                    )}
                    {webinar.venue_map_url && (
                      <a
                        href={webinar.venue_map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#1a1a2e', fontWeight: '600' }}
                      >
                        View on Map &rarr;
                      </a>
                    )}
                  </div>
                )}

                {/* YouTube Video */}
                {webinar.youtube_embed_url && (
                  <div style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '30px',
                    marginTop: '30px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}>
                    <h3 style={{ marginBottom: '16px', fontSize: '18px', color: '#1a1a2e' }}>Watch Preview</h3>
                    <div style={{
                      position: 'relative',
                      paddingBottom: '56.25%',
                      height: 0,
                      overflow: 'hidden',
                      borderRadius: '8px'
                    }}>
                      <iframe
                        src={webinar.youtube_embed_url}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none'
                        }}
                        allowFullScreen
                        title="Webinar Preview"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
