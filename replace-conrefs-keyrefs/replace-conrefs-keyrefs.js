function doOperation(){
    allNodes = authorAccess.getDocumentController().findNodesByXPath("//*[@conref or @conkeyref]", true, true, true);
    if(allNodes != null){
      for (i = 0; i < allNodes.length; i++) {       authorAccess.getEditorAccess().setCaretPosition(allNodes[i].getStartOffset() + 1);
        Packages.ro.sync.ecss.dita.DITAAccess.replaceConref(authorAccess);
      }
    }
    //Resolve also keyrefs
    keyrefNodes = authorAccess.getDocumentController().findNodesByXPath("//*[@keyref]", true, true, true);
    if(keyrefNodes != null){
      if(keyrefNodes.length > 0){
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
} 
   
  
