# AI-Enabled Field Service App

This is a showcase application that demonstrates how to consume SAP AI Core and SAP HANA Vector DB services using the SAP Mobile Development Kit (MDK). The application was created during the SAP MDK integration with SAP AI Core services blog series. Links to the blog posts are included below. The application demonstrates:

1. Extracting meter readings from images
2. Detecting anomalies from images
3. Generating operations based on text-described anomalies
4. Auto-filling forms using speech-to-text conversion

*Last Updated: 22-Dec-2025*

***

## Author

* Qiu Shi Wang ([GitHub](https://github.com/gqswang))

***

## Requirements

### *Supported Platforms*

* iOS
* Android

### *MDK Client Version*

* MDK 24.11 or higher

### *Data Source*

* SAP AI Core destination
* CAP Vector Engine service destination

***

## Setup Instructions
### Prerequisites
1. Create an instance of SAP AI Core and then create a service key.

    > Refer to the following tutorials for details on how to set up [SAP AI Core](https://developers.sap.com/tutorials/ai-core-generative-ai.html) and [SAP AI Launchpad](https://developers.sap.com/tutorials/ai-core-launchpad-provisioning.html).

2. Create a deployment for a model that supports the Chat Completions API and accepts image input. This demo uses the GPT-4o model.

3. Create a destination in the Mobile Servies Admin UI > your app configuration > **Connectivity** with the following information:

    | Step | Field | Value |
    |----|----|----|
    | Basic Info | `Destination Name`| `AICoreAPI` |
    | Basic Info | `Destination Type`| `Internet Destination` |
    | Basic Info | `URL` | `<AI-API-OF-AI-CORE-SERVICE-KEY>/v2` |
    | Destination Configuration | SSO Mechanism | `OAuth2 Client Credentials` |
    | Destination Configuration | Token Service URL | `<TOKEN-SERVICE-URL-OF-AI-CORE-SERVICE-KEY>/oauth/token` |
    | Destination Configuration | Client ID | `<YOUR-CLIENT-ID-OF-AI-CORE-SERVICE-KEY>` |
    | Destination Configuration | Client Secret | `<YOUR-CLIENT-SECRET-OF-AI-CORE-SERVICE-KEY>` |

    ![MDK](./Screenshots/Destination.png)

Please refer to the tutorial below to create a database that supports vectors:

https://github.com/SAP-samples/cap-ai-vector-engine-sample

The testing OData service has been modified to support the following functions:

    ```JavaScript
    storeEmbeddings(value: String, chunkSize: String): returns String
    deleteEmbeddings(): returns String
    getRagResponse(value: String): returns String
    ```

For this demo, the embeddings are configured in `PopulateEmbeddings.js`.

## Setup

After onboarding to the application in the MDK client, the vector database needs to be populated using the following steps:

#### Populate embeddings 

Populate embeddings into the vector database for retrieval-augmented generation (initial setup only).
1. Navigate to the Vector Admin page by clicking on `VectorDB` in the ActionBar.
2. Click `Clear` to remove existing data (optional).
3. Click `Populate` and wait a few seconds.

## Run

### Anomaly Detection and Meter Reading
1. Click on the `+` icon in the ActionBar to add images.
2. Upload images for anomaly detection and meter reading (optional).
3. Press `Submit` and wait for the data to be processed.

### Auto-filling Forms via Speech and Text
1. Click any generated operation to navigate to the details page.
2. Click on `Edit` to modify the details.
3. Click on the `Star` icon to use AI for auto-filling forms.
4. Answer at least one of the displayed questions.
5. Click `Confirm` when done.

### Demo

##### Blogs
 1. [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 1 - Setup](https://community.sap.com/t5/technology-blog-posts-by-sap/sap-mobile-development-kit-mdk-integration-with-sap-ai-core-services-part-1/ba-p/13799088) 
 2. [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 2 - Business Use Cases](https://community.sap.com/t5/technology-blog-posts-by-sap/sap-mobile-development-kit-mdk-integration-with-sap-ai-core-services-part-2/ba-p/13801732) 
 3. [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 3 - Measurement Reading](https://community.sap.com/t5/technology-blog-posts-by-sap/sap-mobile-development-kit-mdk-integration-with-sap-ai-core-services-part-3/ba-p/13850930)
 4. [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 4 - Anomaly Detection and Maintenance Guidelines](https://community.sap.com/t5/technology-blog-posts-by-sap/sap-mdk-integration-with-sap-ai-core-services-part-4-anomaly-detection-and/ba-p/13856450)
 5. [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 5 - Retrieval Augmented Generation](https://community.sap.com/t5/technology-blog-posts-by-sap/sap-mdk-integration-with-sap-ai-core-services-part-5-retrieval-augmented/ba-p/13800342)
 6. [SAP Mobile Development Kit (MDK) integration with SAP AI Core services: Part 6 - Work Order and Operation Recording](https://community.sap.com/t5/technology-blog-posts-by-sap/sap-mdk-integration-with-sap-ai-core-services-part-6-work-order-and/ba-p/13876628)


## Development
In the demo flow, there are a total of five calls to AI Core and two calls to the vector database for Retrieval-Augmented Generation (RAG).

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

Users can add more knowledge through `PopulateEmbeddings.js` by specifying the equipment name, description, and schema in the knowledge base string. There are two types of schemas: common and specific. The common schema includes details generated by anomaly detection, while the specific schema is expected to be user-filled.

To update the database, clear and repopulate the embeddings via VectorDB.

### Limitations
Only one type of equipment image can be uploaded per anomaly detection request. For example, you can upload multiple images of a water pump but not images of different equipment types simultaneously. Users may need to refine the prompts to overcome this limitation.

Note: The NativeScript voice plugin is used for this demo, as voice input is not yet supported by the Chat Completions API.

## Screenshots

### Architecture Diagram
<img src="./Screenshots/ArchDiagram.png" alt="MDK" width="800" style="max-height:1600px; object-fit:contain;" />


| Functionality | iOS |
| --- | --- | 
| Equipment Check with AI | <img src="./Screenshots/EquipCheckwithAI.png" alt="MDK" width="228" style="max-height:450px; object-fit:contain;" /> |
| Voice Input | <img src="./Screenshots/VoiceInput.png" alt="MDK" width="228" style="max-height:450px; object-fit:contain;" /> |
| | <img src="./Screenshots/VoiceInput2.png" alt="MDK" width="228" style="max-height:450px; object-fit:contain;" /> |

