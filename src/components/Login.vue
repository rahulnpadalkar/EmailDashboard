<template>
  <div>
    <div class="login-container columns is-centered">
      <div class="login-form column is-4">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input class="input username" v-model="username" type="text" placeholder="Username" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input password" v-model="password" type="password" placeholder="Password" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button @click="login" class="button is-info">Login</button>
          </div>
        </div>
      </div>
    </div>
    <div class="call">Not a member? Sign up</div>
    <div class="signup-container columns is-centered">
      <div class="signup-form column is-4">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input class="input username" v-model="newusername" type="text" placeholder="Username" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input password"
              v-model="newpassword"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button @click="signup" class="button is-success">Signup</button>
          </div>
        </div>
        <div class="err-msg">{{errMsg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import localdb from "../services/dbservice";
export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
      errMsg: "",
      newusername: "",
      newpassword: ""
    };
  },

  methods: {
    login() {
      localdb.get(this.username).then(user => {
        if (user.password === this.password) {
          this.$session.start();
          this.$session.set("username", this.username);
          this.$router.push("/");
        }
      });
    },

    signup() {
      localdb.get(this.newusername).then((err, value) => {
        if (!value) {
          localdb.addUser(this.newusername, this.newpassword);
          this.newusername = "";
          this.newpassword = "";
        } else {
          this.errMsg = "User already exists";
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped>
    .signup-container 
        margin-top: 5rem
        div.err-msg 
            color:"red"
        div.control
            text-align: center

    .call 
        margin-top: 3rem

    .login-container
        div.control
            text-align: center
</style>