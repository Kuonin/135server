<?php
// Headers
header("Cache-Control: no-cache");
header("Content-type: text/html");

session_start();
// Check to see if a proper name was sent
if ($_SESSION['username'] == '') {
    $name = $_POST['username'];
    $_SESSION['username'] = $name;
}
else{
    $name = $_SESSION['username'];
}


// Body - HTML
echo "<html>";
echo "<head><title>PHP Sessions</title></head>\n";
echo "<body>";
echo "<h1>PHP Sessions Page 1</h1>";
echo "<p>";

// First check for new Cookie, then Check for old Cookie
if(strlen($name) > 0){
    echo "Name:$name\n";
}
else{
    echo "You have not set a name yet\n";
}


echo "</p>";

// Links for other pages
echo "<br />";
echo "<a href=\"/cgi-bin/php-sessions-2.php\">Session Page 2</a>";
echo "<br />";
echo "<a href=\"/php-cgiform.html\">PHP CGI Form</a>";
echo "<br /><br />";

// Destroy Cookie button
echo "<form action=\"/cgi-bin/php-destroy-session.php\" method=\"get\">";
echo "<button type=\"submit\">Destroy Session</button>";
echo "</form>";

echo "</body>";
echo "</html>";
?>