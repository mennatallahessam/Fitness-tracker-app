import { supabase } from './supabase'

console.log('Testing connection to:', process.env.SUPABASE_URL)

async function test() {
  try {
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true })
    if (error) {
      console.error('❌ Supabase error:', error)
    } else {
      console.log('✅ Success! Data count:', data)
    }
  } catch (err) {
    console.error('💥 Catch error:', err)
  }
}

test()
