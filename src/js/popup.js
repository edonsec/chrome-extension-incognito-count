
function showCloseAllDialog()
{
  document.getElementById('close-all-dialog').style.display = 'block';
  document.getElementById('no-active-dialog').style.display = 'none';
}

function showNoActiveDialog()
{
  document.getElementById('no-active-dialog').style.display = 'block';
  document.getElementById('close-all-dialog').style.display = 'none';
}

function displayDialog(incognitoCount)
{
  if(incognitoCount == 0)
  {
    return showNoActiveDialog();
  }

  return showCloseAllDialog();
}

window.onload = function()
{
  chrome.storage.local.get('incognitoCount', function(item)
  {
    displayDialog(item.incognitoCount);
  });

  document.getElementById('confirm').onclick = function()
  {
    var bgPage = chrome.extension.getBackgroundPage();
    
    bgPage.windowFilter(bgPage.isIncognitoFilter, bgPage.closeWindow);
    window.close();
  }

  document.getElementById('cancel').onclick = function()
  {
    window.close();
  }
}
