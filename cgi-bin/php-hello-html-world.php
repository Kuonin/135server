#!/usr/bin/php

<?php
print "Cache-Control: no-cache\n";
print "Content-type: text/html\n\n";
print "<html>";
print "<head>";
print "<title>Hello, Perl!</title>";
print "</head>";
print "<body>";

print "<h1>Katie was here - Hello, Perl!</h1>";
print "<p>This page was generated with the Perl programming language</p>";

$currentTime = date('Y-m-d H:i:s');
print "<p>Current Time: $currentTime</p>";

# IP Address is an environment variable when using CGI
$ipAddress = $_SERVER['REMOTE_ADDR'];
print "<p>Your IP Address: $ipAddress</p>";

print "</body>";
print "</html>";
?>