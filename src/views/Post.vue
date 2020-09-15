<template>
    <div class="post">
        <Loader v-if="loader"/>
        <div class="post__wrap" v-else-if="!loader">
            <div class="post__header" :style="`background-image: url(${URL_API + getPost.banner.path})`">
                <div class="post__header-bg"></div>
                <v-container>
                    <div class="post__title">{{getPost.title}}</div>
                    <v-row class="post__info ma-0">
                        <v-col md="4" cols="12">
                            <div class="post__author">
                                <img src="https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png" alt="">
                                <span>{{getPost.uId.first_name}} {{getPost.uId.last_name}}</span>
                            </div>
                        </v-col>
                        <v-col md="4" cols="12">
                            <div class="post__date">
                                <i class="fa fa-calendar"></i>
                                <span>{{getPost.createdAt | date}}</span>
                            </div>
                        </v-col>
                        <v-col md="4" cols="12">
                            <div class="post__comment">
                                <i class="fa fa-comment-o"></i>
                                <span>{{getPost.comments.length}}</span>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>         
            </div>
            <div class="post__content">
                <v-container>
                    <v-card class="pa-4 mb-3" outlined v-html="getPost.content"></v-card>
                    <v-card class="pa-4 post__comments" outlined>
                        <v-form
                            v-if="isAuth"
                            class="mb-3"
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-textarea
                                name="comment"
                                label="Comment"
                                color="#1D2059"
                                height="100px"
                                no-resize
                                :rules="commentRules"
                                v-model="commentText"
                                required
                            ></v-textarea>
                            <v-btn 
                                class="login__btn mt-2" 
                                color="#1D2059"
                                @click="submit" 
                                depressed
                                dark
                            >Send</v-btn>
                        </v-form>

                        <div class="post__commentsList">
                            <v-list-item class="pa-0" v-for="(comment, index) of comments" :key="index">
                                <v-list-item-avatar style="align-self: flex-start;">
                                    <img src="https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png">
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{comment.first_name}} {{comment.last_name}}</v-list-item-title>
                                    <v-list-item-subtitle class="post__subtitle" v-text="comment.comment"></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </div>
                    </v-card>
                </v-container>   
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            valid: true,
            loader: true,
            commentText: '',
            URL_API: process.env.VUE_APP_API_URL,
            comments: [],

            //validateion
            commentRules: [
                v => !!v || 'Comment is required',
            ],
        }
    },
    computed: {
        ...mapGetters(['getPost', 'isAuth'])
    },

    async mounted() {
        try {
            const post = await this.POST(this.$route.params.id)
            this.comments.push(...post.data.comments.reverse())
            this.loader = false
        } catch (e) {}
    },

    methods: {
        ...mapActions(['POST', 'COMMENT']),

        async submit() {
            if (this.$refs.form && !this.$refs.form.validate()) {
                return this.$refs.form.validate()
            }
            try {
                const comment = await this.COMMENT({
                    postId: this.$route.params.id,
                    comment: this.commentText
                })
                this.comments.unshift(comment.data)
                this.commentText = ''
                this.$refs.form.resetValidation()
            } catch (e) {}
        }
    }
}
</script>

<style lang="scss" scoped>
    .post {
        height: 100%;

        &__wrap {
            height: 100%;
        }

        &__header {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            min-height: 350px;
            position: relative;
            color: #ffffff;
            display: flex;
            align-items: center;

            .container {
                z-index: 9;
                position: relative;
            }

            &-bg {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.5);
            }
        }

        &__date {
            text-align: center;
            font-weight: 300;
            span {
                margin-left: 10px;
            }
        }

        &__title {
            font-size: 30px;
            text-align: center;
            width: 100%;
        }

        &__author {
            justify-content: center;
            display: flex;
            align-items: center;
            img {
                width: 50px;
                border-radius: 50%;
            }
            span {
                margin-left: 10px;
                font-weight: 300;
            }
        }

        &__info {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
        }

        &__comment {
            text-align: center;
            span {
                margin-left: 10px;
                font-weight: 300;
            }
        }

        &__subtitle {
            white-space: normal;
            font-weight: 300;
        }
    }
</style>