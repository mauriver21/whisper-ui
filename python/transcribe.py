import whisper
import sys
import json

audio_file = sys.argv[1]
model_name = sys.argv[2] if len(sys.argv) > 2 else "base"

model = whisper.load_model(model_name)
result = model.transcribe(audio_file)

print(json.dumps(result, indent=2, ensure_ascii=False))
