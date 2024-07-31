import data from "./data.json";

export default function handler(req, res) {
  if (req.method === 'GET') {
    const arts = [
      ...new Set(
        [].concat(
          ...data.arts.filter((art) => art.publish == true).map((work) => work)
        )
      ),
    ];
    return res.status(200).json(arts)
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
