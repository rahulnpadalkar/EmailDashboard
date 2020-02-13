<template>
  <div class="sidebar-container">
    <div class="actions">
      <div @click="logout" class="button is-success">Logout</div>
      <EmailCompose />
    </div>
  </div>
</template>

<script>
import EmailCompose from "./EmailCompose";
export default {
  name: "Sidebar",
  components: {
    EmailCompose
  },
  methods: {
    logout() {
      this.$session.destroy();
      this.$router.push("/");
    }
  }
};
</script>

<style lang="sass" scoped>
  .sidebar-container
    display: inline-block
    height: 100%
    width: 20%
    .actions
      text-align: left 
      div
        display: inline-block
        margin-right: 1rem
        text-align: left
</style>