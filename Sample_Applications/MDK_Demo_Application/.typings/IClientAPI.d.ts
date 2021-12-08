/// version: MDK SDK 6.1

/**
 * A designer-facing interface that provides access to a context.
 * It can be passed to rules to provide access to the context for
 * that rule, i.e. the associated binding and UI element as well
 * as other useful data.
 */
 interface IClientAPI {
  /**
   * Provide a simple property access to the binding
   */
  binding: Object;
  /**
   * provide property for action results
   */
  actionResults: any;
  /**
   * Get the topmost page in the navigation stack
   */
   currentPage: any;
   /**
   * Synchronously evaluate the target path and return the value from the resulting context.
   * 
   * @param path the target path to be evaluated
   * @returns the value from the resulting context. 
   * If an element is on the context, consider that the final value. Otherwise use binding.
   */
  evaluateTargetPath(path: string): any;
  /**
   * SynchronouslyeEvaluate the target path and return the ClientAPI instance which encapsulates the result
   * 
   * @param path the target path to be evaluated. Cannot be undefined or empty
   * @returns a ClientAPI instance holding the result of target path evaluation,
   * which can vary from a simple string to a view representation. 
   */
  evaluateTargetPathForAPI(path: string): IClientAPI;
  /**
   * Client API to enable/override the DebugSettings during runtime. 
   * 
   * @param debugODataProvider boolean to add console logger to the OData provider set to Debug level
   * @param tracingEnabled boolean to turns on tracing (execution time) for rules, actions, and so on.
   * @param categories  array of tracing categories to enable the console log based on categories.
   */
   setDebugSettings(debugODataProvider: boolean, tracingEnabled: boolean, categories: string[]): void     
/**
   * Execute an action. 
   * To ensure that the application waits for the action to complete, 
   * you must return the Promise returned by this method as the result of the rule.
   * Not doing this may cause the action binding and pressed item to be reset before the action completes.
   * @param actionPath the action path
   */
  executeAction(actionPath: string);
  /**
   * This method is to format date object into locale Date string
   * 
   * @param date date value to be formatted into locale string.
   * Accepted values are datetime object, datetime in UTC string, timestamp number, datetimeoffset string
   * @param customLocale custom locale to be used in formatting the value
   * @param customTimeZone custom time zone to be used in formatting the value, must be a valid 
   * time zone name e.g. UTC, GMT+8, Europe/Berlin
   * @param customOptions custom options (in JSON object format) for formatting the value.
   * Currently, the supported key is 'format' with the following possible value: 
   * <ul>
   * <li>'short'</li>
   * <li>'medium'</li>
   * <li>'long'</li>
   * <li>'full'</li> 
   * </ul>
   * Default: medium
   * @return {string} formatted string
   * 
   */
  formatDate(date: Date, customLocale?: string, customTimeZone?: string, customOptions?: any): string;
  /**
   * This method is to format date object into locale DateTime string
   * 
   * @param date date value to be formatted into locale string.
   * Accepted values are datetime object, datetime in UTC string, timestamp number, datetimeoffset string
   * @param customLocale custom locale to be used in formatting the value
   * @param customTimeZone custom time zone to be used in formatting the value, 
   * must be a valid time zone name e.g. UTC, GMT+8, Europe/Berlin
   * @param customOptions custom options (in JSON object format) for formatting the value.
   * Currently, the supported key is 'format' with the following possible value: 
   * <ul>
   * <li>'short'</li>
   * <li>'medium'</li>
   * <li>'long'</li>
   * <li>'full'</li> 
   * </ul>
   * Default: medium (date), short (time)
   * @return {string} formatted string
   * 
   */
  formatDatetime(date: Date, customLocale?: string, customTimeZone?: string, customOptions?: any): string;
  /**
   * This method is to format number into currency display format according to selected locale
   * 
   * @param value numeric value to be formatted into currency display format
   * @param currencyCode currency code to format
   * @param customLocale custom locale to be used in formatting the value
   * @param customOptions custom options to be used in formatting the value. 
   * The available options are: 
   * <ul>
   * <li>minimumIntegerDigits: The number of integer digits allowed as output. Default is 1 (System default).</li>
   * <li>minimumFractionDigits: The minimum number of digits after the decimal separator allowed as output. Default is 0 (System default).</li>
   * <li>maximumFractionDigits: The maximum number of digits after the decimal separator allowed as output. The default is managed by system default based on currency code.</li>
   * <li>useGrouping: Determines whether the display should show the group separator. The default is managed by system default based on currency code.</li>
   * </ul>
   * <br />Example: \{maximumFractionDigits:2,useGrouping:true\}
   * @return {string} formatted number in currency display format
   */
  formatCurrency(value: number, currencyCode: string, customLocale?: string, customOptions?: any): string;
  /**
   * This method is to format number according to selected locale
   * 
   * @param value numeric value to be displayed in format according to selected locale
   * @param customLocale custom locale to be used in formatting the value
   * @param customOptions custom options to be used in formatting the value: 
   * The available options are: 
   * <ul>
   * <li>minimumIntegerDigits: The number of integer digits allowed as output. Default is 1 (System default).</li>
   * <li>minimumFractionDigits: The minimum number of digits after the decimal separator allowed as output. Default is 0 (System default).</li>
   * <li>maximumFractionDigits: The maximum number of digits after the decimal separator allowed as output. Default is 2 (MDK default).</li>
   * <li>useGrouping: Determines whether the display should show the group separator. Default is true (MDK default).</li>
   * </ul>
   * <br />Example: \{maximumFractionDigits:2,useGrouping:true\}
   * @return {string} formatted number
   */
  formatNumber(value: number, customLocale?: string, customOptions?: any): string;
  /**
   * This method is to format number to into percent display format
   * 
   * @param value numeric value to be formatted into percent display string
   * @param customLocale custom locale to be used in formatting the value
   * @param customOptions custom options to be used in formatting the value: 
   * The available options are: 
   * <ul>
   * <li>minimumIntegerDigits: The number of integer digits allowed as output. Default is 1 (System default).</li>
   * <li>minimumFractionDigits: The minimum number of digits after the decimal separator allowed as output. Default is 0 (System default).</li>
   * <li>maximumFractionDigits: The maximum number of digits after the decimal separator allowed as output. Default is 2 (MDK default).</li>
   * <li>useGrouping: Determines whether the display should show the group separator. Default is true (MDK default).</li>
   * </ul>
   * <br />Example: \{maximumFractionDigits:2,useGrouping:true\}
   * @return {string} formatted number in percentage
   */
  formatPercentage(value: number, customLocale?: string, customOptions?: any): string;
  /**
   * This method is to format scientific style number according to selected locale
   * 
   * @param value numeric value to be displayed in scientific style according to selected locale
   * @param customLocale custom locale to be used in formatting the value
   * @param customOptions custom options to be used in formatting the value: 
   * The available options are: 
   * <ul>
   * <li>minimumIntegerDigits: The number of integer digits allowed as output. Default is 1 (System default).</li>
   * <li>minimumFractionDigits: The minimum number of digits after the decimal separator allowed as output. Default is 0 (System default).</li>
   * <li>maximumFractionDigits: The maximum number of digits after the decimal separator allowed as output. Default is 2 (MDK default).</li>
   * <li>useGrouping: Determines whether the display should show the group separator. Default is true (MDK default).</li>
   * </ul>
   * <br />Example: \{maximumFractionDigits:2,useGrouping:true\}
   * @return {string} formatted number
   */
  formatScientific(value: number, customLocale?: string, customOptions?: any): string;
  /**
   * This method is to format date object into locale Time string
   * 
   * @param date date value to be formatted into locale string.
   * Accepted values are datetime object, datetime in UTC string, timestamp number, datetimeoffset string
   * @param customLocale custom locale to be used in formatting the value
   * @param customTimeZone custom time zone to be used in formatting the value, 
   * must be a valid time zone name e.g. UTC, GMT+8, Europe/Berlin
   * @param customOptions custom options (in JSON object format) for formatting the value.
   * Currently, the supported key is 'format' with the following possible value: 
   * <ul>
   * <li>'short'</li>
   * <li>'medium'</li>
   * <li>'long'</li>
   * <li>'full'</li>
   * </ul>
   * Default: short
   * @return {string} formatted string
   */
  formatTime(date: Date, customLocale?: string, customTimeZone?: string, customOptions?: any): string;
/** 
   * This method converts base64 string to binary data
   * @param base64 base64 string 
   * @returns a promise with a binary data once it is resolved
   */
  base64StringToBinary(base64: string): Promise<any>;
  /** 
   * This method formats MDK base64 string with content type
   * @param base64 base64 string
   * @param contentType base64 content type like "image/jpeg", "application/pdf"
   * @returns formatted base64 string. 
   */
  formatBase64String(base64: string, contentType: string): string;
  /**
   * Get the data which provides additional information about an app event, 
   * such as an app launch or exit, if such an event just occurred
   */
  getAppEventData(): any;
  /**
   * Get the action result stored under the unique key
   */
  getActionResult(key: string): IActionResult;
  /**
   * Get the current context's binding object
   * @deprecated - use the new property getter
   */
  getBindingObject(): Object;
  /**
   * get the current context's binding's read link if any. Undefined otherwise
   * @param path target path into the binding
   */
  getReadLink(path: string): string;
  /**
   * Get the client data object. This starts out as a plain JavaScript object, 
   * and can be modified to hold application state.
   * Can only be accessed for IClientAPI instances associated with a UI element, 
   * because that guarantees that the data will last for the lifetime of that element.
   */
  getClientData(): Object;
  /**
   * Get the Application context client data object. This starts out as a plain JavaScript object, 
   * and can be modified to hold application state.
   * Can only be accessed for IClientAPI instances associated with a UI element, 
   * because that guarantees that the data will last for the lifetime of that element.
   */
   getAppClientData(): Object;
  /** 
   * Get the global definition for the specified path.
   */
  getGlobalDefinition(globalPath: string);
  /** 
   * Get Page metadata definition for the specified path as JSON object.
   */
   getPageDefinition(pagePath: string);
  /**
   * Converts a regular rectangular image into a circular one.
   * 
   * @param base64EncodedImageStr The Base64 image string which is to be made circular
   * @returns A Base64 string of the circular image, this image will be in PNG extensions.
   */
  getCircularImage(base64EncodedImageStr: string): string;
  /**
   * Creates an Image out of text provided in the iconText parameter.
   * A max of two letters can be displayed on the image.
   * 
   * @param iconText  Text that is to be used for generating the IconTextImage
   * @param width Width of the image
   * @param height Heght of the image 
   * @param isCircular Decides whether the image should be circular in shape
   * @param stylesJSON FontSize, FontColor and BackgroundColor can be given in a Json to style the IconTextImage
   * @returns a Base64 string of IconTextImage.
   */
  getIconTextImage(iconText: string, width: number, height: number, isCircular: true, stylesJSON?: string): string;
  /**
   * This method delgates to the AppSettingsManager to determine if the current
   * page has a pending download.
   * 
   * @param page page object path
   * @return returns a pending download for this page, which is a
   * JSON action binding associated with the download. Otherwise undefined
   */
  getPendingDownload(page: string): any;
  /**
   * Determine if the page is the topmost page in the navigation stack
   */
  isCurrentPage(pageName: string): boolean;
  /**
   * Get whether or not the media object for the supplied readLink exists and is local
   * 
   * @param serviceName service name
   * @param entitySet entityset name
   * @param readLink readlnk name
   * @returns a promise with a boolean result once it is resolved
   */
  isMediaLocal(serviceName: string, entitySet: string, readLink: string): Promise<boolean>;
  /**
   * Perform a query on an entity set. Returns a Promise which resolves to the result of the operation
   * 
   * @param serviceName service name
   * @param entitySet entityset name
   * @param properties list of properties to be read
   * @param queryOptions query optins
   * @param headers request headers
   * @param requestOptions request options
   * @returns returns a Promise which resolves to the result of the operation
   */
  read(serviceName: string, entitySet: string, properties: string[], 
    queryOptions?: string, headers?: Object, requestOptions?: Object): Promise<any>;
/**
   * Perform an operation to create odata entity. Returns a Promise which resolves to the result of the operation.
   * @param serviceName service name
   * @param entitySet entityset name
   * @param properties an object to sotre the propterties object with key/value pair
   * @param createLinks list of readlinks
   * @param headers an object to sotre the header object with key/value pair
   */
  create(serviceName: string, entitySet: string, properties: {key: string, value: any}, 
    createLinks: ILinkSpecifierProxy[], headers?: {key: string, value: any}, 
    requestOptions?: { key: string, value: any }): Promise<any> ;
  /**
   * Return the value for given definition.
   * 
   * @param target : any valid definition like rule/action path/global path/binding/targetpath etc
   * @return Promise resolution.
   */
  getDefinitionValue(target: string): Promise<any>;
  /**
   * This method is to localize text
   * 
   * @param key key of text to be localized
   * @return {string} localized text
   */
  localizeText(key: string, dynamicParams?: string[]): string;
   /**
   * This method is to get current app language from app settings.
   * 
   * @return {string} app language
   */
  getLanguage(): string;
  /**
   * This method is to get current app region from app settings.
   * 
   * @return {string} app region
   */
  getRegion(): string;
  /**
   * This method is to get list of supported languages
   * 
   * @return {Object} list of supported languages in key value pairs
   */
  getSupportedLanguages(): Object;
  /**
   * This method is to get list of regions
   * 
   * @return {Object} list of regions in key value pairs
   */
  getRegions(): Object;
  /**
   * Get the versions of application, definitions, SDK & etc
   * 
   * @returns it returns an array of key/value pairs 
   * to represent the versions for different components.
   * iOS app and Android app may have different components and versions.
   * 
   * iOS app may inlcude the following keys: "Application Version", "Definitions Version", 
   * "SAPMDC", "SAPCommon", "APFiori", "SAPFioriFlows", "SAPFoundation", 
   * "SAPOfflineOData", "SAPOData"
   * 
   * Android app may include the following keys: "Application Version", "Definitions Version",
   * "MDKClient Version", "com.sap.cloud.android:foundation", "com.sap.cloud.android:onboarding",
   * "com.sap.cloud.android:fiori", "com.sap.cloud.android:odata", "com.sap.cloud.android:offline-odata"
   * 
   * WebApp may include the following keys: "Definition Version", "WebClient Version",
   * "@ui5/webcomponents Version", "ui5-webcomponents-mdk Version"
   */
  getVersionInfo(): Object;  
/**
   * Perform a count on an entity set. 
   *
   * @param serviceName service name
   * @param entitySet entityset name
   * @param queryOptions query options
   * @param headers request headers
   * @param requestOptions request options
   * @returns returns a Promise which resolves to the result of the operation
   */
  count(serviceName: string, entitySet: string, queryOptions?: string, 
    headers?: Object, requestOptions?: Object): Promise<number>;
  /**
   * Create LinkSpecifierProxy to be consumed by odata link action. one of queryOptions or readLink is required.
   * 
   * @param property property name
   * @param entitySet entityset name
   * @param queryOptions query options
   * @param readLink readlink name
   */
  createLinkSpecifierProxy(property: string, entitySet: string, queryOptions?: string,
    readLink?: string): ILinkSpecifierProxy;
 /**
   * Determine if a dowload is in progress for this readLink
   */
  downloadInProgressForReadLink(readLink: string): boolean;
  /**
   * Determine if a dowload is in progress for this page
   */
  downloadInProgressForPage(page: string): boolean;
  /**
   * Return Passcode Source. 
   *
   * 0 - no passcode or unknown, 1 - user, 2 - device(iOS Only) 3 - Device and User (Android Only)
   * Note: Android must always have a passcode for biometrics hence value 3
   */
  getPasscodeSource(): number;
  /**
   * Show activity indicator with specified text
   * @param text - The text to be shown
   * @return The id which can be used to dismiss the activity indicator
   */
  showActivityIndicator(text?: string): number;
  /**
   * This method is to set app language into app settings.
   * 
   * @param languageKey language key
   */
  setLanguage(language: string): void;
  /**
   * This method is to set app region into app settings.
   * 
   * @param region region
   */
  setRegion(region: string): void;
  /**
   * This method is to get available themes in app settings.
   * 
   * @returns return available themes in array
   */
   getAvailableThemes(): string[];
   /**
    * This method is to get current theme from app settings.
    * 
    * @returns return the current theme
    */
   getTheme(): string;
   /**
    * This method is to set app Style Sheet into app settings.
    * 
    * @param newTheme theme name
    * @returns return set theme result in boolean
    */
   setTheme(newTheme: string): boolean;
   /**
    * This method is to get current ui appearance of the app.
    *
    * @returns return the current ui appearance as light or dark
    */
   getAppearanceMode(): 'light' | 'dark';
   /**
   * Dismiss activity indicator
   * @param id - The id of the activity indicator to be dismissed.
   * If no id is provided, the top activity indicator will be dismissed.
   * Using ids ensures that the right text will be shown at all times if
   * multiple indicators can be displayed, for example due to chained actions.
   */ 
  dismissActivityIndicator(id?: number): void;
  /**
   * Invoke an OData function import. Returns a Promise which resolves to the result(if existing) of the operation
   * @param serviceName service name
   * @param oFunction function name
   * @returns returns a Promise which resolves to the result(if existing) of the operation
   */
  callFunction(serviceName: string, oFunction: {Name: string, Parameters?: { key: string, value: any }}, headers?: Object): Promise<any>;
  /**
   * Update an existing progress banner with new text.  If no progress banner action is in progress, no banner will be 
   * displayed.
   * @param message - The text to show on the progress banner
   */
  updateProgressBanner(message: string): void;
   /**
   * Get the singleton instance of the LoggerManager.
   * If it has not been initialized yet, it throws exception
   */
  getLogger(): any;
  /**
   * Initializes the LoggerManager and adds the log file handlers
   * 
   * @param fileName Optional, File name of the local log file on the client device. 
   * If missing, default value is ClientLog.txt
   * @param maxFileSize Optional, Max file size before rollover of 
   * the local log file on the client device. If missing, default value is 5MB
   */
  initializeLogger(fileName: string, maxFileSize: number);
  /**
   * Determine if it is in demo mode
   */
  isDemoMode(): Boolean;
  /**
   * Determine if the application is in single or multi user mode.
  */
   isAppInMultiUserMode(): Boolean;
   /**
   * This method is to get AppId used for application in SAP Mobile Services.
   */
  getMobileServiceAppId(): string;
  /**
   * This method is to get Endpoint Url of connection to application in SAP Mobile Services
   */
  getMobileServiceEndpointUrl(): string;
  /**
   * This method is to send a request to application's SAP Mobile Services.
   * 
   * * Example of the `params` parameter: <br/>
   * ```json
   * {
   *   "method": "<string>", 
   *   "header": {
   *     "<key1>": "<value as string>",
   *     "<key2>": "<and so on>",
   *   }, 
   *   "body": "<string>"
   * }
   * ```
   * 
   * @param path Relative path of request via application's SAP Mobile Services.
   * @param params Optional. An object consists of `method`, `header`, and `body` of request.<br/>
   * Note: If params is not given, request is set as GET method by default. See description above for the example.<br/>
   *   <li> `method` is string representing the HTTP Method to use. Supported value for methods are:
   * GET, HEAD, POST, PUT, DELETE, PATCH, CONNECT, OPTIONS, and TRACE.<br/>
   *   <li> `header` should be an object with key-value pair<br/>
   *   <li> `body` should be request body String, Binary, FormData, JSON object or Array.
   *   <li> - String should be a string converted from data payload based on the "Content-Type" set in `header`.
   *   <li> - Binary should be native data from file. The "Content-Type" in header should be set according to the content of file.
   *   <li> - FormData is converted to binary with the request body specially formatted as a series of "parts", separated with MIME boundaries. The "Content-Type" in header should be set to multipart/form-data.
   *   <li> - JSON Object or Array is converted to JSON string. The "Content-Type" in header is set to application/json by default.
   * @returns Returns a Http response object
   */
  sendRequest(path: string, params?: any): Promise<IHttpResponse>;
  /**
   * Send a request to application's SAP Mobile Services
   * @deprecated - use the new sendRequest API
   */
  sendMobileServiceRequest(path: string, params?: any): Promise<any>;
  /**
   * Get SAP Passport header value
   * 
   * @returns it returns a string 
   * of SAP Passport value to be used on request header.
   * The header name to be used is "SAP-PASSPORT"
   * 
   * @param componentName Name of the initial component. Default to 'MDK' if empty or null.
   * @param action Name of executed action. Default to null if empty.
   * @param traceFlag Trace configuration. Accepted values are: 
   * StatisticsOnly, SAPTraceLevel_SQL, SAPTraceLevel_Buffer, SAPTraceLevel_Enqueu, SAPTraceLevel_RFC, 
   * SAPTraceLevel_Permission, SAPTraceLevel_Free, SAPTraceLevel_CFunction, DSR_ABAP_Trace_Flag, 
   * SAPTraceLevel_ABAPCondens0, SAPTraceLevel_ABAPCondens1, DSR_SAT_Trace_Flag, ESP_WebService_Flag,
   * HTTP, TRCLVL_None, TRCLVL_Low, TRCLVL_Medium, TRCLVL_High
   * Default to 'TRCLVL_Low' if empty or null.
   * @param componentType Type of initial component. Accepted values are:
   * Undefined, Webas, J2EE, Trex, ICM, Gateway, CPIC, Browser, TraceLib, DotNet, Eclipse, PI_For_SAP_Sender,
   * SCP_For_NonSAP_Sender, PI_For_NonSAP_Sender, SAP_Partner, SCP_Request_Or_Determination_Later_In_Processing,
   * S4, SFSF, Ariba, Concur, Fieldglass, Callidus, BYD, IBP, Hybris, SMB_B1, Industry_Cloud, Leonardo,
   * Customer_Checkout, CoPilot
   * Default to 'Undefined' if empty or null.
   * @param prevComponentName Optional. Name of previous component. Default to initial component name if unspecified.
   * @param userId Optional. ID of user who is processing the request. Default to '<dummy>' if unspecified.
   */
  getSAPPassportHeaderValue(componentName: string, action: string, traceFlag: string, componentType: string, prevComponentName?: string, userId?: string): string;
  /**
   * Set the application icon badge number
   * Note: This function is for iOS only
   * 
   * @param badge the number to set
   */
  setApplicationIconBadgeNumber(badge: number);
    /**
   * Get OData provider based on service name
   * @param {serviceName} service name
   */
     getODataProvider(serviceName: string);
     /**
      * Returns Enum for specifying filterType in createFilterCriteria API.
      * Has two values, Filter and Sorter.
      */
     filterTypeEnum: any;
     /**
      * Create filter criteria for non-supported controls(except Filter & Sorter formcell) to be used in Filter page.
      * 
      * Example of how to get FilterType from createFilterCriteria: 
      * 
      *    let filterResult6 = clientAPI.createFilterCriteria(clientAPI.filterTypeEnum.Filter, undefined, undefined, result6, true);
      * @param filterType - filterTypeEnum value (Filter or Sorter).
      * @param name - Property name on which the filter is applied.
      * @param caption - Name of the control.
      * @param filterItems - Array of filter items.
      * @param isFilterItemsComplex - True if the filterItems contains logical/lambda operators, default is false. If set to true, name and caption properties are ignored.
      */
     createFilterCriteria(filterType: any, name: string, caption: string, filterItems: Array<object>, isFilterItemsComplex: boolean): any;
     /**
      * Convert array of FilterCriteria to JSON string, user can store it and restore back later using convertJSONStringToFilterCriteriaArray().
      * 
      * Example:
      * 
      *    let jsonString = clientAPI.convertFilterCriteriaArrayToJSONString(sectionedTable.filters);
      * @param filters - array of FilterCriteria, e.g. filters of the sectioned table.
      * 
      * @return {string} the JSON string
      */
     convertFilterCriteriaArrayToJSONString(filters: Array<any>): string
     /**
      * Convert JSON string to array of FilterCriteria, JSON string can be used the return value from convertFilterCriteriaArrayToJSONString().
      * 
      * Example: 
      * 
      *    sectionedTable.filters = clientAPI.convertJSONStringToFilterCriteriaArray(jsonString);
      * @param jsonString - JSON string returned from convertFilterCriteriaArrayToJSONString().
      * 
      * @return {Array<FilterCriteria>} the array of FilterCriteria
      */
     convertJSONStringToFilterCriteriaArray(jsonString: string): Array<any>;
     /**
      * Delete OData Cache images.
      */
     deleteODataCacheImages(serviceFileName?: string, entityName?: string);
}

