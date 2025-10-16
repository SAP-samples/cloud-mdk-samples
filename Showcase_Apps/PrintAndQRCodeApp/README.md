# Print And QR Code App

This is a showcase application that demonstrate how to:

1. Include non-UI based NativeScript plugin in your custom branded client (`.mdkproject`)
2. Use the plugins in your project to:
      1. Generate QR Code as image from text using `nativescript-qr-generator` plugin
      2. Print the image using the `nativescript-printer` plugin

*Last Updated: 15-Oct-2025*

***

## Author

* Ming Kho ([GitHub](https://github.com/mingkho), [SAP Community](https://people.sap.com/ming.kho))

***

## Requirements

### *Supported Platforms*

* iOS
* Android

### *MDK Client Version*

* MDK 24.11 or higher

### *Data Source*

* Mobile Services Sample OData ESPM (destination created as com.sap.edm.sampleservice.v4)

***

## Key Highlights

* Showing how to import 3rd party plugin into your rules.
* Make use of ClientData to store information for later use in the app.
* Showing how to execute a rule from another rule.

***

## Setup Instructions

This showcase application requires that you create your own client in order to explore the application.  

The `printapp.mdkproject` folder contains the MDK client configuration to add the external plugins to the client but does not contain the application metadata.  It is assumed that you will load and deploy the metadata to Mobile Services from an MDK Editor.

For a more detailed information on the setup for MDK development please see the following tutorial.

* [Build Your Mobile Development Kit Client Using MDK SDK](https://developers.sap.com/tutorials/cp-mobile-dev-kit-build-client.html)

If you are using SAP Business Application Studio or Visual Studio Code to develop your app, then you need to add `"nativescript-printer"` and `"nativescript-qr-generator"` to the externals property of the built-in MDK bundler tool.

Go to `Preferences` > Search for "MDK Bundler Externals" > Press Edit in settings.son > Add `"nativescript-printer"` and `"nativescript-qr-generator"` inside the `"mdk.bundlerExternals"` array. e.g.

```json
"mdk.bundlerExternals": [
 "nativescript-printer",
 "nativescript-qr-generator"
]
```


## Screenshots

| Functionality | Android | iOS |
| --- | --- | --- |
| QR Code | <img src="./Screenshots/Android1.png" alt="MDK" width="228" style="max-height:450px; object-fit:contain;" /> | <img src="./Screenshots/iOS1.png" alt="MDK" width="228" style="max-height:450px; object-fit:contain;" /> |
| Printing | <img src="./Screenshots/Android2.png" alt="MDK" width="228" style="max-height:450px; object-fit:contain;" /> | <img src="./Screenshots/iOS2.png" alt="MDK" width="228" style="max-height:450px; object-fit:contain;" /> |

