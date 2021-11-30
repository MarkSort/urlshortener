URL Shortening REST Service

Requires Node.js - tested with v12.18.3

To run: 
    npm install
    node src/app.js

Create a Short URL:
    curl localhost:4000 -XPOST -d '{ "url": "http://www.marksort.com" }'
Or the Powershell equivalent:
    Invoke-WebRequest -Uri "http://localhost:4000" -Method POST -Headers @{'Content-Type' = 'application/json'} -Body '{ "url": "http://www.marksort.com" }'

Fetch a URL:
    curl localhost:4000/abc123
Or the Powershell equivalent:
    Invoke-WebRequest -Uri "localhost:4000/abc123" -MaximumRedirection 0

