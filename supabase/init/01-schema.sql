-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create auth schema for GoTrue
CREATE SCHEMA IF NOT EXISTS auth;

-- Create required roles
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'service_role') THEN
    CREATE ROLE service_role NOLOGIN;
  END IF;
END
$$;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon, authenticated, service_role;

-- Cosmicstar CMS Database Schema

-- Training Programs
CREATE TABLE IF NOT EXISTS trainings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  link_text TEXT DEFAULT 'Read More',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Webinars
CREATE TABLE IF NOT EXISTS webinars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  event_date DATE,
  event_time TEXT,
  venue_name TEXT,
  venue_address TEXT,
  venue_map_url TEXT,
  youtube_embed_url TEXT,
  features JSONB,
  faq JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Offers
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  hero_image_url TEXT,
  product_name TEXT,
  product_description TEXT,
  features JSONB,
  pricing_info JSONB,
  offer_valid_until DATE,
  iia_exclusive BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Form Submissions (Leads)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL,
  source_page TEXT,
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  iia_id TEXT,
  message TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'editor',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE webinars ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for trainings, webinars, and offers
CREATE POLICY "Public read access for trainings" ON trainings
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for webinars" ON webinars
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for offers" ON offers
  FOR SELECT USING (is_active = true);

-- Allow anyone to insert leads
CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Service role can do everything
CREATE POLICY "Service role full access trainings" ON trainings
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access webinars" ON webinars
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access offers" ON offers
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access leads" ON leads
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access admin_users" ON admin_users
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Seed initial data
INSERT INTO trainings (title, subtitle, description, image_url, link_url, link_text, display_order, is_active) VALUES
('Archicad BIM Training Program', 'Learn. Grow. Succeed.', 'Instructor-led training program for students and architects', '/images/WhatsApp-Image-2025-09-27-at-5.22.03-PM.jpeg', '/documents/Archicad-BIM-Training-Program_Syllabus-1.pdf', 'Download Syllabus', 1, true),
('Archicad Webinar Series', 'Interactive Webinar', 'Explore what''s new in Archicad and its powerful BIM functionalities', '/images/WhatsApp-Image-2025-09-27-at-5.22.03-PM1.jpeg', 'https://us06web.zoom.us/j/88566796429', 'Attend Webinar', 2, true),
('Archicad Launch Seminar', 'October Grand Launch', 'Yearly grand launch seminar for Archicad', '/images/WhatsApp-Image-2025-09-27-at-5.22.06-PM.jpeg', '#fm-1', 'Register for Seminar', 3, true);

INSERT INTO webinars (title, subtitle, description, event_date, event_time, venue_name, venue_address, is_active) VALUES
('Design The Future: Archicad 28', 'Event Details', 'You''re invited to our Archicad 28 Product launch event to discover all new architectural design solutions for increasing productivity and driving profitability.', '2024-11-15', '6.00 PM Onwards', 'The Chancery Pavilion', '#135, Residency Road, Bangalore - 560 025, India', true);

INSERT INTO offers (slug, title, subtitle, product_name, product_description, iia_exclusive, is_active) VALUES
('iia-archicad-perpetual-offer-2025', 'IIA Archicad Perpetual Offer 2025', 'Grab the IIA Archicad Perpetual License Offer 2025', 'Archicad', 'Own Archicad forever with exclusive pricing for architects and designers of Indian Institute of Architects India.', true, true),
('iia-rulebuddy-perpetual-offer-2025', 'IIA RuleBuddy Perpetual Offer 2025', 'Special offer for IIA members', 'RuleBuddy', 'Compliance checking tool for architects.', true, true);

-- Add default admin user
INSERT INTO admin_users (email, role) VALUES ('admin@cosmicstar.com', 'admin');
