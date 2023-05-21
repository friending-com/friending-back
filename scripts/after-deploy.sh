

#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

pm2 start build/app.js
