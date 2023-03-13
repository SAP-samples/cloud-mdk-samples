import ShowInlineValidationView from "./ShowInlineValidationView";

/**
 * @param {IClientAPI} clientAPI
 */
export default function ValidateSimpleProperty(clientAPI) {
    const control = clientAPI.evaluateTargetPath("#Control:SimplePropertyInput");
    const inputText = control.getValue();
    
    // Validate if input text is not empty
    if (!inputText) {
        ShowInlineValidationView(clientAPI, control, "This field is required.");
        return;
    }
    
    // Validate if length of characters is at least 8 using regex
    if (!/.{8,}/.test(inputText)) {
        ShowInlineValidationView(clientAPI, control, "Please enter at least 8 characters.");
        return;
    }
    
    // Validation is successful
    ShowInlineValidationView(clientAPI, control, "", true);
}
