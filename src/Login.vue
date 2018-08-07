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
                                    label="Email"
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
                                    v-model="passwordConfirm"
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
                        <v-btn @click="clickSignUp" round block color="primary" dark>Submit</v-btn>
                    </v-flex>
                </v-layout>
            </div>
            <div v-else-if="isConfirming">
                <v-container>
                    <v-layout row justify-center>
                        <v-flex xs9>
                           <v-text-field
                                    v-model="confirmationCode"
                                    label="Confirmation Code"
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-layout row justify-center>
                    <v-flex xs9>
                        <v-btn @click="clickConfirmSignUp" round block color="primary" dark>Get Started</v-btn>
                    </v-flex>
                </v-layout>
            </div>
            <div v-else-if="mustChangePass">
                <v-container>
                    <v-layout row justify-center>
                        <v-flex xs9>
                           <v-text-field
                                    v-model="confirmEmail"
                                    label="Confirm Email"
                            />
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-center>
                        <v-flex xs9>
                            <v-text-field
                                    v-model="newPassword"
                                    label="New Password"
                                    :append-icon="visible4 ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (visible4 = !visible4)"
                                    :type="visible4 ? 'text' : 'password'"
                            />
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-center>
                        <v-flex xs9>
                            <v-text-field
                                    v-model="newPasswordConfirm"
                                    label="Confirm Password"
                                    :append-icon="visible5 ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (visible5 = !visible5)"
                                    :type="visible5 ? 'text' : 'password'"
                            />
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-layout row justify-center>
                    <v-flex xs9>
                        <v-btn @click="clickResetPass" round block color="primary" dark>Reset Password</v-btn>
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
                        <v-btn @click="clickLogin" round block color="primary" dark>Login</v-btn>
                    </v-flex>
                </v-layout>
                <div v-if="hidetemp">
                    <v-layout row justify-center>
                        <v-flex xs9>
                            <v-btn @click="triggerSignUpMode" round block color="primary" dark>Sign Up</v-btn>
                        </v-flex>
                    </v-layout>
                </div>
            </div>
        </v-card>
    </v-layout>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "login",
        data () {
            return {
                cardHeight: '350px',
                isSigningUp: false,
                isConfirming: false,
                visible1: false,
                visible2: false,
                visible3: false,
                visible4: false,
                visible5: false,
                loginInfo: {
                    username: '',
                    password: '',
                },
                signUpInfo: {
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                },
                passwordConfirm: '',
                newPassword: '',
                newPasswordConfirm: '',
                confirmEmail: '',
                confirmationCode: '',
            }
        },
        computed: {
            mustChangePass(){
                return this.$store.state.user.mustChangePass;
            },
            cognitoUser(){
                return this.$store.state.user.cognitoUser
            }
        },
        methods: {
            triggerSignUpMode(){
                this.isSigningUp = true;
                this.cardHeight = '600px';
            },
            triggerConfirmSignUpMode(){
                this.isSigningUp = false;
                this.isConfirming = true;
                this.cardHeight = '350px';
            },
            ...mapActions([
                'login',
                'signUp',
                'resetPassword',
                'confirmSignUp'
            ]),
            clickLogin(){
                this.login(this.loginInfo);
            },
            clickSignUp(){
                //todo: add validation logic
                this.signUp(this.signUpInfo);
                this.triggerConfirmSignUpMode();
            },
            clickResetPass(){
                if(this.newPassword = this.newPasswordConfirm){
                    const payload = {cognitoUser: this.cognitoUser, password: this.newPassword, email: this.confirmEmail};
                    this.resetPassword(payload);
                }
                else{
                    alert('Passwords do not match');
                }
            },
            clickConfirmSignUp(){
                this.confirmSignUp(this.confirmationCode);
            }
        },
    }
</script>

<style scoped>
    .outer-container{
        height: 100vh
    }
</style>