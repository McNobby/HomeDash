<template>
    <div class="center">
        <div class="home">
            <DashCard v-for="dash in dashboards" 
            :name="dash.title"
            :description="dash.description"
            :image="dash.image"
            />
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import DashCard from '../components/DashCard.vue';
import DashboardsApi, {iDashboard} from '../data-management/api/dashboards';

export default defineComponent({
    data() {
        return {
            dashboards: [] as iDashboard[]
        };
    },
    async created() {
        console.group("Home");
        let api = new DashboardsApi();
        this.dashboards = await api.getAll();
        console.log( await api.getAll());
        
        console.log("myDashes", this.dashboards);
        console.groupEnd();
    },
    components: { DashCard }
})
    
</script>

<style scoped lang="scss">

.home{
    display: grid;
    width: 90%;
    gap: 2rem 1rem;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
}

</style>
