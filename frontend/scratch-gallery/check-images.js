import http from 'http';
import https from 'https';
import fs from 'fs';

function getJpgSize(buffer) {
  let i = 4;
  while (i < buffer.length) {
    const marker = buffer.readUInt16BE(i);
    i += 2;
    if (marker === 0xFFC0 || marker === 0xFFC2) {
      i += 3; // skip length & precision
      const height = buffer.readUInt16BE(i);
      const width = buffer.readUInt16BE(i + 2);
      return { width, height };
    } else {
      const length = buffer.readUInt16BE(i);
      i += length;
    }
  }
  return null;
}

const urls = [
  'https://i.ibb.co/bjM3F1nc/DSC07634.jpg',
  'https://i.ibb.co/z3mt2BN/MER01311-1.jpg',
  'https://i.ibb.co/1YTmMWSD/L-B-559.jpg',
  'https://i.ibb.co/ymtq2w2M/MER-5965-2.jpg'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => {
        chunks.push(chunk);
        // We only need the first 65536 bytes for JPEG headers
        const buf = Buffer.concat(chunks);
        if (buf.length > 65536) {
          res.destroy();
        }
      });
      res.on('close', () => {
        const buf = Buffer.concat(chunks);
        try {
          const size = getJpgSize(buf);
          resolve({ url, ...size });
        } catch (e) {
          resolve({ url, error: e.message });
        }
      });
    });
  });
}

const results = await Promise.all(urls.map(checkUrl));
console.log(JSON.stringify(results, null, 2));
