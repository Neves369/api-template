const catchAsync = (fn: (arg0: any, arg1: any, arg2: any) => any) => (req: any, res: any, next: (arg0: any) => any) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
  
export default catchAsync;
  