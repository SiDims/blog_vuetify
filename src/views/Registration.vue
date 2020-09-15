<template>
    <v-container>
        <v-card class="pa-4 ma-auto" flat outlined max-width="400">
            <v-form 
                class="registration" 
                ref="form" 
                v-model="valid" 
                lazy-validation
            >
                <Logo />
                <div class="registration__title">Create your account</div>
                <v-text-field 
                    v-model="firstName" 
                    :rules="firstNameRules" 
                    label="First Name"
                    color="#1D2059" 
                    required
                ></v-text-field>
                
                <v-text-field 
                    v-model="lastName" 
                    :rules="lastNameRules" 
                    label="Last Name"
                    color="#1D2059" 
                    required
                ></v-text-field>

                <v-text-field 
                    v-model="email" 
                    :rules="emailRules" 
                    label="E-mail"
                    color="#1D2059" 
                    required
                ></v-text-field>

                <v-text-field 
                    v-model="login" 
                    :rules="loginRules" 
                    label="Login"
                    color="#1D2059" 
                    required
                ></v-text-field>

                <v-text-field 
                    type="password"
                    v-model="password" 
                    :rules="passwordRules" 
                    label="Pasword"
                    color="#1D2059" 
                    required
                ></v-text-field>

                <v-radio-group v-model="gender" row>
                    <v-radio
                        label="Male"
                        color="#1D2059"
                        value="Male"

                    ></v-radio>
                    <v-radio
                        label="Female"
                        color="#1D2059"
                        value="Female"
                    ></v-radio>
                </v-radio-group>

                <v-btn 
                    class="registration__btn mt-2" 
                    width="100%"
                    color="#1D2059"
                    @click="submit" 
                    depressed
                    dark
                >Registration</v-btn>
            </v-form>
            <div class="mt-4 registration__footer">
                <span>Already have an account</span>
                <router-link class="ml-1" to="/login">Login</router-link>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Logo from '@/components/Logo'

export default {
    data: () => ({
        valid: true,
        firstName: '',
        lastName: '',
        email: '',
        gender: 'Male',
        login: '',
        password: '',

        //validateion
        firstNameRules: [
            v => !!v || 'First Name is required',
        ],
        lastNameRules: [
            v => !!v || 'Last Name is required',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        loginRules: [
            v => !!v || 'Login is required',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
        ]
    }),
    components: {
        Logo
    },
    methods: {
        ...mapActions(['REGISTRATION']),

        async submit() {
            try {
                if (this.$refs.form && !this.$refs.form.validate()) {
                    return this.$refs.form.validate()
                }

                await this.REGISTRATION({
                    first_name: this.firstName,
                    last_name: this.lastName,
                    email: this.email,
                    gender: this.gender,
                    login: this.login,
                    password: this.password
                })
                this.$router.push('/dashboard')
            } catch (e) {}
        }
    }
}
</script>

<style lang="scss">
.registration {
    &__title {
        font-size: 15px;
    }
    &__btn {
        color: $accent;
    }
    &__footer {
        color: $text;
        font-size: 13px;
        a {
            color: $text;
            transition: all .25s ease;
            &:hover {
                color: $accent;
                transition: all .25s ease;
            }
        }
    }
}

@media (max-width: 480px) {
    .registration {
        &__btn {
            width: 100%;
        }
    }
}
</style>