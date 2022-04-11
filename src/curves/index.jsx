import hilbertCurve from "./hilbert";
import mooreCurve from "./moore";
import peanoCurve from "./peano";

const CURVE_MAPPING = {
    hilbert: hilbertCurve,
    moore: mooreCurve,
    peano: peanoCurve
}

export default CURVE_MAPPING;
