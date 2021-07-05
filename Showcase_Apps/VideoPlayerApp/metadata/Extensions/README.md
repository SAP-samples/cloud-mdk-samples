# How to enable IntelliSense and Code Navigation in VS Code 

Having extensions within metadata definition would allow them to be bundled into your metadata bundle.js (MDK app) during deployment process and be updated as part of App Update via SAP Cloud Platform Mobile Services. 

During extension development, you might need to import some libraries from MDK SDK or NativeScript. These libs will be packed into bundle.js so that paths of imported libs must be the current directory path “./folder_name/class_name”, e.g. ‘./controls/IControl’. Unfortunately, developers will not be able to use IntelliSense and Code Navigation in VS Code due to the wrong import path.

To solve the issue, you can customize two files: [tsconfig.json](tsconfig.json) and [references.d.ts](references.d.ts).

## tsconfig.json
```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noEmitHelpers": true,
        "lib": [
            "es6",
            "dom"
        ],        
        "baseUrl": "../../../../../sdk/src/SnowblindClientApplication",
        "paths": {
            "*": ["app/*"],
            "mdk-sap":["./node_modules/mdk-sap"],
            "mdk-core/*": ["./modules/mdk-core/*"],
            "tns-core-modules/*": ["./node_modules/tns-core-modules/*"]
        }
    }
}
```
You only need to customize the property "***baseUrl***" in the json file. It should point to your MDK client path. Both IntelliSense and Code Navigation will work in VS Code once set correctly.

## reference.d.ts
***template***
```
/// <reference path="{path-to-yourMDKClientFolder}/node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="{path-to-yourMDKClientFolder}/node_modules/tns-platform-declarations/android-23.d.ts" />
```
***example***
```
/// <reference path="../../../../../sdk/src/SnowblindClientApplication/node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="../../../../../sdk/src/SnowblindClientApplication/node_modules/tns-platform-declarations/android-23.d.ts" />
```
The file supports IntelliSense and Code Navigation if you want to refer to some NativeScript built-in types, such as UIImageView, CGRect, WKWebView and so on. You need to change paths to your MDK client path. 

You don't need to change anything or delete the file if you don't have any reference to built-in types of NativeScript in your extensions.