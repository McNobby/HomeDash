import { NextFunction, Request, Response, Router } from "express";
import AbstractRouterComponent from "../abstractRouterComponent.js"
import Dashboard from "../../schemas/DashPropertiesSchema.js";

export default class AuthApi extends AbstractRouterComponent {

    dashboard: typeof Dashboard;

    constructor() {
        super();
        this.dashboard = Dashboard;
    }

    protected buildRoutes(): void {
        this.router.post('/login', (req: Request, res: Response) => this.login(req, res))

        this.router.use((req: Request, res: Response, next: NextFunction) => this.authenticate(req, res, next))
        this.router.use((req: Request, res: Response, next: NextFunction) => this.isAdminMiddleware(req, res, next))

        this.router.get('/check', (req: Request, res: Response) => this.check(req, res))
        this.router.get('/users', (req: Request, res: Response) => this.getAllUsers(req, res))
        this.router.get('/me',    (req: Request, res: Response) => this.getMe(req, res))
        
        this.router.post('/register', (req: Request, res: Response) => this.register(req, res))

        this.router.delete('/user/:id', (req: Request, res: Response) => this.deleteUser(req, res))

    }


    /**
     * Will "login" a user and return a JWT token if the user exists and the password is correct
     * @param req Request object
     * @param res response object
     * @returns void
     */
    private async login(req: Request, res: Response): Promise<void> {
        console.log('POST / login');
        
        
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
        res.status(200).json({token: token, success: true, username: user.username, id: user._id});
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
            res.status(400).json({message: 'Username and password is required!', success: false})
            return;
        }

        let hasedPassword = this.hashPassword(password)

        let user = await new this.user({
            username: username,
            password: hasedPassword
        }).save()

        if(!user) {
            res.status(500).json({message: 'Something went wrong!', success: false})
            return;
        }

        res.status(201).json({message: 'User created!', success: true})
        return;
    }


    /**
     * Will return a 200 OK if the user logged in is admin
     * @param req Request object
     * @param res Response object
     * @returns void
     */
    private async check(req: Request, res: Response): Promise<void> {
        res.status(200).json({message: 'User is logged in!', success: true})
        return;
    }


    /**
     * Returns all users username and id's
     * @param req Request object
     * @param res Response object
     * @returns void
     */
    private async getAllUsers(req: Request, res: Response): Promise<void> {
        let users = await this.user.find();

        let mappedUsers = users.map((user) => {
            return {
                id: user._id,
                username: user.username
            }
        })

        res.status(200).json(mappedUsers)

        return
    }


    /**
     * Will delete a user and all dashboards owned by the user
     * @param req Request object
     * @param res Response object
     * @returns void
     */
    private async deleteUser(req: Request, res: Response): Promise<void> {
        let userId = req.params.id;

        if(!userId) {
            res.status(400).json({message: 'User ID is missing!'})
            return;
        }

        if(userId === this.userId) {
            res.status(400).json({message: 'You cannot delete yourself!'})
            return;
        }

        let user = await this.user.findByIdAndDelete(userId);
        if(!user) {
            res.status(404).json({message: 'User not found!'})
            return;
        }

        let dashboards = await this.dashboard.deleteMany({owner: userId}).exec();
        console.log(dashboards.deletedCount + ' dashboards deleted');
        

        res.status(200).json({message: 'User ' +user._id+ ' deleted!', success: true})
        return;
    }


    private async getMe(req: Request, res: Response): Promise<void> {
        let user = await this.getUserById();
        if(!user) {
            res.status(404).json({message: 'User not found!'})
            return;
        }

        res.status(200).json({user: {username: user.username}})
    }


}