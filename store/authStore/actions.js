// these are asynchronous
export default {
  async login({ commit }, formData) {
    try {
      const response = await this.$auth.loginWith('local', {
        data: {
          email: formData.email,
          password: formData.password
        }
      })
      console.log("Login Response API: ", response)
      return response;
    }
    catch (err){
      console.log("Error: ", err)
      return err.response
    }
  },
}
