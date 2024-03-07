import axios from 'axios'
import { xml2json } from 'xml-js'
import type { YTranscript, YTranscriptJSON } from '../types'
import { toNumber } from './to-number'

export async function fetchTranscript(url: string): Promise<YTranscriptJSON> {
  const response = await axios.get(url, {
  })
  const xml = response.data
  const json = covertXmlToJson(xml)
  return JSON.parse(json)
}

export function covertXmlToJson(xml: string) {
  return xml2json(xml, { compact: true, spaces: 4 })
}

export function formatTranscript({ transcript }: YTranscriptJSON): YTranscript[] {
  const result: YTranscript[] = []
  const text = transcript.text
  text.forEach((t) => {
    result.push({
      start: toNumber(t._attributes.start),
      duration: toNumber(t._attributes.dur),
      text: t._text,
    })
  })
  return result
}
