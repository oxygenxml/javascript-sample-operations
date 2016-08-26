# javascript-sample-operations
Sample Javascript-based Author Operations.

For each XML document edited in the Oxygen Author editing mode you can define a framework configuration in the "Document Type Association" preferences page. In the framework associations besides being able to specify a CSS used for rendering:

http://blog.oxygenxml.com/2014/08/the-oxygen-sdk-part-2-frameworks.html

you can also construct Author actions and mount them on the main menus, toolbars or contextual menus. 
Each Author action is based on one or more Author operations. 
Among the default available Author operations:

https://www.oxygenxml.com/doc/versions/18.0/ug-editor/topics/dg-default-author-operations.html

there is a JSOperation which can be used to execute small pieces of Javascript code which use the Author API to make complex changes to the XML.

This project has various samples of using JSOperations to perform various changes to the XML opened in the Author editing mode.


