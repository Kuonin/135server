<?php
// Create a new PHP Session
session_start();

// Create CGI Object
$cgi = new CGI();

// Create a new Cookie from the Session ID
$cookie = $cgi->cookie('CGISESSID', session_id());
header('Content-Type: text/html; charset=UTF-8');
header('Set-Cookie: ' . $cookie);

// Store Data in that PHP Session
$username = isset($_SESSION['username']) ? $_SESSION['username'] : (isset($_GET['username']) ? $_GET['username'] : null);
$_SESSION['username'] = $username;

echo "<html>";
echo "<head>";
echo "<title>PHP Sessions</title>";
echo "</head>";
echo "<body>";

echo "<h1>PHP Sessions Page 1</h1>";

if ($username) {
    echo "<p><b>Name:</b> " . htmlspecialchars($username) . "</p>";
} else {
    echo "<p><b>Name:</b> You do not have a name set</p>";
}
echo "<br/><br/>";
echo "<a href=\"/cgi-bin/php-sessions-2.php\">Session Page 2</a><br/>";
echo "<a href=\"/php-cgiform.html\">PHP CGI Form</a><br />";
echo "<form style=\"margin-top:30px\" action=\"/cgi-bin/php-destroy-session.php\" method=\"get\">";
echo "<button type=\"submit\">Destroy Session</button>";
echo "</form>";

echo "</body>";
echo "</html>";
?>