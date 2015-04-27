###### Important Note: These instructions are beta and are intended to be used with the latest BETA release of the [Syscoin Wallet](https://github.com/syscoin/syscoin/releases)
# Blockmarket Beta
Blockmarket is a single wallet web UI implementation built on top of [Syscoin's decentralized marketplace API](https://github.com/syscoin/syscoin-api). Blockmarket is intended to be easy to setup but does require some technical knowledge of linux. *Blockmarket is still in beta, so the easy-setup process is still a work in progress as core development is still ongroing.* 

This software is currently in beta and as such it requires to be run on Syscoin's test blockchain for the time being (aka: cakenet). Due to this limitation it can only be used for expirmentation and more in-depth merchant and buyer feedback which we encourage using GitHub issues. We're hoping by releasing this beta code we'll be able to make the final product more attractive to a larger audience and gain wider traction immediately.

# Blockmarket Setup

Blockmarket is a web UI for easily managing your own market on the Syscoin network and also enables buyers to easily make purchases from your market on the network. Because this is a web interface written in HTML/CSS/JS (AngularJS), we'll be using this suit of tools once setup is complete:

- A webserver of your choosing, for the purposes of this walkthrough we'll assume [Apache](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts)
- Syscoin's latest beta wallet, currently [**1.5.2 beta4**](https://github.com/syscoin/syscoin/releases/tag/1.5.2b4) with some amount of tSYS (test Syscoin)
- NodeJS must be installed, so that you can more easily install the blockmarket dependencies and so that you can run [Syscoin-API](https://github.com/syscoin/syscoin-api) a package developed by team.
- The web front end of this application uses AngularJS and the [Angular Syscoin API](https://github.com/syscoin/angular-syscoin-api) also developed by the team, *in the end this will be auto-installed by the node packager but while in beta you must manually clone this into your bower_components folder, see step 5 below for more details.

*If you're interested on more information on any of the Syscoin Team provided libraries please visit the links above for more information*

## Installing the dependencies

*These instructions generally assume an Ununtu operating system*

1. First you should get a web server setup (we recommend [Apache](https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts), setup may vary based on environment). You will also want to install [NodeJS](https://nodejs.org/) for your environment.
 
2. Next you need to install the [Syscoin 1.5.2 beta4 wallet](https://github.com/syscoin/syscoin/releases/tag/1.5.2b4) for your environemnt. If you're running an ubuntu server you'll need to compile the daemon.
 
3. With the wallet installed, make sure you follow the setup instructions for [Syscoin API](https://github.com/syscoin/syscoin-api) and then start the API server, you'll want to start it in something like a linux screen so that it continues to run after you log out:
 ```
 root@server:syscoin-api# screen nodejs server.js
 ```
 
4. Once the API server is running, you'll want to clone the blockmarket repository into whatever the web root of your marketplace is:
 ```
 root@server:www# git clone https://github.com/syscoin/blockmarket.git public_html
 ```
 
5. Now use nodeJS to install bower and run bower to install all the dependencies:
 ```
 root@server:public_html# sudo npm install -g bower
 root@server:public_html# sudo bower install
 ```
 You will be prompted for your password and then a number of packages will be installed in *node_modules* (within the usr/bin folder) and *bower_components* (within public_html).
 
6. You will now have a copy of [angular-syscoin-api](https://github.com/syscoin/angular-syscoin-api) in *public_html/bower_components/angular-syscoin-api* you will need to make sure to follow the config/setup instructions in the [Angular Syscoin API](https://github.com/syscoin/angular-syscoin-api) repo before the blockmarket will work properly.

That's it! You're done with the basics, add some items via the admin interface (if you have enough tSYS) and you should start to see them pending confirmation.

# Customization

Blockmarket is intended to be a "bootstrap" marketplace to get users started buying and selling goods on the Syscoin network. While it is fairly generic at the moment there are some ways of customizing its appearance to make your market stand our from the rest. Here are some of the items you cna customize at the moment:

**Customizing Appearance**
```
//Edit app/config.js
.constant("APP_CONFIG", {
            VERSION: "0.1 beta4",
            THEME: "cerulean", //preview and full template list here: https://bootswatch.com
            COLOR: "#FC3A99",
    })
```
By changing the THEME [see valid themes at bootswatch](https://bootswatch.com) and COLOR values you can customize the appearance of your marketplace.

**Specifying Your PGP Public Key**
For the safety of your consumers you'll also want to change the PGP public key being used to your own key. At the moment this must be manually entered in config.js underneath the COLOR and THEME section. In order to properly encrypt your information you will need to manually enter each line of the PGP key and the newline characters in raw JS; *We aim to make setting up your PGP key in the final release much simpler*.

**Setting your Featured Items**
Featured and banned items are currently manually entered in config.js, *another feature we plan on moving into a UI based control*.
```
//Edit app/config.js
.constant("FEATURED_ITEMS",["056c7958b7b8b77e", "12cd7958b7b8b88e"])

//If there are items you wish to hide, edit BANNED_ITEMS
.constant("BANNED_ITEMS", ["01fad009586507dd00", "7326f26d6a9f3bc800"])
```

# Continued Development

Blockmarket is still in an iterative beta phase. We encourage community and developer feedback. If you feel you can lend to the effort or improve the implementation **please issue pull requests** and we will review and merge them into the master branch. We want the final product to be the best experience possible for both merchants and their buyers.

