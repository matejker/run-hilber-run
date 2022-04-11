const peanoCurve = (X0, Y0, Xi, Xj, Yi, Yj, Level) => {
    const path = [];
    const peano = (x0, y0, xi, xj, yi, yj, level) => {
        if (level <= 0) {
            path.push([x0 + (xi + yi) / 2 , y0 + (xj + yj) / 2 ]);
        } else {
            peano(x0                  , y0                  ,  xi / 3,  xj / 3,  yi / 3,  yj / 3, level - 1) // 0
            peano(x0 + xi / 3 + yi / 3, y0 + xj / 3 + yj / 3, -xi / 3, -xj / 3,  yi / 3,  yj / 3, level - 1) // 1
            peano(x0      + 2 * yi / 3, y0      + 2 * yj / 3,  xi / 3,  xj / 3,  yi / 3,  yj / 3, level - 1) // 2

            peano(x0 + xi / 3 + yi    , y0 + xj / 3 + yj    ,  xi / 3,  xj / 3, -yi / 3, -yj / 3, level - 1) // 3
            peano(x0 + 2*xi/3 + 2*yi/3, y0 + 2*xj/3 + 2*yj/3, -xi / 3, -xj / 3, -yi / 3, -yj / 3, level - 1) // 4
            peano(x0 + xi / 3 + yi / 3, y0 + xj / 3 + yj / 3,  xi / 3,  xj / 3, -yi / 3, -yj / 3, level - 1) // 5

            peano(x0 + 2 * xi / 3     , y0 + 2 * xj / 3     ,  xi / 3,  xj / 3,  yi / 3,  yj / 3, level - 1) // 6
            peano(x0 + xi     + yi / 3, y0 + xj     + yj / 3, -xi / 3, -xj / 3,  yi / 3,  yj / 3, level - 1) // 7
            peano(x0 + 2*xi/3 + 2*yi/3, y0 + 2*xj/3 + 2*yj/3,  xi / 3,  xj / 3,  yi / 3,  yj / 3, level - 1) // 8
        }
    }

    peano(X0, Y0, Xi, Xj, Yi, Yj, Level);
    return path;
}

export default peanoCurve;