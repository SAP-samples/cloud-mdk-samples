{
	"_Name": "PartialUpload",
	"Version": "/PartialUpload/Globals/AppDefinition_Version.global",
	"MainPage": "/PartialUpload/Pages/Main.page",
	"OnLaunch": [
		"/PartialUpload/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/PartialUpload/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/PartialUpload/Actions/Service/InitializeOffline.action",
	"Styles": "/PartialUpload/Styles/Styles.less",
	"Localization": "/PartialUpload/i18n/i18n.properties"
}
