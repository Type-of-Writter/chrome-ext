function initPage() {
  var context = "page";
  var title = "Add page to wallabag";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
    "id": "context" + context});  
}

function initLink() {
  var context = "link";
  var title = "Add link to wallabag";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
    "id": "context" + context});  
}

function onClickHandler(info, tab) {
  var settings = new Store("settings", {});
  var settingsObj = settings.toObject();
  var base_url;
  base_url = settingsObj['base_url'];
  if(base_url == null || base_url == "") 
  {
    chrome.tabs.create({'url': chrome.extension.getURL("/fancy-settings/index.html")});
  } else {
    var url;
    if(info.linkUrl) {
      url = info.linkUrl;
    } else {
      url = info.pageUrl;
    }
    var if_url = base_url + '?action=add&url=' + btoa(url);
    window.open(if_url);

  }
};

chrome.runtime.onInstalled.addListener(initPage);
chrome.runtime.onInstalled.addListener(initLink);
chrome.runtime.onStartup.addListener(initPage);
chrome.runtime.onStartup.addListener(initLink);
chrome.contextMenus.onClicked.addListener(onClickHandler);
