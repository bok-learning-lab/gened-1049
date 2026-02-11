#!/bin/bash

# prep_scroll_video.sh - Prepare videos for smooth scroll-scrubbing web apps
#
# Usage:
#   ./prep_scroll_video.sh <input_file> [output_dir] [preset]
#
# Arguments:
#   input_file  - Path to input video file (required)
#   output_dir  - Output directory (default: _output)
#   preset      - Encoding preset: all-i, gop-0.5s, gop-1s (default: all-i)
#
# Presets:
#   all-i     - Keyframe every frame (maximum smoothness, large file)
#   gop-0.5s  - Keyframe every 0.5 seconds (very smooth, moderate size)
#   gop-1s    - Keyframe every 1 second (smooth, smaller size)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Parse arguments
INPUT_FILE="$1"
OUTPUT_DIR="${2:-_output}"
PRESET="${3:-all-i}"

# Validate input
if [ -z "$INPUT_FILE" ]; then
    echo -e "${RED}Error: Input file required${NC}"
    echo "Usage: $0 <input_file> [output_dir] [preset]"
    exit 1
fi

if [ ! -f "$INPUT_FILE" ]; then
    echo -e "${RED}Error: Input file not found: $INPUT_FILE${NC}"
    exit 1
fi

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: ffmpeg not found. Please install ffmpeg:${NC}"
    echo "  macOS: brew install ffmpeg"
    echo "  Ubuntu/Debian: sudo apt-get install ffmpeg"
    exit 1
fi

# Create output directory if it doesn't exist
if [ ! -d "$OUTPUT_DIR" ]; then
    echo -e "${YELLOW}Creating output directory: $OUTPUT_DIR${NC}"
    mkdir -p "$OUTPUT_DIR"
fi

# Add _output to .gitignore if it's the default and not already present
if [ "$OUTPUT_DIR" = "_output" ] && [ -f ".gitignore" ]; then
    if ! grep -q "^_output/?$" .gitignore; then
        echo -e "${YELLOW}Adding _output/ to .gitignore${NC}"
        echo "_output/" >> .gitignore
    fi
elif [ "$OUTPUT_DIR" = "_output" ]; then
    echo -e "${YELLOW}Creating .gitignore with _output/${NC}"
    echo "_output/" > .gitignore
fi

# Generate output filename
INPUT_BASENAME=$(basename "$INPUT_FILE")
INPUT_NAME="${INPUT_BASENAME%.*}"
OUTPUT_FILE="$OUTPUT_DIR/${INPUT_NAME}_scroll-optimized.mp4"

# Build ffmpeg command based on preset
echo -e "${GREEN}Processing video with preset: $PRESET${NC}"
echo -e "Input:  $INPUT_FILE"
echo -e "Output: $OUTPUT_FILE"
echo ""

case "$PRESET" in
    all-i)
        echo -e "${YELLOW}Preset: All-I (keyframe every frame)${NC}"
        echo "  • Maximum scroll smoothness"
        echo "  • Large file size"
        echo "  • Best for: Premium scroll experiences where smoothness is critical"
        echo ""

        ffmpeg -i "$INPUT_FILE" \
            -an \
            -vf "scale=1280:-2" \
            -c:v libx264 -preset medium -crf 18 \
            -x264-params "keyint=1:min-keyint=1:scenecut=0" \
            -pix_fmt yuv420p \
            -movflags +faststart \
            "$OUTPUT_FILE"
        ;;

    gop-0.5s)
        echo -e "${YELLOW}Preset: GOP 0.5s (keyframe every 0.5 seconds)${NC}"
        echo "  • Very smooth scrubbing"
        echo "  • Moderate file size"
        echo "  • Best for: Most scroll-scrubbing use cases"
        echo ""

        ffmpeg -i "$INPUT_FILE" \
            -an \
            -vf "scale=1280:-2,fps=30" \
            -c:v libx264 -preset medium -crf 20 \
            -g 15 -keyint_min 15 -sc_threshold 0 \
            -pix_fmt yuv420p \
            -movflags +faststart \
            "$OUTPUT_FILE"
        ;;

    gop-1s)
        echo -e "${YELLOW}Preset: GOP 1s (keyframe every 1 second)${NC}"
        echo "  • Smooth scrubbing"
        echo "  • Smaller file size"
        echo "  • Best for: Mobile or bandwidth-constrained scenarios"
        echo ""

        ffmpeg -i "$INPUT_FILE" \
            -an \
            -vf "scale=1280:-2,fps=30" \
            -c:v libx264 -preset medium -crf 20 \
            -g 30 -keyint_min 30 -sc_threshold 0 \
            -pix_fmt yuv420p \
            -movflags +faststart \
            "$OUTPUT_FILE"
        ;;

    *)
        echo -e "${RED}Error: Unknown preset '$PRESET'${NC}"
        echo "Valid presets: all-i, gop-0.5s, gop-1s"
        exit 1
        ;;
esac

# Check if ffmpeg succeeded
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Video processing complete!${NC}"
    echo -e "Output: $OUTPUT_FILE"

    # Show file sizes
    INPUT_SIZE=$(du -h "$INPUT_FILE" | cut -f1)
    OUTPUT_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo ""
    echo "File sizes:"
    echo "  Input:  $INPUT_SIZE"
    echo "  Output: $OUTPUT_SIZE"
else
    echo -e "${RED}✗ Video processing failed${NC}"
    exit 1
fi
