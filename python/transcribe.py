import whisper
import sys
import json

audio_file = sys.argv[1]
model_name = sys.argv[2] if len(sys.argv) > 2 else "base"
language = sys.argv[3] if len(sys.argv) > 3 else None

model = whisper.load_model(model_name)
result = model.transcribe(audio_file, language=language)

print(json.dumps(result, indent=2, ensure_ascii=False))
