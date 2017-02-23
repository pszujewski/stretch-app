// Globally scoped array of objects containing data for each stretch move

var State = {
  activeDone: false,
  breakDone: false
};

var Timer = {
  activeSeconds: 20,
  breakSeconds: 10,
  timerOn: function(seconds) {
    Timer[seconds] -= 1;
  },
  timerOff: function(State, seconds, id) {
    if (seconds === "activeSeconds") {
      State.activeDone = true;
    } else {
      State.breakDone = true;
    }
    clearInterval(id);
  },
  makeTimerHtml: function(State, seconds) {
    var secondsStr = seconds.toString();
    var input = secondsStr.length === 1 ? "0"+secondsStr : secondsStr;
    var breakStr = "<span>break!</span>";
    if (State.activeDone && !State.breakDone) {
      return "<h1>00:"+input+breakStr+"</h1>";
    } else {
      return "<h1>00:"+input+"</h1>";
    }
  },
  renderTimer: function($timer, input) {
    $timer.html(input);
  },
  setTimer: function(State, seconds) {
    var html = Timer.makeTimerHtml(State, Timer[seconds]);
    Timer.renderTimer($(".timer"), html);
  },
  doTimer: function(State, seconds) {
    Timer.setTimer(State, seconds);
    var stopId = setInterval(function() {
      Timer.timerOn(seconds);
      Timer.setTimer(State, seconds);
      if (Timer[seconds] === -1) {
        Timer.timerOff(State, seconds, stopId);
        Timer.breakSeconds = 10;
        Timer.activeSeconds = 20;
        appManager(State, Timer, Stretches);
      }
    }, 1000);
  }
};

var Stretches = {
  list: makeClone(stretches),
  removeItem: function() {
    if (this.list.length > 1) {
      this.list.splice(0, 1);
      return true;
    } else {
      return false;
    }
  },
  makeListHtml: function() {
    return this.list.map(function(item) {
      return "<li><p class='item-name'>"+item.name+"</p></li>";
    });
  },
  makeCurrentStretch: function() {
    return "<h1>"+this.list[0].name+"</h1><div class='img-container'><img src='"+this.list[0].path+"' /></div>"
  },
  render: function(main, list) {
    var listHtml = this.makeListHtml();
    listHtml = "<ul>"+listHtml.join("")+"</ul>";
    var currentStretch = this.makeCurrentStretch();
    main.html(currentStretch);
    list.html(listHtml);
  }
};

// Prompt page for the beginning of the app
function makePrompt() {
  var btn = "<button class='btn'>Start</button>";
  return "<h1>Neck and Back Stretches</h1>"+btn;
}

function renderPrompt(leftWell) {
  var promptHtml = makePrompt();
  leftWell.html(promptHtml);
}

function adjustCss(leftWell, rightWell) {
  leftWell.css("width", "75%");
  rightWell.css("width", "25%");
}

// Cloning funciton declaration
function makeClone(item) {
  if (typeof item !== "object" || typeof item === "function") {
    return item;
  }
  if (item instanceof Array) {
    var clone = [];
    for (let i=0; i<item.length; i++) {
      clone[i] = makeClone(item[i]);
    }
  } else if (item instanceof Object) {
    var clone = {};
    for (key in item) {
      clone[key] = makeClone(item[key]);
    }
  }
  return clone;
}

// Manage app logic --> controller function
function appManager(State, Timer, Stretches) {
  if (!State.activeDone && !State.breakDone) {
    Stretches.render($("#stretch-container"), $(".list"));
    Timer.doTimer(State, "activeSeconds");
  }
  else if (State.activeDone && !State.breakDone) {
    Timer.doTimer(State, "breakSeconds");
  }
  else if (State.activeDone && State.breakDone) {
    var remove = Stretches.removeItem();
    if (remove) {
      State.activeDone = false;
      State.breakDone = false;
      appManager(State, Timer, Stretches);
    }
  }
}

// event handler
function handleStart(container, leftWell, State, Timer, Stretches) {
  container.one("click", "button", function(event) {
    adjustCss(container, leftWell);
    appManager(State, Timer, Stretches);
  });
}

// Document ready
$(function mainFn() {
  renderPrompt($("#stretch-container"));
  handleStart($("#stretch-container"), $("#list-group"), State, Timer, Stretches);
});
