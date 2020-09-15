<template>
    <v-container>
        <Loader v-if="loader" />
        <div class="dashboard" v-else-if="!loader">
            <PostElement 
                v-for="({_id, title, display}, index) of getPosts.posts" 
                :key="index" 
                :id="_id" 
                :title="title" 
                :display="display"
                @checked="checked"
            />
        </div>
        <Alert 
            v-if="!getPosts.posts.length"
            message="No posts"
        />
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import PostElement from '@/components/PostElement'
import Alert from '@/components/Alert'

export default {
    data: () => ({
        loader: true
    }),

    components: {
       PostElement,
       Alert
    },

    computed: {
        ...mapGetters(['getPosts'])
    },

    async mounted() {
        await this.paginateHandler(1)
    },

    methods: {
        ...mapActions(['USER_POSTS', 'UPDATE']),
        async checked(data) {
            try {
                await this.UPDATE({id: data.id, display: data.checked})
                this.$message(data.checked ? 'Post published' : 'Post hidden')
            } catch (e) {}
        },
        async paginateHandler(page) {
            try {
                await this.USER_POSTS(page)
                this.loader = false
            } catch (e) {}
        }
    }
}
</script>