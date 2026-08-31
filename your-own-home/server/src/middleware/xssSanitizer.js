/**
 * Recursively strips HTML/script tags from string values in req.body,
 * req.query, and req.params. Replaces the unmaintained `xss-clean`
 * package with a small, dependency-free equivalent — sufficient here
 * because output is also rendered safely by React (which escapes by
 * default) on the frontend. This is defense-in-depth, not the only layer.
 */
const sanitizeValue = (value) => {
  if (typeof value === 'string') {
    return value.replace(/<[^>]*>?/gm, '').trim();
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value && typeof value === 'object') {
    const clean = {};
    for (const key of Object.keys(value)) {
      clean[key] = sanitizeValue(value[key]);
    }
    return clean;
  }
  return value;
};

const xssSanitizer = (req, res, next) => {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.params) req.params = sanitizeValue(req.params);
  // req.query is a getter-only property on some Express/Node versions;
  // mutate keys in place rather than reassigning the object itself.
  if (req.query) {
    for (const key of Object.keys(req.query)) {
      req.query[key] = sanitizeValue(req.query[key]);
    }
  }
  next();
};

module.exports = xssSanitizer;
