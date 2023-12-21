const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { initSession } = require('./src/utils/sessions');
require('dotenv').config();

/* Import de la rutas */

const mainRoutes = require('./src/router/mainRoutes');
const shopRoutes = require('./src/router/shopRoutes');
const adminRoutes = require('./src/router/adminRoutes');
const authRoutes = require('./src/router/authRoutes');
const { notFoundPage } = require('./src/utils/errorHandlers');

const PORT = process.env.PORT || 3000;

/* Define carpeta de archivos estáticos */

app.use(express.static(path.resolve(__dirname, "public")));

/* User Session */

app.use(initSession());
app.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged;
  next();
});

/* Configuración del Template Engine - EJS */

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, "./src/views"));

/* Parsea los datos recibidos por POST */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Override para habilitar métodos PUT y DELETE */
app.use(methodOverride('_method'));

/* Rutas de la aplicación */

app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.use(notFoundPage);

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`))
