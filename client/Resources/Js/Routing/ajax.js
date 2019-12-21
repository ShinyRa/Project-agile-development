// const server = location.hostname === "127.0.0.1" ? "http://127.0.0.1:1337" : location.hostname === "145.28.192.35" ? "http://145.28.192.35:1337" : "";   
//const server = "http://145.28.192.35:1337";
 const server = "http://127.0.0.1:1337";

function ajaxRequest(type, url, callback) {
    $.ajax({
        url: server + url,
        type: type,
        contentType: 'application/json',
        // data: JSON.stringify(body),
        success: function (data, textStatus, xhr) {
            callback(data, xhr);
        },
        error: function (xhr, status) {
            callback(status, xhr);
        }
    });
}
