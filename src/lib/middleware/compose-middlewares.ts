export const composeMiddlewares = (...middlewares: any[]) => {
  return (handler: any) => {
    return middlewares.reduce((acc, middleware) => {
      return middleware(acc);
    }, handler);
  };
};
