# commander
wrappers for some widely used commands

# usage
clone playground repo
```
git clone https://github.com/karpoff-titan/commander.git
cd commander
npm start
```
this will install commander shortcut

Then you should configure base path by
```stc config set path <path-for-st-directory>```

after that `stc` command will be available. Note that you can call it from any folder, it will set correct working directory by itself


##available commands

* stc app build - build main app (backend)
* stc app run - run main app (backend)
* stc app start - run main app (frontend)

* stc mre build - build marketing-review-engine  (backend)
* stc mre run-landing  - run marketing-review-engine  (landing backend)
* stc mre run-review  - run marketing-review-engine  (reviews backend)