type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
}

export type Either<T, U> = Only<T, U> | Only<U, T>

export interface TrasncriptInfo {
  baseUrl: string
  name: {
    simpleText: string
  }
  vssId: string
  languageCode: string
  isTranslatable: boolean
  trackName: string
  kind?: string
}

interface Declaration {
  _attributes: {
    version: string
    encoding: string
  }
}

export interface TranscriptText {
  _attributes: {
    start: string
    dur: string
  }
  _text: string
}

export interface Transcript {
  text: TranscriptText[]
}

export interface YTranscriptJSON {
  _declaration: Declaration
  transcript: Transcript
}

export interface YTranscript {
  text: string
  start: number
  duration: number
}
