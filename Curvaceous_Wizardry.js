//Task 1
const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack(c1, c2) {
    return t => t <= 0.5 ?
                make_point(x_of(c1(2 * t)), 1 / 2 * y_of(c1(2 * t)) + 0.5):
                make_point(x_of(c2(2 * (t - 0.5))),
                1 / 2 * y_of(c2(2 * (t - 0.5))));
}

// Test
draw_points_2d(10000)(stack(test_curve, test_curve));

//Task 2
const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack_frac(frac, c1, c2) {
    return t => t <= 0.5 ?
                /* (1 - frac) is added to the y component of the first curve 
                to account for proportional vertical displacement*/
                
                make_point(x_of(c1(2 * t)), frac * y_of(c1(2 * t)) + 1 - frac):
                make_point(x_of(c2(2 * (t - 0.5))),
                (1 - frac) * y_of(c2(2 * (t - 0.5))));
}

// Test
draw_points_2d(10000)
    (stack_frac(1 / 5,
                test_curve,
                stack_frac(1 / 2, test_curve, test_curve)));
