import AbstractApiModule from "./AbstractApiModule";

export interface iDashboard {
    title: string;
    description: string;
    image: string;
    owner: string;
    _id: string;
}

export default class DashboardsApi extends AbstractApiModule {
    
    public async getAll(): Promise<iDashboard[]> {
        return (await this.api.get('/dash')).data.dashboards;
    }

}