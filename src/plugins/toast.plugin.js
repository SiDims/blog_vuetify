export default {
    install(Vue) {
        const options = {
            position: 'bottom-right',
            theme: "bubble",
            duration : 5000
        }

        Vue.prototype.$message = message => {
            Vue.toasted.show(message, {
                type: 'success',
                ...options
            })
        }

        Vue.prototype.$error = error => {
            Vue.toasted.show(error, {
                type: 'error',
                ...options
            })
        }
    }
}