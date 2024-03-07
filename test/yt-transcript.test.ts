import { describe, expect, it } from 'vitest'
import { YtTranscript } from '../src'

describe('testing YtTranscript', () => {
  const transcript = new YtTranscript({ url: 'https://www.youtube.com/watch?v=BLmsVvcUxmY' })

  it('it should return a list of available transcripts', async () => {
    const list = await transcript.listAllTranscripts()
    expect(list).toBeDefined()
    expect(list.length).toBeGreaterThan(0)
  })

  it('it should return a transcript object or null if not found', async () => {
    const script = await transcript.getTranscript('en')
    expect(script).toBeDefined()
    const slice = script?.slice(0, 3)
    expect(slice).toEqual([
      { start: 0.709, duration: 4.755, text: '♪♪♪' },
      {
        start: 13.472,
        duration: 1.543,
        text: '♪ ONE COMPUTER, FUZZY BLANKET ♪',
      },
      {
        start: 15.098,
        duration: 1.627,
        text: '♪ MOLDY FOOD,\nONE-PERSON BANQUET ♪',
      },
    ])
  })

  it('it should return a null for non-existing language', async () => {
    const script = await transcript.getTranscript('es')
    expect(script).toBeNull()
  })
})
