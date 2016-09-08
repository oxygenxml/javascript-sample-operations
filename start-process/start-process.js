function doOperation(){
    //Execute a command line which opens the Notepad application, the current folder is the project folder.
    Packages.java.lang.Runtime.getRuntime().exec("notepad.exe", null, new Packages.java.io.File(new Packages.java.net.URL("${pdu}").toURI()));
}
