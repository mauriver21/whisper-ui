#!/bin/bash

# Exit immediately if a command fails
set -e

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3.12 -m venv .venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# Upgrade pip and install requirements
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Setup complete. To activate manually next time, run: source .venv/bin/activate"
