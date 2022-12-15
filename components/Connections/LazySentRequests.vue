<template>
  <div>
    <div class="my-2 shadow text-white bg-dark p-1" v-for="item in requests" v-if="!isLoading">
      <div class="d-flex justify-content-between">
        <table class="ms-1">
          <td class="align-middle">{{ item.connected_with.nameAndEmail }}</td>
        </table>
        <div>
          <button id="cancel_request_btn_" class="btn btn-danger me-1" @click="withdrawRequest(item)">Withdraw Request</button>
        </div>
      </div>
    </div>
    <Skeleton v-else />
    <div class="d-flex justify-content-center mt-2 py-3" id="load_more_btn_parent">
      <button class="btn btn-primary" v-if="isLoadMore" onclick="" id="load_more_btn" @click="loadMoreData">Load more</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LazySentRequests",
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
    ...mapActions('global', ['destroy', 'index']),

    async loadData() {
      this.isLoading = true;
      const response = await this.index(`/sent-requests`)
      if (response.status === 200) {
        this.requests = response.data.data.data;
        this.$emit('setSentRequestCount', response.data.count)
        this.isLoadMore = response.data.data.current_page !== response.data.data.last_page;
        this.isLoading = false
      }
      else if (response.status === 404) {
        this.isLoadMore = false
        this.requests = [];
        this.isLoading = false
        // this.$toast.show(response.data.message)
      }
    },

    async withdrawRequest(item) {
      const data = {
        id: item.id,
        url: 'sent-requests/withdraw'
      }
      const response = await this.destroy(data)
      if (response.status === 200) {
        await this.loadData();
        this.$toast.success('Request withdraw successfully.')
      }
      else if (response.status === 409) {
        this.$toast.info(response.data.message)
      }
      else if (response.status === 404) {
        this.requests = [];
        this.$toast.show(response.data.message)
      }
    },

    async loadMoreData() {
      let url = 'sent-requests';
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
