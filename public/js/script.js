// defining range as slider
const slider = document.getElementById("range");

// Controlling style for the slider
var BVL = document.getElementById("val");
function show() {
    var value = document.getElementById("range").value;
    document.getElementById("range").style.backgroundSize =
        (value * 100) / 255 + "% 100%";
    document.getElementById("range").style.backgroundImage =
    " linear-gradient(rgb(0,0,"+ value+"), rgb(0,0,"+value+"))";
    BVL.innerHTML = value;
}


// ------- BACKEND CONTROL -------

/** =================== Description ===================
 * 
 *  The idea of the app is to drag the slider from our client side,
 *  Then we send the value of this slider to the server,
 *  Here server turns come, where the server sends this information to all clients,
 *  hence, we control all clients, including us, to update the value of this slider
 *  
 *  PLEASE, KEEP THE CODE SIMPLE, DON'T FORGET TO COMMENT
 */


// intialize WEBSOCKET HOST & WEBSOCKET
var HOST = location.origin.replace(/^http/, 'ws');

// ws is our client variable name on the websocket
var ws = new WebSocket(HOST);






// Final is a variable updating our slider at the end of dragging
let final = 0;


// onopen event is an event which fires when you first connect at the host.
// send function is used to send the server a message.
ws.onopen = function(){
    ws.send("Hi server");
}

// onmessage event is an event fires when the server send you a message
/**
 *  the server sends us the value of the slider after last modification,
 *  final is the variable where we store the last update of the slider,
 *  then we change the value of slider with var final, then we call the show()
 *  to modify the style for this slider.
 */
ws.onmessage = function(event){
    final = event.data;
    console.log(final);
    slider.value = final;
    show();

}

/**
 *  onchange event is an event fires when you stop dragging the slider,
 *  then the client sends to the server the last value the slider stops at,
 *  after that, the server starts his work by sending this value to all clients
 */
slider.onchange = function() {
    ws.send(this.value);
    setTimeout(() => {
      document.location.reload();
    }, 10000);
}