/**
 * A designer-facing interface that provides access to a control.
 * 
 * It is passed to rules to provide access to a control for
 * application specific customizations.
 */
interface IControlProxy extends IClientAPI {
  /**
   * Applies the validation view, if it's supported for the given control
   */
  applyValidation();
  /**
   * Hides the validaiton view. Shorter version of:
   * clientAPI.setupValidationProperties('ValidationViewIsHidden', true).applyValidation();
   */
  clearValidation();
  // Workaround to BCP 1880677511: Hides the validaiton view while changing value. 
  /**
   * Hides the validaiton view while changing value
   */
  clearValidationOnValueChange();
  /**
   * @return {string} the caption of the contol
   */
  getCaption(): string;
  /**
   * @return {string} the name of the contol
   */
  getName(): string;
  /**
   * @returns {IPageProxy} the Page, which the control belongs to 
   */
  getPageProxy(): IPageProxy;
  /**
   * @return {string} the type of the contol
   */
  getType(): string;
  /**
   * @return {any} the value of the contol
   */
  getValue(): any;
  /**
   * Determine if the control is a container control
   * @returns {boolean} returns true if the control is a container control. 
   * Otherwise, returns false. 
   */
  isContainer(): boolean;
  /**
   * Use this method to redraw the control.  In cases where a control
   * does not have redraw semantics the control's container will redraw
   */
  redraw();
  /**
   * Sets the controls editable state
   * 
   * @param {boolean} value - editable setting
   * @returns {IControlProxy} this - allows chaining
   */
  setEditable(value: boolean);
  // To apply styles to a control
  // @param: styleClass: The name of the style class to be applied
  // @param: subView: The name of the subview to apply the 
  // style to. If this is '', the style is applied to the entire
  // control.
  // See Styles/ docs for details.
  setStyle(styleClass: string, subView: string);
  /**
   * Sets the validationProperties parameter of the underlying Observable.
   * Currently only the FormCell Observable is supported.
   *
   * This will not cause the UI to rerender. To redraw the form cell, use the applyValidation API.
   *
   * @param {string} key the key of the validaiton property
   * Available keys:
   * - SeparatorBackgroundColor (hex color as string e.g.: 'ffffff')
   * - SeparatorIsHidden (boolean)
   * - ValidationMessage (string)
   * - ValidationMessageColor (hex color as string e.g.: 'ffffff')
   * - ValidationViewBackgroundColor (hex color as string e.g.: 'ffffff')
   * - ValidationViewIsHidden (boolean)
   * @param {any} value the value of the validation property
   * @returns {ControlProxy} the current instance of the ControlProxy class
   */
  setValidationProperty(key: string, value: any): IControlProxy;
  /**
   * Set the value in the control
   * @param value value to be set
   * @param notify whether to send the notification
   * @returns {IControlProxy} this - allows chaining
   */
  setValue(value: any, notify?: boolean);
  /**
   * Sets the control's visible state with / without redraw
   * 
   * @param value visible state
   * @param redraw true if redraw after set the visible state
   */
  setVisible(value: boolean, redraw: boolean);
}

