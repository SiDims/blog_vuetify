<template>
    <v-container>
        <v-card class="pa-4 ma-auto" flat outlined max-width="400">
            <v-form 
                class="login" 
                ref="form" 
                v-model="valid" 
                lazy-validation
            >
                <Logo />
                <div class="login__title">Sign into your account</div>
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

                <v-btn 
                    class="login__btn mt-2" 
                    width="100%"
                    color="#1D2059"
                    @click="submit" 
                    depressed
                    dark
                >Login</v-btn>
            </v-form>
            <div class="mt-4 login__footer">
                <span>No account? You can</span>
                <router-link class="ml-1" to="/registration">Registration</router-link>
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
        login: '',
        password: '',

        //validateion
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
        ...mapActions(['LOGIN']),

        async submit() {
            if (this.$refs.form && !this.$refs.form.validate()) {
                return this.$refs.form.validate()
            }
            try {
                await this.LOGIN({login: this.login, password: this.password})
                this.$router.push('/dashboard')
            } catch (e) {}
        }
    }
}
</script>

<style lang="scss">
.login {
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
    .login {
        &__btn {
            width: 100%;
        }
    }
}
</style>