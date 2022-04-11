const get =
  <O, P extends keyof O>(property: P) =>
  (object: O) =>
    object[property];

export default get;
