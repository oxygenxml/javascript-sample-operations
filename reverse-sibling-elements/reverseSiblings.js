function doOperation() {
    node = authorAccess.getEditorAccess().getFullySelectedNode();
    if(node == null) {
      node = authorAccess.getDocumentController().getNodeAtOffset(authorAccess.getEditorAccess().getCaretOffset());
    }
    contentNodes = node.getContentNodes();
    frags = new Packages.java.util.ArrayList();
    for (i = 0; i < contentNodes.size(); i++) {
      frags.add(authorAccess.getDocumentController().createDocumentFragment(contentNodes.get(i), true));
    }
    authorAccess.getDocumentController().delete(node.getStartOffset() + 1, node.getEndOffset() - 1);
    for (i = 0; i < frags.size(); i++) {
      authorAccess.getDocumentController().insertFragment(node.getStartOffset() + 1, frags.get(i));
    }
}
