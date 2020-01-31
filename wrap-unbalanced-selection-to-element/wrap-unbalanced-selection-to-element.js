function doOperation(){
    var ELEMENT_NAME = 'myElement';
    editorAccess = authorAccess.getEditorAccess();
    controller = authorAccess.getDocumentController();
    if (editorAccess.hasSelection()) {
      // do the actions in a compound edit to undo/redo in one. 
      try {
        controller.beginCompoundEdit();
        start = editorAccess.getSelectionStart();
        end = editorAccess.getSelectionEnd();
        
        // get text from original selection
        createNewDocumentFragmentInContext = controller.createNewDocumentFragmentInContext(editorAccess.getSelectedText(), end);
        deleteWasPerformed = controller.delete(start, end);
        if (deleteWasPerformed) {
          caretPosition = authorAccess.getEditorAccess().getCaretOffset();
          // change the name of the element that will wrap the text
          controller.insertXMLFragment('<' + ELEMENT_NAME + '/>', caretPosition);
          // insert the original selected text.
          controller.insertFragment(caretPosition + 1, createNewDocumentFragmentInContext);
        }
      } finally {
        controller.endCompoundEdit();
      }
    }
}