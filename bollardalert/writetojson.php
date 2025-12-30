<?php
//code written by: Ian Tattersfield
//version update: February 21, 2019
//***************************************************************
//takes as input variables, reads and appends csv file then makes
//individual geojson line files for each userID
//   o
//    \_/\o
//   ( Oo)                    \|/
//   (_=-)  .===O-  ~~Z~A~P~~ -O-
//   /   \_/U'                /|\
//   ||  |_/
//   \\  |
//   {K ||
//    | PP
//    | ||
//    (__\\

//***************************************************************
	$csvfile = 'data.csv';
//================================================================
	//get values from url
	$timestamp = urldecode($_GET['timestamp']);
	$userID = urldecode($_GET['userID']);
	$lat = urldecode($_GET['lat']);
	$lng = urldecode($_GET['lng']);
//================================================================
	//write new values to csv
	$put = [ $timestamp, $userID, $lat, $lng];
	$handle = fopen($csvfile, "a");
	fputcsv($handle, $put); 
	fclose($handle);
//================================================================
	//load csv data into multidimensional array and sort by user
	$csvData = []; 
	if (($h = fopen("{$csvfile}", "r")) !== FALSE) {
		while (($data = fgetcsv($h, 1000, ",")) !== FALSE) {
			$csvData[] = $data;		
		}
	fclose($h);
	}
	foreach ($csvData as $key => $row) {
    $Rtimestamp[$key]  = $row[0];
    $RuserID[$key] = $row[1];
    $Rlat[$key] = $row[2];
    $Rlng[$key] = $row[3];
}
array_multisort($RuserID, $Rtimestamp, $Rlat, $Rlng);
//=================================================================
	//get names and line colours of participants
	$paths = array();	$n = 0; $m = -1;
	for ($i=0;$i<count($csvData);$i++){
		if (($i+1) < count($csvData)){
			if (($i>0)&&(($RuserID[$i-1]) !== ($RuserID[$i]))) {
				$n++;	$m=-1;
			} $m++;
		}
  	$paths[$n][0] = $m;
		$paths[$n][1] = $RuserID[$i];
		$paths[$n][2] = $RuserID[$i].'.json';
		$paths[$n][3] = $Rlat[$i];
		$paths[$n][4] = $Rlng[$i];
	}
//==================================================================
	//create gjson array for export
	$gjson = array(); $g=0;
			for ($q=0; $q<($n+1); $q++) { 
	$gjson[] = '
				{	"type": "FeatureCollection",
				"features":[
					{
					"type": "Feature",
						"properties": {
	        	"title":"'.$paths[$q][1].'"},
	      		"geometry": {
	      			"type": "LineString",
	      			"coordinates":[	';
						for ($i=0;$i<count($csvData);$i++){
							if ( $paths[$q][1] == $csvData[$i][1] ){
  							$gjson[] = '['.$csvData[$i][3].','.$csvData[$i][2].']';
								if (($g < $paths[$q][0])) {
									$gjson[] = ',';
									$g++;
			 					} 
			 					elseif(($q == $n)){
			 						$gjson[] = ',';
			 						$gjson[] = '['.$csvData[$i+1][3].','.$csvData[$i+1][2].']';
			 						break;
			 			}	}	}
			$gjson[] = ']}}]}';
			file_put_contents($paths[$q][2], $gjson);		
			$gjson = array(); $g=0;
	}
?>
