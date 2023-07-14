

#!/bin/bash
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY
sudo npm install 
pm2 start build/app.js 2>&1 /home/ubuntu/log/server.log
