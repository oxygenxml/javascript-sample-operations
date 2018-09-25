function doOperation() {
    insert("step");
}

function insert(elementName) {
    var authorSchemaManager = authorAccess.getDocumentController().getAuthorSchemaManager();
    
    var searchedElementCI = null;
    var allPossibleElements = authorSchemaManager.getAllPossibleElements();
    for (var i = 0; i < allPossibleElements.size();
    i++) {
        var ciElement = allPossibleElements. get (i);
        if (ciElement.getQName().equals(elementName)) {
            searchedElementCI = ciElement;
            break;
        }
    }
    
    try {
        if (searchedElementCI != null) {
            var createAuthorDocumentFragment = authorSchemaManager.createAuthorDocumentFragment(searchedElementCI);
            authorAccess.getDocumentController().insertFragment(authorAccess.getCaretOffset(), createAuthorDocumentFragment);
        } else {
            Packages.java.lang.System.out.println("not found");
        }
    }
    catch (e) {
      // Bad location
      e.printStackTrace();
    }
}