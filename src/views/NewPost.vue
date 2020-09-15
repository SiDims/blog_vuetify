<template>
    <div class="post">
        <v-container class="pl-3 pr-3 pt-0 pb-0">
            <v-row>
                <v-col md="4" sm="5" cols="12">
                    <v-card v-if="postId" outlined color="#1D2059" dark class="pa-4 mb-3">
                        <v-card-title class="pa-0 mb-3">Information</v-card-title>

                        <v-card outlined class="mb-2 pa-3">
                            <div>Post ID</div>
                            <div class="text">{{information.postId}}</div>
                        </v-card>

                        <v-card outlined class="mb-2 pa-3">
                            <div>Created</div>
                            <div class="text">{{information.createdAt | date}}</div>
                        </v-card>

                        <v-card outlined class="mb-2 pa-3">
                            <div>Author</div>
                            <div class="text">{{information.author.first_name}} {{information.author.last_name}}</div>
                        </v-card>
                    </v-card>

                    <v-card outlined class="pa-4 mb-3" dark>
                        <v-card-title class="pa-0 mb-3">Settings</v-card-title>
                        
                        <v-card color="#1D2059" class="mb-2 pa-3" dark>
                            <div>Display</div>
                            <v-switch 
                                class="ma-0" 
                                color="white" 
                                v-model="display" 
                                hide-details 
                                :label="display ? 'Public' : 'Private'" 
                            ></v-switch>
                        </v-card>
                    </v-card>

                    <v-card outlined class="pa-4" :class="{'invalid': $v.banner.id.$error}" v-model="$v.banner.id.$model">
                        <v-card-title class="pa-0 mb-3">Banner</v-card-title>

                        <v-btn 
                            v-if="!banner.id"
                            depressed
                            @click="open" 
                            dark 
                            color="#1D2059"
                        >Add banner</v-btn>

                        <v-card v-if="banner.id" outlined>
                            <v-img :src="URL_API + banner.path"></v-img>
                            <v-card-text>Name: {{banner.filename}}</v-card-text>
                            <v-divider class="mx-4"></v-divider>
                            <v-card-text>Size: {{banner.size | fz}}</v-card-text>
                            <v-card-actions>
                                <v-btn 
                                    depressed
                                    @click="remove" 
                                    dark 
                                    color="red"
                                >Remove</v-btn>

                                <v-btn 
                                    depressed
                                    @click="open" 
                                    dark 
                                    color="green"
                                >Update</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-card>

                    <v-card outlined class="pa-4 mt-3" :class="{'invalid': $v.categories.$error}">
                        <v-card-title class="pa-0 mb-3">Categories</v-card-title>

                        <v-switch 
                            v-for="(item, index) of getCategory"
                            :key="index"
                            class="ma-0" 
                            color="#1D2059" 
                            v-model.trim="$v.categories.$model"
                            hide-details 
                            :label="item.categoryName" 
                            :value="item._id"
                        ></v-switch>
                    </v-card>

                    <v-card outlined class="pa-4 mt-3" :class="{'invalid': $v.category.$error}">
                        <v-form ref="category">
                            <v-card-title class="pa-0 mb-2">Add category</v-card-title>
                            <v-text-field
                                solo
                                outlined
                                flat
                                dense
                                color="#1D2059"
                                hide-details
                                v-model.trim="$v.category.$model"
                                :error="$v.category.$error"
                                required
                            ></v-text-field>
                            <small style="display: block" v-if="$v.category.$dirty && !$v.category.required">Enter category name</small>

                            <v-btn 
                                class="mt-3" 
                                depressed
                                @click="addCategory" 
                                dark 
                                color="#1D2059"
                            >Add new category</v-btn>
                        </v-form>
                    </v-card>
                </v-col>
                <v-col md="8" sm="7" cols="12">
                        <v-form ref="post">
                            <v-card outlined class="pa-3 mb-3" :class="{'invalid': $v.title.$error}">
                                <v-card-title class="pa-0 mb-2">Title</v-card-title>
                                <v-text-field
                                    solo
                                    outlined
                                    flat
                                    dense
                                    color="#1D2059"
                                    hide-details
                                    v-model.trim="$v.title.$model"
                                    required
                                    :error="$v.title.$error"
                                ></v-text-field>

                                <small v-if="$v.title.$dirty && !$v.title.required">Title is required</small>
                            </v-card>

                            <v-card outlined class="pa-3 mb-3" :class="{'invalid': $v.description.$error}">
                                <v-card-title class="pa-0 mb-2">Description</v-card-title>

                                <v-textarea
                                    v-model="description"
                                    no-resize
                                    height="80"
                                    color="#1D2059"
                                    v-model.trim="$v.description.$model"
                                    required
                                    :error="$v.description.$error"
                                    solo
                                    outlined
                                    flat
                                    dense
                                    hide-details
                                ></v-textarea>

                                <small v-if="$v.description.$dirty && !$v.description.required">Description is required</small>
                            </v-card>

                            <v-card outlined class="pa-3 mb-3" :class="{'invalid': $v.content.$error}">
                                <v-card-title class="pa-0 mb-2">Content</v-card-title>

                                <v-textarea
                                    v-model="content"
                                    no-resize
                                    height="200"
                                    color="#1D2059"
                                    v-model.trim="$v.content.$model"
                                    required
                                    :error="$v.content.$error"
                                    solo
                                    outlined
                                    flat
                                    dense
                                    hide-details
                                ></v-textarea>

                                <small v-if="$v.content.$dirty && !$v.content.required">Content is required</small>
                            </v-card>

                            <v-btn
                                v-if="!postId"
                                depressed
                                @click="sendPost" 
                                dark 
                                color="#1D2059"
                                class="mr-2"
                            >Create post</v-btn>

                            <v-btn
                                v-if="postId"
                                depressed
                                @click="updatePost" 
                                dark 
                                color="#1D2059"
                                class="mr-2"
                            >Update post</v-btn>

                            <v-btn
                                v-if="postId"
                                depressed
                                @click="removeModal = true" 
                                dark 
                                color="red"
                                class="mr-2"
                            >Remove post</v-btn>
                        </v-form>
                </v-col>
            </v-row>
        </v-container>

        <v-dialog v-model="modal" fullscreen hide-overlay transition="dialog-bottom-transition">
            <Loader v-if="loader.images"/>

            <v-card v-else-if="!loader.images" tile color="#F3F3F3">
                <v-card outlined>
                    <v-toolbar tile flat>
                        <v-container class="pa-0">
                            <v-row justify="center" no-gutters>
                                <v-col cols="6">
                                    <Logo />
                                </v-col>
                                <v-col cols="6" align-self="center" class="text-right">
                                    <v-btn 
                                        depressed
                                        @click="modal = false" 
                                        dark 
                                        color="#1D2059"
                                    >Close</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-toolbar>
                </v-card>

                <v-container class="pl-3 pr-3 pt-0 pb-0">
                    <v-row>
                        <v-col sm="6" md="4" xl="3" cols="12" v-for="(item, index) of getImages" :key="index">
                            <ImageCard 
                                :imagePath="item.path"
                                :filename="item.filename"
                                :size="item.size"
                                :imageId="item._id"
                                :remove="false"
                                :add="true"
                                @add="addBanner"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>

        <v-dialog v-model="removeModal" persistent max-width="290">
            <v-card>
                <v-card-title style="justify-content: center;">Delete this post?</v-card-title>
                <v-card-actions style="justify-content: center;">
                <v-btn color="red" text @click="removePost">Yes</v-btn>
                <v-btn color="green darken-1" text @click="removeModal = false">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

