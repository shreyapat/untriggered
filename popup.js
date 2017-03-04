function displayInputs(triggerList) {
 for (key in triggerList) {
     addTriggers(triggerList[key]);
 }
}

function addTriggers(text) {
  var wrapper, input;
  wrapper = document.getElementById('triggers');
  input = document.createElement("input");
  input.type = "text";
  input.name = text;
  input.value = text;
  wrapper.insertBefore(document.createElement("br"), wrapper.firstChild);
  wrapper.insertBefore(input, wrapper.firstChild);
}

function addInput() {
  var wrapper, input;
  wrapper = document.getElementById('triggers');
  input = document.createElement("input");
  input.type = "text";
  input.name = "";
  wrapper.appendChild(input);
  wrapper.appendChild(document.createElement("br"));
}

function removeInput() {
  var len, children, wrapper;
  wrapper = document.getElementById("triggers");
  children = wrapper.childNodes;
  len = children.length;
  if (!children[len-2].value) {
        wrapper.removeChild(children[len-1]);
        wrapper.removeChild(children[len-2]);
  }
}

function saveOptions() {
  var ts = document.getElementById("triggers").getElementsByTagName("INPUT");
  var triggers = {};
  for(child in ts){
    if (ts[child].value) {
        triggers[ts[child].value] = false;
    }
  }

chrome.storage.sync.set({"triggers":triggers});

}

function contentLoaded() {

  chrome.storage.sync.get("triggers", function (result) {
       alert(Object.getOwnPropertyNames(result).length);
       if (Object.getOwnPropertyNames(result).length !== 0) {
//         val ts = result.triggers;
//         displayInputs(ts);
       }
  });


//  triggerList = ["1", "2", "3"];
//  displayInputs(triggerList);

  var save_btn, add_btn;
  save_btn = document.getElementById('save_btn');
  add_btn = document.getElementById('add_btn');
  remove_btn = document.getElementById('remove_btn');

  save_btn.addEventListener('click', saveOptions);
  add_btn.addEventListener('click', addInput);
  remove_btn.addEventListener('click',removeInput);
}

document.addEventListener('DOMContentLoaded', contentLoaded);
