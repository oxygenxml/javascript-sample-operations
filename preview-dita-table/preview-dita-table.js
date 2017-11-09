function doOperation(){
    //Search for the DITA table closest to the caret location, expand all conrefs/conkeyrefs/keyrefs inside it, serialize it to XML
    //, upload the XML to a web server, undo the changes back to the original state.
    authorAccess.getDocumentController().beginCompoundEdit();
    modified = authorAccess.getEditorAccess().isModified();
     try{
      //We need to find all elements which have conrefs and conkeyrefs inside the table and expand them.
      //We are making live changes to the opened document but we'll undo them after we get the information we wanted to obtain...
        allNodes = authorAccess.getDocumentController().findNodesByXPath("ancestor-or-self::table//*[@conref or @conkeyref]", true, true, true);
        if(allNodes != null){
          for (i = 0; i < allNodes.length; i++) {       
            authorAccess.getEditorAccess().setCaretPosition(allNodes[i].getStartOffset() + 1);
            //We use this API utility to expand conrefs and conkeyrefs, it should do that recursively.
            Packages.ro.sync.ecss.dita.DITAAccess.replaceConref(authorAccess);
          }
        }
        //Resolve also keyrefs
        keyrefNodes = authorAccess.getDocumentController().findNodesByXPath("ancestor-or-self::table//*[@keyref]", true, true, true);
        if(keyrefNodes != null){
          if(keyrefNodes.length > 0){
          //This is kind of a hack, we use the link text resolver to resolve all keyrefs to the text.
            resolver = new Packages.ro.sync.ecss.extensions.dita.link.DitaLinkTextResolver();
            resolver.activated(authorAccess);
            for (i = 0; i < keyrefNodes.length; i++) {
                resolved = resolver.resolveReference(keyrefNodes[i]);
                offset = keyrefNodes[i].getStartOffset();
                authorAccess.getDocumentController().deleteNode(keyrefNodes[i]);
                authorAccess.getDocumentController().insertText(offset, resolved);
            }
            resolver.deactivated(authorAccess);
          }
        }
        
        //Now try to serialize the table to XML
        tableArray = authorAccess.getDocumentController().findNodesByXPath("ancestor-or-self::table[1]", true, true, true);
        if(tableArray != null && tableArray.length > 0){
           //Create an AuthorDocumentFragment containing the node.
            frag = authorAccess.getDocumentController().createDocumentFragment(tableArray[0], true);
            //Serialize the fragment to XML.
            tableXML = authorAccess.getDocumentController().serializeFragmentToXML(frag);
            //This is the URL to which we'll send the table DITA XML contents as a GET request...
            //We call the "correctURL" because we want all characters in the query string to be properly encoded.
            url = authorAccess.getUtilAccess().correctURL("https://www.google.ro/search?q=" + tableXML);
            //Call our API to open a web browser pointing to the URL.
            authorAccess.getWorkspaceAccess().openInExternalApplication(new Packages.java.net.URL(url), false);
        }
    } finally {
        //Undo the resolving of references.
        authorAccess.getDocumentController().cancelCompoundEdit();
        authorAccess.getDocumentController().endCompoundEdit();
        if(! modified){
            //Initially the editor was not marked as modified, reset the modified flag, we just reverted the changes back to the original content...
            authorAccess.getEditorAccess().setModified(false);
        }
    }
} 
