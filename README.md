# Dealme.Today Client (iOS)

This is the client side React native code for the NVD Project Dealme. 

## Installation


- clone repo

- run ```npm install && react-native run-ios```

## Testing

We are using detox to run user testing via automated inputs. Test files are found under the e2e 
directory and should be named testName.spec.js. To runt he test simply run ```npm run test```

## Known Issues

- **react-native-facebook-login cannot be removed when installing new dependencies**
    
    This issue is due to a .git file present in the package. Please run
    ```rm -rf /node_modules/react-native-facebook-login/.git``` to fix.
- **cannot find module X in haste map**
    
    This error is usually due to running npm install, where custom modifications of dependencies are overwritten. 
    
    Try:
    
    - Either the module is not correctly installed or there is a version conflict peer dependencies.
    Check to see if react version is 16.6.3 and react-native version is 0.57.8.
        
    - Reinstalling react-native-cypto as per instructions at  https://www.npmjs.com/package/react-native-crypto
      
    
