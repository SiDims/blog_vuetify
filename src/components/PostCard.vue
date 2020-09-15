<template>
    <div class="postCard">
        <div class="postCard__wrap">
            <div class="postCard__image" :style="`background-image: url(${URL_API + postData.banner.path})`">
                <div class="postCard__image-bg"></div>
                <div class="postCard__categories">
                    <div class="postCard__category" 
                        v-for="(category, index) of postData.categories"
                        :key="index"
                    >{{category.categoryName}}</div>
                </div>
                
                <div class="postCard__info">
                    <div class="postCard__author">
                        <div class="postCard__avatar">
                            <img src="https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png" alt="">
                        </div>
                        <div class="postCard__name">{{postData.uId.first_name}} {{postData.uId.last_name}}</div>
                    </div>
                    <div class="postCard__comments">
                        <i class="fa fa-comment-o"></i>
                        <span>{{postData.comments.length}}</span>
                    </div>
                </div>
            </div>
            <div class="postCard__data">
                <div class="postCard__title">
                    {{postData.title}}
                </div>
                <div class="postCard__description">
                    {{postData.description}}
                </div>
                <div class="postCard__buttons">
                    <router-link :to="`/post/${postData._id}`">Read more...</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            URL_API: process.env.VUE_APP_API_URL
        }
    },
    props: {
        commentsLength: {
            type: String
        },
        postData: {
            type: Object,
            default: () => {
                return {}
            }
        }
    }
}
</script>

<style lang="scss">
    .postCard {
        margin-bottom: 16px;
        overflow: hidden;
        width: 100%;
        border-top-right-radius: $border-radius-root;
        border-top-left-radius: $border-radius-root;

        &__wrap {
            width: 100%;
            display: inline-block;
        }

        &__image {
            margin-bottom: -1px;
            height: 250px;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;

            &-bg {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 2;
            }
        }

        &__categories {
            display: flex;
            position: relative;
            top: 10px;
        }

        &__category {
            background-color: $background;
            z-index: 3;
            margin-right: 10px;
            border-radius: 10px;
            padding: 3px 10px;
            color: $text;
            font-size: 13px;
            font-weight: 300;
            &:first-child {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
        }

        &__info {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 3;
            width: 100%;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__author {
            display: flex;
            align-items: center;
        }

        &__avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            display: block;

            img {
                width: 100%;
                display: block;
            }
        }

        &__comments {
            color: #ffffff;
            span {
                margin-left: 5px;
            }
        }

        &__name {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 3px 10px;
            margin-left: 10px;
            color: $accent;
            font-size: 13px;
            font-weight: 300;
        }

        &__data {
            border: thin solid rgba(0, 0, 0, 0.12);
            border-bottom-right-radius: $border-radius-root;
            border-bottom-left-radius: $border-radius-root;
            background-color: #ffffff;
        }

        &__title {
            padding: 16px;
            font-size: 17px;
            font-weight: bold;
        }

        &__description {
            padding: 16px;
            font-size: 13px;
            font-weight: 300;
        }

        &__buttons {
            padding: 16px;
            border-top: thin solid rgba(0, 0, 0, 0.12);
        }
    }
</style>