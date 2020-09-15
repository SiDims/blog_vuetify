<template>
    <v-card class="mx-auto" outlined>
        <v-img class="white--text align-end" height="200px" :src="URL_API + imagePath"></v-img>
        <v-card-title>{{filename}}</v-card-title>
        <v-card-text class="text--primary">
        <span class="pr-1">SIZE:</span>{{size | fz}}</v-card-text>

        <v-card-actions>
            <v-btn
                v-if="add"
                depressed
                @click="added" 
                dark 
                color="green"
            >Add</v-btn>

            <v-btn
                v-if="remove"
                depressed
                @click="removed" 
                dark 
                color="red"
            >Remove</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            URL_API: process.env.VUE_APP_API_URL
        }
    },

    props: {
        remove: {
            type: Boolean,
            default: true
        },

        add: {
            type: Boolean,
            default: false
        },
        
        imagePath: {
            type: String,
            required: true
        },

        filename: {
            type: String,
            required: true
        },

        size: {
            type: String,
            required: true
        },

        imageId: {
            type: String,
            required: true,
            validator: val => /^[0-9a-fA-F]{24}$/.test(val)
        }
    },

    methods: {
        removed() {
            this.$emit('remove', {id: this.imageId})
        },

        added() {
            this.$emit('add', {id: this.imageId})
        }
    }
}
</script>