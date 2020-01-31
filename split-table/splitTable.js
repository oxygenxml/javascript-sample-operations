function doOperation(){
    current = authorAccess.getDocumentController().getNodeAtOffset(authorAccess.getEditorAccess().getCaretOffset());
    tableNode = null;
    rowNode = null;
    while(current != null) {
      if(tableNode == null && ("table".equals(current.getName()) || "informaltable".equals(current.getName()))) {
        tableNode = current;
      }
      if(rowNode == null && ("row".equals(current.getName()) || "strow".equals(current.getName()))) {
        rowNode = current;
      }
      current = current.getParent();
    }
    if(tableNode != null && rowNode != null) {
      //Create a fragment starting from the row to the end of the table
      secondTable = authorAccess.getDocumentController().createDocumentFragment(rowNode.getStartOffset(), tableNode.getEndOffset());
      //Delete the content from the first table.
      authorAccess.getDocumentController().delete(rowNode.getStartOffset(), tableNode.getEndOffset() - 1);

      // change ID, if present
      nodes = secondTable.getContentNodes();
      if(nodes != null && !nodes.isEmpty()){
      authorNode = nodes.get(0);
      if (authorNode instanceof Packages.ro.sync.ecss.extensions.api.node.AuthorElement) {
          authorNode.removeAttribute("id");
        }
      }

      colspecs = null;
      theadElem = null;
      if (tableNode instanceof Packages.ro.sync.ecss.extensions.api.node.AuthorElement) {
        tgroup = tableNode.getElementsByLocalName("tgroup");
        if (tgroup != null && tgroup.length > 0) {
          colspecs = tgroup[0].getElementsByLocalName("colspec");
          theads = tgroup[0].getElementsByLocalName("thead");
          if (theads != null && theads.length > 0) {
            theadElem = theads[0];
          }
        }
      }

      //Insert the second table.
      insertOffset = tableNode.getEndOffset() + 1;
      authorAccess.getDocumentController().insertFragment(insertOffset, secondTable);

      // insert colspecs and thead
      var fragmentToAppend = null;
      if((colspecs != null && colspecs.length > 0) && theadElem != null){
        fragmentToAppend = authorAccess.getDocumentController().createDocumentFragment(colspecs[0].getStartOffset(), theadElem.getEndOffset());
      } else if((colspecs != null && colspecs.length > 0) && theadElem == null){
        fragmentToAppend = authorAccess.getDocumentController().createDocumentFragment(colspecs[0].getStartOffset(), colspecs[colspecs.length - 1].getEndOffset());
      } else if((colspecs == null || colspecs.length == 0) && theadElem != null){
        fragmentToAppend = authorAccess.getDocumentController().createDocumentFragment(theadElem.getStartOffset(), theadElem.getEndOffset());
      }

      if(fragmentToAppend != null){
        authorAccess.getDocumentController().insertFragment(insertOffset + 2, fragmentToAppend);
      }


    }
}
