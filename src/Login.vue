<template>
    <v-layout justify-center align-center class="outer-container">
        <v-card :height="cardHeight" width=400px>
            <v-layout row justify-center>
                <img src="/assets/app-images/espertoLogo.png" class="esperto-logo">
            </v-layout>
            <div v-if="isSigningUp">
                <v-container>
                    <v-layout row justify-center>
                        <v-flex xs9>
                            <v-text-field
                                    v-model="signUpInfo.firstName"
                                    label="First Name"
                            />
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-center>
                        <v-flex xs9>
                            <v-text-field
                                    v-model="signUpInfo.lastName"
                                    label="Last Name"
                            />
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-center>
                        <v-flex xs9>
                            <v-text-field
                                    v-model="signUpInfo.username"
                                    label="Username"
                                    ref="loginUsernameField"
                            />
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-center>
                        <v-flex xs9>
                            <v-text-field
                                    v-model="signUpInfo.password"
                                    label="Password"
                                    :append-icon="visible1 ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (visible1 = !visible1)"
                                    :type="visible1 ? 'text' : 'password'"
                            />
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-center>
                        <v-flex xs9>
                            <v-text-field
                                    v-model="signUpInfo.passwordConfirm"
                                    label="Confirm Password"
                                    :append-icon="visible2 ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (visible2 = !visible2)"
                                    :type="visible2 ? 'text' : 'password'"
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-layout row justify-center>
                    <v-flex xs9>
                        <v-btn round block color="primary" dark>Submit</v-btn>
                    </v-flex>
                </v-layout>
            </div>
            <div v-else>
                <v-container>
                    <v-layout row justify-center>
                        <v-flex xs9>
                            <v-text-field
                                    v-model="loginInfo.username"
                                    label="Username"
                            />
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-center>
                        <v-flex xs9>
                            <v-text-field
                                    v-model="loginInfo.password"
                                    label="Password"
                                    :append-icon="visible3 ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (visible3 = !visible3)"
                                    :type="visible3 ? 'text' : 'password'"
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-layout row justify-center>
                    <v-flex xs9>
                        <v-btn @click="login" round block color="primary" dark>Login</v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex xs9>
                        <v-btn @click="triggerSignUpMode" round block color="primary" dark>Sign Up</v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </v-card>
    </v-layout>
</template>

<script>
    export default {
        name: "login",
        data () {
            return {
                cardHeight: '400px',
                isSigningUp: false,
                visible1: false,
                visible2: false,
                visible3: false,
                loginInfo: {
                    username: '',
                    password: '',
                },
                signUpInfo: {
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    passwordConfirm: ''
                }
            }
        },
        methods: {
            triggerSignUpMode(){
                this.isSigningUp = true;
                this.cardHeight = '600px';
            }
        },
    }
</script>

<style scoped>
    .outer-container{
        height: 100vh
    }
</style>