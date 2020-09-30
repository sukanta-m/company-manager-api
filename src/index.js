const express = require('express');
require('./db/mongoose');
const userRouter = require('./routes/user');
const companyRouter = require('./routes/company');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(companyRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})