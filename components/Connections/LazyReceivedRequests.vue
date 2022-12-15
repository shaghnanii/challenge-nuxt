<template>
  <div>
    <div class="my-2 shadow text-white bg-dark p-1" v-for="item in requests" v-if="!isLoading">
      <div class="d-flex justify-content-between">
        <table class="ms-1">
          <td class="align-middle">{{ item.user.nameAndEmail }}</td>
        </table>
        <div>
          <button id="accept_request_btn_" class="btn btn-primary me-1" @click="acceptRequest(item)">Accept</button>
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
  name: "LazyReceivedRequests",
  data() {
    return {
      requests: [],
      isLoadMore: true,
      currentPage: 1,

      isLoading: true,
    }
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions('global', ['store', 'index']),

    async loadData() {
      this.isLoading = true;
      const response = await this.index(`/received-requests`)
      if (response.status === 200) {
        this.requests = response.data.data.data;
        this.$emit('setReceivedRequestCount', response.data.count)
        this.isLoadMore = response.data.data.current_page !== response.data.data.last_page;
        this.isLoading = false;
      }
      else if (response.status === 404) {
        // this.$toast.show(response.data.message)
        this.requests = []
        this.isLoadMore = false;
        this.isLoading = false;
      }
    },

    async acceptRequest(item) {
      const data = {
        payload: {
          connection_id: item.id,
        },
        url: 'received-requests/accept'
      }
      const response = await this.store(data)
      if (response.status === 200) {
        await this.loadData();
        this.$toast.success('Connection request accepted successfully')
      }
      else if (response.status === 404) {
        this.$toast.show(response.data.message)
      }
      else if (response.status === 409) {
        this.$toast.info(response.data.message)
      }
    },

    async loadMoreData() {
      let url = 'received-requests';
      const response = await this.index(`/${url}?page=${++this.currentPage}`)
      if (response.status === 200) {
        const data = response.data.data.data;
        this.isLoadMore = response.data.data.current_page !== response.data.data.last_page;
        data.map(item => {
          this.requests.push(item);
        })
      }
    }
  }
};
</script>

<style scoped>

</style>
