window.__lc = window.__lc || {};
window.__lc.license = 17818968;
window.__lc.integration_name = "manual_restart_trial";

(function (n, t, c) {
  function i(n) {
    return e._h ? e._h.apply(null, n) : e._q.push(n)
  }
  var e = { _q: [], _h: null, _v: "2.0", on: function () { i(["on", c.call(arguments)]) }, once: function () { i(["once", c.call(arguments)]) }, off: function () { i(["off", c.call(arguments)]) }, get: function () { if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load."); return i(["get", c.call(arguments)]) }, call: function () { i(["call", c.call(arguments)]) }, init: function () { var n = t.createElement("script"); n.async = !0, n.type = "text/javascript", n.src = "https://cdn.livechatinc.com/tracking.js", t.head.appendChild(n) } };
  !n.__lc.asyncInit && e.init(), n.LiveChatWidget = n.LiveChatWidget || e
}(window, document, [].slice));

// Initialize LiveChat widget after it loads
window.__lc.asyncInit = function () {
  LiveChatWidget.on('ready', function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
      event.preventDefault();
      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;

      // Set customer details and open chat window
      LiveChatWidget.call('set_customer_name', name);
      LiveChatWidget.call('set_customer_email', email);
      LiveChatWidget.call('open_chat_window');
    });

    LiveChatWidget.on('message', function (event) {
      if (event.data.role === 'visitor') {
        const userMessage = event.data.text;
        fetch('http://my-app-env.eba-zaadi4gq.us-east-1.elasticbeanstalk.com/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: userMessage })
        })
          .then(response => response.json())
          .then(data => {
            LiveChatWidget.call('add_message', {
              text: data.reply,
              user_type: 'agent'
            });
          })
          .catch(error => console.error('Error:', error));
      }
    });
  });
};
