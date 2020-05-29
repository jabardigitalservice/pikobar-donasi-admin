<template>
  <v-card width="320px" outlined>
    <v-card-title class="justify-center" style="border-bottom: 1px solid #ddd;">
      <AppBrandText class="headline" />
    </v-card-title>
    <v-card-text style="margin-top: 1.25rem;">
      <ValidationObserver ref="validationObserver" #default="{handleSubmit}">
        <form @submit.prevent="handleSubmit(onLogin)">
          <ValidationProvider #default="{errors}" name="Email" rules="required">
            <v-text-field
              v-model="payload.email"
              label="Email"
              placeholder="Masukkan email Anda"
              filled
              type="email"
              :error-messages="errors"
            />
          </ValidationProvider>
          <ValidationProvider
            #default="{errors}"
            name="Password"
            rules="required"
          >
            <v-text-field
              v-model="payload.password"
              label="Password"
              placeholder="Masukkan password"
              filled
              type="password"
              :error-messages="errors"
            />
          </ValidationProvider>
          <v-btn
            :loading="isLoginPending"
            :disabled="isButtonDisabled"
            :dark="!isButtonDisabled"
            block
            type="submit"
            outlined
            color="blue"
          >
            Masuk
          </v-btn>
        </form>
      </ValidationObserver>
    </v-card-text>
    <v-card-text>
      <p class="d-flex justify-center align-center" style="margin-left: -1rem;">
        <img src="/logo-pikobar.png" class="pikobar-logo" />
        <span class="blue-grey--text text--lighten-1">
          Pusat Informasi dan Koordinasi<br />COVID-19 Jawa Barat
        </span>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import AppBrandText from '@/components/AppBrand/text'
export default {
  components: {
    AppBrandText,
  },
  data() {
    return {
      hasAtLeastOneError: null,
      payload: {
        email: null,
        password: null,
      },
      isLoginPending: false,
    }
  },
  computed: {
    isButtonDisabled() {
      return (
        !this.payload.email || !this.payload.password || this.isLoginPending
      )
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.watchInvalidFields()
    })
  },
  methods: {
    ...mapActions('auth', ['loginUsingEmailAndPassword']),
    watchInvalidFields() {
      this.$watch(
        '$refs.validationObserver.errors',
        function handler(obj) {
          if (!obj || typeof obj !== 'object') return
          this.hasAtLeastOneError = Object.keys(obj).some(
            (key) => obj[key].length
          )
        },
        { immediate: true, deep: true }
      )
    },
    onLogin() {
      this.isLoginPending = true
      this.loginUsingEmailAndPassword({
        email: this.payload.email,
        password: this.payload.password,
      })
        .then(() => {
          return this.$router.replace({
            path: '/admin',
          })
        })
        .finally(() => {
          this.isLoginPending = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.pikobar-logo {
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  object-position: center;
}
</style>
