import data from '../../../data/data.json'

export default function handler(req, res) {
    const arts = [...new
        Set([].concat(...data.arts.filter(art => art.publish == true).map(work => work)))
    ]
    res.status(200).json(arts)
}