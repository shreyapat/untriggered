
//var textNode, walk=document.createTreeWalker(document,NodeFilter.SHOW_TEXT,null,false);

chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'clear_page') {
        walk(document.body, request.triggers, cleanText);
    }
}
);
chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'go_back') {
        window.history.back();
    }
}
);
var triggers = {"Hack": false,"banana":false};
/*
chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    var res = []
    for(key in allKeys){
        chrome.storage.sync.get(allKeys[key], function(result){
            res[result.key] = result.value;
        });
    }
    start(res);
    });
*/

    walk(document.body, triggers, searchText);

    var numfound = 0;

    //check if any of the things in the array are true
    for(key in triggers){
        if(triggers[key]){
            numfound += 1;
        }
    }


    if(numfound > 0){
        //alert("We found " + numfound + " of your triggers on this site.");
        //chrome.runtime.sendMessage({"type": "create_warning", "triggers": triggers, "num":numfound }, function(response) {
        walk(document.body, triggers, cleanText);
        //});
        document.body.insertAdjacentHTML('beforeend',

                '<style> .modal {\
        display: none; /* Hidden by default */\
        position: fixed; /* Stay in place */\
        z-index: 1; /* Sit on top */\
        left: 0;\
        top: 0;\
        width: 100%; /* Full width */\
        height: 100%; /* Full height */\
        overflow: auto; /* Enable scroll if needed */\
        background-color: rgb(153,153,153); /* Fallback color */\
        background-color: rgba(198,126,118,1); /* Black w/ opacity */\
    }\
    \
    /* Modal Content/Box */\
    .modal-content {\
        background-color: #FFE4E1;\
        margin: 15% auto; /* 15% from the top and centered */\
        padding: 20px;\
        border: 1px solid #888;\
        width: 80%; /* Could be more or less, depending on screen size */\
    }\
    \
    /* The Close Button */\
    .close {\
        color: #aaa;\
        float: right;\
        font-size: 28px;\
        font-weight: bold;\
    }\
    \
    .close:hover,\
    .close:focus {\
        color: black;\
        text-decoration: none;\
        cursor: pointer;\
    }"</style>\
                <div id="myModal" class="modal">\
                    <div class="modal-content">\
                        <p></p>\
                        <span class="close">x</span>\
                        <p>We found some trigger words in this page. We beeped them out so you won\'t see them. Press X to go back to the last page.</p>\
                        </div>\
                        </div>'
            );
        var closeModal = document.getElementsByClassName("close")[0];

        closeModal.onclick = function(){
            modal.style.display = "none";
        }

        var modal = document.getElementById('myModal');
        modal.style.display = "block";
    }


function walk(node, triggers, func)
{
	// Source: http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child, triggers, func);
				child = next;
			}
			break;

		case 3: // Text node
			func(node, triggers);
			break;
	}
}

function searchText(textNode, triggers)
{
	var val = textNode.nodeValue;

    for(key in triggers){
        if(val.toLowerCase().includes(key.toLowerCase())){
            triggers[key] = true;
        }
    }
}

function cleanText(textNode,triggers){
    var v = textNode.nodeValue;

    for(key in triggers){
        var regEx = new RegExp(key, "ig");
        v = v.replace(regEx, "*".repeat(key.length));
    }
	textNode.nodeValue = v;
}

function goback() {
    // Do something, eg..:
    window.history.back();
};
