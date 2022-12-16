function doOperation() {
    //Ask user for resource ID to search for.
    var resourceID = Packages.javax.swing.JOptionPane.showInputDialog
    (null, "Resource ID:",
        "Input Resource ID",
        Packages.javax.swing.JOptionPane.QUESTION_MESSAGE);
    if (resourceID != null) {
    	//First hide all previous results
    	Packages.ro.sync.exml.workspace.api.PluginWorkspaceProvider.getPluginWorkspace().getResultsManager().setResults(
    				"Found Resource IDs", null, Packages.ro.sync.exml.workspace.api.results.ResultsManager.ResultType.GENERIC);
    	//Now find and recurse the entire project folder
        var projectDir = new Packages.java.io.File(Packages.ro.sync.util.editorvars.EditorVariables.expandEditorVariables("${pd}", null));
        findXPathInDITAMaps(projectDir, resourceID);
    }
}

function findXPathInDITAMaps(file, resourceID){
	if(file.isDirectory()){
		//Recurse the directory.
		var files = file.listFiles();
		for (var i = 0; i < files.length;i++){
			findXPathInDITAMaps(files[i], resourceID);
		}
	} else {
		if(file.getName().endsWith(".ditamap")){
		    //Found a DITA Map
			//Interesting file, try to run an XPath on in..
			var authorDocProvider = Packages.ro.sync.exml.workspace.api.PluginWorkspaceProvider.getPluginWorkspace().createAuthorDocumentProvider(file.toURI().toURL(), null);
			var xpath="//resourceid[@appid='" + resourceID + "']";
			var foundNodes = authorDocProvider.getAuthorDocumentController().findNodesByXPath(xpath, false, true, true);
			if(foundNodes.length > 0){
				//Found it, show a result for it.
				dpi = new Packages.ro.sync.document.DocumentPositionedInfo(0, "Found " + resourceID, file.toURI().toURL().toString());
				Packages.ro.sync.exml.workspace.api.PluginWorkspaceProvider.getPluginWorkspace().getResultsManager().addResult("Found Resource IDs", dpi, 
					Packages.ro.sync.exml.workspace.api.results.ResultsManager.ResultType.GENERIC, true, true);
			}
		}
	}
}
