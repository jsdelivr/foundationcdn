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
$final['vers'][0]['files'] = $data[0]->assets[0]->files;

foreach($data[0]->assets[0]->files as $file){
	$content = file_get_contents('https://cdn.jsdelivr.net/foundation/'.$six[0].'/'.$file.'');
	$sri = base64_encode(hash('sha256', $content, true));
	$srifiles[$file] = "sha256-$sri";
}
$final['vers'][0]['sri'] = $srifiles;
//five
$final['vers'][1]['num'] = str_replace(".","",$lastfive);
$final['vers'][1]['name'] = $lastfive;
$final['vers'][1]['mainJs'] = 'js/foundation.min.js';
$final['vers'][1]['mainCss'] = 'css/foundation.min.css';
$final['vers'][1]['files'] = $data[0]->assets[0]->files;

foreach($data[0]->assets[0]->files as $file){
	$content = file_get_contents('https://cdn.jsdelivr.net/foundation/'.$five[0].'/'.$file.'');
	$sri = base64_encode(hash('sha256', $content, true));
	$srifiles[$file] = "sha256-$sri";
}
$final['vers'][1]['sri'] = $srifiles;

//four
$final['vers'][2]['num'] = str_replace(".","",$lastfour);
$final['vers'][2]['name'] = $lastfour;
$final['vers'][2]['mainJs'] = 'js/foundation.min.js';
$final['vers'][2]['mainCss'] = 'css/foundation.min.css';
$final['vers'][2]['files'] = $data[0]->assets[0]->files;

foreach($data[0]->assets[0]->files as $file){
	$content = file_get_contents('https://cdn.jsdelivr.net/foundation/'.$four[0].'/'.$file.'');
	$sri = base64_encode(hash('sha256', $content, true));
	$srifiles[$file] = "sha256-$sri";
}
$final['vers'][2]['sri'] = $srifiles;
echo json_encode($final,JSON_UNESCAPED_SLASHES|JSON_NUMERIC_CHECK|JSON_PRETTY_PRINT);
