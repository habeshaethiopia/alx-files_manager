import express from 'express';
import route from './routes/index';

const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

route(app);

export default app;
