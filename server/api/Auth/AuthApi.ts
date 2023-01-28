import { NextFunction, Request, Response, Router } from "express";
import AbstractRouterComponent from "../abstractRouterComponent.js"


export default class AuthApi extends AbstractRouterComponent {

    constructor() {
        super();
    }

    protected buildRoutes(): void {
        this.router.post('/login', (req: Request, res: Response) => this.login(req, res))

        this.router.use((req: Request, res: Response, next: NextFunction) => this.authenticate(req, res, next))
        this.router.use((req: Request, res: Response, next: NextFunction) => this.isAdminMiddleware(req, res, next))

        this.router.post('/register', (req: Request, res: Response) => this.register(req, res))

    }


    /**
     * Will "login" a user and return a JWT token if the user exists and the password is correct
     * @param req Request object
     * @param res response object
     * @returns void
     */
    private async login(req: Request, res: Response): Promise<void> {
        console.log('GET / login');
        
        
        let username = req.body.username;
        let password = req.body.password;

        if(!username || !password) {
            console.log('Username or password is missing');
            res.status(400).json({message: 'Username and password is required!'})
            return;
        }

        let user = await this.user.findOne({
            username: username
        })

        if(!user){
            console.log('User does not exist');
            res.status(401).json({message: 'User does not exist!'})
            return;
        } 

        console.log('checking password');
        
        if(!this.passwordMatches(password, user.password)) {
            console.log('Invalid username or password');
            res.status(401).json({message: 'Invalid username or password'})
            return;
        }

        console.log('password matches');
        let token = this.createJWT(user._id.toString());
        res.status(200).json({token: token, success: true});
        return;
    }


    /**
     * Registers a new user (make sure to make do necessary permission checks before calling this method)
     * @param req Request object
     * @param res Response object
     * @returns void
     */
    private async register(req: Request, res: Response): Promise<void> {
        let username = req.body.username;
        let password = req.body.password;    
        
        if(!username || !password) {
            res.status(400).json({message: 'Username and password is required!'})
            return;
        }

        let hasedPassword = this.hashPassword(password)

        let user = await new this.user({
            username: username,
            password: hasedPassword
        }).save()

        if(!user) {
            res.status(500).json({message: 'Something went wrong!'})
            return;
        }

        res.status(201).json({message: 'User created!'})
        return;
    }


}