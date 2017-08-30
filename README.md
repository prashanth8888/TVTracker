## TV Tracker App

### Welcome to TV tracker App - Makes your show tracking Application much easier,

### 2 Simple steps

1) Subscribe to your fav shows.
2) Email notification when a new season starts.

This is a MEAN stack application that is based on Angular 1.6.
- Tested using Karma/Jasmine.

### API'S used

TMDB - It's a great resource for small applications but getting all data at once is difficult or 
most of the times options won't be available.

### RESTful Routes Details

NODE.JS Routes:

Route	         POST	                                     GET	                             
/tv/shows/:id	 N/A	                                     Get all shows in that genre	    
/tv/show/:id	 N/A	                                     Get a particular show  with option to subscribe/unsubscribe	        	    
/tv/subscribe    Subscribe to a show                         N/A
/tv/unsubscribe  Unsubscribe to already subscribed show      N/A
