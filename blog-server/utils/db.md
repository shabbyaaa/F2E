This is a shortcut for the pool.getConnection() -> connection.query() -> connection.release() code flow.
Using pool.getConnection() is useful to share connection state for subsequent queries.
This is because two calls to pool.query() may use two different connections and run in parallel.
This is the basic structure:

The pool will emit a release event when a connection is released back to the pool.
This is called after all release activity has been performed on the connection,
so the connection will be listed as free at the time of the event.

```js
var mysql = require('mysql');
var pool  = mysql.createPool(...);

pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!

  // Use the connection
  connection.query('SELECT something FROM sometable', function (error, results, fields) {
    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });
});
```