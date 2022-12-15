<template>
  <div class="container">
    <b-form @submit="onSubmit">
      <b-form-group
        class="text-white"
        id="input-group-1"
        label="Email Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <small v-if="errors && errors.name" class="text-danger">{{ errors.name && errors.name[0]}}</small>

      <b-form-group
        class="mt-4 text-white"
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

      <b-form-group class="mt-4 text-white" id="input-group-2" label="Password: (Must Contain lower,upper and 1 number)" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <small v-if="errors && errors.password" class="text-danger">{{ errors.password && errors.password[0]}}</small>

      <b-form-group class="mt-4 text-white" id="input-group-2" label="Confirm Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.confirm_password"
          placeholder="Enter Password Confirmation e.g Secret@123"
        ></b-form-input>
      </b-form-group>
      <small v-if="errors && errors.confirm_password" class="text-danger">{{ errors.confirm_password && errors.confirm_password[0]}}</small>

      <b-button class="mt-4 form-control" type="submit" variant="primary">Register</b-button>
    </b-form>

    <div class="pt-4 f-flex justify-content-end">
      <NuxtLink to="login">Goto Login</NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  auth: 'guest',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      errors: [],
    }
  },
  methods: {
    ...mapActions('global', ['store']),

    async onSubmit(event) {
      event.preventDefault()

      this.loading = true
      try {
        const data = {
          url: 'register',
          payload: this.form
        }
        const response = await this.store(data)
        if (response.status === 422) {
          this.$toast.error(response.data.message)
          this.errors = response.data.errors
        }
        else if (response.status === 200) {
          this.$toast.success(response.data.message)
          await this.$router.push('/login')
        }
      } catch (err) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
