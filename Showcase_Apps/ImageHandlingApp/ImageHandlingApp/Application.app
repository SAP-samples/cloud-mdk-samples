{
	"_Name": "ImageHandlingApp",
	"Version": "/ImageHandlingApp/Globals/AppDefinition_Version.global",
	"MainPage": "/ImageHandlingApp/Pages/Main.page",
	"OnLaunch": [
		"/ImageHandlingApp/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/ImageHandlingApp/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/ImageHandlingApp/Actions/Service/InitializeOffline.action",
	"Styles": "/ImageHandlingApp/Styles/Styles.less",
	"Localization": "/ImageHandlingApp/i18n/i18n.properties",
	"_SchemaVersion": "24.7"
}