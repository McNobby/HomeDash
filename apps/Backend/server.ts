import Api from "./api/api.js";
import Init from "./Core/Init.js";


const init = Init.getInstance();

init.registerRoutes((app) => {
    app.use('/v1', new Api().getRouter())
})

init.startServer()
    .then(() => {
        console.log('Server started!');
    })