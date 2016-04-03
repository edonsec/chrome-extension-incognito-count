function isIncognitoFilter(w)
{
  return w.incognito == true;
}

function notIncognitoFilter(w)
{
  return w.incognito == false;
}

function windowFilter(filter, callbackItem)
{
  chrome.windows.getAll(null, function(w)
  {
    w.forEach(function(item, idx) {
      if(filter(item))
      {
        if(callbackItem(item) === false)
        {
          return;
        }
      }
    })
  });
}

function closeWindow(w)
{
  chrome.windows.remove(w.id);
}

function updateCount()
{
  chrome.windows.getAll(null, function(w) {
    var filtered = w.filter(function(item) {
      return isIncognitoFilter(item);
    });

    var count = filtered.length;

    chrome.storage.local.set({'incognitoCount': count});
    chrome.browserAction.setBadgeText({text: count.toString()});
  });
}

function switchToFirstNormalWindow()
{
  windowFilter(notIncognitoFilter, function(w) {
    chrome.windows.update(w.id, {'focused':true}, function() {});
    
    return false;
  });
}

chrome.windows.onCreated.addListener(function(w)
{
  updateCount();
});

chrome.windows.onRemoved.addListener(function(w)
{
  updateCount();
});

/** 
 * Keyboard shortcuts:
 *
 * - Control + Alt + N - Switch to first non-incognito window
 */
chrome.commands.onCommand.addListener(function(command) 
{
  switch(command) {
    case 'toggle-feature-switch-to-normal':
      switchToFirstNormalWindow();
    break;
  }
});

// Display the initial count
updateCount();
