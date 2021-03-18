# Read Me First

## PDF Generation App

This is a showcase application that demonstrate how to generate PDF document using 3rd party open source library : `pdfmake`:

1. Include non-UI based NPM plugin in your custom branded client (`.mdkproject`)
2. Use the plugin in your project to generate PDF document.

This showcase application is loosely based on the following guide:
[Pdf generation in NativeScript using JavaScript libraries](https://medium.com/@kumarandena/pdf-generation-in-nativescript-using-javascript-libraries-864ecf4e9a3a)

And contains excerpt of sample code from the following project [nativescript-pdf-generation](https://github.com/kumarandena/nativescript-pdf-generation)

Last Updated: 18-Mar-2021

***

## Requirements

### Supported Platforms

* iOS
* Android

### MDK Client Version

* MDK 5.1 or higher

### Data Source

* Mobile Services Sample OData ESPM

***

## Key Highlights

* Showing how to import 3rd party NPM plugin into your JavaScript rules.
* Showing how to use the 3rd party NPM plugin in your JavaScript rules to generate PDF file.

***

## Setup Instructions

This showcase application requires that you create your own client in order to explore the application.

The `pdfgenapp.mdkproject` folder contains the MDK client configuration to add the external plugins to the client but does not contain the application metadata. The application metadata is the `PDFGeneratorApp` folder and it is assumed that you will load and deploy the metadata to Mobile Services from an MDK Editor.

For a more detailed information on the setup for MDK development please see the following tutorial.

* [Build Your Mobile Development Kit Client Using MDK SDK](https://developers.sap.com/tutorials/cp-mobile-dev-kit-build-client.html)

After executing the create-client command you need to:

1. Generate this project using the the create-client command/cmd
2. Go to the generated `PDFGenApp` folder in Terminal
3. Execute `npm i pdfmake` to install the PDFMake library to your project (Note: PDFMake is not a NativeScript Plugin, therefore you can't use the `NSPlugins` property in `MDKProject.json` to install it)
4. You need to do this every time you regenerate the project using the create-client command/cmd

If you are using Visual Studio Code to develop your app too, then it's also best to add `"pdfmake/build/pdfmake"` to the externals property of the built-in MDK bundler tool.
Go to VS Code Settings > Search for "MDK Bundler Externals" > Press Edit in settings.son > Add `"pdfmake/build/pdfmake"` inside the `"mdk.bundlerExternals"` array. e.g.

```json
"mdk.bundlerExternals": [
 "pdfmake/build/pdfmake"
]
```

`PDFGeneratorApp` is the application metadata project that you can import into your SAP Business Application Studio workspace or SAP Web IDE Full Stack workspace. You should deploy this project to your mobile services account and make sure to enable Mobile Services Sample OData ESPM feature in your mobile services app.
