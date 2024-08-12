const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/pages/:page', (req, res) => {
    res.render(`pages/${req.params.page}`);
});

app.get('/', (req, res) => {
    res.render('index', { iframeSrc: 'https://curve.fi/#/ethereum/pools/factory-crypto-65' });});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
