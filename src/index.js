const bodyParser = require('body-parser');
const express = require('express');
const { todoRouter } = require('./routes/todo.route');

const app = express();

const port = 4000;
app.use(bodyParser.json());
app.use('/tasks', todoRouter);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
