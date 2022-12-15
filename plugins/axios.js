// export default function ({ $axios, redirect, app, store }) {
//   $axios.onRequest((config) => {
//     // console.log('[Axios] Api Call initialized: ', config)
//     // return Promise.resolve()
//   })
//
//   $axios.onError((error) => {
//     console.log("ON ERROR CODE: ", error)
//     const code = parseInt(error.response.status)
//     console.log("[Axios] Error code from server: ", code)
//     if (code === 200){
//       // app.$notification.error({
//       //   message: "200 OK",
//       //   description: error.response.data.message,
//       // })
//       console.log("CODE 200")
//       // store.dispatch('modules/layouts/handleBtnLoaderDisabled')
//     }
//     if (code === 400) {
//       console.log("CODE 400")
//       // app.$notification.error({
//       //   message: "400 Bad Request",
//       //   description: error.response.data.message,
//       // })
//       // store.dispatch('modules/layouts/handleBtnLoaderDisabled')
//     }
//     else if (code === 411) {
//       console.log("CODE 411");
//       // app.$notification.error({
//       //   message: '422 Unprocessable Entity!',
//       //   description: error.response.data.message,
//       // })
//       // store.dispatch('modules/layouts/handleBtnLoaderDisabled')
//     }
//     else if (code === 406) {
//       console.log("CODE 406");
//       // app.$notification.error({
//       //   message: "406 Not Acceptable",
//       //   description: error.response.data.message,
//       // })
//       // store.dispatch('modules/layouts/handleBtnLoaderDisabled')
//     }
//     else if (code === 401) {
//       console.log("CODE 401");
//       // app.$notification.error({
//       //   message: "401 Unauthorized",
//       //   description: error.response.data.message,
//       // })
//       // store.dispatch('modules/layouts/handleBtnLoaderDisabled')
//     }
//     else if (code === 500) {
//       console.log("CODE 500");
//       // app.$notification.error({
//       //   message: '500 Internal Server Error',
//       //   description: error.response.data.message,
//       // })
//       // store.dispatch('modules/layouts/handleBtnLoaderDisabled')
//     }
//     else if (code === 422) {
//       console.log("CODE 422");
//       // app.$notification.error({
//       //   message: "Validation Errors",
//       //   description: error.response.data.message,
//       // })
//       // store.dispatch('modules/layouts/handleBtnLoaderDisabled')
//     }
//     else if (code === 409) {
//       console.log("CODE 409");
//       // app.$notification.error({
//       //   message: "409 Conflict",
//       //   description: error.response.data.message,
//       // })
//       // store.dispatch('modules/layouts/handleBtnLoaderDisabled')
//     }
//     else if (code === 404){
//       console.log("CODE 404");
//       // app.$notification.error({
//       //   message: "404 Not Found",
//       //   description: error.response.data.message,
//       // })
//       // store.dispatch('modules/layouts/handleBtnLoaderDisabled')
//     }
//     else {
//       console.log("ELSE AXIOS ERROR")
//       // app.$notification.error({
//       //   message: "Error Occur",
//       //   description: error.response.data.message,
//       // })
//       // store.dispatch('modules/layouts/handleBtnLoaderDisabled')
//     }
//   })
// }
