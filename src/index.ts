import { findTranscriptByLanguage, getAllTranscripts, getTranscript } from './libs/transcript'
import type { Either, TrasncriptInfo, YTranscript } from './types'
import { extractVideoId } from './utils/extract-video-id'

type YtTranscriptConstructor = Either<{ url: string }, { videoId: string }>

/**
 * YtTranscript is a simple unoffical library to interact with YouTube transcripts
 * this library is inspired from Python library `youtube-transcript-api`
 * @class
 * @classdesc Class to interact with YouTube transcripts
 * @example
 * const transcript = new YtTranscript({ url: 'https://www.youtube.com/watch?v=BLmsVvcUxmY' })
 * const transcript = new YtTranscript({ videoId: 'BLmsVvcUxmY' })
 *
 * const list = await transcript.listAllTranscripts()
 * const transcript = await transcript.getTranscript('en-US')
 */
export class YtTranscript {
  private videoId: string
  /**
   * Create a new instance of YtTranscript
   * @param {YtTranscriptConstructor} param0
   */
  constructor({ url, videoId }: YtTranscriptConstructor) {
    if (url) {
      const urlVideoId = extractVideoId(url)
      if (!urlVideoId)
        throw new Error('Invalid YouTube url')

      this.videoId = urlVideoId
    }
    else if (videoId) {
      this.videoId = videoId
    }
    else {
      throw new Error('Need to provide url or videoId')
    }
  }

  /**
   * List all available transcripts for the video
   * @returns {Promise<TrasncriptInfo[]>} returns a list of available transcripts
   */
  async listAllTranscripts(): Promise<TrasncriptInfo[]> {
    return await getAllTranscripts(this.videoId)
  }

  /**
   * Get transcript by language
   * @param {string} languageCode
   * @returns {Promise<TrasncriptInfo | null>} returns a transcript object or null if not found
   */
  async getTranscriptByLanguage(languageCode: string): Promise<TrasncriptInfo | null> {
    const transcripts = await this.listAllTranscripts()
    return findTranscriptByLanguage(transcripts, languageCode)
  }

  /**
   * Get transcript by language
   * @param {string} languageCode
   * @returns {Promise<YTranscript | null>} returns a transcript object or null if not found
   */
  async getTranscript(languageCode?: string): Promise<YTranscript[] | null> {
    return await getTranscript(this.videoId, languageCode)
  }
}
