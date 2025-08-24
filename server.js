// ver informacion detallada en proyecto flet-notion
// require('./db/tripData');
const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require("./db/db");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
