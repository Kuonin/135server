<?php
header("Cache-Control: no-cache");
header("Content-type: text/html");

# print HTML file top
echo <<<END
<!DOCTYPE html>
<html><head><title>Environment Variables</title>
</head><body><h1 align="center">Environment Variables</h1>
<hr>
END;

// Loop over the environment variables and print each variable and its value
foreach (array_keys($_SERVER) as $variable) {
    echo "<b>$variable:</b> " . htmlspecialchars($_SERVER[$variable]) . "<br />\n";
}

// Print the HTML file bottom
echo "</body></html>";
?>