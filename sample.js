import { app } from './api';

app.get('./app', (req, res) => {
    res.send("App is running well");
});
