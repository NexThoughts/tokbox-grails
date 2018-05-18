// replace these values with those generated in your TokBox Account
var apiKey = "46121732";
var sessionId = "1_MX40NjEyMTczMn5-MTUyNjY0MjY3NTA4Nn5oYmN2U21ucnE0T3R4bHM1dHBacUg2bHl-UH4";
var token = "T1==cGFydG5lcl9pZD00NjEyMTczMiZzaWc9ZjU3ZWNjMzJlZTBmYWE3YzY4ZTJkMjM2YzA2YTM1ZTk0ODc4NGQxMzpzZXNzaW9uX2lkPTFfTVg0ME5qRXlNVGN6TW41LU1UVXlOalkwTWpZM05UQTRObjVvWW1OMlUyMXVjbkUwVDNSNGJITTFkSEJhY1VnMmJIbC1VSDQmY3JlYXRlX3RpbWU9MTUyNjY0Mjc2MCZub25jZT0wLjc5NDE0MTA1MjQxNjAxNTUmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUyNjY2NDM2MCZjb25uZWN0aW9uX2RhdGE9aGkmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=";

var serverSessionId;
// (optional) add server code here
initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
        alert(error.message);
    }
}

function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function (event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        }, handleError);
    });

    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    }, handleError);

    // Connect to the session
    session.connect(token, function (error) {
        // If the connection is successful, publish to the session
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });
}

function getSessionId() {
    var url = 'http://e825e1d7.ngrok.io/BackendAppServer/api/connection/connect';
    $.ajax({
        url: url,
        dataType: "JSON",
        method: "GET",
        success: function (res) {
            serverSessionId = res[0].sessionid;
            console.log(serverSessionId);
            setInterval("sendSessionId(serverSessionId)", 5000)
        },
        error: function () {
        }
    });
}

function sendSessionId(sessionID) {
    var url = 'http://e825e1d7.ngrok.io/BackendAppServer/api/connection/ping';
    $.ajax({
        url: url,
        dataType: "JSON",
        method: "POST",
        data: {sessionid: sessionID},
        success: function (res) {
            console.log(res)
            // console.log(res[0].sessionid);
            // var serverSessionId = res.sessionid
            // console.log("Got response: " + serverSessionId);
        },
        error: function () {

        }
    });
}

$(document).ready(function () {
    getSessionId();
});


