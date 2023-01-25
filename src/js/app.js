import model from './modules/model';
import views from './modules/views/View';
import Controller from './modules/controller';

const app = new Controller(model, views);

app.init();
