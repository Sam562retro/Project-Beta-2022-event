# Accessibility WebPage
It is a simple plugin for help you implement feature of the acessibility in your web page.

# How to use

To install use the command:

```
npm install accessibility-web-page
```

Clone it and you will see that exist a page index.html (inside folder `sample`) with a sample. In this page exist three button:

* A+ : button for increase the font size. This button need an *id="increase-plugin-ac"*
* A : button for reset font-size. This button need an *id="normal-plugin-ac"*
* A- : button for decrease the font size. This button need an *id="decrease-plugin-ac"*

So, you need create three button with ids above for control the font size and for indicate for the script wich elements you want increase/decrease the font size with the class CSS `.accessibility-plugin-ac` in the elements HTML. See a example below: 

```
  <p class="accessibility-plugin-ac">
      Increase/decrease font size!
  </p>

  <p>
      Nothing here <p>
  </p>
```
For use the plugin you need only the script `accessibility.js` that is in the folder `plugin`. 