


function WaktuTimestampCreatedat(){	
	const now = new Date();
	const utcMillis = now.getTime() + now.getTimezoneOffset() * 60000;
	const wibMillis = utcMillis + 7 * 60 * 60 * 1000;
	const wibDate = new Date(wibMillis);

	const pad = (n) => n.toString().padStart(2, '0');
	return `${wibDate.getFullYear()}-${pad(wibDate.getMonth() + 1)}-${pad(wibDate.getDate())} ` +
	         `${pad(wibDate.getHours())}:${pad(wibDate.getMinutes())}:${pad(wibDate.getSeconds())}`;
}
function WaktuTimestampCreatedatSQLCompare() {
	const now = new Date();
	const utcMillis = now.getTime() + now.getTimezoneOffset() * 60000;
	const wibMillis = utcMillis + 7 * 60 * 60 * 1000;
	return new Date(wibMillis)
}

export{
	WaktuTimestampCreatedat,
	WaktuTimestampCreatedatSQLCompare
}