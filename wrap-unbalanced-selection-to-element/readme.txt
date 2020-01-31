This action will wrap the selected text from Author page to the element you want.

Steps to install and use this action:
1. In the Document Type Association Preferences page, edit your framework extension.
2. Go to the Author->Actions tab and create a new action with the ID wrap.selection.to.element. 
Use the predefined JSOperation to invoke a custom Javascript code (choose ro.sync.ecss.extensions.commons.operations.JSOperation 
as your "Operation").
3. Set as value to the script parameter of the operation the Javascript code from the "wrap-unbalanced-selection-to-element.js" file.
4. Change the value of the "ELEMENT_NAME" variable to the value you want.
5. Go to the Author->Toolbar tab and use the Current actions panel to add the action with ID wrap.selection.to.element to the toolbar
or contextual menu.
6. When editing a file, selecting elements and pressing the toolbar action for wrapping selection now calls your custom JS action.
7. You can add keyboard shortcuts for all custom actions either when defining them or from the Oxygen main menu Preferences->Menu Shortcut Keys page.
