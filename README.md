# 135server

Members: Katie Leong

Password for grader user and SSH Key are on gradescope

Link: https://katiel.site

Githubg auto deploy setup:
- Followed this article, https://medium.com/swlh/how-to-deploy-your-application-to-digital-ocean-using-github-actions-and-save-up-on-ci-cd-costs-74b7315facc2, to deploy applciation to digital ocean using git hub actions, so I set up a .yaml file and also added a passkey secret and then authenticated the server as a user for my account so I would have permission to clone and pull my repo. First the .yaml file had git clone but after the initial cloning I changed that line to be git pull

Username/Password for logging onto site: on gradescope

Changes to HTML file in DevTools after compression:
- Followed this article, https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-mod_deflate-on-ubuntu-14-04, and mod_deflate is enabled by default so I made sure to verify what it was compression by checking the/etc/apache2/mods-enabled/deflate.conf file and it does that appear that html, css and js pages are being compressed
- Here is what was in the file: *
*         AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript
*         AddOutputFilterByType DEFLATE application/x-javascript application/javascript application/ecmascript
*         AddOutputFilterByType DEFLATE application/rss+xml
*         AddOutputFilterByType DEFLATE application/wasm
*         AddOutputFilterByType DEFLATE application/xml

In order to remove the Server header I downloaded mod_security using this article, https://www.digitalocean.com/community/tutorials/how-to-set-up-mod_security-with-apache-on-debian-ubuntu, and in the mod_security conf file I added in the line SecServerSignature "CSE135 Server" and made sure that in my other conf files I had ServerTokens Full.

The order the screenshots appear in the pdf submitted on gradescope is alphabetic:
- compression-verify.jpg
- error-page.jpeg
- header-verify.jpeg
- initial-index.jpg
- log-verification.jpg
- modified-index.jpg
- php-verification.jpg
- report-verification.jpg
- SSL-verify.jpg
- validator-initial.jpg
- vhosts-verify.jpg
