const hilbertCurve = (X0, Y0, Xi, Xj, Yi, Yj, Level) => {
    const path = [];
    const hilbert = (x0, y0, xi, xj, yi, yj, level) => {
        if (level <= 0) {
            path.push([x0 + (xi + yi) / 2, y0 + (xj + yj) / 2]);
        } else {
            hilbert(x0,                   y0,                   yi / 2,  yj / 2,  xi / 2,  xj / 2, level - 1)
            hilbert(x0 + xi / 2,          y0 + xj / 2,          xi / 2,  xj / 2,  yi / 2,  yj / 2, level - 1)
            hilbert(x0 + xi / 2 + yi / 2, y0 + xj / 2 + yj / 2, xi / 2,  xj / 2,  yi / 2,  yj / 2, level - 1)
            hilbert(x0 + xi / 2 + yi,     y0 + xj / 2 + yj,    -yi / 2, -yj / 2, -xi / 2, -xj / 2, level - 1)
        }
    }

    hilbert(X0, Y0, Xi, Xj, Yi, Yj, Level);
    return path;
}

export default hilbertCurve;

