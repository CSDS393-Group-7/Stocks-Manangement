# Backend

**Technologies**: Express, Node.js

## APIs
### User (/api/user)
| URL  | Description | Request | Response |
| ------------- | ------------- | ------------- | ------------- |
| ```/api/user/create```  | [POST] Create a new user  | <pre>{<br>  Content-Type: application/json,<br>  Body: { <br>    username: text,<br>    password: text,<br>    fullName: text,<br>    email: text,<br>  }<br>}</pre>  | Either one of the following JSON: <br><ul><li>```token``` (status 200): successfully registered. ```token``` is used for authorization</li><li>```{username} exists in database``` (status 409)</li></ul>  |
| ```/api/user/login```  | [POST] Login to server  | <pre>{<br>  Content-Type: application/json,<br>  Body: { <br>    username: text,<br>    password: text,<br>  }<br>}</pre>  | Either one of the following JSON: <br><ul><li><pre>{<br>   token: [token],<br>   info: {<br>      username: "sam.smith",<br>      fullName: "Sam Smith",<br>      email: "samsmith@abc.xyz"<br>   }<br>}</pre>(status 200): Successfully login. ```[token]``` is used for authorization</li><li>```{username} is not found``` (status 404)</li><li>```Password mismatched``` (status 403)</li></ul>  |

### News (/api/news)
| URL  | Description | Request | Response |
| ------------- | ------------- | ------------- | ------------- |
| ```/api/news/get-list```  | [GET] Get the news list  |   | JSON: a list of news with the following format: <pre>[<br>   {<br>      "_id": "ee679e...",<br>      "title": "Title...",<br>      "contentType": "STORY" or "ARTICLE" ...,<br>      "thumbnailUrl": "https://...",<br>      "originalUrl": "https://...",<br>      "provider": "Bloomberg",<br>      "publicationDate": "2021-04-29T08:36:17.000Z"<br>   },<br>   ... <br>]</pre>  |
| ```/api/news/search```  | [POST] Search by keywords | <pre>{<br>  Content-Type: application/json,<br>  Body: { <br>    keywords: text<br>  }<br>}</pre>  | JSON: a list of news with the same format as ```/api/news/get-list```  |