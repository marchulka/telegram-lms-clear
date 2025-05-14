
# Clear Supabase Telegram Bot (Облачная версия)

## Шаги:
1. Залей проект на GitHub
2. Импортируй на Vercel через https://vercel.com/import/git
3. Укажи переменные окружения:
   - TELEGRAM_TOKEN
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - OPENAI_API_KEY
4. После деплоя:
   Выполни curl:
   curl -F "url=https://your-vercel-url.vercel.app/api/webhook" https://api.telegram.org/bot<ТВОЙ_ТОКЕН>/setWebhook

✅ Всё готово к работе
