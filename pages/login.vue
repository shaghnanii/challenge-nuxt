<template>
  <div class="container">
    <b-form @submit="onSubmit">
      <b-form-group
        class="text-white"
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <small v-if="errors && errors.email" class="text-danger">{{ errors.email && errors.email[0]}}</small>

      <b-form-group class="text-white mt-4" id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <small v-if="errors && errors.password" class="text-danger">{{ errors.password && errors.password[0]}}</small>

      <b-button class="form-control mt-4" type="submit" variant="primary">Login</b-button>
    </b-form>

    <div class="pt-4 f-flex justify-content-end">
      <NuxtLink to="register">Goto Register</NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  auth: 'guest',
  data() {
    return {
      loading: false,
      form: {
        email: 'johndoe@gmail.com',
        password: 'Secret@123',
      },
      errors: [],
    }
  },
  methods: {
    ...mapActions('authStore', ['login']),

    async onSubmit(event) {
      event.preventDefault()

      this.loading = true
      try {
        const response = await this.login(this.form)

        if (response.status === 422) {
          this.$toast.error(response.data.message)
          this.errors = response.data.errors
        }
        else if (response.status === 200) {
          this.$toast.success(response.data.message)
        }
      } catch (err) {
        this.loading = false
        // this.$notification.error({
        //   message: err.message,
        // })
      }
    }
  }
}
</script>

<style scoped>

</style>
