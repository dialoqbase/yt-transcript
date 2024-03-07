import type { TrasncriptInfo } from '../types'

export function extractCaptionJson(html: string): TrasncriptInfo[] {
  const splitHtml = html.split('"captions":')
  if (splitHtml.length <= 1) {
    if (html.includes('class="g-recaptcha"'))
      return []
    else if (html.includes('"playabilityStatus":'))
      return []
    else
      return []
  }

  try {
    const json = JSON.parse(splitHtml[1].split(',"videoDetails')[0].replace('\n', ''))
    const playerCaptionsTracklistRenderer = json?.playerCaptionsTracklistRenderer
    if (!playerCaptionsTracklistRenderer)
      return []

    const captionTracks = playerCaptionsTracklistRenderer?.captionTracks
    if (!captionTracks)
      return []

    return captionTracks
  }
  catch (error) {
    return []
  }
}
