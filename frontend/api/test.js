export default function handler(req, res) {
  const { name = 'World2' } = req.query;
  return res.send(`Hello ${name}!`);
}
