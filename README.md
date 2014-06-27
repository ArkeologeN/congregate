
                                                          _       
                                                         | |      
                ___ ___  _ __   __ _ _ __ ___  __ _  __ _| |_ ___ 
               / __/ _ \| '_ \ / _` | '__/ _ \/ _` |/ _` | __/ _ \
              | (_| (_) | | | | (_| | | |  __/ (_| | (_| | ||  __/
               \___\___/|_| |_|\__, |_|  \___|\__, |\__,_|\__\___|
                                __/ |          __/ |              
                               |___/          |___/               


Node.js cluster on top of Flatiron CLI &amp; Native cluster. Built with love!

## Getting Started.

To install, run the following command:

```javascript
npm install congregate -g
```

Once done, you can simply spin your shards by the following method:

```
congregate spin --app /var/www/myapp/index.js --shards 8
```

OR

```
CONG_APP_PATH=/var/www/myapp.js congregate spin --shards 8
```

```
--shards = You can put any number of instances you want. If undefined, then it will count your CPU cores and start same count processes.
--app    = You need to pass absolute url to your application. Else, set your environment variable of CONG_APP_PATH
```

## Author
Congregate has been initialized by [Hamza Waqas](http://twitter.com/HamzaWaqas) inspired from `Jonathan Warner`'s trick!