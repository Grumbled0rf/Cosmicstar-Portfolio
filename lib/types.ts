export interface Training {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  image_url: string | null
  link_url: string | null
  link_text: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Webinar {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  event_date: string | null
  event_time: string | null
  venue_name: string | null
  venue_address: string | null
  venue_map_url: string | null
  youtube_embed_url: string | null
  features: FeatureItem[] | null
  faq: FAQItem[] | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface FeatureItem {
  title: string
  description?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Offer {
  id: string
  slug: string
  title: string
  subtitle: string | null
  hero_image_url: string | null
  product_name: string | null
  product_description: string | null
  features: FeatureItem[] | null
  pricing_info: PricingInfo | null
  offer_valid_until: string | null
  iia_exclusive: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PricingInfo {
  original_price?: number
  offer_price?: number
  currency?: string
  discount_percentage?: number
}

export interface Lead {
  id: string
  form_type: 'training' | 'webinar' | 'offer' | 'contact'
  source_page: string | null
  name: string | null
  email: string | null
  phone: string | null
  company: string | null
  iia_id: string | null
  message: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'editor'
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      trainings: {
        Row: Training
        Insert: Omit<Training, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Training, 'id' | 'created_at' | 'updated_at'>>
      }
      webinars: {
        Row: Webinar
        Insert: Omit<Webinar, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Webinar, 'id' | 'created_at' | 'updated_at'>>
      }
      offers: {
        Row: Offer
        Insert: Omit<Offer, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Offer, 'id' | 'created_at' | 'updated_at'>>
      }
      leads: {
        Row: Lead
        Insert: Omit<Lead, 'id' | 'created_at'>
        Update: Partial<Omit<Lead, 'id' | 'created_at'>>
      }
      admin_users: {
        Row: AdminUser
        Insert: Omit<AdminUser, 'id' | 'created_at'>
        Update: Partial<Omit<AdminUser, 'id' | 'created_at'>>
      }
    }
  }
}
