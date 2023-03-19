import AbstractApiModule from "./AbstractApiModule";

interface iDashboard {
    title: string;
    description: string;
    image?: string;
    owner: string;
}

export default class DashboardsApi extends AbstractApiModule {
    
    public async getAll(): Promise<iDashboard[]> {
        let dashes = await (await this.api.get('/dash')).data
        console.log(dashes);
        
        return dashes;
    }

}