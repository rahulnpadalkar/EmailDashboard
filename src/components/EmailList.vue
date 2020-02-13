<template>
  <div class="email-list-container">
    <div class="email-list">
      <div class="tabs is-centered is-toggle is-toggle-rounded">
        <ul>
          <li :class="{'is-active':isSelected}" @click="loadEmails('recieved')">
            <a>Inbox</a>
          </li>
          <li @click="loadEmails('sent')" :class="{'is-active':!isSelected}">
            <a>Sent</a>
          </li>
        </ul>
      </div>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="email in emails" :key="email.timestamp" @click="loadEmail(email)">
            <td>
              <div>{{email.from}}</div>
            </td>
            <td>
              <div>{{email.subject}}</div>
            </td>
            <td>
              <div>{{email.date}}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal name="email-details" width="50%" height="60%">
      <div class="columns show-email-container is-centered">
        <div class="column is-9">
          <div class="field">
            <label class="label">To</label>
            <div class="control">
              <div>{{currentEmail.recipients}}</div>
            </div>
          </div>
          <div class="field">
            <label class="label">Subject</label>
            <div class="control">
              <div>{{currentEmail.subject}}</div>
            </div>
          </div>
          <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <div>{{currentEmail.message}}</div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import localdb from "../services/dbservice";
export default {
  name: "EmailList",

  data() {
    return {
      emails: [],
      currentEmail: {},
      isSelected: false
    };
  },

  methods: {
    loadEmail(email) {
      this.$modal.show("email-details");
      this.currentEmail = email;
    },

    loadEmails(type) {
      this.isSelected = !this.isSelected;
      localdb.getUser(this.$session.get("username")).then(userObj => {
        this.emails = userObj[type];
      });
    }
  },

  mounted() {
    this.loadEmails("recieved");
  }
};
</script>

<style lang="sass" scoped>
  .email-list-container
    display: inline-block
    width: 80%
    height: 100%
    div.tabs.is-toggle li.is-active a
      background-color: #ff4e4e
      border-color: #ff4e4e
    table
      margin-top:3rem
      width:100%
      tr
        border-bottom:1px solid #ebebeb
        cursor: pointer
        td:nth-child(1), td:nth-child(3)
          width:20%
          div
            padding: 0.75rem 0.25rem
        td:nth-child(2)
          width:60%
          div
            padding: 0.75rem 0.25rem
      tbody tr:hover
        background-color: #ebebeb
    .show-email-container
        padding: 3rem 0rem
        height: 100%
        .control div
          border: 1px solid #ebebeb
          padding: 1rem
          border-radius: 0.5rem
        .control:nth-child(2) div
          height:100%
        div.field:nth-child(1), div.field:nth-child(2)
            height:20%
        div.field:nth-child(3)
            height:50%
            div.control,textarea.email-body 
                height: 90%
</style>