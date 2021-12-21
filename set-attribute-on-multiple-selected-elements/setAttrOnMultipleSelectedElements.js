function doOperation() {
    selectionIntervals = authorAccess.getEditorAccess().getAuthorSelectionModel().getSelectionIntervals();
    for (i = 0; i < selectionIntervals.size(); i++) {
      contentInterval = selectionIntervals.get(i);
      node = authorAccess.getDocumentController().getNodeAtOffset(contentInterval.getStartOffset() + 1);
      authorAccess.getDocumentController().setAttribute("translate", new Packages.ro.sync.ecss.extensions.api.node.AttrValue("no"), node);
    }
}