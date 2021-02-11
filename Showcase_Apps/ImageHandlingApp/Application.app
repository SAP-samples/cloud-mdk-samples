{
	"_Name": "ProductListApp",
	"Version": "/ProductListApp/Globals/AppDefinition_Version.global",
	"MainPage": "/ProductListApp/Pages/Main.page",
	"OnLaunch": [
		"/ProductListApp/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/ProductListApp/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/ProductListApp/Actions/Service/InitializeOffline.action",
	"Styles": "/ProductListApp/Styles/Styles.less",
	"Localization": "/ProductListApp/i18n/i18n.properties"
}