function doOperation() {
    //Split the current paragraph
    caretOffset = authorAccess.getEditorAccess().getCaretOffset();
    sectionAtCaret = null;
    //Maybe we are in an XML tag which is a child or descendant of a <p>
    currentNode = authorAccess.getDocumentController().getNodeAtOffset(caretOffset);
    while (currentNode != null) {
        if ("section".equals(currentNode.getName())) {
            //Found it
            sectionAtCaret = currentNode;
            break;
        }
    }
    if (sectionAtCaret != null) {
        //The caret is inside a section.
        rightSplit = null;
        if (caretOffset < sectionAtCaret.getEndOffset()) {
            rightSplit = authorAccess.getDocumentController().createDocumentFragment(caretOffset,
            //The end offset is inclusive so the created fragment will actually be a <section> holding inside it the content
            sectionAtCaret.getEndOffset());
            if (rightSplit != null) {
                //The right splitted <section>
                xmlToInsert = authorAccess.getDocumentController().serializeFragmentToXML(rightSplit);
                //Insert the new content
                authorAccess.getDocumentController().insertXMLFragment(xmlToInsert, sectionAtCaret.getEndOffset() + 1);
                //Find the newly inserted section, we need to change its ID
                newSection = authorAccess.getDocumentController().getNodeAtOffset(sectionAtCaret.getEndOffset() + 2);
                //Remove the ID from it, it is now a duplicate ID
                authorAccess.getDocumentController().removeAttribute("id", newSection);
                //Insert an empty title inside it.
                authorAccess.getDocumentController().insertXMLFragment("<title/>", newSection.getStartOffset() + 1);
                if (rightSplit != null) {
                    //Delete the old content from the initial section
                    authorAccess.getDocumentController().delete(caretOffset, sectionAtCaret.getEndOffset() - 1);
                }
                //Place the caret in the newly created section inside the title.
                authorAccess.getEditorAccess().setCaretPosition(newSection.getStartOffset() + 2);
            }
        }
    }
}
