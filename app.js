const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './Views')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.router);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('ejs/404', {path:'', title:'Page Not Found'});
});

app.listen(3000);
 