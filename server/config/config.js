/* Puerto */
process.env.PORT = process.env.PORT || 3000;


/* Entono de desarrollo */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* Base de datos*/
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://camilo:IkRhRFAwqm010T43@cluster0-8mtt6.mongodb.net/cafe';
}
process.env.URLDB = urlDB;