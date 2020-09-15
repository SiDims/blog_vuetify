<template>
    <v-card outlined class="mb-3">
        <v-container class="pt-0 pb-0">
            <v-row justify="center">
                <v-col md="8" sm="6" cols="12" class="text-left">{{title}}</v-col>
                <v-col md="3" sm="4" cols="6" class="text-center">
                    <v-row no-gutters justify-md="center" justify-sm="center">
                        <span class="pr-2">Hide</span>
                        <v-switch 
                            class="ma-0 pa-0" 
                            hide-details 
                            v-model="checked" 
                            color="#1D2059" 
                            @click="handleChange" 
                        ></v-switch>
                        <span>Show</span>
                    </v-row>
                </v-col>
                <v-col md="1" sm="2" cols="6" class="text-right">
                    <router-link :to="'/dashboard/edit/' + id">Edit</router-link>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            checked: this.display
        }
    },
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        display: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        handleChange() {
            this.$emit('checked', {id: this.id, checked: this.checked})
        }
    }
}
</script>