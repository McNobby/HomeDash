import {reactive} from "vue";
import DashApi, {iDashItem} from "../api/dash";

export interface iDashStore {
    items: iDashItem[],
    currentDash: iDashItem[]
}

export default class DashStore {
    private static store = reactive({
        items: [],
        currentDash: []
    }) as iDashStore

    private static api = new DashApi()

    public static async getItemsForBoardById(id: string): Promise<iDashItem[]> {
        if (!this.store.items.length) {
            await this.storeItemsFromApiById(id)
        }
        else if (this.store.items) {
            let items = this.store.items.filter(item => item.dashId === id)

            if (!items) {
                await this.storeItemsFromApiById(id);
            }
            else {
                this.store.currentDash = items
            }
        }

        return this.store.currentDash
    }

    private static async storeItemsFromApiById(id: string): Promise<void> {
        let dash = await this.api.getDashItemsByBoardId(id)
        this.store.items = dash
        this.store.currentDash = dash
    }

}