/**
 * A designer-facing interface that provides access to a control container.
 * 
 * It is passed to rules to provide access to a container for 
 * application specific customizations.
 */
interface IControlContainerProxy extends IClientAPI {
  /**
   * @return {string} designer specified caption or the empty string
   */
  getCaption(): string;
  /**
   * Gets the associated control by name.  This is a top-level
   * search and does not drill down into other containers.
   * 
   * @param {string} name The control name specified by the _Name
   * definition property.
   * 
   * @return {any} The control assocated with the name parameter
   */
  getControl(name: string): IControlProxy;
  /**
   * This method returns the top-level controls for this container
   * 
   * @return {IControlProxy[]} The controls for this container 
   */
  getControls(): IControlProxy[];
}

/**
 * A designer-facing interface that provides access to a resetable control container.
 * 
 * It is passed to rules to provide access to a resetable container for 
 * application specific customizations.
 */
 interface IResetableContainerProxy extends IControlContainerProxy {
  /**
   * Reset all FormCell controls in the FormCellContainer
   * @returns {Promise<any>}
   */
   reset(): Promise<any>;
 }


/**
 * A designer-facing interface that provides access to a DurationPicker FormCell
 * control.
 */
 interface IDurationPickerFormCellProxy extends IFormCellProxy {
  
  /**
   * Sets the MinuteInterval property of the FormCell's control.
   * Accepted values are: "Date", "Datetime", "Time"
   * @param {Integer} mode value to set.
   */
  setMinuteInterval(mode: number) 

  /**
   * Returns the MinuteInterval property value defined for the FormCell's control.
   * @return {Integer}
   */
  getMinuteInterval(): number;

  /**
   * Sets the Unit property of the FormCell's control.
   * Accepted values are: "Date", "Datetime", "Time"
   * @param mode value to set.
   */
  setUnit(mode: string) 

  /**
   * Returns the Unit property value defined for the FormCell's control.
   * @return {string}
   */
  getUnit(): string;
}

