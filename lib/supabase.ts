import { createBrowserClient } from '@supabase/ssr'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a browser client that uses cookies for session storage
function createSupabaseClient(): SupabaseClient {
  // Log environment for debugging
  if (typeof window !== 'undefined') {
    console.log('Supabase client config (browser):', {
      url: supabaseUrl,
      hasKey: !!supabaseAnonKey,
      keyPrefix: supabaseAnonKey?.substring(0, 20) + '...'
    })
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase: Missing URL or key, using mock client')
    // Return a mock client during build time
    return {
      from: () => ({
        select: () => ({ data: [], error: null, count: 0 }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
        eq: () => ({ data: [], error: null, single: () => ({ data: null, error: null }) }),
        order: () => ({ data: [], error: null, limit: () => ({ data: [], error: null }) }),
        single: () => ({ data: null, error: null }),
        limit: () => ({ data: [], error: null }),
      }),
      auth: {
        signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as unknown as SupabaseClient
  }

  // Use createBrowserClient for proper cookie handling
  if (typeof window !== 'undefined') {
    console.log('Creating browser client with createBrowserClient')
    return createBrowserClient(supabaseUrl, supabaseAnonKey) as SupabaseClient
  }

  console.log('Creating server client with createClient')
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()

// Server-side client with service role key for admin operations
export function createServerClient(): SupabaseClient {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  // Use internal URL for server-side (Docker), fallback to public URL
  const serverUrl = process.env.SUPABASE_INTERNAL_URL || supabaseUrl
  if (!serverUrl || !supabaseServiceKey) {
    return supabase // Return the mock client
  }
  return createClient(serverUrl, supabaseServiceKey)
}
