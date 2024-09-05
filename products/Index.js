const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res,next) => {
    return res.status(200).json({ message: 'Product service' })
});

app.listen(8002, () => {
    console.log('Server is running on port 8002');
});