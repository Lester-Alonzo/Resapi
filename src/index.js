import app from './app';
import './database'


app.listen(app.get('port'), ()=> console.log( `servidor en http://localhost:${app.get('port')}` ))