let additionMap: { [k: string]: { [k: string]: { carry: boolean, res: string, R?: { res: string, r: string } } } } = {};
for (let i = 0; i < 10; i++) {
  additionMap[`${i}`] = { '0': { carry: false, res: `${i}` } };
  for (let j = 1; j < 10; j++) {
    let res = i + j;
    additionMap[`${i}`][`${j}`] = { carry: res > 9 ? true : false, res: `${res}`, R: res > 9 ? { res: `${res - 10}`, r: `1` } : undefined };
  }
}

function addition(a: string, b: string) {
  if (!(isNaN(Number(a)) || isNaN(Number(b)))) {
    let aa: string[] = a.split('');
    let ba: string[] = b.split('');
    while (aa.length - (aa.indexOf('.') + 1) !== ba.length - (ba.indexOf('.') + 1)) {
      if (aa.length - (aa.indexOf('.') + 1) > ba.length - (ba.indexOf('.') + 1)) {
        ba.push('0');
      } else {
        aa.push('0');
      }
    }
    let maxLength = Math.max(aa.length, ba.length) + 1;
    while (aa.length !== maxLength) {
      aa.unshift('0');
    }
    while (ba.length !== maxLength) {
      ba.unshift('0');
    }
    let res: string[] = []
    for (let i = maxLength - 1; i > -1; i--) {
      let n1 = aa[i];
      let n2 = ba[i];
      let r1 = res[i];
      if (n1 === '.') {
        res[i] = '.';
        continue;
      }
      if (additionMap[n1][n2].carry) {
        if (r1) {
          let tmp = additionMap[n1][n2].R!.res;
          let R1 = additionMap[n1][n2].R!.r;
          if (additionMap[r1][tmp].carry) {
            let R2 = additionMap[r1][tmp].R!.r;
            res[i] = additionMap[r1][tmp].R!.res;
            if (additionMap[R1][R2].carry) {
              if (aa[i - 2] !== '.') {
                res[i - 2] = additionMap[R1][R2].R!.r;
              } else {
                res[i - 3] = additionMap[R1][R2].R!.r;
              }
              if (aa[i - 1] !== '.') {
                res[i - 1] = additionMap[R1][R2].R!.res;
              } else {
                res[i - 2] = additionMap[R1][R2].R!.res;
              }
            } else {
              if (aa[i - 1] !== '.') {
                res[i - 1] = additionMap[R1][R2].R!.res;
              } else {
                res[i - 2] = additionMap[R1][R2].R!.res;
              }
            }
          } else {
            if (aa[i - 1] !== '.') {
              res[i - 1] = additionMap[n1][n2].R!.r;
            } else {
              res[i - 2] = additionMap[n1][n2].R!.r;
            }
            res[i] = additionMap[r1][tmp].res;
          }
        } else {
          if (aa[i - 1] !== '.') {
            res[i - 1] = additionMap[n1][n2].R!.r;
          } else {
            res[i - 2] = additionMap[n1][n2].R!.r;
          }
          res[i] = additionMap[n1][n2].R!.res;
        }
      } else {
        if (r1) {
          let tmp = additionMap[n1][n2].res;
          if (additionMap[r1][tmp].carry) {
            res[i] = additionMap[r1][tmp].R!.res;
            if (aa[i - 1] !== '.') {
              res[i - 1] = additionMap[r1][tmp].R!.r;
            } else {
              res[i - 2] = additionMap[r1][tmp].R!.r;
            }
          } else {
            res[i] = additionMap[r1][tmp].res;
          }
        } else {
          res[i] = additionMap[n1][n2].res;
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