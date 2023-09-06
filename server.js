const express = require('express');
const bodyParser = require('body-parser');
const testFunctions = require('./functions/testFunctions'); 
const port = 3000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());



app.get('/test/:id', testFunctions.getTests);
app.post('/testresults', testFunctions.postTestResults);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
