{
	"MainPage": "/CalendarViewExtensionApp/Pages/Calendar.page",
	"OnLaunch": [
		"/CalendarViewExtensionApp/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/CalendarViewExtensionApp/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/CalendarViewExtensionApp/Actions/Service/InitializeOffline.action",
	"Styles": "/CalendarViewExtensionApp/Styles/Styles.less",
	"Version": "/CalendarViewExtensionApp/Globals/AppDefinition_Version.global",
	"Localization": "/CalendarViewExtensionApp/i18n/i18n.properties",
	"_SchemaVersion": "6.1",
	"_Name": "CalendarViewExtensionApp"
}