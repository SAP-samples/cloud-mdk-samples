{
	"_Name": "PersistentFilters",
	"Version": "/PersistentFilters/Globals/AppDefinition_Version.global",
	"MainPage": "/PersistentFilters/Pages/Main.page",
	"OnLaunch": [
		"/PersistentFilters/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/PersistentFilters/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/PersistentFilters/Actions/Service/InitializeOffline.action",
	"Styles": "/PersistentFilters/Styles/Styles.less",
	"Localization": "/PersistentFilters/i18n/i18n.properties",
	"_SchemaVersion": "6.1"
}