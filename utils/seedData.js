// small helper used by seeds/seed.js
exports.slugify = (str) =>
  String(str).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
