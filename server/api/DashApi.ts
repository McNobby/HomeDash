import AbstractRouterComponent from "./abstractRouterComponent.js";
import Dashboard from "../schemas/DashPropertiesSchema.js";
import Item from "../schemas/DashItemSchema.js";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export default class DashApi extends AbstractRouterComponent {
    
    private dashboard: typeof Dashboard;
    private item: typeof Item;

    constructor() {
        super();
        this.dashboard = Dashboard;
        this.item  = Item;
    }

    protected buildRoutes(): void {
        this.router.use((req: Request, res: Response, next: NextFunction) => this.authenticate(req, res, next))

        this.router.get('/',           (req: Request, res: Response) => this.getDashboards(req, res));
        this.router.get('/:id',        (req: Request, res: Response) => this.getDashboardById(req, res));
        this.router.get('/:id/items',  (req: Request, res: Response) => this.getItemsByDashId(req, res));
    
        this.router.post('/',          (req: Request, res: Response) => this.newDashboard(req, res));
        this.router.post('/:id/item',  (req: Request, res: Response) => this.newItem(req, res));
        
        this.router.put('/:id',        (req: Request, res: Response) => this.updateDashboardById(req, res));

        this.router.delete('/:id',     (req: Request, res: Response) => this.deleteDashboard(req, res));
        this.router.delete('/item/:id',(req: Request, res: Response) => this.deleteItem(req, res));
    }
    

    /**
     * Get all dashboards for a user
     * @param req Request object
     * @param res Response object
     * @returns void
     */
    private async getDashboards(req: Request, res: Response): Promise<void> {
        console.log('Getting dashboards for user: ' + this.userId);
        let dashboards = await this.dashboard.find({owner: this.userId}).exec();
        console.log('Found ' + dashboards.length + ' dashboards');

        res.status(200).json({dashboards});
        return;
    }


    /**
     * Get a dashboard by id Will check if user is owner of dashboard
     * @param req Request object
     * @param res Response object
     * @returns void
     */
    private async getDashboardById(req: Request, res: Response): Promise<void> {
        if(!req.params.id)
        {
            res.status(400).json({message: 'No id provided', success: false});
            return;
        }
        
        let dashboard = await this.dashboard.findOne({
            _id: req.params.id,
            owner: this.userId
        }).exec();

        if(!dashboard) {
            res.status(404).json({message: 'Dashboard not found', success: false});
            return;
        }

        res.status(200).json({
            id: dashboard._id,
            title: dashboard.title,
            description: dashboard.description,
            image: dashboard.image,
        });
        return;
    }


    /**
     * Get all items for a dashboard
     * @param req Request object 
     * @param res Response object
     * @returns void
     */
    private async getItemsByDashId(req: Request, res: Response): Promise<void> {

        if(!req.params.id){
            res.status(400).json({message: 'No id provided', success: false});
            return;
        }

        let items = await this.item.find({dashId: req.params.id}).exec();
        
        if(!items) {
            res.status(404).json({message: 'Items not found', success: false});
            return;
        }

        res.status(200).json(items);
        return;
    }


    /**
     * Will create a new dashboard
     * @param req request object
     * @param res response object
     * @returns void
     */
    private async newDashboard(req: Request, res: Response): Promise<void> {
        let dash = await new this.dashboard({
                title: req.body.title,
                description: req.body.description,
                image: req.body.image || '',
                owner: this.userId
        }).save()

        console.log('Dashboard created: ' + dash._id);
        
        res.status(200).json({message: 'Dashboard created', success: true})
        return;
    }


    /**
     * Will update dashboard by id
     * @param req request object
     * @param res response object
     * @returns void
     */
    private async updateDashboardById(req: Request, res: Response): Promise<void> {
        const { title, description, image } = req.body;
        let dash = this.dashboard.findByIdAndUpdate( req.params.id , {
                title: title,
                description: description,
                image: image || '',
        })
        
        try{
            await dash.exec();
            res.status(200).json({message: 'Dashboard updated', success: true})
        }
        catch(err) {
            res.status(500).json({message: 'Error updating dashboard', success: false})
            return;
        }

    }


        /**
     * Will create a new item
     * @param req request object
     * @param res response object
     * @returns void
     */
    private async newItem(req: Request, res: Response): Promise<void> {
        console.log('Creating new item for dashboard: ' + req.params.id);
        
        let item = await new this.item({
                title: req.body.title,
                description: req.body.description,
                image: req.body.image || '',
                link: req.body.link,
                dashId: req.params.id,
        }).save()

        console.log('Item created: ' + item._id);

        res.status(200).json({message: 'Item created', success: true})
        return;
    }


    private async deleteDashboard(req: Request, res: Response): Promise<void> {
        let dash = this.dashboard.findByIdAndDelete(req.params.id);
        let items = this.item.deleteMany({dashId: req.params.id});

        try{
            await dash.exec();
            await items.exec();
            res.status(200).json({message: 'Dashboard deleted', success: true})
        }
        catch(err) {
            res.status(500).json({message: 'Error deleting dashboard', success: false})
            return;
        }
    }


    private async deleteItem(req: Request, res: Response): Promise<void> {
        let item = this.item.findByIdAndDelete(req.params.id);

        try{
            await item.exec();
            res.status(200).json({message: 'Item deleted', success: true})
        }
        catch(err) {
            res.status(500).json({message: 'Error deleting item', success: false})
            return;
        }
    }

}