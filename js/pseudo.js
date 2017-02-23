// Array of objects is located globally. Each object holds the img src url, title of the stretch and a description


// Timer object
// state for this object is
  //breakSeconds property set to 6
  //goSeconds prop set to 16
// function timerOn
  // subtract 1 from seconds and return seconds
// function timerOff
  // clears timer so the clearInterval is called
// function makeTimerHtml
  // builds html string using h1 element and returns it
// function renderTimer - single arg for Jquery object
// function doTimer
  // wrapped in setInterval set equal to a var for the stopId
  // call timerOn
  // call renderTimer
  // if seconds is equal to 0, call renderTimer and then call timerOff, inputing ID

// Stretches object
// state includes list of stretches
// Clone the global array of objects and store in state var
// function makeClone declaration
// function updatelist
// Remove first item from the list
// function makeListHtml
// builds an html string wrapped in ul and li tags with args added to the string and all remaining list items (titles of stretches)
// function makeStretchHtml
// build an html string including h1 elements and img element from first item in the Array
// function renderStretchData - args are jQuery elements
