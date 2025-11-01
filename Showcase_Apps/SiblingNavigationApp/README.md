# Sibling Navigation App
TBD

For more details about Sibling Navigation check out the [SAP Fiori Design Guidelines](https://experience.sap.com/fiori-design-ios/article/siblingnavigation/)

*Last Updated: 09-Oct-2025*

### Author
* Robin Kuck ([GitHub](https://github.com/robinkuck), [SAP Community](https://community.sap.com/t5/user/viewprofilepage/user-id/16438))

***

## Requirements

### Supported Platforms

* iOS
* Android

### MDK Client Version

* MDK 25.9 or higher

### Data Source

* Mobile Services Sample OData ESPM (destination created as com.sap.edm.sampleservice.v4)

***

## Key Highlights

* Navigation between MDK Pages with custom implementation of [Action Binding](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/action-binding-and-result.html#action-binding) (defined in [SiblingNavigationApp/Rules/SalesOrderHeaders_List/OnPressObjectCell.js](SiblingNavigationApp/Rules/SalesOrderHeaders_List/OnPressObjectCell.js), line 8)
* Access Data of a different UI Control's [Target Binding](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/features/backend-connectivity/mdk/odata-crud.html#target-binding) using [Target Path](https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/property-binding/target-path.html) (defined in [SiblingNavigationApp/Rules/SalesOrderHeaders_Detail/OnPressPreviousNavigationButton.js](SiblingNavigationApp/Rules/SalesOrderHeaders_Detail/OnPressPreviousNavigationButton.js), line 9)

***

## Setup Instructions

No additional steps required. The content of [SiblingNavigationApp/](SiblingNavigationApp/) folder can be used as is to run the application.

## Screenshots

### iOS
TBD

### Android
TBD