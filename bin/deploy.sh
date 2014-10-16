#!/bin/sh

# cd to root
cd ..

# init log
LOG_FILE=log/deploy_$(date +%Y-%m-%d-%H-%M-%S).log
touch $LOG_FILE

# set up maintenance page
mv www/.maintenance.html www/maintenance.html

# pull master
git pull upstream master >>$LOG_FILE 2>&1

# install & compile stuff
composer install >>$LOG_FILE 2>&1
npm install >>$LOG_FILE 2>&1
gulp build >>$LOG_FILE 2>&1

# clear cache
rm -rf temp/cache
php -r 'opcache_reset();'

# run db migrations
php www/index.php migrations:migrate >>$LOG_FILE 2>&1

# disable maintenance page
mv www/maintenance.html www/.maintenance.html
