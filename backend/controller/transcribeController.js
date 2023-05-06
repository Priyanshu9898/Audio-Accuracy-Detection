import speech from "@google-cloud/speech";

import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import { Readable, Writable } from "stream";


const client = new speech.SpeechClient();

ffmpeg.setFfmpegPath(ffmpegPath);

const convertToWav = async (buffer, mimeType) => {
  if (mimeType === "audio/wav") {
    return buffer;
  }

  console.log('MIME Type:', mimeType);
  return new Promise((resolve, reject) => {
    const input = Readable.from(buffer);
    const inputFormat = mimeType === 'audio/mpeg' ? 'mp3' : mimeType.split('/')[1];
    console.log('Input Stream:', inputFormat);
    const chunks = [];

    const command = ffmpeg(input)
      .inputFormat(inputFormat)
      .audioChannels(1)
      .audioCodec("pcm_s16le")
      .format("wav");

    command
      .on("error", reject)
      .on("end", () => resolve(Buffer.concat(chunks)))
      .pipe(
        new Writable({
          write(chunk, encoding, callback) {
            chunks.push(chunk);
            callback();
          },
        })
      );
  });
};


export const transcribeController = async (req, res) => {
  try {
    const audioBuffer  = req.file.buffer;
    const mimeType = req.file.mimetype;

    const wavBuffer = await convertToWav(audioBuffer, mimeType);

    const request = {
      audio: { content: wavBuffer.toString("base64") },
      config: {
        encoding: mimeType === "audio/wav" ? "LINEAR16" : "MP3",
        languageCode: "en-US",
      },
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    const targetText = "This is my family I live in a city";
    const accuracy = calculateAccuracy(transcription, targetText);
    res.json({ transcription, accuracy });
  } catch (error) {
    console.error('Error in transcribeController:', error.stack);
    res.status(500).json({ error: error.message });
  }
};

const calculateAccuracy = (transcription, targetText) => {
  const transcribedWords = transcription.toLowerCase().split(/\s+/);
  const targetWords = targetText.toLowerCase().split(/\s+/);
  const totalWords = targetWords.length;

  let matchedWords = 0;

  for (const word of transcribedWords) {
    const index = targetWords.indexOf(word);
    if (index !== -1) {
      matchedWords++;
      targetWords.splice(index, 1);
    }
  }

  const accuracy = (matchedWords / totalWords) * 100;
  return accuracy.toFixed(2);
};
