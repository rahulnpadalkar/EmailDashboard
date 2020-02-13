import lfdb from 'localforage';

export default {

    addUser: function (key, value) {
        var userObj = {
            'password': value
        }
        lfdb.setItem(key, userObj);
    },

    get: function (key) {
        return lfdb.getItem(key);
    },

    addEmail: function (emailObj) {
        var recipients = emailObj.recipients.split(',');
        recipients.forEach(recipient => {
            this.getUser(recipient).then((userObj) => {
                if (userObj.recieved) {
                    userObj.recieved.push(emailObj)
                } else {
                    userObj['recieved'] = [emailObj];
                }
                lfdb.setItem(recipient, userObj);
            });
        });
        this.addEmailToSent(emailObj)
    },

    addEmailToSent: function (emailObj) {
        this.getUser(emailObj.from).then((userObj) => {
            if (userObj.sent) {
                userObj.sent.push(emailObj);
            } else {
                userObj['sent'] = [emailObj];
            }
            lfdb.setItem(emailObj.from, userObj);
        });
    },

    getUser: function (username) {
        return this.get(username);
    }
}