<?php
// Content-type: text/html
header("Content-type: text/html");

// session_start();

// $sessionId = isset($_COOKIE['SITE_SID']) ? $_COOKIE['SITE_SID'] : (isset($_GET['sid']) ? $_GET['sid'] : null);
// if ($sessionId) {
//     session_id($sessionId);
// }

session_destroy();

echo "<html>";
echo "<head>";
echo "<title>PHP Session Destroyed</title>";
echo "</head>";
echo "<body>";
echo "<h1>Session Destroyed</h1>";
echo "<a href=\"/php-cgiform.html\">Back to the PHP CGI Form</a><br />";
echo "<a href=\"/cgi-bin/php-sessions-1.php\">Back to Page 1</a><br />";
echo "<a href=\"/cgi-bin/php-sessions-2.php\">Back to Page 2</a>";
echo "</body>";
echo "</html>";
?>