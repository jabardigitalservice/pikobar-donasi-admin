<template>
  <section>
    <AppBrandText class="display-1" />
    <br />
    <v-btn color="white" @click="onLogin">
      <img
        src="/logo-google.svg"
        style="margin-right: 1rem; height: 1rem; width: 1rem;"
      />
      <span class="body-2 grey--text text--darken-2 font-weight-bold">
        Masuk melalui Google
      </span>
    </v-btn>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import AppBrandText from '@/components/AppBrand/text'
export default {
  layout: 'centered',
  components: {
    AppBrandText,
  },
  data() {
    return {
      payload: {
        username: '',
        password: '',
      },
    }
  },
  created() {
    this.checkExistingToken()
      .then((isAuth) => {
        if (isAuth) {
          this.onLoginSuccess()
        }
      })
      .catch(() => {})
  },
  methods: {
    ...mapActions('auth', {
      checkExistingToken: 'checkExistingToken',
      loginWithGoogle: 'loginWithGoogle',
    }),
    onLogin() {
      return this.loginWithGoogle()
        .then(this.onLoginSuccess)
        .catch((e) => {
          //
        })
    },
    onLoginSuccess() {
      this.$router.replace({
        path: '/admin',
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
