# Blockmarket Beta
Blockmarket is a single wallet web UI implementation built on top of Syscoin's decentralized marketplace API. Blockmarket is intended to be easy to setup but does require some technical knowledge of linux. 

This software is currently in beta and as such it requires to be run on Syscoin's test blockchain for the time being aka: cakenet. Due to this limitation is can only be used to expirmentation and more in-depth user feedback and we encourage this from merchants. We're hoping by releasing this beta code we'll be able to make the final product more attractive to a larger audience.

# Blockmraket Setup

Blockmarket is a web UI for easily managing your own market on the Syscoin network and aldo to enable buyers to easily make purchases from your market on the network. Because this is a web interface written in HTML/CSS/JS, we'll be using this suit of tools once setup is complete:

- A webserver of your choosing, for the purposes of this walkthrough we'll assume [Apache](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts)
- Syscoin's latest beta wallet, currently [**1.5.2 beta4**](https://github.com/syscoin/syscoin/releases/tag/1.5.2b4) with some amount of tSYS (test Syscoin)
- NodeJS must be installed, so that you can more easily install the blockmarket dependencies and so that you can run [Syscoin-API](https://github.com/syscoin/syscoin-api) a package developed by team.
- The web front end of this application uses AngularJS and the [Angular Syscoin API](https://github.com/syscoin/angular-syscoin-api) also developed by the team, but this will be auto-installed thanks to NodeJS.

*If you're interested on more information on any of the Syscoin Team provided libraries please visit the links above for more information*

## Installing the dependencies

*These instructions generally assume an Ununtu operating system*

- 1. First you should get a web server setup (we recommend [Apache](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts), setup may vary based on environment). You will also want to install [NodeJS](https://nodejs.org/) for your environment.
- Next you need to install the [Syscoin 1.5.2 beta4 wallet](https://github.com/syscoin/syscoin/releases/tag/1.5.2b4) for your environemnt. If you're running an ubuntu server you'll need to compile the daemon. To quickly install and build the daemon run these commands:
```
commands
```
- 2. With the wallet installed, make sure you follow the setup instructions for Syscoin API and then start the API server, you'll want to start it in something like a linux screen so that it continues to run after you log out:
```
root@server:syscoin-api# screen nodejs server.js
```
- 3. Once the API server is running, you'll want to clone the blockmarket repository into whatever the web root of your marketplace is:
```
root@server:www# git clone https://github.com/syscoin/blockmarket.git public_html
```
- 4. This now we run nodeJS to install download and install all the node dependencies as well as dependencies from the bower repository such as angular-syscoin-api and others:
```
root@server:public_html# sudo npm install
```
You will be prompted for your password and then a number of packages will be installed in *node_modules* and *bower_components* within public_html.
- 5. You will now have a copy of angular-syscoin-api in *public_html/bower_components/angular-syscoin-api* you will need to make sure to follow the config/setup instructions in the Angular Syscoin API repo before the blockmarket will work properly.

That's it! You're done with the basics, now some easy ways to customize your experience...

# Customization

Blockmarket is instended to be a "bootstrap" marketplace to get started buying and selling goods on the Syscoin network. While it is fairly generic at the moment there are some ways of customizing its appearance to make your market stand our from the rest. Here are some of the items you cna customize:
- color config
- featured items

# Continued Development

Blockmarket is still in an iterative beta phase. We encourage community and developer feedback. If you feel you can lend to the effort or improve the implementation **please issue pull requests** and we will review and merge them into the master branch. We want the final product to be the best experience possible for both merchants and their buyers.

