#!/usr/bin/env bash
cat << "GARFWEB"
    _ _ _ ____ _    ____ ____ _  _ ____    ___ ____
    | | | |___ |    |    |  | |\/| |___     |  |  |
    |_|_| |___ |___ |___ |__| |  | |___     |  |__|

  ______ _______  ______ _______ _  _  _ _______ ______
 |  ____ |_____| |_____/ |______ |  |  | |______ |_____]
 |_____| |     | |    \_ |       |__|__| |______ |_____]

GARFWEB

cat << "GARF_SENTINEL"
                   .-.,     ,.-.
              '-.  /:::\\   //:::\  .-'
              '-.\|':':' `"` ':':'|/.-'
              `-./`. .-=-. .-=-. .`\.-`
                /=- /     |     \ -=\
               ;   |      |      |   ;
               |=-.|______|______|.-=|
               |==  \  0 /_\ 0  /  ==|
               |=   /'---( )---'\   =|
                \   \:   .'.   :/   /
                 `\= '--`   `--' =/'
                   `-=._     _.=-'
                        `"""`
GARF_SENTINEL

echo "DEPLOYING GARFWEB TO $GARFWEB_HOST:$GARFWEB_PORT AS $GARFWEB_USER"

bin_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )
garfbot_path=$bin_path/..

echo "Copying garf files..."
rsync -av --delete --progress --stats \
      --exclude 'node_modules' --exclude 'config/local.js' \
      -e "ssh -p $GARFWEB_PORT" \
      $garfbot_path $GARFWEB_USER@$GARFWEB_HOST:~/garfbot

echo "Garf copy complete."

echo "Installing garf packages..."
ssh -p $GARFWEB_PORT $GARFWEB_USER@$GARFWEB_HOST -t 'bash -l -c "cd garfbot && npm install"'
echo "Garf install complete."

echo "Copying garf secrets..."
ssh -p $GARFWEB_PORT $GARFWEB_USER@$GARFWEB_HOST -t 'bash -l -c "cp ~/secrets.js garfbot/config/local.js"'
echo "Garf secrets copied."
