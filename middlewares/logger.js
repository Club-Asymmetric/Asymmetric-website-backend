export default (namespace) => (req, res, next) => {
  console.log(namespace, req.path, req.method);
  next();
};
