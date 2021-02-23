# MDK Sample Applications

All of the applications in these folders are full working applications.  Please refer to the README in each directory for information related to the setup and use of the application.  It will also identify any minimum MDK version requirements along with pointing out any key highlights of the application.

***
## Applications
* MDK Demo Application

***

## Setup and Installation

### Mobile Application Setup
To run any of the applications, you will need to setup an Application in Mobile Servies for the MDK Client to onboard against when running the sample application.

1. Create an application in CF Mobile Services
1. Select the Assign Features for: Mobile Development Kit Application
1. In addition to the default feature set, also select the **Mobile Sample OData ESPM** feature

For a more detailed tutorial on the initial configuration please see the [Set Up Initial Configuration for an MDK App](https://developers.sap.com/tutorials/cp-mobile-dev-kit-ms-setup.html) tutorial.

### MDK Editor (Business Application Studio)
It is assumed that you will use Business Application Studio as the Editor environment for working with the sample application.  The steps below are for the BAS environment, but the application metadata can also be used with WebIDE or the Visual Studio Code MDK Editor.
1. If you do not already have a dev space created, on the BAS Dev Spaces page click **Create Dev Space**
1. Enter the name for your Dev Space
1. Select SAP Mobile Services as the type for your Dev Space
1. Click the **Create Dev Sapce** button at the bottom.  The Dev Space will be created an automatically Started.
1. Once Running, the name will become a link to launch the Editor
1. Login the CF Org / Space where your CF Mobile Services application exists
1. Click the **Open Workspace** button and click Open to open the Projects folder workspace
1. Open a Terminal window by selecting Terminal > New Terminal from the menus
1. Clone this repository by executing the following command in the terminal window
    > git clone this_repository_url
1. In the Explorer, navigate to the folder containing the sample application you want to deploy
1. Right click on the Application.app and select **MDK: Deploy** and follow the prompts to complete the deployment
1. Launch the MDK Client on your mobile device and onboard using the QR code in the Application.app for the sample application

For a more detailed tutorial on the editor setup please see the [Set Up SAP Business Application Studio for Mobile Development](https://developers.sap.com/tutorials/cp-mobile-bas-setup.html) tutorial.
