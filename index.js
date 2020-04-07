"use strict";

const http_port = 3000;

const express = require('express');
const app = express();

app.use(express.static('public'));

app.use('/', express.static('./')); 

app.listen(http_port, () => console.log(`Listening on port ${http_port}`));