/**
 * A designer-facing interface that provides access to a DatePicker formcell
 * control.
 */
 interface IDatePickerFormCellProxy extends IFormCellProxy {
  
  /**
   * Sets the Mode property of the FormCell's control.
   * Accepted values are: "Date", "Datetime","Time"
   * @param mode value to set.
   */
  setMode(mode: string) 

  /**
   * Returns the Mode property value defined for the FormCell's control.
   * @return {string}
   */
  getMode(): string;
}

/**
 * A designer-facing interface that provides access to a formcell
 * control.
 * 
 * It is passed to rules to provide access to a formcell control
 * for application specific customizations.
 * 
 * In addition it provides access to the IControlProxy interface.
 */
interface IFormCellProxy extends IControlProxy {
  /**
   * Returns the user provided search string for a ListPicker FormCell
   */
  searchString: string;
  /**
   * Property for viewing and setting the current visible state of the control.
   */
  visible: boolean;
  /**
   * Factory method to construct an instance of DataQueryBuilder
   */
  dataQueryBuilder(query: string): any;
  /**
   * Gets the target specifier or undefined
   * 
   * @return {IFormCellTargetProxy}
   */
  getTargetSpecifier(): IFormCellTargetProxy;
  /**
   * Sets the target specifier and redraws the formcell
   * 
   * @param {IFormCellTargetProxy} target
   * @param {boolean} redraw whether to redraw formcell
   * @return {Promise<any>}
   * @throws {Error} if target is incomplete
   */
  setTargetSpecifier(target: IFormCellTargetProxy, redraw?: boolean): Promise<any>;
  /**
   * Get collection of ListPicker Formcell, SegmentedControl  Formcell and Filter  Formcell
   * based on the DisplayValue and ReturnValue
   */
  getCollection(): { DisplayValue: string, ReturnValue: string }[];
  /**
   * Set focus to the formcell (support Title Formcell / SimpleProperty Formcell / Note Formcell)
   * 
   * @param {string} keyboardVisibility This parameter allows you to either show or hide the on-screen keyboard (setting applies only to Android devices, iOS devices will ignore this setting).
   * Available values:
   * - Auto (Default value. Show the on-screen keyboard only if there is no physical or bluetooth keyboard attached to the device)
   * - AlwaysShow
   * - AlwaysHide
   */
  setFocus(keyboardVisibility: string): void;

  /**
   * Reset the FormCell control. The function will resolve the FormCell's properties and redraw it
   * The OnValueChange event of the FormCell will not be triggered when resetting the control
   * @returns {Promise<any>}
   */
   reset(): Promise<any>;
   
  /**
   * Sets the Editable property of the FormCell's control.
   * @param {boolean} isEditable true if this form cell is editable. False otherwise.
   */
  setEditable(isEditable: boolean): void;

  /**
   * Returns the Editable property value defined for the control.
   * @return {boolean}
   */
  getEditable(): boolean;

  /**
   * Sets the Enable property of the FormCell's control.
   * @param {boolean} isEnable true enables and false disables.
   */
   setEnable(isEnable: boolean): void;

  /**
   * Returns the Enable property value defined for the control.
   * @return {boolean}
   */
  getEnable(): boolean;

  /**
   * Sets the Caption property of the FormCell's control.
   * @param {string} caption value to set.
   */
  setCaption(caption: string): void;
  
  /**
   * Returns the Caption property value defined for the control.
   * @return {string}
   */
  getCaption(): string;

  /**
   * Sets the HelperText property of the FormCell's control.
   * @param {string}  helperText value to set.
   */
  setHelperText(helperText: string): void;

  /**
   * Returns the HelperText property value defined for the control.
   * @return {string}
   */
  getHelperText(): string;
}

/**
 * NoteFormCellControlProxy is a developer-facing interface that provides access to a
 * Note control and allows customizations.
 * In addition it provides access to the IFormCellProxy interface.
 */
 interface INoteFormCellProxy extends IFormCellProxy {
  
  /**
   * Sets the MaxNumberOfLines property of the FormCell's control.
   * @param {number} maxNumberOfLines value to set.
   */
  setMaxNumberOfLines(MaxNumberOfLines: number) 

  /**
   * Returns the MaxNumberOfLines property value defined for the FormCell's control.
   * @return {number}
   */
  getMaxNumberOfLines(): number;

  /**
   * Sets the MinNumberOfLines property of the FormCell's control.
   * @param {number} minNumberOfLines  value to set.
   */
  setMinNumberOfLines(minNumberOfLines: number);

  /**
   * Returns the MinNumberOfLines property value defined for the FormCell's control.
   * @return {number}
   */
  getMinNumberOfLines(): number;

  /**
   * Sets the PlaceHolder property of the FormCell's FormCell's control.
   * @param {string} placeHolder {string} value to set.
   */
  setPlaceHolder(title: string): void;

  /**
   * Returns the PlaceHolder property value defined for the FormCell's control.
   * @return {string}
   */
  getPlaceHolder(): string 
}

