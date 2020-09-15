<template>
    <v-card
        flat
        height="60px"
        tile
    >
        <div class="header">
            <v-container class="pt-0 pb-0">
                <div class="d-flex justify-space-between align-center header__wrapper">
                    <Logo />
                    <nav class="header__navigation">
                        <ul>
                            <li v-for="link of links" :key="link.url" v-if="auth(link.auth)">
                                <router-link :to="link.url" :exact="link.exact">{{ link.title }}</router-link>
                            </li>
                            <li class="header__logout" v-if="isAuth">
                                <a @click.prevent="logout" href="#">Logout</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </v-container>
        </div>
        <!-- <v-toolbar
            class="header"
            dense
            height="60px"
            flat
            outlined
        >
            
        </v-toolbar> -->
    </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import Logo from '@/components/Logo'

export default {
    data: () => ({
        links: [
            {title: 'Home', url: '/', exact: true},
            {title: 'Login', url: '/login', auth: false},
            {title: 'Registration', url: '/registration', auth: false},
            {title: 'Dashboard', url: '/dashboard', auth: true},
        ],
    }),
    components: {
        Logo
    },
    computed: {
        ...mapGetters(['isMobile', 'isAuth'])
    },
    methods: {
        ...mapActions(['LOGOUT']),
        auth(auth) {
            return auth === this.isAuth || auth === undefined;
        },
        logout() {
            this.LOGOUT()
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss">
    .header {
        position: fixed !important;
        z-index: 99;
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        background-color: #ffffff;

        &__title {
            font-size: 30px;
        }

        &__navigation {
            ul {
                list-style-type: none;
                display: flex;
                li {
                    margin-right: 15px;
                    .router-link-active {
                        color: $accent;
                    }
                    a {
                        color: $text;
                        transition: all .25s ease;
                        text-decoration: none;
                        &:hover {
                            color: $accent;
                            transition: all .25s ease;
                        }
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        &__wrapper {
            width: 100%;
        }
    }
</style>