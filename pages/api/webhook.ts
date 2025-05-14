
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

  const body = req.body
  const message = body?.message
  const chat_id = message?.chat?.id
  const text = message?.text

  if (!chat_id || !text) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  if (text === '/start') {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id,
        text: '👋 Привет! Я подключён к Supabase. Жми дальше!'
      })
    })
  }

  await fetch(`${SUPABASE_URL}/functions/v1/recordAttempt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      user_id: `telegram_${chat_id}`,
      question: 'demo_question',
      selected: text,
      correct: true,
      bot_id: 'default_bot',
      created_at: new Date().toISOString()
    })
  })

  res.status(200).json({ ok: true })
}
