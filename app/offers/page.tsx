import PageNavbar from '@/components/PageNavbar'
import PageFooter from '@/components/PageFooter'
import { createServerClient } from '@/lib/supabase'
import { Offer } from '@/lib/types'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

async function getOffers(): Promise<Offer[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching offers:', error)
    return []
  }
  return (data as Offer[]) || []
}

async function getOfferStats() {
  const supabase = createServerClient()
  const { count: totalOffers } = await supabase
    .from('offers')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  return {
    totalOffers: totalOffers || 0
  }
}

function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount)
}

export default async function OffersPage() {
  const offers = await getOffers()
  const stats = await getOfferStats()

  const now = new Date()
  const activeOffers = offers.filter(o => !o.offer_valid_until || new Date(o.offer_valid_until) >= now)
  const expiredOffers = offers.filter(o => o.offer_valid_until && new Date(o.offer_valid_until) < now)

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <PageNavbar />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        paddingTop: '140px',
        paddingBottom: '120px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(245,158,11,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0,102,204,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{
              display: 'inline-block',
              background: '#f59e0b',
              padding: '10px 24px',
              borderRadius: '50px',
              marginBottom: '28px'
            }}>
              <span style={{ color: '#1a1a2e', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                Special Deals & Discounts
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(44px, 6vw, 64px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '24px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              Exclusive <span style={{ color: '#fcd34d' }}>Offers</span>
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '18px',
              lineHeight: 1.8,
              marginBottom: '40px',
              maxWidth: '600px'
            }}>
              Take advantage of our exclusive offers on BIM software licenses, training programs, and professional services. Limited time deals for architects and design professionals.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#offers" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                background: '#f59e0b',
                color: '#1a1a2e',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '16px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
                transition: 'transform 0.2s'
              }}>
                View All Offers
                <span style={{ fontSize: '18px' }}>→</span>
              </a>
              <a href="#inquiry" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                background: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'border-color 0.2s'
              }}>
                Custom Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        background: '#fff',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 8px 50px rgba(0,0,0,0.1)',
            marginTop: '-60px',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '44px 28px',
              textAlign: 'center',
              borderRight: '1px solid #f0f0f0'
            }}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#f59e0b', marginBottom: '8px' }}>
                {stats.totalOffers}
              </div>
              <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Active Offers</div>
            </div>
            <div style={{
              padding: '44px 28px',
              textAlign: 'center',
              borderRight: '1px solid #f0f0f0'
            }}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#10b981', marginBottom: '8px' }}>
                50%
              </div>
              <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Max Savings</div>
            </div>
            <div style={{
              padding: '44px 28px',
              textAlign: 'center',
              borderRight: '1px solid #f0f0f0'
            }}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#0066cc', marginBottom: '8px' }}>
                IIA
              </div>
              <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Exclusive Deals</div>
            </div>
            <div style={{
              padding: '44px 28px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#8b5cf6', marginBottom: '8px' }}>
                24/7
              </div>
              <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Offers Section */}
      <section id="offers" style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(245,158,11,0.15)',
              padding: '10px 24px',
              borderRadius: '50px',
              marginBottom: '20px'
            }}>
              <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                Current Deals
              </span>
            </div>
            <h2 style={{
              fontSize: '46px',
              fontWeight: 700,
              color: '#1a1a2e',
              marginBottom: '18px'
            }}>
              Active Offers
            </h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', fontSize: '17px', lineHeight: 1.7 }}>
              Don&apos;t miss out on these limited-time deals. Click on any offer to learn more and claim.
            </p>
          </div>

          {activeOffers.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '32px',
              alignItems: 'stretch'
            }}>
              {activeOffers.map((offer, index) => {
                const daysRemaining = offer.offer_valid_until
                  ? Math.max(0, Math.ceil((new Date(offer.offer_valid_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
                  : null

                return (
                  <div key={offer.id} style={{
                    background: '#fff',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
                    border: offer.iia_exclusive ? '3px solid #fcd34d' : 'none',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}>
                    {/* Header */}
                    <div style={{
                      background: offer.iia_exclusive
                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                        : 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
                      padding: '36px 32px',
                      color: '#fff',
                      position: 'relative',
                      minHeight: '160px'
                    }}>
                      {/* Badges */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{
                            background: 'rgba(255,255,255,0.2)',
                            color: '#fff',
                            padding: '6px 14px',
                            borderRadius: '50px',
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Offer {index + 1}
                          </span>
                          {offer.iia_exclusive && (
                            <span style={{
                              background: 'rgba(255,255,255,0.25)',
                              color: '#fff',
                              padding: '6px 14px',
                              borderRadius: '50px',
                              fontSize: '11px',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              IIA Exclusive
                            </span>
                          )}
                        </div>
                        {daysRemaining !== null && daysRemaining <= 7 && (
                          <span style={{
                            background: '#ef4444',
                            padding: '6px 14px',
                            borderRadius: '50px',
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase'
                          }}>
                            {daysRemaining === 0 ? 'Ends Today!' : `${daysRemaining} Days Left`}
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '26px', marginBottom: '10px', fontWeight: 700, lineHeight: 1.25 }}>
                        {offer.title}
                      </h3>
                      {offer.product_name && (
                        <div style={{ opacity: 0.9, fontSize: '15px', fontWeight: 500 }}>{offer.product_name}</div>
                      )}
                    </div>

                    {/* Body */}
                    <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {offer.subtitle && (
                        <p style={{ color: '#64748b', marginBottom: '24px', lineHeight: 1.75, fontSize: '15px' }}>
                          {offer.subtitle}
                        </p>
                      )}

                      {/* Pricing */}
                      {offer.pricing_info && offer.pricing_info.offer_price && (
                        <div style={{
                          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                          borderRadius: '16px',
                          padding: '24px',
                          marginBottom: '24px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px' }}>
                            {offer.pricing_info.original_price && (
                              <span style={{
                                textDecoration: 'line-through',
                                color: '#94a3b8',
                                fontSize: '16px'
                              }}>
                                {formatCurrency(offer.pricing_info.original_price, offer.pricing_info.currency)}
                              </span>
                            )}
                            <span style={{ fontSize: '32px', fontWeight: 700, color: '#1a1a2e' }}>
                              {formatCurrency(offer.pricing_info.offer_price, offer.pricing_info.currency)}
                            </span>
                            {offer.pricing_info.discount_percentage && (
                              <span style={{
                                background: '#10b981',
                                color: '#fff',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: 700
                              }}>
                                {offer.pricing_info.discount_percentage}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {offer.offer_valid_until && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '14px',
                          color: '#64748b',
                          marginBottom: '24px'
                        }}>
                          <span style={{ fontSize: '18px' }}>📅</span>
                          Valid until{' '}
                          {new Date(offer.offer_valid_until).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      )}

                      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f0f0f0' }}>
                        <div style={{ display: 'flex', gap: '14px' }}>
                          <a
                            href="#inquiry"
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
                              fontSize: '15px',
                              border: '2px solid #e2e8f0',
                              transition: 'all 0.2s'
                            }}
                          >
                            Get Quote
                          </a>
                          <Link
                            href={`/offers/${offer.slug}`}
                            style={{
                              flex: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '16px 20px',
                              background: '#0066cc',
                              color: '#fff',
                              borderRadius: '12px',
                              textDecoration: 'none',
                              fontWeight: 600,
                              fontSize: '15px',
                              boxShadow: '0 4px 14px rgba(0,102,204,0.3)',
                              transition: 'all 0.2s'
                            }}
                          >
                            Claim Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '100px 40px',
              background: '#fff',
              borderRadius: '24px',
              boxShadow: '0 4px 30px rgba(0,0,0,0.06)'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>🏷️</div>
              <h3 style={{ fontSize: '26px', marginBottom: '12px', color: '#1a1a2e', fontWeight: 700 }}>
                No Active Offers
              </h3>
              <p style={{ color: '#64748b', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px', fontSize: '16px' }}>
                We&apos;re preparing new offers. Submit your inquiry below to get notified.
              </p>
              <a href="#inquiry" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                background: '#0066cc',
                color: '#fff',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,102,204,0.3)'
              }}>
                Request Custom Quote
              </a>
            </div>
          )}

          {/* Expired Offers Notice */}
          {expiredOffers.length > 0 && (
            <div style={{
              marginTop: '56px',
              padding: '24px 32px',
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>
                  <strong style={{ color: '#1a1a2e' }}>{expiredOffers.length} offer{expiredOffers.length > 1 ? 's have' : ' has'} expired.</strong>{' '}
                  Contact us for similar deals or custom pricing.
                </p>
              </div>
              <Link href="/contact" style={{
                padding: '12px 24px',
                background: '#f1f5f9',
                color: '#1a1a2e',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'background 0.2s'
              }}>
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '120px 0', background: '#fff' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(0,102,204,0.1)',
                padding: '10px 24px',
                borderRadius: '50px',
                marginBottom: '20px'
              }}>
                <span style={{ color: '#0066cc', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Why Choose Us
                </span>
              </div>
              <h2 style={{
                fontSize: '42px',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '24px',
                lineHeight: 1.2
              }}>
                Benefits of Our Offers
              </h2>
              <p style={{ color: '#64748b', fontSize: '17px', lineHeight: 1.8, marginBottom: '40px' }}>
                Get the best value with genuine software licenses and professional support from authorized partners.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              {[
                {
                  icon: '✅',
                  title: 'Authorized Reseller',
                  description: 'Genuine licenses with full manufacturer support'
                },
                {
                  icon: '💰',
                  title: 'Best Prices',
                  description: 'Competitive pricing with price match guarantee'
                },
                {
                  icon: '🎓',
                  title: 'Free Training',
                  description: 'Complimentary training with select offers'
                },
                {
                  icon: '🛡️',
                  title: 'Full Support',
                  description: 'Technical support and warranty included'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  background: '#f8fafc',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    marginBottom: '18px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{
                    fontSize: '17px',
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

      {/* Inquiry Form Section */}
      <section id="inquiry" style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(245,158,11,0.12) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 32px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '100px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(245,158,11,0.2)',
                padding: '10px 24px',
                borderRadius: '50px',
                marginBottom: '24px'
              }}>
                <span style={{ color: '#fcd34d', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Custom Quote
                </span>
              </div>
              <h2 style={{
                fontSize: '46px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '24px',
                lineHeight: 1.15
              }}>
                Need a Customized Offer?
              </h2>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '17px',
                lineHeight: 1.8,
                marginBottom: '40px'
              }}>
                Looking for bulk licenses, enterprise solutions, or a specific software package?
                Let us know your requirements and we&apos;ll create a custom offer for you.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  'Volume discounts for 5+ licenses',
                  'Enterprise-level support packages',
                  'Custom training solutions',
                  'Flexible payment options'
                ].map((text, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#f59e0b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      color: '#1a1a2e',
                      fontWeight: 700
                    }}>
                      ✓
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <LeadForm
                formType="offer"
                sourcePage="/offers"
                title="Request Custom Quote"
                subtitle="Tell us about your requirements and we'll get back to you with a personalized offer."
                buttonText="Submit Inquiry"
                showCompany={true}
                showMessage={true}
                variant="card"
              />
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  )
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
