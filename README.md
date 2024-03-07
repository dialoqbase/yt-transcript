# Yt transcript

A simple JavaScript API which allows you to get the transcript/subtitles for a given YouTube video. It is inspired by a Python-based project [YouTube Transcript API](https://github.com/jdepoix/youtube-transcript-api).

## Installation

```bash
npm install yt-transcript
```

## Usage

```typescript
import { YtTranscript } from 'yt-transcript';

const ytTranscript = new YtTranscript({videoId: 'dQw4w9WgXcQ'});

ytTranscript.listAllTranscripts().then((transcript) => {
  console.log(transcript);
});

ytTranscript.getTranscript().then((transcript) => {
  console.log(transcript);
});
```

## Important Note

This package uses the undocumented YouTube API to fetch the transcript. It is not guaranteed to work in the future. Use at your own risk.  I'm not responsible for any damage caused by using this package.

## License

MIT License
