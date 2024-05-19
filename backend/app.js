const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const cors = require('cors');

const app = express();
const PORT = 4040;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});