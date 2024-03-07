import { findTranscriptByLanguage, getAllTranscripts, getTranscript } from './libs/transcript-chrome'
import type { TrasncriptInfo, YTranscript } from './types'

/**
 * YtTranscript is a simple unoffical library to interact with YouTube transcripts for Chrome extension
 * this library is inspired from Python library `youtube-transcript-api`
 * @class
 * @classdesc Class to interact with YouTube transcripts
 * @example
 * const transcript = new YtTranscriptChrome({ html: '<html>...</html>' })
 * const transcript = new YtTranscriptChrome({ html: '<html>...</html>' })
 *
 * const list = await transcript.listAllTranscripts()
 * const script = await transcript.getTranscript('en-US')
 */
export class YtTranscriptChrome {
  private html: string
  /**
   * Create a new instance of YtTranscript
   * @param {html} param0
   */
  constructor({ html }: { html: string }) {
    this.html = html
  }

  /**
   * List all available transcripts for the video
   * @returns {Promise<TrasncriptInfo[]>} returns a list of available transcripts
   */
  async listAllTranscripts(): Promise<TrasncriptInfo[]> {
    return await getAllTranscripts(this.html)
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
    return await getTranscript(this.html, languageCode)
  }
}
