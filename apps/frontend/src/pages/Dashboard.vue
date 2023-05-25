<template>
  <div class="center">
    <div class="items">
      <DashItem v-for="(item, index) in items"
      :title="item.title"
      :description="item.description"
      :link="item.link"
      :image="item.image!"
      :key="item._id"
      :id="`dash-item-${index}`"
      :dash-id="item.dashId"
      class="dash-item"
      />
    </div>

    <div v-if="shouldShowAttribution" class="attribution">
      <a target="_blank" href="https://clearbit.com">Automatic logos provided by Clearbit</a>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import DashStore from "../data-management/stores/dash";
import DashItem from "../components/DashItem.vue";
import {iDashItem} from "../data-management/api/dash";

export default defineComponent({
    name: "Dashboard",
    components: {DashItem},
    data() {
        return {
            id: this.$route.params.id,
            items: [] as iDashItem[]
        }
    },
    async created() {
        //@ts-ignore
        this.items = await DashStore.getItemsForBoardById(this.id)

        document.onmousemove = (e) => {
            let x = e.clientX
            let y = e.clientY
            let cards = document.querySelectorAll('.dash-item') as NodeListOf<HTMLDivElement>
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
                card.style.transform = `perspective(1000px) rotateY(${(x - rect.left - rect.width / 2 ) / 20}deg) rotateX(${(y - rect.top - rect.height / 2 ) / -2.5}deg)`
            })
        }

    },
    computed: {
        shouldShowAttribution(): boolean {
            return !this.items.find((item) => item.image)
        }
    }
})
</script>

<style scoped lang="scss">
  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin: 1rem;
}

  .attribution {
    position: absolute;
    bottom: .5rem;
    a{
      color: #e8e8e8;
      font-size: 12px;
    }

    &:hover{
      a{
        color: #ffffff;
      }
    }
  }
</style>