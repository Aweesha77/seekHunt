export const catchAsyncErrors = (theFunction) => {       //catchAsyncErrors is a function that takes a function as an argument
    return (req, res, next) => {
      Promise.resolve(theFunction(req, res, next)).catch(next); //theFunction is a function that takes three parameters: req, res, and next. This function will be used to handle errors in the application.
    };
  };
  