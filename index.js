import fs from 'node:fs/promises'
import fetch from 'node-fetch'
import pLimit from 'p-limit'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const cl = console.log
const limit = pLimit(10)
const cids = (await fs.readFile('./cids.txt', 'utf-8')).split('\n').filter(Boolean)
const codes = {}

const LASSIE_PORT=8989
//const protocol = 'bitswap'
const protocol = 'http'

const promises = cids.map(cid => {
    return limit(async () => {
        const url = `http://localhost:${LASSIE_PORT}/ipfs/${cid}?format=car&protocols=${protocol}`
        const res = await fetch(url)
        if (res.status != 200) {
            cl(cid, res.status)
        }
        codes[res.status] = (codes[res.status] ?? 0) + 1

        for await (const chunk of res.body) {
            
        }
    })
})

await Promise.all(promises)
cl(protocol, codes)
