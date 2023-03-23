<template>
    <div class="center">
        <div class="home">
            <DashCard v-for="(dash, index) in dashboards" 
            :name="dash.title"
            :description="dash.description"
            :image="dash.image"
            :key="dash._id"
            :id="`dash-card-${index}`"
            :dash-id="dash._id"
            data-test="hello world"
            />
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import DashCard from '../components/DashCard.vue';
import DashboardsStore from "../data-management/stores/dashboards";

export default defineComponent({
    data() {
        return {
            dashboards: [] as iDashboard[]
        };
    },
    async created() {
        this.dashboards = await DashboardsStore.getDashboards()

        document.onmousemove = (e) => {
            let x = e.clientX
            let y = e.clientY
            let cards = document.querySelectorAll('.dash-card') as NodeListOf<HTMLDivElement>
            cards.forEach((card) => {
                
            if(card.dataset.hover == 'false') {                    
                    card.style.transition = "transform .3s ease-in-out"
                    card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`
                    return
                }
            else {
                card.style.transition = "transform 0.1s ease-out"
            }                

                const rect = card.getBoundingClientRect()
                card.style.transform = `perspective(1000px) rotateY(${(x - rect.left - rect.width / 2 ) / 20}deg) rotateX(${(y - rect.top - rect.height / 2) / -10}deg)`
            })
        }

    },
    components: { DashCard }
})
    
</script>

<style scoped lang="scss">

.home{
    display: grid;
    width: 100%;
    gap: 2rem 1rem;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    align-items: center;
    justify-content: center;
}

</style>