/**
 * InlineSignatureCaptureFormCellProxy is a developer-facing interface that provides access to a
 * InlineSignatureCapture control and allows customizations.
 * In addition it provides access to the IFormCellProxy interface.
 */
 interface IInlineSignatureCaptureFormCellProxy extends IFormCellProxy {

  /**
   * Sets the ShowTimestampInImage property of the FormCell's FormCell's control.
   * On iOS not supported.
   * @param {boolean} showTimestampInImage value to set.
   */
  setShowTimestampInImage(showTimestampInImage: boolean): void;

  /**
   * Returns the ShowTimestampInImage property value defined for the FormCell's control.
   * On iOS not supported.
   * @return {boolean}
   */
  getShowTimestampInImage(): boolean;

  /**
   * Sets the ShowUnderline property of the FormCell's FormCell's control.
   * On iOS not supported.
   * @param {boolean} showUnderline value to set.
   */
  setShowUnderline(Underline: boolean);

  /**
   * Returns the ShowUnderline property value defined for the FormCell's control.
   * On iOS not supported.
   * @return {boolean}
   */
  getShowUnderline(): boolean;

  /**
   * Sets the ShowXMark property of the FormCell's FormCell's control.
   * On iOS not supported.
   * @param {boolean} showXMark value to set.
   */
  setShowXMark(showXMark: boolean);

  /**
   * Returns the ShowXMark property value defined for the FormCell's control.
   * On iOS not supported.
   * @return {boolean}
   */
  getShowXMark(): boolean

  /**
   * Sets the TimestampFormatter property of the FormCell's control.
   * @param {string} timestampFormatter  value to set.
   */
  setTimestampFormatter(timestampFormatter: string);

  /**
   * Returns the TimestampFormatter property value defined for the FormCell's control.
   * @return {string}
   */
  getTimestampFormatter(): string;

  /**
   * Sets the WatermarkText property of the FormCell's control.
   * @param {string} watermarkText  value to set.
   */
  setWatermarkText(watermarkText: string);

  /**
   * Returns the WatermarkText property value defined for the FormCell's control.
   * @return {string}
   */
  getWatermarkText(): string;

  /**
   * Sets the WatermarkTextMaxLines property of the FormCell's control.
   * @param {number} watermarkTextMaxLines value to set.
   */
  setWatermarkTextMaxLines(watermarkTextMaxLines: number)

  /**
   * Returns the WatermarkTextMaxLines property value defined for the FormCell's control.
   * @return {number}
   */
  getWatermarkTextMaxLines(): number;

}


/**
 * SignatureCaptureFormCellProxy is a developer-facing interface that provides access to a
 * SignatureCapture control and allows customizations.
 * In addition it provides access to the IFormCellProxy interface.
 */
interface ISignatureCaptureFormCellProxy extends IFormCellProxy {

  /**
   * Sets the ShowTimestampInImage property of the FormCell's FormCell's control.
   * @param {boolean} showTimestampInImage value to set.
   */
  setShowTimestampInImage(showTimestampInImage: boolean): void;

  /**
   * Returns the ShowTimestampInImage property value defined for the FormCell's control.
   * @return {boolean}
   */
  getShowTimestampInImage(): boolean;

  /**
   * Sets the ShowUnderline property of the FormCell's FormCell's control.
   * @param {boolean} showUnderline value to set.
   */
  setShowUnderline(Underline: boolean);

  /**
   * Returns the ShowUnderline property value defined for the FormCell's control.
   * @return {boolean}
   */
  getShowUnderline(): boolean;

  /**
   * Sets the ShowXMark property of the FormCell's FormCell's control.
   * @param {boolean} showXMark value to set.
   */
  setShowXMark(showXMark: boolean);

  /**
   * Returns the ShowXMark property value defined for the FormCell's control.
   * @return {boolean}
   */
  getShowXMark(): boolean

  /**
   * Sets the TimestampFormatter property of the FormCell's control.
   * @param {string} timestampFormatter  value to set.
   */
  setTimestampFormatter(timestampFormatter: string);

  /**
   * Returns the TimestampFormatter property value defined for the FormCell's control.
   * @return {string}
   */
  getTimestampFormatter(): string;

  /**
   * Sets the WatermarkText property of the FormCell's control.
   * @param {string} watermarkText  value to set.
   */
  setWatermarkText(watermarkText: string);

  /**
   * Returns the WatermarkText property value defined for the FormCell's control.
   * @return {string}
   */
  getWatermarkText(): string;

  /**
   * Sets the WatermarkTextMaxLines property of the FormCell's control.
   * @param {number} watermarkTextMaxLines value to set.
   */
  setWatermarkTextMaxLines(watermarkTextMaxLines: number)

  /**
   * Returns the WatermarkTextMaxLines property value defined for the FormCell's control.
   * @return {number}
   */
  getWatermarkTextMaxLines(): number;

}

/**
 * AttachmentFormCellProxy is a developer-facing interface that provides access to a
 * Attachment control and allows customizations.
 * In addition it provides access to the IFormCellProxy interface.
 */
 interface IAttachmentFormCellProxy extends IFormCellProxy {
  
   /** 
   * This method is for setting the title of the attachment container, i.e. for changing 
   * the value of the AttachmentTitle property. The default value is 'Attachment (%d)', where %d
   * is substituted by tha actual count of the attachments.
   * @param {string} title value to set.
   */
    setAttachmentTitle(title: string);
  
    /**
     * Returns the AttachmentTitle property value defined for the FormCell's control.
     * @return {string}
     */
    getAttachmentTitle(): string;
  
    /**
     * This method is for setting the title bar of the add attachment menu, i.e. for 
     * changing the value of the AttachmentAddTitle property. The default value is 'Add Attachment'.
     * @param {string} addTitle value to set.
     */
    setAttachmentAddTitle(addTitle: string);
  
    /**
     * Returns the AttachmentAddTitle property value defined for the FormCell's control.
     * @return {string}
     */
    getAttachmentAddTitle(): string;
  
    /**
     * This method is for setting the title of the cancel button on the add attachment menu, i.e. for changing 
     * the value of the AttachmentCancelTitle property. The default value is 'Cancel'.
     * @param {string} cancelTitle value to set.
     */
    setAttachmentCancelTitle(cancelTitle: string);
  
    /**
     * Returns the AttachmentCancelTitle property value defined for the FormCell's control.
     * @return {string}
     */
    getAttachmentCancelTitle(): string;
  
    /**
     * This method is for setting the attachment action types, i.e. for changing 
     * the value of the AttachmentActionType property. Currently just the photo library and the camera
     * are supported as attachment sources, so the value can contain just the values 'AddPhoto'
     * and/or "TakePhoto" and/or "SelectFile".
     * @param {string[]} fileType value to set.
     */
    setAttachmentActionType(actionType: [string]);
  
    /**
     * Returns the AttachmentActionType property value defined for the FormCell's control.
     * @return {string[]}
     */
    getAttachmentActionType(): string[];
  
    /**
     * This method is for setting the attachment allowed file types, i.e.  
     * If no specified value for this the AllowedFileTypes property, it allow user select any type of file;
     * this property can contain the values just like ["pdf","jpg", "..."].
     * @param {string[]} fileType value to set.
     */
    setAllowedFileTypes(fileType: [string]);
  
    /**
     * Returns the AllowedFileTypes property value defined for the FormCell's control.
     * @return {string[]}
     */
    getAllowedFileTypes(): string[];
}

/**
 * ButtonFormCellControlProxy is a developer-facing interface that provides access to a
 * button control and allows customizations.
 * In addition it provides access to the IFormCellProxy interface.
 */
 interface IButtonFormCellProxy extends IFormCellProxy {
  
  /**
   * Sets the ButtonType property of the FormCell's control.
   * Accepted values are: "Button", "Normal".
   * @param {string} type value to set.
   */
  setButtonType(type: string) 

  /**
   * Returns the ButtonType property value defined for the FormCell's control.
   * @return {string}
   */
  getButtonType(): string;

  /**
   * Sets the TextAlignment property of the FormCell's control.
   * Accepted values are: "left", "right", "center".
   * @param {string} alignment  value to set.
   */
  setTextAlignment(alignment: string);

  /**
   * Returns the TextAlignment property value defined for the FormCell's control.
   * @return {string}
   */
  getTextAlignment(): string;

  /**
   * Sets the Title property of the FormCell's FormCell's control.
   * @param {string} title {string} value to set.
   */
  setTitle(title: string): void;

  /**
   * Returns the Title property value defined for the FormCell's control.
   * @return {string}
   */
  getTitle(): string 
}


/**
 * ITitleFormCellProxy is a developer-facing interface that provides access to a
 * Title control and allows customizations.
 * In addition it provides access to the IFormCellProxy interface.
 */
interface ITitleFormCellProxy extends IFormCellProxy {
  
