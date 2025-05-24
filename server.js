require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const response = await axios.get(`https://ipqualityscore.com/api/json/ip/${process.env.IPQS_API_KEY}/${ip}`);
    res.render('index', { data: response.data });
  } catch (err) {
    res.render('index', { data: null });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
