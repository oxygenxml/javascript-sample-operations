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
      //Insert the second table.
      authorAccess.getDocumentController().insertFragment(tableNode.getEndOffset() + 1, secondTable);
    }
}