  /**
   * Sets the PlaceHolder property value defined for the FormCell's control.
   * @param {string} placeHolder value to set.
   */
  setPlaceHolder(placeHolder: string): void

  /**
   * Returns the PlaceHolder property value defined for the FormCell's control.
   * @return {string}
   */
  getPlaceHolder(): string;
}

/**
 * SimplePropertyFormCellControlProxy is a developer-facing interface that provides access to a
 * SimpleProperty control and allows customizations.
 * In addition it provides access to the IFormCellProxy interface.
 */
interface ISimplePropertyFormCellProxy extends IFormCellProxy {
  
  /**
   * Sets the AlternateInput property of the FormCell's control.
   * Accepted values are: "None", "Barcode".
   * @param {string} alternateInput value to set.
   */
   setAlternateInput(alternateInput: string)

  /**
   * Returns the AlternateInput property value defined for the FormCell's control.
   * @return {string}
   */
   getAlternateInput(): string;

  /**
   * Sets the KeyboardType property of the FormCell's control.
   * Accepted values are:  "DateTime", "Default", "Email", "Number", "Phone", "Url","Password", "NumberPassword"
   * @param {string} keyboardType  value to set.
   */
   setKeyboardType(keyboardType: string);

  /**
   * Returns the KeyboardType property of the FormCell's FormCell's control.
   * @param {string}
   */
   getKeyboardType(): void;

  /**
   * Sets the PlaceHolder property value defined for the FormCell's control.
   * @param {string} placeHolder value to set.
   */
  setPlaceHolder(placeHolder: string): void

  /**
   * Returns the PlaceHolder property value defined for the FormCell's control.
   * @return {string}
   */
  getPlaceHolder(): string;
}

/**
 * SegmentedFormCellControlProxy is a developer-facing interface that provides access to a
 * Segmented control and allows customizations.
 * In addition it provides access to the IFormCellProxy interface.
 */
interface ISegmentedFormCellProxy extends IFormCellProxy {
  
  /**
   * Sets the ApportionsSegmentWidthsByContent property of the FormCell's control.
   * @param {boolean} apportionsSegmentWidthsByContent value to set.
   */
  setApportionsSegmentWidthsByContent(apportionsSegmentWidthsByContent: boolean)

  /**
   * Returns the ApportionsSegmentWidthsByContent property value defined for the FormCell's control.
   * @return {boolean}
   */
  getApportionsSegmentWidthsByContent(): boolean;

  /**
   * Sets the Segments property of the FormCell's control.
   * @param {any} segments  value to set.
   */
  setSegments(segments: any);

  /**
   * Returns the Segments property of the FormCell's FormCell's control.
   * @param {any}
   */
  getSegments(): any;
}

/**
 * A designer-facing interface that provides access a target.
 * 
 * It is passed to rules to provide access to a target
 * for application specific customizations.
 */
interface ITargetProxy {
  /**
   * Get the target EntitySet name
   * @return {string} 
   */
  getEntitySet(): string;
  /**
   * Get the target Function name.
   * @return {any} 
   */
  getFunction(): any;
  /** 
   * Get the target OutputPath.
   * @return {string} 
   */
   getOutputPath(): string;
   /**
    * Get the target path.
    * @return {string} 
    */
   getPath(): string;
  /**
   * Get the target QueryOptions.
   * @return {string}
   */
  getQueryOptions(): string;
    /**
   * Get the target ReadLink.
   * @return {string}
   */
     getReadLink(): string;
     /**
      * Get the target RequestProperties.
      * @return {any} 
      */
     getRequestProperties(): any;
  /**
   * Get the target ServerSidePaging.
   * @return {boolean}
   */
  getServerSidePaging(): boolean;
  /**  
   * Get the target Service name.
   * @return {string}
   */
  getService(): string;
  /**
   * set the target EntitySet
   * @param {string} value the target EnittySet name
   * @return {ITargetProxy} this - allows chaining
   */
  setEntitySet(value: string);
  /**
   * @param {any} value the target Function name
   * @return {ITargetProxy} this - allows chaining
   */
  setFunction(value: any);
  /**
   * @param {string} value the target OutputPath
   * @return {ITargetProxy} this - allows chaining
   */
   setOutputPath(value: string);
   /**
    * @param {string} value the target Path
    * @return {ITargetProxy} this - allows chaining
    */
   setPath(value: string);
   /**
    * @param {string} value the target QueryOptions
    * @return {ITargetProxy} this - allows chaining
   */
  setQueryOptions(value: string);
  /**
   * @param {string} value the target ReadLink
   * @return {ITargetProxy} this - allows chaining
   */
   setReadLink(value: string);
   /**
    * @param {any} value the target RequestProperties
    * @return {ITargetProxy} this - allows chaining
    */
   setRequestProperties(value: any);
   /**
    * @param {boolean} value the target ServerSidePaging
    * @return {ITargetProxy} this - allows chaining
   */
  setServerSidePaging(value: boolean);
    /**
   * @param {string} value the target Service name
   * @return {ITargetProxy} this - allows chaining
   */
     setService(value: string);
}

/**
 * A designer-facing interface that provides access to a formcell's target.
 * It is passed to rules to provide access to a formcell's target
 * for application specific customizations.
 */
 interface IFormCellTargetProxy extends ITargetProxy {
  /**
   * @return {string}
   */
  getDisplayValue(): string;
  /**
   * @return {string}
   */
  getReturnValue(): string;
  /**
   * @param {string}
   */
  setDisplayValue(value: string);
  /**
   * @param {string} 
   */
  setReturnValue(value: string);
}

interface IListPickerFormCellTargetProxy extends IFormCellTargetProxy {
  /**
   * @return {any}
   */
  getObjectCell(): any;
  /**
   * @param {any}
   */
  setObjectCell(value: any);
}

/**
 * ListPickerFormCellProxy is a developer-facing interface that provides access to a
 * ListPicker control and allows customizations.
 * In addition it provides access to the IFormCellProxy interface.
 */

 interface IListPickerFormCellProxy extends IFormCellProxy {

  /**
   * Sets the AllowDefaultValueIfOneItem property of the FormCell's control.
   * @param {boolean} allowDefaultValueIfOneItem value to set.
   */
  setAllowDefaultValueIfOneItem(allowDefaultValueIfOneItem: boolean);

  /**
   * Returns the AllowDefaultValueIfOneItem property value defined for the FormCell's control.
   * @return {boolean}
   */
  getAllowDefaultValueIfOneItem(): boolean;

  /**
   * Sets the AllowEmptySelection property of the FormCell's control.
   * @param {boolean} allowEmptySelection value to set.
   */
  setAllowEmptySelection(allowEmptySelection: boolean);

  /**
   * Returns the AllowEmptySelection property value defined for the FormCell's control.
   * @return {boolean}
   */
  getAllowEmptySelection(): boolean;

  /**
   * Sets the AllowMultipleSelection property of the FormCell's control.
   * @param {boolean} allowMultipleSelection value to set.
   */
  setAllowMultipleSelection(allowMultipleSelection: boolean);

  /**
   * Returns the AllowMultipleSelection property value defined for the FormCell's control.
   * @return {boolean}
   */
  getAllowMultipleSelection(): boolean;

  /**
   * Sets the DataPaging property of the FormCell's control.
   * @param {Object} dataPaging value to set.
   */
  setDataPaging(dataPaging: Object);

  /**
   * Returns the DataPaging property value defined for the FormCell's control.
   * @return {Object}
   */
  getDataPaging(): Object;

  /**
   * Sets the FilterProperty property of the FormCell's control.
   * @param {string} filterProperty value to set.
   */
  setFilterProperty(filterProperty: string);

  /**
   * Returns the FilterProperty property value defined for the FormCell's control.
   * @return {string}
   */
  getFilterProperty(): string;

  /**
   * Sets the FilterValue property of the FormCell's control.
   * @param {string[]} filterValue value to set.
   */
  setFilterValue(filterValue: string[]);

  /**
   * Returns the FilterValue property value defined for the FormCell's control.
   * @return {string[]}
   */
  getFilterValue(): string[];

  /**
   * Sets the IsPickerDismissedOnSelection property of the FormCell's control.
   * @param {boolean} isPickerDismissedOnSelection value to set.
   */
  setIsPickerDismissedOnSelection(isPickerDismissedOnSelection: boolean);

  /**
   * Returns the IsPickerDismissedOnSelection property value defined for the FormCell's control.
   * @return {boolean}
   */
  getIsPickerDismissedOnSelection(): boolean;

  /**
   * Sets the IsSearchCancelledAfterSelection property of the FormCell's control.
   * @param {boolean} isSearchCancelledAfterSelection value to set.
   */
  setIsSearchCancelledAfterSelection(alternateInput: boolean);

  /**
   * Returns the IsSearchCancelledAfterSelection property value defined for the FormCell's control.
   * @return {boolean}
   */
  getIsSearchCancelledAfterSelection(): boolean;

  /**
   * Sets the IsSelectedSectionEnabled property of the FormCell's control.
   * @param {boolean} isSelectedSectionEnabled value to set.
   */

  setIsSelectedSectionEnabled(isSelectedSectionEnabled: boolean);

  /**
   * Returns the IsSelectedSectionEnabled property value defined for the FormCell's control.
   * @return {boolean}
   */
  getIsSelectedSectionEnabled(): boolean;

  /**
   * Sets the PickerItems property of the FormCell's control.
   * @param {any} pickerItems value to set.
   */
  setPickerItems(pickerItems: any);

  /**
   * Returns the PickerItems property value defined for the FormCell's control.
   * @return {any}
   */
  getPickerItems(): any;

  /**
   * Sets the PickerPrompt property of the FormCell's control.
   * @param {string} pickerPrompt value to set.
   */
  setPickerPrompt(pickerPrompt: string);

  /**
   * Returns the PickerPrompt property value defined for the FormCell's control.
   * @return {string}
   */
  getPickerPrompt(): string;

  /**
   * Sets the Search property of the FormCell's control.
   * @param {Object} search value to set.
   */
  setSearch(search: Object);

  /**
   * Returns the Search property value defined for the FormCell's control.
   * @return {Object}
   */
  getSearch(): Object;
}

