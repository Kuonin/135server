<?php
print "<html>";
print "<head>";
print "<title>Hello, PHP!</title>";
print "</head>";
print "<body>";

print "<h1>Katie was here - Hello, PHP!</h1>";
print "<p>This page was generated with the PHP programming language</p>";

$currentTime = date('Y-m-d H:i:s');
print "<p>Current Time: $currentTime</p>";

# IP Address is an environment variable when using CGI
$ipAddress = $_SERVER['REMOTE_ADDR'];
print "<p>Your IP Address: $ipAddress</p>";

print "</body>";
print "</html>";
?>