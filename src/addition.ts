let additionMap: { [k: string]: { [k: string]: { carry: boolean, res: string, R?: { res: string, r: string } } } } = {};
for (let i = 0; i < 10; i++) {
  additionMap[`${i}`] = { '0': { carry: false, res: `${i}` } };
  for (let j = 1; j < 10; j++) {
    let res = i + j;
    additionMap[`${i}`][`${j}`] = { carry: res > 9 ? true : false, res: `${res}`, R: res > 9 ? { res: `${res - 10}`, r: `1` } : undefined };
  }
}
// import additionMap from "./data/additionmap";
function addition(a: string, b: string) {
  if (!(isNaN(Number(a)) || isNaN(Number(b)))) {
    let aa = a;
    let ba = b;
    const fillLena = aa.slice(aa.indexOf('.')).length;
    const fillLenb = ba.slice(ba.indexOf('.')).length;
    let c = fillLena - fillLenb;
    let d = fillLenb - fillLena
    const maxLena = c < 0 ? d + aa.length : aa.length;
    const maxLenb = d < 0 ? c + ba.length : ba.length;
    aa = aa.padEnd(maxLena, '0');
    ba = ba.padEnd(maxLenb, '0');
    let maxLength = Math.max(aa.length, ba.length) + 1;
    aa = aa.padStart(maxLength, '0');
    ba = ba.padStart(maxLength, '0');
    let res: string[] = []
    for (let i = maxLength - 1; i > -1; i--) {
      let n1 = aa[i];
      let n2 = ba[i];
      let r1 = res[i];
      if (n1 === '.') {
        res[i] = '.';
        continue;
      }
      let addRes = additionMap[n1][n2];
      if (addRes.carry) {
        if (r1) {
          let tmp = addRes.R!.res;
          let R1 = addRes.R!.r;
          let tmpRes = additionMap[r1][tmp];
          if (tmpRes.carry) {
            let R2 = tmpRes.R!.r;
            res[i] = tmpRes.R!.res;
            let R = additionMap[R1][R2];
            let resR = R.res;
            let RR = R.R!.r;
            let last = aa[i - 1];
            let lastLast = aa[i - 2];
            if (R.carry) {
              if (lastLast !== '.') {
                res[i - 2] = RR;
              } else {
                res[i - 3] = RR;
              }
              if (last !== '.') {
                res[i - 1] = resR;
              } else {
                res[i - 2] = resR;
              }
            } else {
              if (last !== '.') {
                res[i - 1] = resR;
              } else {
                res[i - 2] = resR;
              }
            }
          } else {
            if (aa[i - 1] !== '.') {
              res[i - 1] = addRes.R!.r;
            } else {
              res[i - 2] = addRes.R!.r;
            }
            res[i] = tmpRes.res;
          }
        } else {
          if (aa[i - 1] !== '.') {
            res[i - 1] = addRes.R!.r;
          } else {
            res[i - 2] = addRes.R!.r;
          }
          res[i] = addRes.R!.res;
        }
      } else {
        if (r1) {
          let tmp = additionMap[n1][n2].res;
          let tmpRes = additionMap[r1][tmp]
          if (tmpRes.carry) {
            res[i] = tmpRes.R!.res;
            if (aa[i - 1] !== '.') {
              res[i - 1] = tmpRes.R!.r;
            } else {
              res[i - 2] = tmpRes.R!.r;
            }
          } else {
            res[i] = tmpRes.res;
          }
        } else {
          res[i] = addRes.res;
        }
      }
    }
    res[0] === '0' ? res.shift() : '';
    return res.join('');
  } else {
    throw new Error('NaN');
  }
}
export default addition;
module.exports = addition;