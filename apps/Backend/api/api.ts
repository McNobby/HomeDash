import AbstractRouterComponent from "./abstractRouterComponent.js";
import AuthApi from './Auth/AuthApi.js'
import DashApi from "./DashApi.js";

export default class Api extends AbstractRouterComponent {

    auth: AuthApi;
    dash: DashApi;

    constructor() {
        super();
        this.auth = new AuthApi();
        this.dash = new DashApi();
    }

    protected buildRoutes(): void {
        this.router.use('/auth', this.auth.getRouter())
        this.router.use('/dash', this.dash.getRouter())
    }

} 