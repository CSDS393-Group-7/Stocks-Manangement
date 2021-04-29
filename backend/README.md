# Backend

**Technologies**: Express, Node.js

## APIs
### User (/api/user)
| URL  | Description | Request | Response |
| ------------- | ------------- | ------------- | ------------- |
| ```/api/user/create```  | Create a new user  | <pre>{<br>  Content-Type: application/json,<br>  Body: { <br>    username: text,<br>    password: text,<br>  }<br>}</pre>  | Either one of the following JSON: <br><ul><li>```token``` (status 200): successfully registered. ```token``` is used for authorization</li><li>```{username} exists in database``` (status 409)</li></ul>  |
| ```/api/user/login```  | Login to server  | <pre>{<br>  Content-Type: application/json,<br>  Body: { <br>    username: text,<br>    password: text,<br>  }<br>}</pre>  | Either one of the following JSON: <br><ul><li>```token``` (status 200): successfully login. ```token``` is used for authorization</li><li>```{username} is not found``` (status 404)</li><li>```Password mismatched``` (status 403)</li></ul>  |
