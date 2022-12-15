<template>
  <div>
    <div class="my-2 shadow  text-white bg-dark p-1" id="" v-for="item in data" v-if="!isLoading">
      <div class="d-flex justify-content-between">
        <table class="ms-1">
          <td class="align-middle">{{ item.nameAndEmail }}</td>
        </table>
        <div>
          <button id="create_request_btn_" class="btn btn-primary me-1" @click="createConnection(item)">Connect</button>
        </div>
      </div>
    </div>
    <Skeleton v-else-if="isLoading" />
    <div class="d-flex justify-content-center mt-2 py-3" id="load_more_btn_parent">
      <button class="btn btn-primary" v-if="isLoadMore" onclick="" id="load_more_btn" @click="loadMoreData">Load more</button>
    </div>
  </div>

</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LazySuggestions",
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
    ...mapActions('global', ['store', 'index']),

    async createConnection(item) {
      const data = {
        payload: {
          with_user: item.id,
        },
        url: 'connections'
      }
      const response = await this.store(data)
      if (response.status === 200) {
        await this.loadData();
        this.$toast.success('Connection request sent successfully')
      }
      else if (response.status === 409) {
        this.$toast.info(response.data.message)
      }
      else if(response.status === 404) {
        this.data = [];
      }
    },

    async loadData() {
      this.isLoading = true;
      const response = await this.index(`/suggestions`)
      if (response.status === 200) {
        this.data = response.data.data.data;
        this.$emit('setSuggestionCount', response.data.count)
        this.isLoadMore = response.data.data.current_page !== response.data.data.last_page;
        this.isLoading = false;
      }
      else if (response.status === 404) {
        this.isLoadMore = false
        this.data = [];
        this.isLoading = false;
        // this.$toast.show(response.data.message)
      }
    },

    async loadMoreData() {
      let url = 'suggestions';
      const response = await this.index(`/${url}?page=${++this.currentPage}`)
      if (response.status === 200) {
        const data = response.data.data.data;
        this.isLoadMore = response.data.data.current_page !== response.data.data.last_page;
        data.map(item => {
          this.data.push(item);
        })
      }
      else if (response.status === 404) {
        this.isLoadMore = false
      }
    }
  }
};
</script>

<style scoped>

</style>
