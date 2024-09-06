import ParseKey from "./ParseKey";

function getFormCellSchema(context) {
  try {
    const binding = context.binding;
    const schema = JSON.parse(binding.OperationData?.schema);
    const results = [];
    schema.forEach(formcell => {
      let value = formcell.value;
      for (const key in binding.OperationData) {
        if (binding.OperationData.hasOwnProperty(key) && formcell.title === key) {
          value = binding.OperationData[key];
        }
      }
      results.push({
        "_Type": formcell.type,
        "Caption": ParseKey(formcell.title),
        "Value": value,
        "_Name": formcell.title,
      })
    })
    return results;
  } catch (e) {
    console.log(e)
  }
}

export default function NavToOperationEdit(context) {
  try {
    const pageProxy = context.getPageProxy();
    const schema = getFormCellSchema(context);

    const pageMetataObj = {
      "Caption": "Operation Detail Edit",
      "ActionBar": {
        "Items": [
          {
            "Position": "right",
            "SystemItem": "sparkles",
            "Text": "Edit",
            "OnPress": "/MDKDevApp/Rules/ImageAnalysis/NavToRecordPage.js"
          },
          {
            "Position": "right",
            "Text": "Confirm",
            "OnPress": "/MDKDevApp/Rules/ImageAnalysis/SaveData.js"
          }
        ]
      },
      "Controls": [
        {
          "Sections": [
            {
              "_Type": "Section.Type.FormCell",
              "_Name": "FormCellSection",
              "Controls": schema
            }
          ],
          "_Name": "SectionedTable",
          "_Type": "Control.Type.SectionedTable"
        }
      ],
      "_Name": "OperationEdit",
      "_Type": "Page"
    }

    const pageMetadata = JSON.stringify(pageMetataObj);

    return pageProxy.executeAction({
      "Name": "/MDKDevApp/Actions/NavToPage.action",
      "Properties": {
        "PageToOpen": "/MDKDevApp/Pages/Empty.page",
        "PageMetadata": pageMetadata
      }
    });
  } catch (e) {
    console.log(e)
  }
}