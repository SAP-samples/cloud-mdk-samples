# Partial Upload App

This is a showcase application that demonstrates how to:

1. Add Upload Categories to OData Create, Update, and Delete actions
2. Use Upload Categories in the Offline OData Upload action to selectively send only transactions matching the specified Upload Categeory

*Last Updated: 17-Mar-2021*

***

## Requirements

### *Supported Platforms*

* iOS
* Android

### *MDK Client Version*

* MDK 5.1 or higher

### *Data Source*

* Mobile Services Sample OData ESPM

***

## Key Highlights

* Categorizes Customer versus Product OData transactions
* Includes buttons on the respective List pages to upload only Customer or only Product transactions

***

## Usage

After onboarding of the application
1. Go into the Customer List / Details and Edit one or more customers
1. Go into the Product List / Details and Edit one or more products
1. Use the Upload Customer Only button on the Customer List page to send only the Customer transactions
1. Verify only the appropriate transactions were sent to the backend
1. Make additional Customer Edits
1. Use the Upload Product Only button on the Product List page to send only the Product transactions
1. Verify only the appropriate transactions were sent to the backend

***

## Verification

Verify only the customer or product transactions are sent though:
* Turning on Mobile Network Trace and capturing the headers and body to review exactly what was sent
* Opening the Mobile Connection in the browser to view the Customers and Products to see the changes after upload do not include the other changes

***

For a more detailed information on the setup of the application in Mobile Services with the Sample Backend please see the following tutorial.

* [Set Up Initial Configuration for an MDK App](https://developers.sap.com/tutorials/cp-mobile-dev-kit-ms-setup.html)