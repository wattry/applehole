# Apple Hole

If you're here you've been on an important call MacOS has decide it's the perfect time to try sell you another subscription, and sprung open the Apple Music application you never installed and a service you'll never use.

There are fantastic solutions out there like (No Tunes)[https://github.com/tombonez/noTunes] that solve this problem and perform the vital service; preventing corporate humiliation. Though, out of personal vendetta I wanted to learn how to fight the power.

Simply put this just an a log stream to vigilantly watch for when Apple Music or Mail is opened and let it know to sit down.


## Install

### DMG
Download the [latest release](https://github.com/wattry/applehole/releases/latest) .dmg file
and open it. Since it's not signed you'll have to open Privacy settings and allow AppleHole to run.
You can view the source script that is packaged [here](https://github.com/wattry/applehole/blob/main/scripts/AppleHole). 

You can run it by clicking on it in your Applications folder or you can added it to your startup programs if you want it to load automatically.

The Install Daemon will add a user daemon to handle the application where you can do the following.

```shell
launchctl stop AppleHole

launchctl start AppleHole
```

### From source
Pull down the source code and run

```shell
pnpm instal
pnpm run build
```

The dmg will be in assets/AppleHole-local.dmg

### Run the bash script
Download the [latest release](https://github.com/wattry/applehole/releases/latest) of the
AppleHole.sh and move it to the directory you want it to run from. I suggest ~/bin but
you can added it where you like.

```shell
mv ~/Downloads/AppleHole.sh ~/bin
chmod +x ~/bin/AppleHole.sh
```

You can start it by running `~/bin/AppleHole.sh` or you can added it to your startup programs 
