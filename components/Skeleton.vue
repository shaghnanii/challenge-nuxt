<template>
  <div>
    <div class="d-flex align-items-center  mb-2  text-white bg-dark p-1 shadow" style="height: 45px" v-for="item in 10">
      <strong class="ms-1 text-primary">Loading...</strong>
      <div class="spinner-border ms-auto text-primary me-4" role="status" aria-hidden="true"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Skeleton"
};
</script>

<style scoped>

</style>
