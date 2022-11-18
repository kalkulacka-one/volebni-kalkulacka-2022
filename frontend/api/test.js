export default function handler(req, res) {
  const { name = 'World' } = req.query;
  return res.send(`Hello ${name}!`);
}
