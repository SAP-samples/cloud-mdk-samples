import ShowInlineValidationView from "./ShowInlineValidationView";

/**
 * @param {IClientAPI} clientAPI
 */
export default function ValidateFormCellControls(clientAPI) {
    const titleInputControl = clientAPI.evaluateTargetPathForAPI("#Page:-Current/#Control:TitleInput");
    const simplePropertyInputControl = clientAPI.evaluateTargetPathForAPI("#Page:-Current/#Control:SimplePropertyInput");
    const noteInputControl = clientAPI.evaluateTargetPathForAPI("#Page:-Current/#Control:NoteInput");
    const listPickerControl = clientAPI.evaluateTargetPathForAPI("#Page:-Current/#Control:ListPicker");
    const segmentedControl = clientAPI.evaluateTargetPathForAPI("#Page:-Current/#Control:Segmented");
    const datePickerControl = clientAPI.evaluateTargetPathForAPI("#Page:-Current/#Control:DatePicker");
    const durationPickerControl = clientAPI.evaluateTargetPathForAPI("#Page:-Current/#Control:DurationPicker");
    const attachmentControl = clientAPI.evaluateTargetPathForAPI("#Page:-Current/#Control:Attachment");
    const inlineSignatureCaptureControl = clientAPI.evaluateTargetPathForAPI("#Page:-Current/#Control:InlineSignatureCapture");
    const signatureCaptureControl = clientAPI.evaluateTargetPathForAPI("#Page:-Current/#Control:SignatureCapture");
    const textInputControls = [titleInputControl, simplePropertyInputControl, noteInputControl];
    const singleValueControls = [inlineSignatureCaptureControl, signatureCaptureControl, durationPickerControl];
    const multiInputControls = [listPickerControl, segmentedControl, attachmentControl];
    textInputControls.forEach(control => {
        const textInput = control.getValue();

        // Validate if text input is not empty
        if (!textInput) {
            ShowInlineValidationView(clientAPI, control, "This field is required.");
            return;
        }

        // Validate if length of text characters is at least 8 using regex
        if (!/.{8,}/.test(textInput)) {
            ShowInlineValidationView(clientAPI, control, "Please enter at least 8 characters.");
            return;
        }
        
        // Clear validation message
        ShowInlineValidationView(clientAPI, control, "", true);
    });

    singleValueControls.forEach(control => {
        if (!control.getValue()) {
            ShowInlineValidationView(clientAPI, control, "This field is required.");
            return;
        }

        // Clear validation message
        ShowInlineValidationView(clientAPI, control, "", true);
    });

    multiInputControls.forEach(control => {
        // Validate if length of values is at least 1
        if (!control.getValue().length > 0) {
            ShowInlineValidationView(clientAPI, control, "This field is required.");
            return;
        }

        // Clear validation message
        ShowInlineValidationView(clientAPI, control, "", true);
    });
    
    const date = new Date();
    // Validate if date is in the future
    if (datePickerControl.getValue() < date) {
        ShowInlineValidationView(clientAPI, datePickerControl, "Only future dates possible.");
    } else {
        // Clear validation message
        ShowInlineValidationView(clientAPI, datePickerControl, "", true);
    }
}
