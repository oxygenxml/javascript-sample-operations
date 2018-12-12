function doOperation(){
	/* *
	* The element to be unwrapped.
	*/
	var elementToUnwrap = "email";
	
	var controller = authorAccess.getDocumentController();
	controller.beginCompoundEdit();

	// Expand all email elements from the document.
	// Find nodes
	var emailNodes = null;
	try {
		var nodes = controller.findNodesByXPath("//" + elementToUnwrap, true, true, true);
		if (nodes != null){
			emailNodes = Packages.java.util.Arrays.asList(nodes);
		}
	}
	catch (e) {
		Packages.java.lang.System.err.println(e);
	}

	if (emailNodes != null && !emailNodes.isEmpty()) {
		var emailNodesSize = emailNodes.size();
		for (var i = 0; i < emailNodesSize; i++) {
			var currentNode = emailNodes.get(i);
			//Create the document fragment
			var fragOffset = currentNode.getStartOffset();
			if (currentNode.getStartOffset() + 1 <= currentNode.getEndOffset() - 1){
				var content = controller.createDocumentFragment(currentNode.getStartOffset() + 1, currentNode.getEndOffset() - 1);
				if (content != null){
					var deleted = controller.deleteNode(currentNode);
					if (deleted){
						//Insert the document fragment
						controller.insertFragment(fragOffset, content);   
					}
				}
			} else {
				controller.deleteNode(currentNode);
			}		
	      }
    }
								
	controller.endCompoundEdit();
} 
   