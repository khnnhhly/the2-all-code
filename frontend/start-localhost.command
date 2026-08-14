#!/bin/zsh

cd "$(dirname "$0")" || exit 1

echo "Starting The Two Planner local server..."
echo "The browser will open at http://localhost:3000"
echo

(sleep 3 && open "http://localhost:3000") &
npm run dev -- --host 127.0.0.1 --port 3000

echo
echo "Server stopped. You can close this window."
read -r "?Press Enter to close..."
