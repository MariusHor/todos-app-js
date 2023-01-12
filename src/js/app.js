import todosModel from './modules/model';
import views from './modules/views';
import Controller from './modules/controller';

const app = new Controller(todosModel, views);

app.init();
