 function doOperation(){
 if(authorAccess.getEditorAccess().hasSelection()){
      frag = authorAccess.getDocumentController().createDocumentFragment(authorAccess.getEditorAccess().getSelectionStart(), authorAccess.getEditorAccess().getSelectionEnd() - 1);
      xmlContent = authorAccess.getDocumentController().serializeFragmentToXML(frag);
      Packages.java.awt.Toolkit.getDefaultToolkit().getSystemClipboard().setContents(new Packages.java.awt.datatransfer.StringSelection(xmlContent), null);
    }    
}
