'use server'

import { createServerClient } from './supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Training, Webinar, Offer } from './types'

// ============================================
// TRAINING ACTIONS
// ============================================

export async function createTraining(formData: FormData): Promise<void> {
  const supabase = createServerClient()

  const data = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string || null,
    description: formData.get('description') as string || null,
    image_url: formData.get('image_url') as string || null,
    link_url: formData.get('link_url') as string || null,
    link_text: formData.get('link_text') as string || 'Read More',
    display_order: parseInt(formData.get('display_order') as string) || 0,
    is_active: formData.get('is_active') === 'true',
  }

  const { error } = await supabase.from('trainings').insert(data)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/training')
  redirect('/admin/training')
}

export async function updateTraining(id: string, formData: FormData): Promise<void> {
  const supabase = createServerClient()

  const data = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string || null,
    description: formData.get('description') as string || null,
    image_url: formData.get('image_url') as string || null,
    link_url: formData.get('link_url') as string || null,
    link_text: formData.get('link_text') as string || 'Read More',
    display_order: parseInt(formData.get('display_order') as string) || 0,
    is_active: formData.get('is_active') === 'true',
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('trainings').update(data).eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/training')
  redirect('/admin/training')
}

export async function deleteTraining(id: string): Promise<{ error?: string; success?: boolean }> {
  const supabase = createServerClient()

  const { error } = await supabase.from('trainings').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/training')
  return { success: true }
}

export async function getTraining(id: string): Promise<Training | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('trainings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching training:', error)
    return null
  }

  return data as Training
}

// ============================================
// WEBINAR ACTIONS
// ============================================

export async function createWebinar(formData: FormData): Promise<void> {
  const supabase = createServerClient()

  const featuresStr = formData.get('features') as string
  const faqStr = formData.get('faq') as string

  const data = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string || null,
    description: formData.get('description') as string || null,
    event_date: formData.get('event_date') as string || null,
    event_time: formData.get('event_time') as string || null,
    venue_name: formData.get('venue_name') as string || null,
    venue_address: formData.get('venue_address') as string || null,
    venue_map_url: formData.get('venue_map_url') as string || null,
    youtube_embed_url: formData.get('youtube_embed_url') as string || null,
    features: featuresStr ? JSON.parse(featuresStr) : null,
    faq: faqStr ? JSON.parse(faqStr) : null,
    is_active: formData.get('is_active') === 'true',
  }

  const { error } = await supabase.from('webinars').insert(data)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/webinars')
  redirect('/admin/webinars')
}

export async function updateWebinar(id: string, formData: FormData): Promise<void> {
  const supabase = createServerClient()

  const featuresStr = formData.get('features') as string
  const faqStr = formData.get('faq') as string

  const data = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string || null,
    description: formData.get('description') as string || null,
    event_date: formData.get('event_date') as string || null,
    event_time: formData.get('event_time') as string || null,
    venue_name: formData.get('venue_name') as string || null,
    venue_address: formData.get('venue_address') as string || null,
    venue_map_url: formData.get('venue_map_url') as string || null,
    youtube_embed_url: formData.get('youtube_embed_url') as string || null,
    features: featuresStr ? JSON.parse(featuresStr) : null,
    faq: faqStr ? JSON.parse(faqStr) : null,
    is_active: formData.get('is_active') === 'true',
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('webinars').update(data).eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/webinars')
  redirect('/admin/webinars')
}

export async function deleteWebinar(id: string): Promise<{ error?: string; success?: boolean }> {
  const supabase = createServerClient()

  const { error } = await supabase.from('webinars').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/webinars')
  return { success: true }
}

export async function getWebinar(id: string): Promise<Webinar | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('webinars')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching webinar:', error)
    return null
  }

  return data as Webinar
}

// ============================================
// OFFER ACTIONS
// ============================================

export async function createOffer(formData: FormData): Promise<void> {
  const supabase = createServerClient()

  const featuresStr = formData.get('features') as string
  const pricingStr = formData.get('pricing_info') as string

  const data = {
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string || null,
    hero_image_url: formData.get('hero_image_url') as string || null,
    product_name: formData.get('product_name') as string || null,
    product_description: formData.get('product_description') as string || null,
    features: featuresStr ? JSON.parse(featuresStr) : null,
    pricing_info: pricingStr ? JSON.parse(pricingStr) : null,
    offer_valid_until: formData.get('offer_valid_until') as string || null,
    iia_exclusive: formData.get('iia_exclusive') === 'true',
    is_active: formData.get('is_active') === 'true',
  }

  const { error } = await supabase.from('offers').insert(data)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/offers')
  redirect('/admin/offers')
}

export async function updateOffer(id: string, formData: FormData): Promise<void> {
  const supabase = createServerClient()

  const featuresStr = formData.get('features') as string
  const pricingStr = formData.get('pricing_info') as string

  const data = {
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string || null,
    hero_image_url: formData.get('hero_image_url') as string || null,
    product_name: formData.get('product_name') as string || null,
    product_description: formData.get('product_description') as string || null,
    features: featuresStr ? JSON.parse(featuresStr) : null,
    pricing_info: pricingStr ? JSON.parse(pricingStr) : null,
    offer_valid_until: formData.get('offer_valid_until') as string || null,
    iia_exclusive: formData.get('iia_exclusive') === 'true',
    is_active: formData.get('is_active') === 'true',
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('offers').update(data).eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/offers')
  redirect('/admin/offers')
}

export async function deleteOffer(id: string): Promise<{ error?: string; success?: boolean }> {
  const supabase = createServerClient()

  const { error } = await supabase.from('offers').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/offers')
  return { success: true }
}

export async function getOffer(id: string): Promise<Offer | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching offer:', error)
    return null
  }

  return data as Offer
}

// ============================================
// LEAD ACTIONS
// ============================================

export async function deleteLead(id: string): Promise<{ error?: string; success?: boolean }> {
  const supabase = createServerClient()

  const { error } = await supabase.from('leads').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/leads')
  return { success: true }
}

// ============================================
// AUTH ACTIONS
// ============================================

export async function signOut(): Promise<void> {
  const supabase = createServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
