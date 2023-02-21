import express from 'express';
import router from './routes/application-routes.js'

const app = express();
const port = 5000;

app.get('/api/v1', (req, res) => {
  res.json({"users": ["User1", "User2", "User3"]})
});

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});