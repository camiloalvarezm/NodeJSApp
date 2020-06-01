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

/* Vencimiento del token */
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = '48h';

/* Seed de autenticacioon */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// ============================
//  Google Client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '124504189310-1knkled69tr3nraspo825qqckjkclgmq.apps.googleusercontent.com';