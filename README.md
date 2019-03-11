# Dealme.Today Client (iOS)

This is the client side React native code for the NVD Project Dealme. 

## Installation


- clone repo

- run ```npm install && react-native run-ios```


## Known Issues

- **react-native-facebook-login cannot be removed when installing new dependencies**
    
    This issue is due to a .git file present in the package. Please run
    ```rm -rf /node_modules/react-native-facebook-login/.git``` to fix.
- **cannot find module X in haste map**

    Either the module is not correctly installed or there is a version conflict peer dependencies.
    Check to see if react version is 16.6.3 and react-native version is 0.57.8.


