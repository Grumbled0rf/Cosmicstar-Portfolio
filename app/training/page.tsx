import { createServerClient } from '@/lib/supabase'
import { Training } from '@/lib/types'
import PageNavbar from '@/components/PageNavbar'
import PageFooter from '@/components/PageFooter'
import LeadForm from '@/components/LeadForm'

export const metadata = {
  title: 'Training Programs - Cosmicstar Technology',
  description: 'Comprehensive BIM training programs designed for architects, engineers, and construction professionals.',
}

async function getTrainings(): Promise<Training[]> {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('trainings')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching trainings:', error)
    return []
  }
  return (data as Training[]) || []
}

async function getTrainingCount() {
  const supabase = createServerClient()
  const { count } = await supabase
    .from('trainings')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
  return count || 0
}

export default async function TrainingPage() {
  const trainings = await getTrainings()
  const trainingCount = await getTrainingCount()

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
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
          background: 'radial-gradient(circle at 70% 30%, rgba(0,102,204,0.2) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(99,102,241,0.15) 0%, transparent 50%)',
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
                <div style={{ width: '40px', height: '3px', background: '#4da6ff', borderRadius: '2px' }} />
                <span style={{ color: '#4da6ff', fontSize: '14px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
                  Learn & Grow
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
                Professional BIM<br />
                <span style={{ color: '#4da6ff' }}>Training Programs</span>
              </h1>
              <p style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '18px',
                lineHeight: 1.8,
                marginBottom: '44px',
                maxWidth: '520px'
              }}>
                Master Archicad and BIM workflows with our comprehensive training programs. Designed for architects, designers, and construction professionals.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
                <a href="#programs" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#0066cc',
                  color: '#fff',
                  padding: '18px 36px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '16px',
                  boxShadow: '0 4px 24px rgba(0,102,204,0.4)',
                  transition: 'transform 0.2s'
                }}>
                  View Programs
                  <span style={{ fontSize: '18px' }}>→</span>
                </a>
                <a href="#enroll" style={{
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
                  Enroll Now
                </a>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
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
                    ✓
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>500+</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Students Trained</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(0,102,204,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    🎓
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>Certified</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Instructors</div>
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
                  src="/images/Sketch-Render-Archicad-1-1024x576_1.avif"
                  alt="BIM Training"
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

              {/* Floating Card 1 */}
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
                  background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src="/images/Archicad2x.avif" alt="Archicad" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a1a2e', fontSize: '14px' }}>Archicad</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Official Training</div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '-30px',
                background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
                borderRadius: '16px',
                padding: '20px 24px',
                boxShadow: '0 20px 40px rgba(0,102,204,0.3)',
                color: '#fff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '32px', fontWeight: 700 }}>40+</div>
                  <div style={{ fontSize: '13px', lineHeight: 1.3, opacity: 0.9 }}>Hours of<br />Training</div>
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
              { value: '500+', label: 'Students Trained', color: '#0066cc' },
              { value: '50+', label: 'Companies Served', color: '#10b981' },
              { value: `${trainingCount}`, label: 'Training Programs', color: '#8b5cf6' },
              { value: '10+', label: 'Years Experience', color: '#f59e0b' }
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

      {/* Programs Section */}
      <section id="programs" style={{ padding: '120px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(0,102,204,0.1)',
              padding: '10px 24px',
              borderRadius: '50px',
              marginBottom: '20px'
            }}>
              <span style={{
                color: '#0066cc',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Our Training Programs
              </span>
            </div>
            <h2 style={{
              fontSize: '46px',
              fontWeight: 700,
              color: '#1a1a2e',
              marginBottom: '18px'
            }}>
              Choose Your Learning Path
            </h2>
            <p style={{ color: '#64748b', fontSize: '17px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              Industry-recognized training programs to advance your career in BIM and architectural design.
            </p>
          </div>

          {trainings.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              alignItems: 'stretch'
            }}>
              {trainings.map((training, index) => (
                <div key={training.id} style={{
                  background: '#fff',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}>
                  {/* Image Section with Program Badge */}
                  <div style={{
                    height: '320px',
                    background: training.image_url
                      ? `url(${training.image_url}) center/cover no-repeat`
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    position: 'relative'
                  }}>
                    {/* Program Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '24px',
                      left: '24px',
                      background: '#0066cc',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: '50px',
                      fontSize: '13px',
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(0,102,204,0.4)'
                    }}>
                      Program {index + 1}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div style={{
                    padding: '36px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                  }}>
                    <h3 style={{
                      fontSize: '26px',
                      fontWeight: 700,
                      color: '#1a1a2e',
                      marginBottom: '12px',
                      lineHeight: 1.3
                    }}>
                      {training.title}
                    </h3>
                    {training.subtitle && (
                      <div style={{
                        color: '#0066cc',
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '16px'
                      }}>
                        {training.subtitle}
                      </div>
                    )}
                    <div style={{ flex: 1, minHeight: '80px' }}>
                      {training.description && (
                        <p style={{
                          color: '#64748b',
                          fontSize: '15px',
                          lineHeight: 1.8,
                          margin: 0
                        }}>
                          {training.description}
                        </p>
                      )}
                    </div>

                    {/* Buttons Section - Always show both buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '14px',
                      marginTop: '28px',
                      paddingTop: '24px',
                      borderTop: '1px solid #f0f0f0'
                    }}>
                      <a
                        href={training.link_url || '#enroll'}
                        target={training.link_url?.startsWith('http') ? '_blank' : '_self'}
                        rel={training.link_url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '18px 24px',
                          background: '#fff',
                          color: '#1a1a2e',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          fontWeight: 600,
                          fontSize: '15px',
                          border: '2px solid #e2e8f0',
                          transition: 'all 0.2s',
                          textAlign: 'center'
                        }}
                      >
                        Download<br />Syllabus
                      </a>
                      <a
                        href="#enroll"
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '18px 24px',
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
                        Enroll Now
                      </a>
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
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>📚</div>
              <h3 style={{ color: '#1a1a2e', marginBottom: '12px', fontSize: '26px', fontWeight: 700 }}>Programs Coming Soon</h3>
              <p style={{ color: '#64748b', fontSize: '16px' }}>We are preparing exciting new training programs.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '120px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(0,102,204,0.1)',
                padding: '10px 24px',
                borderRadius: '50px',
                marginBottom: '20px'
              }}>
                <span style={{
                  color: '#0066cc',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}>
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
                Industry-Leading Training Excellence
              </h2>
              <p style={{ color: '#64748b', fontSize: '17px', lineHeight: 1.8, marginBottom: '40px' }}>
                Our training programs are designed by certified professionals with extensive real-world experience in BIM implementation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { icon: '🎓', title: 'Certified Instructors', desc: 'Learn from Graphisoft certified professionals' },
                  { icon: '💼', title: 'Hands-on Projects', desc: 'Real-world projects and practical assignments' },
                  { icon: '📅', title: 'Flexible Schedule', desc: 'Weekend and evening batches available' },
                  { icon: '🚀', title: 'Career Support', desc: 'Job placement assistance after completion' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4ff 100%)',
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
            <div style={{
              background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
              borderRadius: '28px',
              padding: '56px',
              color: '#fff',
              boxShadow: '0 20px 60px rgba(0,102,204,0.3)'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '16px',
                padding: '28px',
                marginBottom: '36px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '14px', opacity: 0.85, marginBottom: '8px', fontWeight: 500 }}>Training Program</div>
                <div style={{ fontSize: '32px', fontWeight: 700 }}>Get BIM Certified</div>
              </div>
              <p style={{ opacity: 0.9, marginBottom: '40px', lineHeight: 1.8, fontSize: '16px' }}>
                Upon successful completion, receive an industry-recognized certificate that validates your BIM expertise and opens new career opportunities.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                  <div style={{ fontSize: '44px', fontWeight: 700, marginBottom: '8px' }}>40+</div>
                  <div style={{ fontSize: '14px', opacity: 0.85, fontWeight: 500 }}>Hours of Training</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                  <div style={{ fontSize: '44px', fontWeight: 700, marginBottom: '8px' }}>15+</div>
                  <div style={{ fontSize: '14px', opacity: 0.85, fontWeight: 500 }}>Practice Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form Section */}
      <section id="enroll" style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(0,102,204,0.15) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(77,166,255,0.2)',
                padding: '10px 24px',
                borderRadius: '50px',
                marginBottom: '24px'
              }}>
                <span style={{
                  color: '#4da6ff',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}>
                  Get Started
                </span>
              </div>
              <h2 style={{
                fontSize: '46px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '24px',
                lineHeight: 1.15
              }}>
                Ready to Master BIM?
              </h2>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '17px',
                lineHeight: 1.8,
                marginBottom: '40px'
              }}>
                Fill out the form and our team will contact you with detailed course information, batch schedules, and pricing options.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  'Comprehensive BIM training curriculum',
                  'Industry-recognized certification',
                  'Hands-on project experience',
                  'Career placement support'
                ].map((text, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#0066cc',
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

              <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(0,102,204,0.2)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    📞
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '4px', fontWeight: 500 }}>Call Us</div>
                    <a href="tel:+919342250117" style={{ color: '#fff', textDecoration: 'none', fontSize: '17px', fontWeight: 600 }}>
                      +91 93422 50117
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    background: 'rgba(0,102,204,0.2)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    ✉️
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '4px', fontWeight: 500 }}>Email</div>
                    <a href="mailto:sathish@mycosmicstar.com" style={{ color: '#fff', textDecoration: 'none', fontSize: '17px', fontWeight: 600 }}>
                      sathish@mycosmicstar.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <LeadForm
                formType="training"
                sourcePage="/training"
                title="Enroll Now"
                subtitle="Get course details and upcoming batch information"
                buttonText="Request Information"
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
