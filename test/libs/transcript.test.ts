import { describe, expect, it } from 'vitest'
import { findTranscriptByLanguage, getAllTranscripts, getTranscript } from '../../src/libs/transcript'

describe('should list transcripts', () => {
  it('get avaiable transcripts', async () => {
    const json = await getAllTranscripts('BLmsVvcUxmY')
    expect(json.length).toBeGreaterThan(0)
  })

  it('it should return empty array for video without transcript', async () => {
    const json = await getAllTranscripts('8VTjlLGXA4s')
    expect(json.length).toEqual(0)
  })

  it('error video', async () => {
    const json = await getAllTranscripts('fT-sUUq482k')
    expect(json.length).toEqual(0)
  })
})

describe('should find transcript by language', () => {
  it('get transcript by language', async () => {
    const json = await getAllTranscripts('BLmsVvcUxmY')
    const transcript = findTranscriptByLanguage(json, 'en-US')
    expect(transcript).toBeDefined()
  })
  it('get nothing', async () => {
    const json = await getAllTranscripts('BLmsVvcUxmY')
    const transcript = findTranscriptByLanguage(json, 'es')
    expect(transcript).toBeNull()
  })
})

describe('should fetch transcript', () => {
  it('fetch transcript', async () => {
    const json = await getTranscript('BLmsVvcUxmY')
    expect(json).toBeDefined()
  })
})
