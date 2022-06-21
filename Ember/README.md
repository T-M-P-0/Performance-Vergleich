# Ember

## Setup

* Create component: `ember generate component mandelbrot` 


Adding bootstrap:

`ember install ember-bootstrap`

## Mandelbrot Component

https://guides.emberjs.com/v3.4.0/components/the-component-lifecycle/#toc_formatting-component-attributes-with-didreceiveattrs

Lifecycle events:

* willUpdate
* willRender
* didUpdate
* didRender

[https://api.emberjs.com/ember/3.4/classes/Component/events/didInsertElement?anchor=didInsertElement]
Called when the element of the view has been inserted into the DOM. Override this function to do any set up that requires an element in the document body.

After a component successfully renders its backing HTML element into the DOM, it will trigger its didInsertElement() hook.

* Um die Elemente der Liste bei Test1 erneut zu rendern müssen wir den Array

npm run buld 

npm run start
Restten.

Tests:

* Updaten von Binding
* Updaten von CSS

AVG = 203

# Production

ember build --environment=production

