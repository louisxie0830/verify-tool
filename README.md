# verify-tool

 
```
import Verify from 'Verify'
const valid = new Verify();

validCoi.data('1234').isRequired('Please specify required fields')
if(!valid.pass) {
    console.log(valid.errorMessage);
}

or 

import Verify from 'Verify'
const valid = new Verify('1234');
valid.isRequired('Please specify required fields');

if(!valid.pass) {
    console.log(valid.errorMessage);
}
```


