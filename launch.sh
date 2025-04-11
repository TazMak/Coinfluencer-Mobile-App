#!/bin/bash

echo "Starting Coinfluencer Mobile App..."
echo "Make sure you have Expo Go installed on your device."

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "Expo CLI not found. Installing globally..."
    npm install -g expo-cli
fi

# Start the Expo development server
echo "Launching Expo development server..."
expo start
