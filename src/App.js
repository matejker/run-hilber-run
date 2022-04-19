import React from 'react';
import 'katex/dist/katex.min.css';
import vectors from './img/vectors.png';
import github from './img/github.png';
import hilbert_strava from './img/hilbert_strava.png';
import peano_strava from './img/peano_strava.png';
import { InlineMath, BlockMath } from 'react-katex';
import MOORE_DIEGO from './routes/moore-diego';
import HILBERT_DIEGO from './routes/hilbert-diego';
import PEANO_DIEGO from './routes/peano-diego';
import RouteMap from './components/RouteMap';
import EditableMapWrapper from './components/EditableMap';


export default function App() {
    const positions = [[32.71, -117.16], [32.72, -117.15]];
    return (<>
        <div id="main">
        <h1>Run, Hilbert, Run!</h1>
        <em className="description">
            On Space-Filling curves, running on the grid street plans and a turbo-tourism.
        </em>
        <h2>Chapters</h2>
        <ol>
            <li><a href="#turbo-tourism">On turbo tourism</a></li>
            <li><a href="#dots">Connecting dots</a></li>
            <li><a href="#sfc">Space-filling curves</a></li>
            <li><a href="#hilbert">Hilbert Curve</a></li>
            <ul>
                <li><a href="#arithmetic">Arithmetic representation of Hilbert Curve</a></li>
            </ul>
            <li><a href="#moore">Moore Curve</a></li>
            <li><a href="#peano">Peano Curve</a></li>
            <li><a href="#app"><strong>Run your own Space-Filling Curve</strong></a></li>
        </ol>
        <h2 id="turbo-tourism">On turbo tourism</h2>
        <p>Just <em>before</em> the COVID-19 pandemic broke out in Europe, I managed to visit Paris for the first time.
        Even though the center of Paris is relatively small, it can take days to see all the main attractions.
        However, I like running, so I decided to run a nearly half-marathon distance covering a decent chunk of
        the city center. I called it turbo-tourism.</p>

        <p>My first trip to a novel place, after the pandemic ended<sup><a href="#covid">1)</a></sup>,
        was to San Diego, California <sup><a href="#strava">2)</a></sup>. However, as a person who grew up and lived in various European
        cities which all have this organic onion-looking street structure, I am amazed with US grid street plans and
        how the straight street lines are enforced on the natural landscape of the city area.</p>

        <p>In my previous project, I looked on the <a href="http://www.everystreetchallenge.com/">#everystreet challenge</a> and
        how to visit every street of a given
        metropolitan area. While visiting every single street provides a detailed image of some area, but it
        requires <em>lots</em> of time and energy to do it.</p>

        <h2 id="dots">Connecting dots</h2>
        <p><em>How to get to know a newly visited US city and not to visit every single street of the grid street plan?</em></p>

        <p>Obviously, running around some area via a circular route gives us a reasonable essence of the city, but it
        will bypass a fair amount of the city. Imagine we would like to visit every single crossroad of some city chunk.
        Obvious and trivial solution is to run a snake-like route which goes through the grid in a row by row or a column
        by column pattern. Starting from one corner to the diagonal opposite corner.
        For <a href="https://www.youtube.com/watch?v=3s7h2MHQtxc">some not obvious reasons</a> such a
        route doesn’t scale up nicely to higher and lower levels of precision. Much nicer solution would be a path which
        self-similarly fills the space with any given precision.</p>

        <h2 id="sfc">Space-filling curves</h2>
        <p>In mathematical analysis, there is a topic called Space-filling curves, as the name says, is related to one
        dimensional curves which could fill an entire space. The formal definition says:</p>

        <p>
            <strong>Definition:</strong> A curve <InlineMath>{`C: [0,1] \\rightarrow R^n`}</InlineMath> is a continuous
            function on interval [0, 1].  When the curve’s image C([0, 1])
            has <a href="https://en.wikipedia.org/wiki/Jordan_measure">Jordan content</a> larger than 0, it is called
            a <em>Space-Filling Curve </em> (SFC).
        </p>

        <p>In other words, it means that a one dimensional object can fill a two or more dimensional object.
        It was just another mathematical and logical paradox which shook the foundations of 19<sup>th</sup> century mathematics.
        It quickly became a hot topic picked up with math superstars such as Hilbert, Peano and Moore [1, 2].</p>

        <h2 id="hilbert">Hilbert Curve</h2>
        <p>First and most popular curve type is Hilbert Curve, which divides the area into four equal subquadrands in
        each step and connects the middle point of each quadrant. In the first iteration, a single inverted “U”
        shape is drawn. In the second, each of the quadrants is splitted into four new smaller ones and the original
        “U” shape is being rotated or flipped in each quadrant. However the original shape is used in every iteration,
        the curve forms itself a fractal.</p>

        <h3 id="arithmetic">Arithmetic representation of Hilbert Curve</h3>
        <p>There are two main ways to draw any SFC. First is using a grammar based description which uses a set of
        commands which are perfect for Turtle like programs. Second one, a more rigorous way is to use arithmetic.</p>

        <p>Firstly, we need to point out that the parametrization of the curve C
        for <InlineMath>{`t \\in [0,1]`}</InlineMath> follows a lines between the points on sub-intervals of the original
        [0, 1]. However, we are splitting the original square into four subquadrands it would be handy to denote values
        t in quaternary numbers, e.g. <InlineMath>{`\\frac{1}{4}=0.25=0_4.1`}</InlineMath>.</p>

        <p>Secondly, even though street grid of San Diego is almost perfectly north to south and east to west. We might
        need to adjust the grid to possible angles. So we introduce that possibility of different orientations by
        considering two vectors (<InlineMath>{`\\vec{v_1}, \\vec{v_2}`}</InlineMath>) which defines the area. [4]</p>

        <div className="center"><img src={ vectors } alt="Vectors" width="500" /></div>

        <p>However, the SFC are fractals - one shape being used in a rotated or flipped way, we can represent each
        of those transformations as rotational matrices <sup><a href="#transform-group">3)</a></sup>. In addition as in each iteration the sub curves are shifted
        into four new corners and scaled down by ½ factor. [2]</p>
        <ul>
        <BlockMath>{`H_0 =
        \\begin{pmatrix}
        0 & \\frac{1}{2} \\\\
        \\frac{1}{2} & 0 \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        0 \\\\
        0 \\\\
        \\end{pmatrix}`}</BlockMath>

        <li>First sub curve is rotated by 90° to the right</li>

        <BlockMath>{`H_1 =
        \\begin{pmatrix}
        \\frac{1}{2} & 0 \\\\
        0 & \\frac{1}{2} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        0 \\\\
        \\frac{1}{2} \\\\
        \\end{pmatrix}`}</BlockMath>

        <li>Second one keeps the same position, it is shifted by ½ in y-direction</li>

        <BlockMath>{`H_2 =
        \\begin{pmatrix}
        \\frac{1}{2} & 0 \\\\
        0 & \\frac{1}{2} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        \\frac{1}{2} \\\\
        \\frac{1}{2} \\\\
        \\end{pmatrix}`}</BlockMath>

        <li>Third  one keeps the same position, it is shifted by ½ in both x and y-direction</li>

        <BlockMath>{`H_3 =
        \\begin{pmatrix}
        0 & -\\frac{1}{2} \\\\
        -\\frac{1}{2} & 0 \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        1 \\\\
        \\frac{1}{2} \\\\
        \\end{pmatrix}`}</BlockMath>

        <li>Forth one is rotated by 90° to the left</li>
        </ul>

        <p>Putting it all together, the parametrization of Hilbert curve with the rotational and shifting operations
        H<sub>0</sub>, H<sub>1</sub>, H<sub>2</sub> and H<sub>3</sub> is a limit of an infinite matrix product.</p>

        <BlockMath>{`h(t) = \\lim_{n \\to \\infty}h(0_4.q_1q_2...q_n) =
        \\lim_{n \\to \\infty} H_{q_1} \\circ H_{q_2} \\circ \\dots \\circ H_{q_n}\\begin{pmatrix}
        0 \\\\
        0 \\\\
        \\end{pmatrix}`}</BlockMath>

        <RouteMap path={ HILBERT_DIEGO } />

        <h2 id="moore">Moore Curve</h2>
        <p>Second famous SFC is the Moore curve, which is a slight modification of the Hilbert Curve [2, 3].</p>
        <ul>
            <BlockMath>{`M_0 =
            \\begin{pmatrix}
            0 & -\\frac{1}{2} \\\\
            \\frac{1}{2} & 0 \\\\
            \\end{pmatrix}
            \\begin{pmatrix}
            x \\\\
            y \\\\
            \\end{pmatrix} +
            \\begin{pmatrix}
            \\vec{v_i} \\\\
            \\vec{v_j} \\\\
            \\end{pmatrix}
            \\begin{pmatrix}
            \\frac{1}{2} \\\\
            0 \\\\
            \\end{pmatrix}`}</BlockMath>
            <li>Flipped along x=-y axis and shifted by ½ in x-direction</li>
            <BlockMath>{`M_1 =
            \\begin{pmatrix}
            0 & -\\frac{1}{2} \\\\
            \\frac{1}{2} & 0 \\\\
            \\end{pmatrix}
            \\begin{pmatrix}
            x \\\\
            y \\\\
            \\end{pmatrix} +
            \\begin{pmatrix}
            \\vec{v_i} \\\\
            \\vec{v_j} \\\\
            \\end{pmatrix}
            \\begin{pmatrix}
            \\frac{1}{2} \\\\
            \\frac{1}{2} \\\\
            \\end{pmatrix}`}</BlockMath>
            <li>Flipped along x=-y axis and shifted by ½ in x-direction and by 1 in y-direction</li>
            <BlockMath>{`M_2 =
            \\begin{pmatrix}
            0 & \\frac{1}{2} \\\\
            -\\frac{1}{2} & 0 \\\\
            \\end{pmatrix}
            \\begin{pmatrix}
            x \\\\
            y \\\\
            \\end{pmatrix} +
            \\begin{pmatrix}
            \\vec{v_i} \\\\
            \\vec{v_j} \\\\
            \\end{pmatrix}
            \\begin{pmatrix}
            \\frac{1}{2} \\\\
            1 \\\\
            \\end{pmatrix}`}</BlockMath>
            <li>Flipped along x=y axis and shifted by ½ in x-direction and 1 in y-direction</li>
            <BlockMath>{`M_3 =
            \\begin{pmatrix}
            0 & \\frac{1}{2} \\\\
            -\\frac{1}{2} & 0 \\\\
            \\end{pmatrix}
            \\begin{pmatrix}
            x \\\\
            y \\\\
            \\end{pmatrix} +
            \\begin{pmatrix}
            \\vec{v_i} \\\\
            \\vec{v_j} \\\\
            \\end{pmatrix}
            \\begin{pmatrix}
            \\frac{1}{2} \\\\
            \\frac{1}{2} \\\\
            \\end{pmatrix}`}</BlockMath>
            <li>Flipped along x=y axis and shifted by ½ in both directions</li>
        </ul>

        <p>However, the Moore curve is technically similar to Hilbert one; they differ only in the first iteration -
        first rotations are different and then the sub curves are Hilbert. Therefore, further iterations are copying
        the Hilbert arithmetic and the final parametrization looks:</p>

        <BlockMath>{`m(t) = \\lim_{n \\to \\infty}h(0_4.q_1q_2...q_n) =
        \\lim_{n \\to \\infty} M_{q_1} \\circ H_{q_2} \\circ \\dots \\circ H_{q_n}\\begin{pmatrix}
        0 \\\\
        0 \\\\
        \\end{pmatrix}`}</BlockMath>

		<RouteMap path={ MOORE_DIEGO } />

		<h2 id="peano">Peano Curve</h2>
		<p>Unlike the Hilbert and Moore curves, the Peano Curve divides the area in each iteration into nine equal areas.
		Initial shape is a “S” like shape. Arithmetization follows the same logic as in previous curves [2].</p>

		<BlockMath>{`P_0 =
        \\begin{pmatrix}
        \\frac{1}{3} & 0 \\\\
        0 & \\frac{1}{3} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        0 \\\\
        0 \\\\
        \\end{pmatrix}`}</BlockMath>

        <BlockMath>{`P_1 =
        \\begin{pmatrix}
        -\\frac{1}{3} & 0 \\\\
        0 & \\frac{1}{3} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        \\frac{1}{3} \\\\
        \\frac{1}{3} \\\\
        \\end{pmatrix}`}</BlockMath>

        <BlockMath>{`P_2 =
        \\begin{pmatrix}
        \\frac{1}{3} & 0 \\\\
        0 & \\frac{1}{3} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        0 \\\\
        \\frac{2}{3} \\\\
        \\end{pmatrix}`}</BlockMath>

        <BlockMath>{`P_3 =
        \\begin{pmatrix}
        \\frac{1}{3} & 0 \\\\
        0 & -0\\frac{1}{3} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        \\frac{1}{3} \\\\
        1 \\\\
        \\end{pmatrix}`}</BlockMath>

        <BlockMath>{`P_4 =
        \\begin{pmatrix}
        -\\frac{1}{3} & 0 \\\\
        0 & -\\frac{1}{3} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        \\frac{2}{3} \\\\
        \\frac{2}{3} \\\\
        \\end{pmatrix}`}</BlockMath>

        <BlockMath>{`P_5 =
        \\begin{pmatrix}
        \\frac{1}{3} & 0 \\\\
        0 & -\\frac{1}{3} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        \\frac{1}{3} \\\\
        \\frac{1}{3} \\\\
        \\end{pmatrix}`}</BlockMath>

        <BlockMath>{`P_6 =
        \\begin{pmatrix}
        \\frac{1}{3} & 0 \\\\
        0 & \\frac{1}{3} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        \\frac{2}{3} \\\\
        0 \\\\
        \\end{pmatrix}`}</BlockMath>

        <BlockMath>{`P_7 =
        \\begin{pmatrix}
        -\\frac{1}{3} & 0 \\\\
        0 & \\frac{1}{3} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        1 \\\\
        \\frac{1}{3} \\\\
        \\end{pmatrix}`}</BlockMath>

        <BlockMath>{`P_8 =
        \\begin{pmatrix}
        \\frac{1}{3} & 0 \\\\
        0 & \\frac{1}{3} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        x \\\\
        y \\\\
        \\end{pmatrix} +
        \\begin{pmatrix}
        \\vec{v_i} \\\\
        \\vec{v_j} \\\\
        \\end{pmatrix}
        \\begin{pmatrix}
        \\frac{2}{3} \\\\
        \\frac{2}{3} \\\\
        \\end{pmatrix}`}</BlockMath>

        <p>Parametrization for Peano Curve p(t), bear in mind that we are now in base 9 unlike in previous cases:</p>
        <BlockMath>{`p(t) = \\lim_{n \\to \\infty}h(0_9.q_1q_2...q_n) =
        \\lim_{n \\to \\infty} P_{q_1} \\circ P_{q_2} \\circ \\dots \\circ P_{q_n}\\begin{pmatrix}
        0 \\\\
        0 \\\\
        \\end{pmatrix}`}</BlockMath>

        <RouteMap path={ PEANO_DIEGO } />


        <h2 id="app">Run your own Space-Filling Curve</h2>
        <p>On the following map you can draw any quadrilateral polygon (actually a triangle is enough) and select any
        curve of the three SFC with any order n=1,2,3,4.</p>

        <EditableMapWrapper positions={ positions } />

        <h2 className="reference">References:</h2>
        <ol className="reference">
            <li>H. Sagan. (1994). <em>"Space-Filling Curves, Springer-Verlag"</em>, New York,. </li>
            <li>
                M. Bader. (2013).
                <em>"Space-filling Curves. An Introduction With Applications in Scientific Computing."</em>
                10.1007/978-3-642-31046-1.
                </li>
            <li>
                E. Estevez-Rams, et al. (2017). <em>"Hilbert curves in two dimensions"</em>,
                Revista Cubana de F’isca, Vol 34, No. 1
            </li>
            <li>M. Kesson, (2002). <em>"Hilbert Curve Concepts & Implementation"</em>, <a href="https://www.fundza.com/algorithmic/space_filling/hilbert/basics/index.html">link</a></li>
        </ol>

        <ol className="foot-notes">
            <li id="covid">
                Ok, it didn’t end, we just stopped caring about it anymore
            </li>
            <li id="strava">
                Hilbert and Peano curve runs in San Diego downtown. <br />
                <img src={ hilbert_strava } alt="Hilbert curve on Strava" className="strava" />
                <img src={ peano_strava } alt="Peano curve on Strava" className="strava" />
            </li>
            <li id="transform-group">
                <p>The rotation matrices of the affine transformations forms a group. Specifically matrices: </p>

                <InlineMath>{`U_I = \\begin{pmatrix}1 & 0 \\\\ 0 & 1 \\\\ \\end{pmatrix}`}</InlineMath>, &nbsp;
                <InlineMath>{`U_R = \\begin{pmatrix}0 & 1 \\\\ 1 & 0 \\\\ \\end{pmatrix}`}</InlineMath>, &nbsp;
                <InlineMath>{`U_V = \\begin{pmatrix}0 & -1 \\\\ 1 & 0 \\\\ \\end{pmatrix}`}</InlineMath> and &nbsp;
                <InlineMath>{`U_H = \\begin{pmatrix}1 & 0 \\\\ 0 & -1 \\\\ \\end{pmatrix}`}</InlineMath> &nbsp;

                <p>With a generator &lt;U<sub>R</sub>,U<sub>H</sub>&gt;. It has three subgroups of order four:
                &lt;U<sub>I</sub>,U<sub>-I</sub>,U<sub>R</sub>,U<sub>-R</sub>&gt;,
                &lt;U<sub>I</sub>,U<sub>-I</sub>,U<sub>H</sub>,U<sub>-H</sub>&gt; and
                &lt;U<sub>I</sub>,U<sub>-I</sub>,U<sub>V</sub>,U<sub>-V</sub>&gt;,
                and five cyclic subgroups of order two: &lt;U<sub>I</sub>,U<sub>R</sub>&gt;,
                &lt;U<sub>I</sub>,U<sub>-R</sub>&gt;,
                &lt;U<sub>I</sub>,U<sub>-I</sub>&gt;,
                &lt;U<sub>I</sub>,U<sub>-H</sub>&gt;. More details in [3].</p>
            </li>
        </ol>
    </div>
    <footer>
        &copy; Matej Kerekrety 2022 <a href="https://github.com/matejker"><img src={ github } alt="github" /></a>
    </footer>
    </>);
}

