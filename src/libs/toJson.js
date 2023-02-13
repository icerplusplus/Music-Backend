export function toJSON(obj) {
  let processed = new WeakMap();
  if (processed.has(obj)) {
    return;
  }

  let json = {};
  processed.set(obj, true);

  for (let key in obj) {
    let value = obj[key];
    if (typeof value === "object") {
      value = toJSON(value);
    }
    json[key] = value;
  }

  return json;
}
