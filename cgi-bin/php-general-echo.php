<?php
header("Cache-Control: no-cache");
header("Content-type: text/html");

# print HTML file top
echo <<<END
<!DOCTYPE html>
<html><head><title>General Request Echo</title>
</head><body><h1 align="center">General Request Echo</h1>
<hr>
END;

# HTTP Protocol, HTTP Method, and the Query String are all environment variables
echo "<p><b>HTTP Protocol:</b> " . $_SERVER['SERVER_PROTOCOL'] . "</p>";
echo "<p><b>HTTP Method:</b> " . $_SERVER['REQUEST_METHOD'] . "</p>";
echo "<p><b>Query String:</b> " . $_SERVER['QUERY_STRING'] . "</p>";

# NOTE: Although the Query String is an environment variable, the Message Body
# must be read in from the Standard Input with any language using CGI.
# Credit for this code to read in STDIN in Perl comes from:
# https://stackoverflow.com/questions/30447317/how-to-handle-post-request-to-perl-from-html
$form_data = file_get_contents('php://input');

echo "<p><b>Message Body:</b> " . htmlspecialchars($form_data) . "</p>";

# Print the HTML file bottom
echo "</body></html>\n";
?>