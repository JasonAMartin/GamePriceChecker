GamePriceChecker
============

This is a command-line script to get notified when a PC game is being sold for a price that's great. 

Basically, I grew tired of manually going to Steam and looking up prices when really what I wanted was a way to set my own price for games.

For example, I wanted to buy Civilization VI, but I was only willing to pay $20 for it. Rather than checking on the price manually day after day, this script allows me to set my price ($20) and get notified when it's for sale at that price or better. No more wasted time.

You can also turn on the historical low feature and get notified when a game is at its lowest price point so far.

GamePriceChecker was written for my own uses (and quickly), but I'm putting it up here in case anyone wants to use it, alter it with other APIs or whatever.

## Requirements

You'll need to have [Node](http://www.nodejs.org) & [NPM](http://www.npmjs.com) on your machine.

## Setup:

* Clone GamePriceChecker repo to your local machine
* Run ```npm install```
* Create a directory to hold the data files. For example: /data/.
* Edit the config.js as desired. 
    * The games object takes game IDs (see file for more info). To get them, go to [STEAM](http://store.steampowered.com) and look at game pages.
    * The config.js file has data already in it to provide you with a working example to test and modify.
* Update the data files by running ```npm run update```.
* Check the prices for the games you've chosen by running ```npm run update```.

## IFTTT Setup

I've added the ability to push notifications to IFTTT so I can automate the script and get notified when something happens that I care about.

To use IFTTT, you'll need to do a few things (I'm assuming you know IFTTT a little or will go find out).

1. Signup for an account at [IFTTT](https://www.ifttt.com).

2. Go to "NEW APPLET" and search for "Maker Webhooks".

3. Get the KEY from [https://ifttt.com/services/maker_webhooks/settings](https://ifttt.com/services/maker_webhooks/settings).

4. Update iftttURL in config.js to use your KEY.

5. Make a new Maker Webhook so that if event "gamesale" happens, it emails you or tweets or whatever you want.


## Additional Information:

Each time you add a new game to the config file, make sure you run ```npm run update``` to create a data file for it.

Additionally, you may want to run ```npm run update``` if it's been a few days or so since your last update just to make sure you have good data.

## Dev Note

I should point out that I'm not really doing much error checking / testing for this script since it's not too serious. This was supposed to be a development project over my lunch hour, but I put in a few more hours into it in the evening.

As time permits, I may tinker a bit and improve code stability.

If you find some blinding error, feel free to point it out.

#### TODO:

* Improve Steam data functionality -- some games need different data processing and those games are currently ignored.
