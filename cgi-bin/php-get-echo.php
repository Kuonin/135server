<?php

// print HTML file top

echo '<!DOCTYPE html>
<html><head><title>GET Request Echo</title>
</head><body><h1 align="center">Get Request Echo</h1>
<hr>';

// The Query String is simply an environment variable
echo "<b>Query String:</b> " . $_SERVER['QUERY_STRING'] . "<br />\n";

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
foreach (array_keys($inputArray) as $key) {
    echo "$key = " . $inputArray[$key] . "<br/>\n";
}

// Print the HTML file bottom
echo "</body></html>";
?>