#!/usr/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
gnome-terminal --working-directory=$SCRIPT_DIR/frontend/notesapp -- npm run dev

cd ./backend
npm i nodemon
npm run dev








