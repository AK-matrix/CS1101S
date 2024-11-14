import {repeat_pattern} from 'rune';

function sierpinski(shape) {
    //decreases the scale of the shape as required by the program
    const modified_shape = scale(shape, 0.5, 0.5, 0.5);
    
    //puts 4 shapes together in the required format to create the lower layer
    const double_shape = union(translate(modified_shape, 0.5, 0, 0), 
                               modified_shape);
    const base = union(double_shape, translate(double_shape, 0, 0.5, 0));
    
    //combines the lower and upper layers to create the final requirement
    return union(base, translate(modified_shape, 0.25, 0.25, 0.5 ));
}

function hypofractional(n, shape) {
    /*uses recursion to perform the sierpinski function repeatedly on the
    shape until a hypofraction of the required recursion depth is obtained*/
    return n === 1 
    ? sierpinski(shape) 
    : hypofractional(n - 1, sierpinski(shape));
}

// Testing

//render_grid(sierpinski(unit_pyramid));
//render(sierpinski(unit_cylinder));
//render(hypofractional(3, unit_cube));
render(hypofractional(5, unit_pyramid));
