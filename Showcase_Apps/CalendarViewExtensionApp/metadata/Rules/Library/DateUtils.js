export default class {
	static getCurrentDate(context) {
		var date = new Date();
		return this.toLocalDateString(date);
	}

	static toLocalDateString(date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		if (month < 10) month = '0' + month;
		var day = date.getDate();
		if (day < 10) day = '0' + day;
		return year + '-' + month + '-' + day;
	}
}