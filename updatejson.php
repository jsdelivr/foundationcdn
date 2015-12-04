<?php

$json = file_get_contents('https://api.jsdelivr.com/v1/jsdelivr/libraries?name=foundation&fields=name,lastversion,versions,assets');
$data = json_decode($json);
$versions = $data[0]->versions;
$six = preg_grep("/^6.*/", $versions);
$lastsix = array_shift(array_values($six));
$five = preg_grep("/^5.*/", $versions);
$lastfive = array_shift(array_values($five));
$four = preg_grep("/^4.*/", $versions);
$lastfour = array_shift(array_values($four));
//six
$final['vers'][0]['num'] = str_replace(".","",$lastsix);
$final['vers'][0]['name'] = $lastsix;
$final['vers'][0]['mainJs'] = 'foundation.min.js';
$final['vers'][0]['mainCss'] = 'foundation.min.css';
$filesVersion = json_decode(file_get_contents("https://api.jsdelivr.com/v1/jsdelivr/libraries/foundation/$lastsix"));
$final['vers'][0]['files'] = $filesVersion;

foreach($filesVersion as $file){
	$content = file_get_contents('https://cdn.jsdelivr.net/foundation/'.$lastsix[0].'/'.$file.'');
	$sri = base64_encode(hash('sha256', $content, true));
	$srifiles[$file] = "sha256-$sri";
}
$final['vers'][0]['sri'] = $srifiles;
unset($srifiles);
//five
$final['vers'][1]['num'] = str_replace(".","",$lastfive);
$final['vers'][1]['name'] = $lastfive;
$final['vers'][1]['mainJs'] = 'js/foundation.min.js';
$final['vers'][1]['mainCss'] = 'css/foundation.min.css';
$filesVersion = json_decode(file_get_contents("https://api.jsdelivr.com/v1/jsdelivr/libraries/foundation/$lastfive"));
$final['vers'][1]['files'] = $filesVersion;

foreach($filesVersion as $file){
	$content = file_get_contents('https://cdn.jsdelivr.net/foundation/'.$lastfive[0].'/'.$file.'');
	$sri = base64_encode(hash('sha256', $content, true));
	$srifiles[$file] = "sha256-$sri";
}
$final['vers'][1]['sri'] = $srifiles;
unset($srifiles);
//four
$final['vers'][2]['num'] = str_replace(".","",$lastfour);
$final['vers'][2]['name'] = $lastfour;
$final['vers'][2]['mainJs'] = 'js/foundation.min.js';
$final['vers'][2]['mainCss'] = 'css/foundation.min.css';
$filesVersion = json_decode(file_get_contents("https://api.jsdelivr.com/v1/jsdelivr/libraries/foundation/$lastfour"));
$final['vers'][2]['files'] = $filesVersion;

foreach($filesVersion as $file){
	$content = file_get_contents('https://cdn.jsdelivr.net/foundation/'.$lastfour[0].'/'.$file.'');
	$sri = base64_encode(hash('sha256', $content, true));
	$srifiles[$file] = "sha256-$sri";
}
$final['vers'][2]['sri'] = $srifiles;
echo json_encode($final,JSON_UNESCAPED_SLASHES|JSON_NUMERIC_CHECK|JSON_PRETTY_PRINT);
