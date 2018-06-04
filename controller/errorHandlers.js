/*
  Not Found Error Handler
  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  };

exports.developmentErrors = (err, req, res) => {
    err.stack = err.stack || '';
    const errorDetails = {
      message: err.message,
      status: err.status,
      stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };
    res.status(err.status || 500);
    res.format({
      // Based on the `Accept` http header
      'text/html': () => {
        res.render('error', errorDetails);
      }, // Form Submit, Reload the page
      'application/json': () => res.json(errorDetails) // Ajax call, send JSON back
    });
  };

  exports.productionErrors = (err, req, res) => {
    res.status(err.status || 500);
    res.render('hello', {
      message: err.message,
      error: {}
    });
  };