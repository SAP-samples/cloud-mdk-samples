{
	"MainPage": "/HomeScreenWidgetApp/Pages/Main.page",
	"OnLaunch": [
		"/HomeScreenWidgetApp/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/HomeScreenWidgetApp/Rules/Application/OnWillUpdate.js",
	"OnDidUpdate": "/HomeScreenWidgetApp/Actions/Service/InitializeOnline.action",
	"Styles": "/HomeScreenWidgetApp/Styles/Styles.less",
	"Version": "/HomeScreenWidgetApp/Globals/Application/AppDefinition_Version.global",
	"Localization": "/HomeScreenWidgetApp/i18n/i18n.properties",
	"_SchemaVersion": "23.12",
	"_Name": "HomeScreenWidgetApp"
}