import { describe, expect, it } from 'vitest'
import { YtTranscriptChrome } from '../src'
import { html } from './utils'

describe('testing YtTranscriptChrome', () => {
  const transcript = new YtTranscriptChrome({ html })

  it('it should return a list of available transcripts', async () => {
    const list = await transcript.listAllTranscripts()
    expect(list).toBeDefined()
    expect(list.length).toBeGreaterThan(0)
  })

  it('a matching transcription in english', async () => {
    const script = await transcript.getTranscript('en')
    expect(script).toBeDefined()
    const slice = script?.slice(0, 3)
    expect(slice).toEqual([
      { start: 0.19, duration: 2.03, text: '[Music]' },
      {
        start: 0.299,
        duration: 4.081,
        text: 'Zig a high performance system',
      },
      {
        start: 2.22,
        duration: 4.32,
        text: 'programming language often labeled as a',
      },
    ])
  })

  it('it should return a null for non-existing language', async () => {
    const script = await transcript.getTranscript('ml')
    expect(script).toBeNull()
  })
})
