//code written by: Ian Tattersfield
//version update: February 21, 2019
//***************************************************************
//takes as input variables, reads and sends them to the 
//writetojson.php file.

function writeToCSV(timestamp_in, userID_in, lat_in, lng_in){
	var user = {
    timestamp_in: encodeURIComponent(timestamp_in),
    userID_in: encodeURIComponent(userID_in),
    lat_in: encodeURIComponent(lat_in),
    lng_in: encodeURIComponent(lng_in),
	};	
	if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest();}
	else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
	var url = "?timestamp="+user.timestamp_in+"&userID="+user.userID_in+"&lat="+user.lat_in+"&lng="+user.lng_in;
	var sendUrl = 'writetojson.php' + url;
	xmlhttp.open("GET", sendUrl, false); 
	xmlhttp.send();
}