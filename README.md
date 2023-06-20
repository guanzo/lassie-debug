start lassie daemon
```
$ lassie daemon --vv -p 8989
```

run script
```sh
$ npm i
$ node index.js
```

check lassie daemon stdout for `CAR root CID mismatch`

only occurs for `protocols=http`, `protocols=bitswap` works fine.
