import { NextFunction, Request, Response, Router } from "express";
import Authentication from "./Auth/Authentication.js";

export default abstract class AbstractRouterComponent extends Authentication {
   
    protected router: Router;
    protected routesBuilt: boolean = false;

    constructor() {
        super();
        this.router = Router();
    }

    /**
     * Builds the routes for this component
     */
    protected abstract buildRoutes(): void;

    
    /**
     * Gets the router object for this component
     * @returns The router for this component
     */
    public getRouter(): Router {
        if(!this.routesBuilt) {
            this.buildRoutes();
            this.routesBuilt = true;
        }
        return this.router;
    }

    /**
     * authenticates user using JWT
     * @param req Request object
     * @param res Response object
     * @param next next function
     * @returns void
     */
    protected authenticate(req: Request, res: Response, next: NextFunction): void {
        
        if(!req.headers.authorization) {
            res.status(401).json({message: 'Missing Token!'})
            return;
        }

        let token = req.headers.authorization.split(' ')[1]
        if(token && !this.verifyAndDecodeJWT(token)) {
            res.status(401).json({message: 'Invalid token!'})
            return;
        }

        next();
    }


    /**
     * Checks if the user is an administrator
     * @param req  request object (unused)
     * @param res  response object
     * @param next next function
     * @returns 
     */
    protected async isAdminMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {        
        if(!await this.isAdministrator()){
            console.log('User is not an administrator');
            res.status(401).json({message: 'You are not an administrator!', success: false})
            return;
        }
        next();
    }


}