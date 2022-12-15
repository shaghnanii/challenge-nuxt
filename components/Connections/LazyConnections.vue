<template>
  <div>
    <div class="my-2 shadow text-white bg-dark p-1" v-for="(item, index) in data" v-if="!isLoading">
      <div class="d-flex justify-content-between">
        <table class="ms-1">
          <td class="align-middle">{{ item.connected_with.nameAndEmail }}</td>
        </table>
        <div>
          <button style="width: 220px"
                  id="get_connections_in_common_"
                  class="btn btn-primary" type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_"
                  aria-expanded="false"
                  aria-controls="collapseExample">
            Connections in common ({{ item.common && item.common.length }})
          </button>
          <button id="create_request_btn_" class="btn btn-danger me-1" @click="removeConnection(item)">Remove Connection</button>
        </div>

      </div>
      <div class="collapse show" :id="getCollapseId(index)">
        <div id="content_" class="p-2" v-for="item in item.common">
          <div class="p-2 shadow rounded mt-2  text-white bg-dark">{{ item.connected_with.nameAndEmail }}</div>
        </div>
        <div id="connections_in_common_skeletons_">
        </div>
      </div>

    </div>
    <Skeleton v-else />
    <div class="d-flex justify-content-center mt-2 py-3" id="load_more_btn_parent">
      <button class="btn btn-primary" v-if="isLoadMore" id="load_more_btn" @click="loadMoreData">Load more</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LazyConnections",
  data() {
    return {
      data: [],
      isLoadMore: true,
      currentPage: 1,

      isLoading: true,
    }
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions('global', ['destroy', 'index']),

    async loadData() {
      this.isLoading = true;
      const response = await this.index(`/connections`)
      console.log('API Result: ', response)
      if (response.status === 200) {
        this.data = response.data.data.data;
        this.$emit('setConnectionCount', response.data.count)
        this.isLoadMore = response.data.data.current_page !== response.data.data.last_page;
        this.isLoading = false;
      } else if (response.status === 404) {
        this.isLoadMore = false
        this.data = [];
        this.isLoading = false;
        // this.$toast.show(response.data.message)
      }
    },

    async removeConnection(item) {
      const data = {
        id: item.id,
        url: 'connections/remove'
      }
      const response = await this.destroy(data)
      if (response.status === 200) {
        await this.loadData();
        this.$toast.success('Connection removed successfully')
      }
      else if (response.status === 404) {
        this.$toast.show(response.data.message)
        this.requests = []
      }
      else if (response.status === 409) {
        this.$toast.info(response.data.message)
      }
    },

    async loadMoreData() {
      let url = 'connections';
      const response = await this.index(`/${url}?page=${++this.currentPage}`)
      if (response.status === 200) {
        const data = response.data.data.data;
        this.isLoadMore = response.data.data.current_page !== response.data.data.last_page;
        data.map(item => {
          this.data.push(item);
        })
      }
    },

    getCollapseId(index) {
      return `collapse_${index}`;
    }
  },
};
</script>

<style scoped>

</style>
