import axios from 'axios'

const WATCH_URL = 'https://www.youtube.com/watch?v='

async function _getYTHtml(videoId: string, options?: {
  languageCode?: string
  headers?: Record<string, string>
}): Promise<string> {
  const url = `${WATCH_URL}${videoId}`
  const response = await axios.get(url, {
    headers: {
      'Accept-Language': options?.languageCode || 'en-US',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      ...options?.headers,
    },
  })

  return response.data.replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&#x3A;/g, ':')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

export async function fetchVideoHtml(videoId: string, options?: {
  languageCode?: string
  headers?: Record<string, string>
}) {
  let html = await _getYTHtml(videoId, options)
  if (html.includes('action="https://consent.youtube.com/s')) {
    const match = html.match(/name="v" value="(.*?)"/)
    if (!match)
      throw new Error('Failed to find video id')

    const consent = `YES+${match[1]}`
    const cookie = `CONSENT=${consent}; domain=.youtube.com; path=/;`
    const headers = {
      Cookie: cookie,
    }
    html = await _getYTHtml(videoId, {
      headers: {
        ...options?.headers,
        ...headers,
      },
      languageCode: options?.languageCode,
    })
  }
  return html
}
