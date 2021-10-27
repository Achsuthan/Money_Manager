import Vue from 'vue'

export default {

    errorMessage(details) {
        Vue.notify({
            group: "foo",
            type:'error',
            text: details,
        })
    },

    networkError() {
        Vue.notify({
            group: "foo",
            type:'error',
            title: '500 - Network Error',
            text: 'Please check your connection.',
        })
    },

    successMessage(details) {
        Vue.notify({
            group: "foo",
            type:'success',
            text: details
        })
    }
}
