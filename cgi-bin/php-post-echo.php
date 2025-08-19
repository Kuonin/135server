<?php
header("Cache-Control: no-cache");
header("Content-type: text/html");

# print HTML file top
echo '<!DOCTYPE html>
<html><head><title>POST Request Echo</title>
</head><body><h1 align="center">POST Request Echo</h1>
<hr>';

# NOTE: Although the Query String is an environment variable, the Message Body
# must be read in from the Standard Input with any language using CGI.
# Credit for this code to read in the Post data comes from:
# https://stackoverflow.com/questions/30447317/how-to-handle-post-request-to-perl-from-html
$formData = file_get_contents("php://input");

# Credit for this code to parse the Query String:
# https://www.mediacollege.com/internet/perl/query-string.html
$inputData = [];
if (strlen($formData) > 0) {
    $buffer = $formData;
    $pairs = explode("&", $buffer);
    foreach ($pairs as $pair) {
        list($name, $value) = explode("=", $pair);
        $value = urldecode($value);
        $inputData[$name] = $value;
    }
}

echo "<b>Message Body:</b><br />\n";
echo "<ul>\n";

# Print out the Query string
foreach (array_keys($inputData) as $key) {
    echo "<li>$key = " . htmlspecialchars($inputData[$key]) . "</li>\n";
}

echo "</ul>\n";
# Print the HTML file bottom
echo "</body></html>\n";
?>