import AbstractApiModule from "./AbstractApiModule";

export interface iDashItem {
    title: string;
    description: string;
    image: string|undefined
    link: string;
    dashId: string;
    _id: string;
}

export default class DashApi extends AbstractApiModule {
    public async getDashItemsByBoardId (id: string): Promise<iDashItem[]> {
        return <iDashItem[]> (await this.api.get(`/dash/${id}/items`)).data
    }
}