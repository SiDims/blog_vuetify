<template>
    <v-alert 
        type="info"
        outlined
        color="#1D2059"
    >{{message}}</v-alert>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        }
    }
}
</script>