/**
 * ClientAPI used if the current context is a page.
 */
interface IPageProxy extends IControlContainerProxy {
  /**
   * Set the binding that is being used by the current action
   */
  getActionBinding(): any;
  /**
   * return the control, toolbar item or action bar item that was most recently pressed on this page.
   */
  getPressedItem(): any;

  /**
   * return the most recently swipe item on this page.
   */
   getExecutedContextMenuItem(): any;

  /**
   * After running a CheckRequiredFields action, 
   * this method is to return a list of any controls whose value were found to be missing when required.
   */
  getMissingRequiredControls(): Object[];
  /** 
   * Set the binding to be used by the current action.  For example, a navigation would set this to pass on 
   * the binding for the next page which is navigated to.
   */ 
  setActionBinding(binding: Object);
  /**
   * @param {string} caption new caption value
   */
  setCaption(caption: string);
  /**
   * Get the global side drawer control proxy
   */
   getGlobalSideDrawerControlProxy(): ISideDrawerControlProxy;
   /**
    * Apply styles to a control
    * 
    * @param styleClass The name of the style class to be applied
    * @param subControl The name of the control to apply the style to. 
    * It could be either 'ActionBar' or 'ToolBar'.
    * If this is '', the style is applied to the entire page.
    * @returns this for chaining
    * 
    * See Styles/ docs for details.
    */
  setStyle(styleClass: string, subControl: string);
  /**
   * Asynchronously apply a new caption to a toolbar item on page
   * 
   * @param toolbarItemName the name of the item to modify caption 
   * @param newCaption  the new caption
   */
  setToolbarItemCaption(toolbarItemName: string, newCaption: string): Promise<any>;
  /**
   * Set specified actionBar item on page to visible/hidden
   * 
   * @param item either an number or a string 
   * the number is the position of the item.(zero based, first item on actionBar is 0 and second is 1 etc.) 
   * the string is the _Name parameter of the action item
   * @param visibleFlag if true set item to visible else hidden.
   */
  setActionBarItemVisible(item: number, visibleFlag: boolean);
  /**
   * Redraw the page
   */
  redraw();
  /**
   * @returns {IPageProxy} the Page self 
   */
  getPageProxy(): IPageProxy;

  /**
   * Executes rule specified as page level custom event.
   * @param eventType can be used to describe the current event.
   * @param eventData Data that is passed to the associated rule.
   * @returns {Promise<any>}
   */
   executeCustomEvent(eventType: string, eventData: any);
}

/**
 * A designer-facing interface that provides access to a sectioned table
 * 
 * It is passed to rules to provide access to a section
 * for application specific customizations.
 */
interface ISectionedTableProxy extends IControlProxy {
  sections: ISectionProxy[];
  /**
   * Get or set the user provided search string for this section table. Modifying this property will cause the search field's value to change and the search functionality will be executed. It does not do anything if the search is not enabled for any of the UI controls in the SectionedTable.
   */
  searchString: string;
  /**
   * Get or set the current filters for this Sectioned Table. Modifying this property will cause the filters to be applied on the Sectioned Table.
   */
     filters: any[];
  /**
   * Factory method to construct an instance of DataQueryBuilder
   */
  dataQueryBuilder(query: string): any;
   /**
   * Gets the associated section by name.  This searches
   * section in SectionedTable.
   * 
   * @param {string} name The section name specified by the _Name
   * definition property.
   * 
   * @return {any} The section assocated with the name parameter
   */
    getSection(name: string): ISectionProxy;
  /**
   * Get all of the sections that the table contains.
   */
  getSections(): ISectionProxy[];
  /**
   * Gets the associated control by name.  This searches
   * controls in FormCell sections.
   * 
   * @param {string} name The control name specified by the _Name
   * definition property.
   * 
   * @return {any} The control assocated with the name parameter
   */
  getControl(name: string): IControlProxy;
  /**
   * This method returns the controls in all FormCell sections for this section table
   * 
   * @return {IControlProxy[]} The controls for this container 
   */
  getControls(): IControlProxy[];
}

/**
 * A designer-facing interface that provides access to a section in a sectioned table
 * 
 * It is passed to rules to provide access to a section
 * for application specific customizations.
 */
interface ISectionProxy {
  /**
   * Get the searchString property for this section.
   */
  searchString: string;
  /**
   * Get or set the dataSubscriptions property for this section.
   * The dataSubScriptions array contains entitySets names or services names
   */
   dataSubscriptions: string[];
   /**
    * Get the section visible property
    * @returns {boolean}
    */
  getVisible(): boolean;
  /**
   * Sets the section's visible state with / without redraw
   * 
   * @param value visible state
   * @param redraw whether redraw after setting the visible state, the default value is true.
   * @returns {Promise<any>}
   */
   setVisible(value: boolean, redraw?: boolean): Promise<any>;
   /**
    * Get the section name
    * @returns {string}
    */
  getName(): string;
  /**
   * Get the PageClientAPI associated with this section.
   * @returns {IPageProxy} 
   */
  getPageProxy(): IPageProxy;
  /**
   * Get the property name being bound, one of the property names
   * in a section definition
   * @returns {string}
   */
  getProperty(): string;
  /**
   * Get the section type
   * @returns {string}
   */
  getType(): string;
  /**
   * The bound object type, if true binding object is definition
   * @returns {boolean}
   */
  isStaticSection(): boolean;
  /**
   * Returns the extensions the section is using.
   * @returns {IView[]}
   */
  getExtensions(): any[];
  /**
   * Sets the interacte object cell indicator's state in the section
   * 
   * @param {string} newState the new state of the indicator (possible values: toDownload, inProgress, open)
   * @param {PressedItem} pressedItem the pressed object cell in the section
   */
  setIndicatorState(newState: string, pressedItem: any);
  /**
   * Gets the associated control by name.  This searches
   * controls in this section if it is a FormCell section.
   * 
   * @param {string} name The control name specified by the _Name
   * definition property.
   * 
   * @return {any} The control assocated with the name parameter
   */
  getControl(name: string): IControlProxy;
  /**
   * This method returns the controls in this section if it is FormCell section
   * 
   * @return {IControlProxy[]} The controls for this container 
   */
  getControls(): IControlProxy[];
  /**
   * Redraw the section
   * @returns {Promise<any>}
   */
   redraw(): Promise<any> ;
  }
  
  /**
   * A IBindableSectionProxy can get/set the section's target. 
   * If a section doesn't have a section target, it doesn't support the interface
   * 
   * It is passed to rules to provide access to a section's target
   * for application specific customizations.
   */
  interface IBindableSectionProxy extends ISectionProxy {
     /**
     * Gets the target specifier
     * 
     * @return {ITargetProxy}
     */
    getTargetSpecifier(): ITargetProxy;
    /**
     * Sets the target specifier and redraws the formcell
     * 
     * @param {ITargetProxy} target
     * @param {boolean} redraw whether to redraw formcell
     * @return {Promise<any>}
     * @throws {Error} if target is incomplete
     */
    setTargetSpecifier(target: ITargetProxy, redraw?: boolean): Promise<any>;
  }
  
  /*
  * SelectableSectionProxy is mainly for selection operations when enable the Multiple section for list.
  */
  interface ISelectableSectionProxy extends IBindableSectionProxy {
    /**
     * Set the section selection mode
     * @param value None or Multiple 
     */
    setSelectionMode(mode: string);
  
    /**
     * Get the current section selected items when selection mode is active. Otherwise an empty array will be returned.
     */
    getSelectedItems(): [any];
  
    /**
     * Get selection mode for the current section.
     * The return value is None or Multiple
     */
    getSelectionMode(): string;
  
    /**
     * Get the last selected or deselected item.
     */
    getSelectionChangedItem(): any;
  }
  
  /**
   * An IResetableSectionProxy can reset the controls in the section. 
   * 
   * It is passed to rules to provide access to a resetable section
   * for application specific customizations.
   */
   interface IResetableSectionProxy extends ISectionProxy {
    /**
    * Reset all FormCell controls in the section
    * @returns {Promise<any>}
    */
     reset(): Promise<any>;
  }

