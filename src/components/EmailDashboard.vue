<template>
  <div class="email-dashboard-container">
    <div class="email-dashboard">
      <Sidebar />
      <EmailList />
    </div>
  </div>
</template>

<script>
import EmailList from "./EmailList";
import Sidebar from "./Sidebar";
export default {
  name: "EmailDashboard",
  components: {
    EmailList,
    Sidebar
  }
};
</script>

<style lang="sass" scoped>
  .email-dashboard-container
    height:100%
    .email-dashboard
      height:100%
    .sidebar
      display:inline-block
      width:30%
      height:100%
    .email-list
      display:inline-block
      width:70%
      height:100%
    .email-dashboard div
      display:inline-block
</style>