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
    const freezers = [
        {
          name: "Freezer 1",
          imageUrl: "./images/frETHreveallottie.svg",
          lockDate: "2023-01-01",
          unlockDate: "2026-01-01",
          wethLocked: 2
        },
        {
            name: "Freezer 2",
            imageUrl: "./images/frETHreveallottie.svg",
            lockDate: "2023-05-23",
            unlockDate: "2024-01-23",
            wethLocked: 0.8453
          }
        // Add more dummy freezer objects as needed
      ];


    res.render('index', { iframeSrc: 'https://curve.fi/#/ethereum/pools/factory-crypto-65', freezers: freezers });});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
