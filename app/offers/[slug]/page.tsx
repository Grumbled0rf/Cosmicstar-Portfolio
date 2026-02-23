import MenuNav from '@/components/MenuNav'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createServerClient } from '@/lib/supabase'
import { Offer } from '@/lib/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import LeadForm from '@/components/LeadForm'

async function getOffer(slug: string): Promise<Offer | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching offer:', error)
    return null
  }
  return data as Offer
}

interface Props {
  params: Promise<{ slug: string }>
}

function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(amount)
}

export default async function OfferDetailPage({ params }: Props) {
  const { slug } = await params
  const offer = await getOffer(slug)

  if (!offer) {
    notFound()
  }

  const isExpired = offer.offer_valid_until && new Date(offer.offer_valid_until) < new Date()

  // Calculate days remaining
  const daysRemaining = offer.offer_valid_until
    ? Math.max(0, Math.ceil((new Date(offer.offer_valid_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <>
      <MenuNav />
      <div id="luxy" className="page-wrapper">
        <Navbar />

        {/* Hero Section */}
        <div className="section hero-section" style={{
          background: offer.hero_image_url
            ? `linear-gradient(rgba(26, 26, 46, 0.92), rgba(15, 52, 96, 0.95)), url(${offer.hero_image_url})`
            : 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #16213e 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '140px 0 100px',
          minHeight: '50vh',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0,102,204,0.15) 0%, transparent 50%)',
            pointerEvents: 'none'
          }} />

          <div className="wrapper" style={{ position: 'relative', zIndex: 1 }}>
            <Link href="/offers" style={{
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
              fontSize: '14px',
              transition: 'color 0.2s'
            }}>
              <span>&larr;</span> Back to All Offers
            </Link>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {offer.iia_exclusive && (
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffb800 100%)',
                  color: '#1a1a2e',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  IIA Exclusive Offer
                </div>
              )}
              {!isExpired && daysRemaining !== null && daysRemaining <= 7 && (
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(239, 68, 68, 0.9)',
                  color: '#fff',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {daysRemaining === 0 ? 'Ends Today!' : `${daysRemaining} Days Left`}
                </div>
              )}
            </div>

            {offer.subtitle && (
              <div style={{ color: '#4da6ff', marginBottom: '12px', fontSize: '16px', fontWeight: 500 }}>
                {offer.subtitle}
              </div>
            )}
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '24px',
              lineHeight: 1.2,
              maxWidth: '800px'
            }}>
              {offer.title}
            </h1>

            {offer.offer_valid_until && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: isExpired ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)',
                padding: '16px 24px',
                borderRadius: '12px',
                color: '#fff',
                marginTop: '16px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: isExpired ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  {isExpired ? '⏰' : '📅'}
                </div>
                <div>
                  <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '2px' }}>
                    {isExpired ? 'Offer Expired' : 'Valid Until'}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '16px' }}>
                    {new Date(offer.offer_valid_until).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="section" style={{ padding: '80px 0', background: '#f8f9fa' }}>
          <div className="wrapper">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(320px, 400px)',
              gap: '50px',
              alignItems: 'start'
            }}>
              {/* Left Column - Details */}
              <div>
                {/* Product Info */}
                {(offer.product_name || offer.product_description) && (
                  <div style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '40px',
                    marginBottom: '30px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      background: 'rgba(0,102,204,0.1)',
                      padding: '6px 16px',
                      borderRadius: '50px',
                      marginBottom: '20px'
                    }}>
                      <span style={{ color: '#0066cc', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        About This Offer
                      </span>
                    </div>
                    {offer.product_name && (
                      <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#1a1a2e', fontWeight: 700 }}>
                        {offer.product_name}
                      </h2>
                    )}
                    {offer.product_description && (
                      <p style={{ color: '#555', lineHeight: 1.8, fontSize: '16px' }}>
                        {offer.product_description}
                      </p>
                    )}
                  </div>
                )}

                {/* Features */}
                {offer.features && offer.features.length > 0 && (
                  <div style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '40px',
                    marginBottom: '30px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      background: 'rgba(16, 185, 129, 0.1)',
                      padding: '6px 16px',
                      borderRadius: '50px',
                      marginBottom: '20px'
                    }}>
                      <span style={{ color: '#10b981', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        What&apos;s Included
                      </span>
                    </div>
                    <h2 style={{ fontSize: '24px', marginBottom: '28px', color: '#1a1a2e', fontWeight: 700 }}>
                      Package Features
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                      {offer.features.map((feature, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '14px',
                          padding: '20px',
                          background: '#f8f9fa',
                          borderRadius: '12px',
                          transition: 'transform 0.2s'
                        }}>
                          <span style={{
                            color: '#fff',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            flexShrink: 0,
                            fontWeight: 700
                          }}>✓</span>
                          <div>
                            <strong style={{ color: '#1a1a2e', display: 'block', marginBottom: '4px', fontSize: '15px' }}>
                              {feature.title}
                            </strong>
                            {feature.description && (
                              <span style={{ color: '#666', fontSize: '14px', lineHeight: 1.6 }}>
                                {feature.description}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* IIA Info */}
                {offer.iia_exclusive && (
                  <div style={{
                    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                    borderRadius: '20px',
                    padding: '40px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    border: '2px solid #fcd34d'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        flexShrink: 0
                      }}>
                        🏆
                      </div>
                      <div>
                        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: '#92400e', fontWeight: 700 }}>
                          Exclusive for IIA Members
                        </h2>
                        <p style={{ color: '#78350f', lineHeight: 1.8, marginBottom: 0 }}>
                          This offer is exclusively available for members of the Indian Institute of Architects (IIA).
                          Please have your IIA membership ID ready when applying for this offer. Your membership will be verified before processing.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Pricing Sidebar & Form */}
              <div style={{ position: 'sticky', top: '100px' }}>
                {/* Pricing Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
                  borderRadius: '20px',
                  padding: '36px',
                  color: '#fff',
                  marginBottom: '24px',
                  boxShadow: '0 10px 40px rgba(26, 26, 46, 0.3)'
                }}>
                  <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: 600, opacity: 0.9 }}>
                    Offer Pricing
                  </h3>

                  {offer.pricing_info && (
                    <div style={{ marginBottom: '28px' }}>
                      {offer.pricing_info.original_price && (
                        <div style={{
                          fontSize: '20px',
                          textDecoration: 'line-through',
                          opacity: 0.5,
                          marginBottom: '8px'
                        }}>
                          {formatCurrency(offer.pricing_info.original_price, offer.pricing_info.currency)}
                        </div>
                      )}
                      {offer.pricing_info.offer_price && (
                        <div style={{ fontSize: '42px', fontWeight: 700, marginBottom: '12px', lineHeight: 1 }}>
                          {formatCurrency(offer.pricing_info.offer_price, offer.pricing_info.currency)}
                        </div>
                      )}
                      {offer.pricing_info.discount_percentage && (
                        <div style={{
                          display: 'inline-block',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 600
                        }}>
                          You Save {offer.pricing_info.discount_percentage}%
                        </div>
                      )}
                    </div>
                  )}

                  {!isExpired ? (
                    <div>
                      <p style={{ opacity: 0.8, marginBottom: '20px', lineHeight: 1.7, fontSize: '15px' }}>
                        Don&apos;t miss this exclusive offer. Fill out the form below to claim.
                      </p>
                      <a
                        href="#claim-form"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          width: '100%',
                          padding: '16px',
                          background: '#fff',
                          color: '#1a1a2e',
                          borderRadius: '10px',
                          fontWeight: 600,
                          fontSize: '15px',
                          textDecoration: 'none',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                      >
                        Claim This Offer
                        <span>→</span>
                      </a>
                    </div>
                  ) : (
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      padding: '20px',
                      borderRadius: '12px',
                      textAlign: 'center'
                    }}>
                      <p style={{ margin: 0, marginBottom: '12px', fontSize: '15px' }}>This offer has expired.</p>
                      <Link
                        href="/contact"
                        style={{ color: '#fff', fontWeight: 600, textDecoration: 'underline' }}
                      >
                        Contact us for current offers
                      </Link>
                    </div>
                  )}
                </div>

                {/* Inquiry Form */}
                {!isExpired && (
                  <div id="claim-form">
                    <LeadForm
                      formType="offer"
                      sourcePage={`/offers/${offer.slug}`}
                      offerSlug={offer.slug}
                      title="Claim This Offer"
                      subtitle="Fill out the form and our team will contact you to process your request."
                      buttonText="Submit Request"
                      showCompany={true}
                      showMessage={true}
                      showIiaId={offer.iia_exclusive}
                      variant="card"
                    />
                  </div>
                )}

                {/* Contact Card */}
                <div style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '28px',
                  marginTop: '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: '#f0f9ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      💬
                    </div>
                    <h3 style={{ margin: 0, fontSize: '17px', color: '#1a1a2e', fontWeight: 600 }}>
                      Need Help?
                    </h3>
                  </div>
                  <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '16px', fontSize: '14px' }}>
                    Have questions about this offer? Our team is here to assist you.
                  </p>
                  <Link href="/contact" style={{
                    color: '#0066cc',
                    fontWeight: 600,
                    fontSize: '14px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    Contact Support
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Offers Section */}
        <div className="section" style={{
          padding: '80px 0',
          background: '#fff',
          textAlign: 'center'
        }}>
          <div className="wrapper">
            <h2 style={{
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 700,
              color: '#1a1a2e',
              marginBottom: '16px'
            }}>
              Explore More Offers
            </h2>
            <p style={{
              color: '#666',
              marginBottom: '30px',
              maxWidth: '500px',
              margin: '0 auto 30px',
              fontSize: '16px',
              lineHeight: 1.7
            }}>
              Check out our other exclusive deals on BIM software and training programs.
            </p>
            <Link href="/offers" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 32px',
              background: '#1a1a2e',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '16px',
              textDecoration: 'none'
            }}>
              View All Offers
              <span>→</span>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
