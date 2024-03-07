import type { TrasncriptInfo } from '../types'
import { extractCaptionJson } from '../utils/extract-caption-json'
import { fetchVideoHtml } from '../utils/fetch-video'
import { fetchTranscript, formatTranscript } from '../utils/fetch-transcript'

export async function getAllTranscripts(videoId: string): Promise<TrasncriptInfo[]> {
  const html = await fetchVideoHtml(videoId)
  return extractCaptionJson(html)
}

export function findTranscriptByLanguage(transcripts: TrasncriptInfo[], languageCode: string): TrasncriptInfo | null {
  return transcripts.find(t => t.languageCode === languageCode) || null
}

export async function getTranscript(videoId: string, languageCode?: string) {
  let transcript: TrasncriptInfo | null = null
  const transcripts = await getAllTranscripts(videoId)
  if (transcripts.length === 0)
    return null

  if (languageCode) {
    transcript = findTranscriptByLanguage(transcripts, languageCode)
    if (!transcript)
      return null
  }
  else {
    transcript = transcripts[0]
  }

  const url = transcript.baseUrl
  const data = await fetchTranscript(url)
  const formatted = formatTranscript(data)

  return formatted
}
