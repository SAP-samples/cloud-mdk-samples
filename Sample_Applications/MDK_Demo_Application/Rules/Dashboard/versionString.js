export default function versionString(context) {
	let ver = 'v' + context.getGlobalDefinition('/MDKDemoApp/Globals/Application/AppDefinition_Version.global').getValue();
	return ver;
}