{
	"MainPage": "/HomeScreenWidgetApp/Pages/SalesOrderList.page",
	"OnLaunch": [
		"/HomeScreenWidgetApp/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/HomeScreenWidgetApp/Rules/Application/OnWillUpdate.js",
	"OnDidUpdate": "/HomeScreenWidgetApp/Actions/Service/InitializeOnline.action",
	"OnLinkDataReceived": "/HomeScreenWidgetApp/Rules/Application/OnLinkDataReceived.js",
	"Styles": "/HomeScreenWidgetApp/Styles/Styles.less",
	"Version": "/HomeScreenWidgetApp/Globals/Application/AppDefinition_Version.global",
	"Localization": "/HomeScreenWidgetApp/i18n/i18n.properties",
	"_SchemaVersion": "24.11",
	"_Name": "HomeScreenWidgetApp"
}