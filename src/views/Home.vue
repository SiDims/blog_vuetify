<template>
    <v-container>
        <Loader v-if="loader" />
        <div class="home" v-else-if="!loader">
            <PostCard
                v-for="(post, index) of getPosts.posts"
                :key="index" 
                :postData="post"
            />
        </div>

        <Alert 
            v-if="!getPosts.posts.length"
            message="No posts"
        />
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PostCard from '@/components/PostCard'
import Alert from '@/components/Alert'

export default {
    name: 'Home',
    data() {
        return {
            loader: true
        }
    },
    components: {
        PostCard,
        Alert
    },
    computed: {
        ...mapGetters(['getPosts'])
    },
    async mounted() {
        try {
            await this.POSTS('1')
            this.loader = false
        } catch (e) {}
    },
    methods: {
        ...mapActions(['POSTS'])
    }
} 
</script>

<style lang="scss" scoped>
    .home {
        column-count: 3;
    }

    @media (max-width: 768px) {
        .home {
            column-count: 2;
        }
    }

    @media (max-width: 480px) {
        .home {
            column-count: 1;
        }
    }
</style>