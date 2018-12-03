function doOperation() {
    results = authorAccess.getDocumentController().findNodesByXPath("//p", true, true, true);
    for(i = 0; i < results.length; i++){
       authorAccess.getDocumentController().setAttribute("id", new Packages.ro.sync.ecss.extensions.api.node.AttrValue("someValue"), results[i]);
    }
}