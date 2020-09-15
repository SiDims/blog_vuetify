<template>
    <div>
        <div class="nav">
            <v-row justify="center" style="width: 100%;">
                <router-link class="pa-3" v-for="(link, index) of links" :key="index" :to="`/dashboard/${link.link}`">{{link.name}}</router-link>
            </v-row>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {name: 'New post', link: 'create'},
                {name: 'Media', link: 'media'}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav {
        a {
            color: $text;
            text-decoration: none;
            transition: all .25s ease;
            &:hover {
                color: $accent;
                transition: all .25s ease;
            }
        }
        .router-link-active {
            color: $accent;
        }
    }
</style>