Discussion-----------------------

The metrics I chose to display were User languages, mouse clicks and when users entered and exited the page.

To visualize the language data I chose to use a bar graph because it would be easier to tell the number of different languages, which languages were in the most sessions and which languages were in the least amount of sessions. I felt it was important to know this metric as internationalization is an important factor to keep in mind when you are building web pages but you may not think it applies to you until you see what languages the users have on that are coming to your page. The data helps inform us about the importance of internationalization and to make conscious choices that the way we build the site should not be based off of English standards, like making words go from left to right, and to make sure text is part of the page so it can easily be translated rather than being in a picture which would not be translated. 

To visualize the mouse clicks, I plotted them using a scatter graph so that you can see what areas had the most clicks and if you were to overlay it onto the most common screen size, possibly if there are any deadclicks, any parts of the page that are confusing users into thinking they are clickable when in reality, they are not. For developers who know what each component of their page does, it may not appear as obvious to them what the actual user experience is, they may think they have designed their site well when in reality they may have broken some conventions that lead to confusion from the users. 

To visualize when users entered and left the page, I used a grid so that not only could you see which sessions were entering and leaving and at what time along with their session id. This is helpful so you can see if users are clicking off right when they entered, if this is a variety of different uses or just the same users and can help you determine, if the reason they are clicking off so fast is because they got what they needed and could go or if they were guided to the wrong page. The data gathered from this can tell us about how long users stayed on the page by looking at the start and end times as well as inform us if there are any noticeable patterns, like sessions only starting at certain times of day. There could be a variety of reasons why users only appear to be going on the page at certain times of day but it could also be there may be some access error where the server shuts down or encounters some bug and doesn’t get back and running till around this time. You would need to also look at the log files to get a more complete understanding of the data. This could also help to see if there are any weird user behaviors, like a specific session entering and leaving the page a lot in a short spam of time. 


Report---------------------------Required

I chose to use this metric to answer the question, “What are users clicking on”? Not only is this beneficial in seeing what are popular links that people want to use and possibly move it to be higher in the page or put a banner on the top of the page saying something like most commonly clicked links, but because it also helps to see if any part of the page design is confusing for users, causing dead clicks. 

For mouse clicks, I chose to use a scatter plot because you can overlay that over an image of the website to get a general idea of what was being clicked on. There will be some random clicks and they won’t all match up perfectly because users have different screen dimensions but this will still help in determining where users are clicking.

I also used a grid to display not only the coordinates of the mouseclicks but also the sessionId so you can see if it is just a few users who are having issues and dead clicking, or if its a wide variety of users who are dead clicking. 

Report---------------------------EC
I chose to use this metric to answer the question, Are there many international users coming to the site and if so, what languages do they speak?,
to get a better understanding of what is the audience for this site. I used a bar graph to demonstrate the number of sessions
in a lanugage to make it easier to see which language had the most sessions and which languages had the least
while also being able to help a reader understand what the variety of languages are. I also included other values besides
just the session id and the language in the grid, like if Cookies are enabled, because I thought it would help better figure out if it is possibly the same user
for a language who may just be disabling cookies. I also included what the user agent of the user is so that there may be noticable patterns in
what kinds of browser people speaking the same language may have in common and to see if there are any specific implementation
details regarding that browser and that language, such as to make it easier for a specific browser to translate to a specific language,
there could be some information on how to implement that for a smoother translation. I think it is important to know the languages that users
speak so that you can get a better understanding of the audience and that while it is important to make good design choices in regards to internationalization,
some developers may not care or think to do so until they realize that people accessing their sites are people from around the world and not just people from their region.