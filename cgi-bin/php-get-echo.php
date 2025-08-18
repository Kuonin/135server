<?php

// print HTML file top
print <<END;
<!DOCTYPE html>
<html><head><title>GET Request Echo</title>
</head><body><h1 align="center">Get Request Echo</h1>
<hr>
END

// The Query String is simply an environment variable
print "<b>Query String:</b> " . $_SERVER['QUERY_STRING'] . "<br />\n";

// Credit for this code to parse the Query string:
// https://www.mediacollege.com/internet/perl/query-string.html
if (strlen($_SERVER['QUERY_STRING']) > 0) {
  $queryStringBuffer = $_SERVER['QUERY_STRING'];
  $queryPairs = explode('&', $queryStringBuffer);
  $inputArray = [];
  foreach ($queryPairs as $pair) {
    list($name, $value) = explode('=', $pair);
    $value = urldecode($value);
    $inputArray[$name] = $value; 
  }
}

// Print out the Query String
$loopCounter = 0;
foreach (array_keys($inputArray) as $key) {
  $loopCounter += 1;
  if ($loopCounter % 2 != 0) {
    print "$key = " . $inputArray[$key] . "<br/>\n";
  }
}

// Print the HTML file bottom
print "</body></html>";
?>