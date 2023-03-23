import {reactive} from "vue";
import DashboardsApi, {iDashboard} from "../api/dashboards";

interface iDashStore {
    isSet: boolean,
    dashboards: iDashboard[]
}

export default class DashboardsStore {

    private static store = reactive({
        isSet: false,
        dashboards: []
    }) as iDashStore

    private static api = new DashboardsApi()

    public static async getDashboards(): Promise<iDashboard[]> {
        if (!this.store.isSet)
        {
            this.store.dashboards = await this.api.getAll()
            this.store.isSet = true
        }
        return <iDashboard[]> this.store.dashboards
    }

    public static async getDashboardPropertiesById(id: string): Promise<iDashboard|undefined> {
        let dashboards = await this.getDashboards();

        return dashboards.find(dash => dash._id === id)
    }

}