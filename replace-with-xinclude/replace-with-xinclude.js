function doOperation(){
    if(authorAccess.getEditorAccess().hasSelection()){
        selStart = authorAccess.getEditorAccess().getSelectionStart();
        selEnd = authorAccess.getEditorAccess().getSelectionEnd();
        toMove = authorAccess.getDocumentController().createDocumentFragment(selStart, selEnd - 1);
        xmlToMove = authorAccess.getDocumentController().serializeFragmentToXML(toMove);
        //Delete the selection
        authorAccess.getDocumentController().delete(selStart, selEnd - 1);
        currentFileURL = authorAccess.getEditorAccess().getEditorLocation();
        currentFile = authorAccess.getUtilAccess().locateFile(currentFileURL); 
        targetFile =
            authorAccess.getWorkspaceAccess().chooseFile(currentFile, "Save As - " + currentFile.getName(),
                ["XML"], "XML Files", true);
        if (targetFile !=null) {
          //Write to file
          fw = new Packages.java.io.FileWriter(targetFile);
          fw.write(xmlToMove);
          fw.close();
          //Insert a reference...
          authorAccess.getDocumentController().insertXMLFragment(
              "<xi:include href=\"" + authorAccess.getUtilAccess().makeRelative(currentFileURL, targetFile.toURI().toURL()) + "\" xmlns:xi=\"http://www.w3.org/2001/XInclude\"/>", authorAccess.getEditorAccess().getCaretOffset());
        }
        else {
          // User canceled, undo modifications a little bit later so that the operation finishes...
         undoRunnable = {
           run: function () {
           authorAccess.getDocumentController().getUndoManager().undo();
           }
         }
        Packages.javax.swing.SwingUtilities.invokeLater(new Packages.java.lang.Runnable(undoRunnable));
        } 
 }
}
