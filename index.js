const express = require('express');
const app = express();

app.use('/', express.static(__dirname+'/src'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listen on port ${port}`));