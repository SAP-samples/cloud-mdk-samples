# MDK Generative AI 

This project serves as a Demo App for consuming SAP AI Core services and SAP HANA Vector DB service with the SAP Mobile Development Kit (MDK). It demonstrates the following use cases:

1. Extracting meter readings from images.
2. Detecting anomalies using images.
3. Generating operations based on text-described anomalies.
4. Auto-filling forms using speech-to-text conversion.

## Getting Started
### Prerequisites
1. Create an instance of SAP AI Core and then create a Service Key.

* refer to https://developers.sap.com/tutorials/ai-core-launchpad-provisioning.html and https://developers.sap.com/tutorials/ai-core-generative-ai.html for details on how to setup SAP AI Core and SAP AI Launchpad

2. Create a deployment for a model that supports the Chat Completions API and accepts image input. This demo uses the GPT-4o model.


```bash
Name: AICoreAPI
Description: SAP AI Core deployed service
URL: <AI-API-OF-AI-CORE-SERVICE-KEY>/v2 # make sure to add /v2!
Type: HTTP
ProxyType: Internet
Authentication: OAuth2ClientCredentials
tokenServiceURL: <TOKEN-SERVICE-URL-OF-AI-CORE-SERVICE-KEY>/oauth/token
clientId: <YOUR-CLIENT-ID-OF-AI-CORE-SERVICE-KEY>
clientSecret: <YOUR-CLIENT-SECRET-OF-AI-CORE-SERVICE-KEY>
# Additional Properties:
URL.headers.AI-Resource-Group: default # adjust if necessary
URL.headers.Content-Type: application/json
HTML5.DynamicDestination: true
```
4. Create a similar destination in Mobile Services for the deployed service using the Service Key of SAP AI Core for Mobile.


Please refer to the tutorial below to create a database that supports vectors.

https://github.com/SAP-samples/cap-ai-vector-engine-sample

The testing OData service has been modified to support the following functions:

    storeEmbeddings(value: String, chunkSize: String): returns String
    deleteEmbeddings(): returns String
    getRagResponse(value: String): returns String

For this demo, the embeddings are configured in PopulateEmbeddings.js

### Setup

#### Populate embeddings 

Populate embeddings into the vector database for retrieval-augmented generation (initial setup only).
1. Navigate to the Vector Admin page by clicking on `VectorDB` in the ActionBar.
2. Click `Clear` to remove existing data (optional).
3. Click `Populate` and wait a few seconds.

## Run

### Anomaly Detection and Meter Reading
1. Click on the `+` icon in the ActionBar to add images.
2. Upload images for anomaly detection and meter reading (optional).
3. Press `Submit` and wait for data to be processed.

### Auto filling forms via speech and text
1. Click any generated operation to navigate to the details page.
2. Click on `Edit` to modify the details.
3. Click on the `Star` icon to use AI for auto-filling forms.
4. Answer at least one of the displayed questions.
5. Click `Confirm` when done.

### Demo

##### Blogs
 [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 1 - Setup](https://community.sap.com/t5/technology-blogs-by-sap/sap-mobile-development-kit-mdk-integration-with-sap-ai-core-services-part-1/ba-p/13799088) 
 [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 2 - Business Use Cases](https://community.sap.com/t5/technology-blogs-by-sap/sap-mobile-development-kit-mdk-integration-with-sap-ai-core-services-part-2/ba-p/13801732) 
 [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 3 - Measurement Reading](https://community.sap.com/t5/technology-blogs-by-sap/sap-mobile-development-kit-mdk-integration-with-sap-ai-core-services-part-3/ba-p/13850930)
 [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 4 - Anomaly Detection and Maintenance Guidelines](https://community.sap.com/t5/technology-blogs-by-sap/sap-mdk-integration-with-sap-ai-core-services-part-4-anomaly-detection-and/ba-p/13856450)
 [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 5 - Retrieval Augmented Generation](https://community.sap.com/t5/technology-blogs-by-sap/sap-mdk-integration-with-sap-ai-core-services-part-5-retrieval-augmented/ba-p/13800342)
 [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 6 - Work Order and Operation Recording](https://community.sap.com/t5/technology-blogs-by-sap/sap-mdk-integration-with-sap-ai-core-services-part-6-work-order-and/ba-p/13876628)


## Development
In the demo flow, there are a total of 5 calls to AI Core and 2 calls to the vector database for Retrieval-Augmented Generation (RAG).

### AI calls
1. `SendMeterReadingRequest`: Meter reading request.
2. `SendAnomalyDetectionRequest`: Anomaly detection request.
3. `GenerateFormCells`: Generate form cells request.
4. `GenerateGuidedQuestions`: Generate guided questions request.
5. `SendFormFillRequest`: Form fill request.

The prompts are not fully optimized and may require user adjustments for improved accuracy. All calls to the AI are formatted via function calls into a schema for easier formatting. Each uploaded image will take approximately 5 to 10 seconds to process, depending on its size.

### RAG calls
1. `GetEquipmentName`: Retrieve equipment name.
2. `GetEquipmentSchema`: Retrieve equipment schema.

RAG is used during AI calls to generate specific form cells on the operation details page. For example, a water pump may have different details compared to a laptop. RAG ensures that the AI generates the appropriate operation details. Currently, the knowledge base is limited to a few equipment types (e.g., water pumps, electricity meters).

Users can add more knowledge through PopulateEmbeddings.js by specifying the equipment name, description, and schema in the knowledge base string. There are two types of schemas: common and specific. The common schema includes details generated by anomaly detection, while the specific schema is expected to be user-filled.

To update the database, clear and repopulate the embeddings via VectorDB.

### Limitation
Only one type of equipment image can be uploaded per anomaly detection request. For example, you can upload multiple images of a water pump but not images of different equipment types simultaneously. Users may need to refine the prompts to overcome this limitation.

Note that the NativeScript voice plugin is used for this demo for voice input since voice input is not yet supported by the Chat Completions API.
