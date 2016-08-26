function doOperation(){
 performXQueryUpdate("replace value of node ./@id with 'newID'");
}

function performXQueryUpdate(xqueryString){
         // Create an XQuery update enable processor.
        queryTransformer  = authorAccess.getXMLUtilAccess().createXQueryUpdateTransformer(
            new Packages.javax.xml.transform.stream.StreamSource(new Packages.java.io.StringReader(xqueryString)), 
            null);        
        // Create a special author model source.
        s = new Packages.ro.sync.ecss.dom.wrappers.mutable.AuthorSource(authorAccess);
        writer = new Packages.java.io.StringWriter();
        result = new Packages.javax.xml.transform.stream.StreamResult(writer);        
        queryTransformer.transform(s, result);
}
