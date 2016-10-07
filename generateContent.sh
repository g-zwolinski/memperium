#!/bin/bash

# odpal app.js, ktora zapisuje nowe wrzuty do DB
# node app.js
# jak skonczy dzialac (tzn ze jest content do updateu), usun content
#rm ./public/content
#stworz plik contentu
#touch public/content/content.html
# node showAll.js
# > public/content/content.html

while :
do
	node app.js
	rm -rf ./public/content
	mkdir public/content
	#rm ./public/content/content.js
	touch ./public/content/content.js
	node showAll.js
	sleep 2
done
