module("Loudmouth events");

test("Should broadcast events to dom subscribers", function () {
  // create new loud mouth with bodhi namespace
  var lm = new LoudMouth("bodhi");

  $("#qunit-fixture").append($.div("", "#event_receiver"));

  // subscribe to the bodhi namespace
  $("#event_receiver").addClass("subscriber bodhi");

  // bind to the sotapanna event and set var we can compare
  var eventCalled = false;
  $('#event_receiver').bind("sotapanna.bodhi", function (e) {
    eventCalled = e.type;
  });

  // fire the event
  lm.fireEvent("sotapanna");

  equals(eventCalled, "sotapanna", "Event sotapanna should have been called");
});

test("Should broadcast events to registered callbacks", function () {
  // create new loud mouth with bodhi namespace
  var lm = new LoudMouth("bodhi");

  var eventCalled = false;
  var callback = function () {
    eventCalled = true;
  }

  lm.registerCallback("sakadagami", callback);

  // fire the event
  lm.fireEvent("sakadagami");

  ok(eventCalled, "Event sakadagami should have been called");
});

test("Should not register existing callback for an event", function () {
  // create new loud mouth with bodhi namespace
  var lm = new LoudMouth("bodhi");

  this.callback = function () {}

  expectCall(this, "callback", 1);

  lm.registerCallback("sakadagami", callback);
  lm.registerCallback("sakadagami", callback);

  // fire the event
  lm.fireEvent("sakadagami");
});