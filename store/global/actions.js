// these are asynchronous

export default {
  async index({ commit }, url) {
    try {
      return await this.$axios.get(url);
    }
    catch (err){
      return err.response
    }
  },

  async show({ commit }, url, id) {
    try {
      return await this.$axios.get(`${url}/${id}`);
    }
    catch (err){
      return err.response
    }
  },

  async store({ commit }, data) {
    try {
      console.log("paylaod: ", data)
      return await this.$axios.post(`${data.url}`, data.payload);
    }
    catch (err){
      return err.response
    }
  },

  async update({ commit }, data) {
    try {
      return await this.$axios.put(`${data.url}/${data.id}`, data.payload);
    }
    catch (err){
      return err.response
    }
  },

  async destroy({ commit }, data) {
    try {
      return await this.$axios.delete(`${data.url}/${data.id}`);
    }
    catch (err){
      return err.response
    }
  }
}
