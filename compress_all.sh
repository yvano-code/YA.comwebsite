#!/bin/bash
find public/projects/YA_originals_videos -type f -name "*.mp4" -size +15M | while read -r file; do
  echo "Processing $file..."
  tmp="${file%.mp4}_tmp.mp4"
  ffmpeg -y -i "$file" -vcodec libx264 -crf 28 -preset fast -movflags +faststart -acodec aac -b:a 128k "$tmp" < /dev/null
  if [ $? -eq 0 ]; then
    mv "$tmp" "$file"
    echo "Successfully compressed $file"
  else
    echo "Failed to compress $file"
  fi
done
