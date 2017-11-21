function doOperation() {
    keys = Packages.java.lang.reflect.Array.newInstance(java.lang.String, 3);
    keys[0] = "k1";
    keys[1] = "k2";
    keys[2] = "k3";
    //Ask user for new value for key attribute.
    newKeyValue = Packages.javax.swing.JOptionPane.showInputDialog
    (null, "Input key value",
        "Key Value",
        Packages.javax.swing.JOptionPane.QUESTION_MESSAGE, 
        null, 
        keys, 
        keys[0]);
    if (newKeyValue != null) {
        authorAccess.getDocumentController().insertXMLFragment
        ("<part key='" + newKeyValue + "' count='' pname=''/>", authorAccess.getEditorAccess().getCaretOffset());
    }
}
