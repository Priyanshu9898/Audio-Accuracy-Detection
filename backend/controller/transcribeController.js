import speech from "@google-cloud/speech";
const client = new speech.SpeechClient();

export const transcribeController = async (req, res) => {
  try {
    const audioBytes = req.file.buffer.toString("base64");
    const fileType = req.file.mimetype;

    const request = {
      audio: { content: audioBytes },
      config: {
        encoding: fileType === "audio/wav" ? "LINEAR16" : "MP3",
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
