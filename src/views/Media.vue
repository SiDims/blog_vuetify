<template>
    <v-container class="pl-3 pr-3 pt-0 pb-0">
        <Loader v-if="loader"/>

        <FileUpload
            v-if="!loader"
            class="imageUpload"
            ref="upload"
            name="image"
            :directory="false"
            :add-index="false"
            :drop-directory="true"
            :drop="true"
            :multiple="true"
            @input-file="updatetValue"
            @input-filter="inputFilter"
        >
            <div class="imageUpload__icon">
                <i class="fa fa-upload" aria-hidden="true"></i>
            </div>
            <div class="imageUpload__text">
                Upload file
            </div>
        </FileUpload>

        <v-card class="mt-3 upload" style="overflow: hidden;" v-for="(file, index) of files" :key="index" outlined>
            <v-row no-gutters justify="center">
                <v-col class="pa-3" md="1" sm="1" cols="2" align-self="center">
                    <img class="upload__image" :src="file.thumb" alt="">
                </v-col>
                <v-col class="pa-3" md="5" sm="5" cols="6" align-self="center">
                    <v-card-text class="pa-0">{{file.name}}</v-card-text>
                </v-col>
                <v-col class="pa-3" md="2" sm="2" cols="4" align-self="center">
                    <v-card-text class="pa-0 text-right">{{file.size | fz}}</v-card-text>
                </v-col>
                <v-col class="pa-3" md="4" sm="4" cols="12" align-self="center">
                    <v-row no-gutters justify="end">
                        <v-btn v-if="!file.success" @click="openCroppie(index)" style="font-size: 20px;" tile large color="blue" icon>
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </v-btn>
                        <v-btn v-if="!file.success" @click="upload(index)" style="font-size: 20px;" tile large color="teal" icon>
                            <i class="fa fa-upload" aria-hidden="true"></i>
                        </v-btn>
                        <v-btn v-if="!file.success" @click="del(index)" style="font-size: 20px;" tile large color="red" icon>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </v-btn>
                        <div v-if="file.success" style="font-size: 20px;" class="upload__success">
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>

        <v-row v-if="!loader">
            <v-col v-for="(item, index) of getImages" :key="index" xl="3" md="4" sm="6" cols="12">
                <ImageCard 
                    :imagePath="item.path"
                    :filename="item.filename"
                    :size="item.size"
                    :imageId="item._id"
                    @remove="open"
                />
            </v-col>
        </v-row>

        <Alert 
            v-if="!getImages.length"
            message="No files"
            class="mt-3"
        />

        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title style="justify-content: center;">Delete this file?</v-card-title>
                <v-card-actions style="justify-content: center;">
                <v-btn color="red" text @click="remove">Yes</v-btn>
                <v-btn color="green darken-1" text @click="close">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="croppie" fullscreen hide-overlay transition="dialog-bottom-transition" class="croppie">
            <v-card color="#F3F3F3">
                <v-toolbar class="croppie__toolbar" outlined flat tile>
                    <v-container>
                        <v-row no-gutters>
                            <v-col align-self="center" v-if="file" cols="6" md="6" sm="6">
                                <v-card-subtitle class="pa-0">
                                    {{file.name.length > 15 && file.name.slice(0, 15) + '...' || file.name}}
                                </v-card-subtitle>
                            </v-col>

                            <v-col v-if="isDesktop" align-self="center" class="text-right" cols="6" md="6" sm="6">
                                <v-btn @click="saveCroppie" class="mr-3" outlined color="green">Save</v-btn>
                                <v-btn @click="closeCroppie" outlined color="red">Close</v-btn>
                            </v-col>

                            <v-col v-if="isMobile" align-self="center" class="text-right" cols="6" md="6" sm="6">
                                <v-btn @click="saveCroppie" height="30" width="30" style="font-size: 20px;" icon tile large color="green">
                                    <i class="fa fa-floppy-o" aria-hidden="true"></i>
                                </v-btn>
                                <v-btn @click="closeCroppie" height="30" width="30" style="font-size: 20px;" icon tile large color="red">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-toolbar>

                <v-container>
                    <v-card v-if="file" class="pa-4" outlined flat>
                        <div class="croppie__container">
                            <img width="100%" ref="img" :src="file.thumb" alt="">
                        </div>

                        <v-divider class="ma-4"></v-divider>

                        <v-row justify="center" no-gutters>
                            <v-btn class="mr-3" @click="croppieInst.rotate(90)" outlined>Rotate</v-btn>
                            <v-btn @click="croppieInst.reset()" outlined>Reset</v-btn>
                        </v-row>
                    </v-card>
                </v-container>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cropper from 'cropperjs'

