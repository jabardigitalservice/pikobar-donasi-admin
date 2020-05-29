<template>
  <v-menu
    v-if="user"
    offset-y
    left
    bottom
    :nudge-bottom="8"
    content-class="user-context-menu"
  >
    <template #activator="{on}">
      <v-btn depressed color="white" v-on="on">
        <UserAvatar size="24" />
        <span
          class="d-inline-block blue-grey--text text--darken-1"
          style="margin: 1rem;"
        >
          {{ user.name }}
        </span>
      </v-btn>
    </template>
    <template #default>
      <v-card outlined width="320px">
        <v-card-text class="text-center blue-grey--text">
          <UserAvatar size="96" />
          <label
            class="d-block title font-weight-bold text--darken-4"
            style="margin-top: 1rem;"
          >
            {{ user.name }}
          </label>
          <span
            class="d-block subtitle-1"
            style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; opacity: 0.5;"
          >
            {{ user.email }}
          </span>
        </v-card-text>
        <v-spacer />
        <v-card-text class="text-center" style="border-top: 1px solid #ddd;">
          <v-btn
            outlined
            color="blue-grey"
            :loading="isLogoutPending"
            @click.stop="onLogout"
          >
            <v-icon left>
              mdi-logout-variant
            </v-icon>
            <span class="text-capitalize">
              Sign Out
            </span>
          </v-btn>
        </v-card-text>
      </v-card>
    </template>
  </v-menu>
</template>

<script>
export default {
  components: {
    UserAvatar: () => import('@/components/UserAvatar'),
  },
  data() {
    return {
      isLogoutPending: false,
    }
  },
  computed: {
    user() {
      const { user } = this.$store.state.auth
      return user || null
    },
  },
  methods: {
    async onLogout() {
      this.isLogoutPending = true
      await this.$store.dispatch('auth/logout').then(() => {
        window.open('/login', '_self')
      })
      this.isLogoutPending = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