/**
 * A designer-facing interface that construct a Link object to be used by Odata create or update entity
 * 
 */
interface ILinkSpecifierProxy {
  /**
   * @return {} link object that odata link action expects
   */
  getSpecifier(): {};
  /**
   * @return {string}
   */
  getProperty(): string;
  /**
   * @return {string} 
   */
  getEntitySet(): string;
  /**
   * @return {string}
   */
  getQueryOptions(): string;
  /**
   * @return {string}
   */
  getReadLink(): string;
  /**
   * @return {string}
   */
  setProperty(value: string);
  /**
   * @param {string} 
   */
  setEntitySet(value: string);
  /**
   * @param {string} 
   */
  setQueryOptions(value: string);
  /**
   * @param {string} 
   */
  setReadLink(value: string);
}

/**
 * A designer-facing interface that provides access to a toolbar
 * control.
 * 
 * It is passed to rules to provide access to a toolbar control
 * for application specific customizations.
 * 
 * In addition it provides access to the IControlProxy interface.
 */
interface IToolbarProxy extends IControlProxy {
  /**
   * This method returns the top-level controls for this container
   * 
   * @return {IControlProxy[]} The controls for this container 
   */
  getToolbarControls(): IControlProxy[];
}

/**
 * A designer-facing interface that provides access to a bottomnavigation and tabs control
 * 
 * It is passed to rules to provide access to a tab items
 * for application specific customizations.
 */
interface ITabControlProxy extends IControlProxy {
  /**
   * @returns {IControlProxy[]} list of items in the tab control
   */
  tabItems: IControlProxy[];
  /**
   * Set tab item caption by item name
   */
  setItemCaption(tabItemName: string, newCaption: string);
  /**
   * Set selected tab item by name for tab control
   */
  setSelectedTabItemByName(tabItemName: string);
  /**
   * Set selected tab item by index for tab control
   */
  setSelectedTabItemByIndex(tabItemIndex: number);
  /**
   * @returns {string} tab item caption based on tab item name
   */
  getItemCaption(tabItemName: string): string;
  /**
   * @returns {string} selected tab item name
   */
  getSelectedTabItemName(): number;
  /**
   * @returns {number} selected tab item index
   */
  getSelectedTabItemIndex(): number;
}

/**
 * A designer-facing interface that provides access to a tab item.
 * 
 * It is passed to rules to provide access to a tab item
 * for application specific customizations.
 * 
 * In addition it provides access to the IControlProxy interface.
 */
interface ITabItemProxy extends IControlProxy {
  /**
   * Set item caption
   */
  setCaption(newCaption: string);
}

/**
 * A designer-facing interface that that provides access to action results 
 */
interface IActionResult {
  /**
   * Data from the action.  Depending on the action, it may or may not be set.  It can be set for any action type
   */
   data: any;
   /**
    * An error thrown during the execution of a failed or invalid action. The error.message contains the error message.
    * For an online OData action or a REST service action, the error object may contain the error information from the backend. 
    * In this case, the error.responseCode and error.responseBody contain the HTTP status code and the JSON string of the error response 
    * returned by the backend respectively. See the [example](../../../reference/schemadoc/Rule.html#actionresult-examples).
    */
   error: any;
   /** 
    * The status of the action.
    */ 
   status: any;
   /**
    * Whether or not the action is enabled.
    */
  enabled: boolean;
}

/**
 * A designer-facing interface that provides access to side drawer.
 * 
 * It is passed to rules to provide access to the side drawer
 * for application specific customizations.
 * 
 * In addition it provides access to the IControlProxy interface.
 */
 interface ISideDrawerControlProxy extends IControlProxy {
  /**
   * @returns {IControlProxy[]} list of items in the side drawer control
   */
  menuItems: Array<ISideDrawerMenuItemProxy[]>;

  /**
   * @returns {string[]} list of section captions in the side drawer control
   */
  sections: string[];

  /**
   * @returns {number} selected menu item indexPath
   */
  getSelectedMenuItemIndexPath(): [number, number];

  /**
   * @returns {string} selected menu item name
   */
  getSelectedMenuItemName(): string ;

  /**
   * Set side drawer icon
   */
  setSideDrawerButton(iconPath: string);

  /**
   * Set selected menu item by name for side drawer control
   */
  setSelectedMenuItemByName(name: string);

  /**
   * Set selected menu item by indexPath for side drawer control
   */
  setSelectedMenuItemByIndexPath(indexPath: [number, number]);

  /**
   * Get menu items at section index for side drawer control
   */
  getMenuItemsAtSection(sectionIndex: number) : ISideDrawerMenuItemProxy[]

  /**
   * Get menu items at section index for side drawer control
   */
  setSectionVisibilityAtIndex(sectionIndex: number, visibility: boolean);
}

/**
 * A designer-facing interface that provides access to a menu item.
 * 
 * It is passed to rules to provide access to a menu item
 * for application specific customizations.
 * 
 * In addition it provides access to the IClientAPI interface.
 */
interface ISideDrawerMenuItemProxy extends IClientAPI {

  /**
   * @return {string} the caption of the menu item
   */
  getTitle(): string;

  /**
   * Set menu item caption
   */
  setTitle(title: string);

  /**
   * Set menu item visibility
   */
  setVisibility(visibility: boolean);
}

/**
 * A designer-facing interface that provides access to a odata provider.
 */
interface IODataProviderProxy {
  /**
   * Determine whether the data provider is offline enabled
   * @return {boolean}
   */
  isOfflineEnabled(): boolean;

  /**
   * Determine whether the data provider is initialized
   * @return {boolean}
   */
  isInitialized(): boolean;
}

/**
 * A designer-facing interface that provides access to a offline odata provider.
 */
interface IOfflineODataProviderProxy extends IODataProviderProxy {
  /**
   * Gets the offline parameters object
   * @return {boolean}
   */
  getOfflineParameters(): IOfflineODataParametersProxy;  

  /** 
   * Checks whether or not, there are any pending requests stored in the request 
   * queue that have not yet been uploaded.
   * @return {boolean}
   */
  isRequestQueueEmpty(): boolean;
    
  /** 
   * Whether or not there is a pending download (a download that was cancelled either 
   * explicitly or because the provider was closed). It may be possible to continue 
   * the download by triggering a new download.
   * @return {boolean}
   */
  hasPendingDownload(): boolean;
  
  /**
   * Whether or not there is a pending upload (a upload that was cancelled either explicitly
   * or because the provider was closed). It may be possible to continue the upload by triggering 
   * a new upload.
   * @returns {boolean}
   */
  hasPendingUpload(): boolean;

}

/**
 * A designer-facing interface that provides access to a offline odata parameters.
 */
interface IOfflineODataParametersProxy {
  /**
   * Gets the custom HTTP request headers
   * @return {boolean}
   */
  getCustomHeaders(): Object;  

  /**
   * Sets the custom HTTP request headers
   * @param {headers} custom HTTP request headers
   * @return {void}
   */
  setCustomHeaders(headers: Object): void;

}

/**
* A designer-facing interface that provides HTTP response content helper functions
*/
interface IHttpResponseContent {
  /**
   * Gets the response body
   * @return {any}
   */
  getData(): any;

  /**
   * Gets the response body as file
   * Note: This function is for iOS & Android only
   * @return {File}
   */
  toFile(destinationFilePath?: string): File;

  /**
   * Gets the response body as native image object
   * Note: This function is for iOS & Android only
   * @return {any}
   */
  toImage(): any;

  /**
   * Gets the response body as string
   * @return {string}
   */
  toString(): string;
}

/**
* A designer-facing interface that encapsulates HTTP response information
*/
interface IHttpResponse {
  /**
   * Gets the response headers with key/value pair
   */
  headers: Object;
  
  /**
   * Gets the mime type
   */
  mimeType: string;

  /**
   * Gets the HTTP status code
   */
  statusCode: number;

  /**
   * Gets the response content
   */
  content: IHttpResponseContent;
}