import ImageCard from '@/components/ImageCard'
import Alert from '@/components/Alert'

export default {
    data() {
        return {
            loader: true,
            URL_API: process.env.VUE_APP_API_URL,
            dialog: false,
            croppie: false,
            croppieInst: null,
            id: null,
            files: [],
            file: null
        }
    },

    components: {
        ImageCard,
        Alert
    },

    computed: {
        ...mapGetters(['getImages', 'isDesktop', 'isMobile'])  
    },

    async mounted() {
        try {
            await this.GET_IMAGES()
            this.loader = false
        } catch (e) {}
    },

    methods: {
        ...mapActions(['GET_IMAGES', 'REMOVE_FILE', 'UPLOAD_FILE']),
        open(id) {
            this.dialog = true
            this.id = id.id
        },

        close() {
            this.dialog = false
            this.id = null
        },

        del(index) {
            this.files.splice(index, 1)
        },

        openCroppie(index) {
            this.croppie = true
            this.file = this.files[index]
            this.file.index = index
            this.$nextTick(() => {
                this.croppieInst = new Cropper(this.$refs.img)
            })
        },

        closeCroppie() {
            this.croppie = false
            this.croppieInst = null
            this.file = null
        },

        saveCroppie() {
            this.croppieInst.getCroppedCanvas().toBlob(result => {
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    result.thumb = URL.createObjectURL(result)
                }

                this.files[this.file.index].thumb = result.thumb
                this.files[this.file.index].file = result
                this.files[this.file.index].size = result.size

                this.closeCroppie()
            })
        },

        async upload(index) {
            const formData = new FormData()
            formData.append('image', this.files[index].file)
            const image = await this.UPLOAD_FILE(formData)

            if (image) {
                this.files[index].success = true
                setTimeout(() => this.del(index), 500)
            }
        },

        async remove() {
            try {
                await this.REMOVE_FILE(this.id)
                this.close()
                this.$message('File deleted successfully')
            } catch (e) {}
        },

        updatetValue(data) {
            this.files.push(data)
        },

        inputFilter(newFile, oldFile, prevent) {
            if (!(/\.(gif|jpe?g|png)$/i.test(newFile.name))) {
                return prevent()
            }

            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                newFile.blob = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }

                newFile.thumb = ''
                if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                    newFile.thumb = newFile.blob
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.imageUpload {
    text-align: center;
    width: 100%;
    display: block;
    font-size: 30px;
    padding: 20px 0;
    background-color: #ffffff;
    border-radius: 10px;
    color: $text;
    transition: all .25s ease;

    &__icon {
        i {
            font-size: 50px;
            display: block;
        }
    }

    &__text {
        font-size: 20px;
        text-transform: uppercase;
    }

    &:hover {
        color: $accent;
        transition: all .25s ease;
    }
}

.upload {
    &__image {
        border-radius: 10px;
        overflow: hidden;
        width: 60px;
        height: 60px;
        display: block;
    }

    &__success {
        color: green;
    }
}

.cropper {
    &__container {
        width: 100%;
        img {
            display: block;
        }
    }

    &-container {
        width: 100% !important;
    }
}
</style>