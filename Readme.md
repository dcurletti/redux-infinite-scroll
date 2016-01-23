| Props  	|  Type 	|  Required | Default 	| Description  	|
|---	|---	|---	|---	|--- |
| elementIsScrollable  	| bool  	| no |  true 	| Defines whether the div will have a fixed height and listens to the div's overflow event or instead have a non-fixed height and listen to the window scroll event
| containerHeight  	|  integer or string 	| no  	| '100%' | Sets an inline style on the height of the topmost div.
| threshold | integer | no | 100 | The number of pixels 
| hasMore  	|  bool 	| no  	| true  	| Whether there are more items waiting to be displayed
| loadingMore |  bool 	| no  	|false| A prop that should be set to `true` by the parent component whenever the `loadMore` function gets invoked, and then toggled to `false` once that function has finished updating the `items` prop.
| loader  	|  any | no|  Loading... 	| The value of this prop gets injected as the last element of the parent div when `hasMore` `loadingMore` and `showLoader` are all `true`.
| showLoader  	| bool  	| true  	|   	| Whether to show the loader when the `loadingMore` property is `true`
| loadMore  	|  function | yes  |undefined| The function is called when the component has reached the `threshold` and `hasMore` is true.
| items | array  	|yes|undefined| The array of elements waiting to be rendered.  Normally each item in the array is a React component.
