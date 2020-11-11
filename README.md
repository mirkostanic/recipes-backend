# recipes-backend
REST API for accessing recipes database.  
  
To install run the following commands in the root directory:  
  ./docker-compose build  
  ./docker-compose up  
    
If Docker is not available, run npm start from the root directory.  
Note: Make sure you have MongoDB installed and listening on port 27017 in this case.  
  
The api is exposed on localhost:8080/api/  
  
<b>API Methods</b>  
  
<b>POST recipe/search/:title</b>  
Search for the recipe with the title of :title.  
  
<b>POST recipe/create</b>  
Create recipe. Method expects you to pass a JSON object containing title, description, ingredients and direction.  
Example input: {"title":"Some cake", "description":"Cakey cake.", "ingredients":"2kg of cake stuff.", "directions":"Bake for 4 hours."}  
  
<b>GET recipe/read/:id</b>  
Read the recipe with the id of :id.  
  
<b>PUT recipe/update/:id</b>  
Update the recipe with the id of :id. Method expects you to pass a JSON object containing title, description, ingredients and direction.  
Example input: {"title":"Some new cake", "description":"Cakey cake.", "ingredients":"2kg of cake stuff.", "directions":"Bake for 4 hours."}  
  
<b>DELETE recipe/delete/:id</b>  
Delete the recipe with the id of :id.  
  
<b>POST interaction/like/:id</b>  
Add a like to the recipe with the id of :id. Method expects you to pass a JSON object containing type and value.  
Example input: {"type":"rate", "value":"+"}  
  
<b>POST interaction/comment/:id</b>  
Add a comment to the recipe with the id of :id. Method expects you to pass a JSON object containing type and value.  
Example input: {"type":"comment", "value":"Nice cake."}  
  
<b>POST interaction/rate/:id</b>  
Add a rating to the recipe with the id of :id. Method expects you to pass a JSON object containing type and value.  
Example input: {"type":"rate", "value":"4"}  