import Logo from '@/components/Logo'
import ImageCard from '@/components/ImageCard'
import Alert from '@/components/Alert'
import Loader from '@/components/Loader'
import Editor from '@/components/Editor'

export default {
    data() {
        return {
            valid: true,
            modal: false,
            loader: {
                images: true
            },
            URL_API: process.env.VUE_APP_API_URL,
            postId: this.$route.params.id,
            removeModal: false,

            information: {
                createdAt: '',
                postId: '',
                author: {
                    first_name: '',
                    last_name: ''
                }
            },

            banner: {
                path: '',
                filename: '',
                size: '',
                id: ''
            },
            category: '',
            categories: [],
            display: true,
            title: '',
            description: '',
            content: '',
        }
    },

    validations: {
        title: { required },
        description: { required },
        content: { required },
        banner: { id: { required } },
        categories: { required },
        category: { required }
    },

    components: {
        Logo,
        ImageCard,
        Alert,
        Loader,
        Editor
    },

    computed: {
        ...mapGetters(['getImages', 'getCategory'])
    },

    async mounted() {
        try {
            await this.GET_CATEGORY()

            if (this.postId) {
                const { data } = await this.POST(this.postId)

                this.banner.path = data.banner.path
                this.banner.filename = data.banner.filename
                this.banner.size = data.banner.size
                this.banner.id = data.banner._id
                this.display = data.display
                this.title = data.title
                this.description = data.description
                this.content = data.content

                this.information.createdAt = data.createdAt
                this.information.postId = data._id
                this.information.author.first_name = data.uId.first_name
                this.information.author.last_name = data.uId.last_name

                data.categories.map(item => this.categories.push(item._id))
            }
        } catch (e) {}
    },

    methods: {
        ...mapActions([
            'GET_IMAGES', 
            'ADD_CATEGORY', 
            'GET_CATEGORY', 
            'NEW_POST', 
            'POST', 
            'UPDATE', 
            'DELETE'
        ]),

        async open() {
            this.modal = true
            
            try {
                await this.GET_IMAGES()
                this.loader.images = false
            } catch (e) {}
        },

        addBanner({id}) {
            const [obj] = this.getImages.filter(item => item._id === id)
            
            this.banner.path = obj.path
            this.banner.filename = obj.filename
            this.banner.size = obj.size
            this.banner.id = id

            this.modal = false
        },

        remove() {
            this.banner.path = ''
            this.banner.filename = ''
            this.banner.size = ''
            this.banner.id = ''
        },

        async addCategory() {
            this.$v.category.$touch()

            if (this.$v.category.$invalid) {
                return;
            }

            try {
                await this.ADD_CATEGORY({name: this.category})
                this.$message('Category added')
                this.category = ''
                this.$v.category.$reset()
            } catch (e) {}
        },

        validation() {
            this.$v.banner.id.$touch()
            this.$v.categories.$touch()
            this.$v.title.$touch()
            this.$v.description.$touch()
            this.$v.content.$touch()

            if (
                this.$v.banner.id.$invalid && 
                this.$v.categories.$invalid && 
                this.$v.title.$invalid && 
                this.$v.description.$invalid && 
                this.$v.content.$invalid
            ) {
                return false;
            }

            return true;
        },

        async sendPost() {
            if (!this.validation()) {
                return;
            }

            try {
                await this.NEW_POST({
                    banner: this.banner.id,
                    categories: this.categories,
                    display: this.display,
                    title: this.title,
                    description: this.description,
                    content: this.content,
                })

                this.$message('Success')
                this.$router.push('/dashboard')
            } catch (e) {}
        },

        async updatePost () {
            if (!this.validation()) {
                return;
            }

            try {
                await this.UPDATE({
                    id: this.postId,
                    banner: this.banner.id,
                    categories: this.categories,
                    display: this.display,
                    title: this.title,
                    description: this.description,
                    content: this.content,
                })

                this.$message('Success')
            } catch (e) {}
        },

        async removePost() {
            try {
                await this.DELETE(this.postId)
                this.removeModal = false
                this.$message('Success')
                this.$router.push('/dashboard')
            } catch (e) {}
        }
    }
}
</script>

<style lang="scss">
    .post {
        &__modal {
            position: relative;
        }

        &__buttons {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 9;
        }

        &__editor {
            height: 300px;
        }

        .ck-editor__editable {
            min-height: 300px;
        }
    }

    .text {
        font-size: 12px;
        color: #F3F3F3;
    }
</style>