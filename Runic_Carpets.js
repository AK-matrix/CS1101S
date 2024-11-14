/*uses nested stack_frac to stack the upper and bottom layers
denoted by function layer() along with the middle layer denoted
by function middle()*/
function persian(rune, count) {
    return stack_frac(1/count, layer(rune,count), stack_frac((count-2)/(count-1),
    middle(rune, count),layer(rune,count)));

}

/*Creates the middle layer of the carpet by proportionately 
placing the remaining two sides of the carpet and a rune cross 
in the middle. This is accomplished using nested beside_frac */
function middle(rune, count){
    return beside_frac(1/(count), stackn(count-2,rune),beside_frac((count-2)/(count-1),make_cross(rune),stackn(count-2,rune)));
}

/*this creates the upper and bottom layers of the carpet using
stackn function*/
function layer(rune, count){
    return quarter_turn_right(stackn(count,quarter_turn_left(rune)));
}

// Tests
show(persian(heart, 7));
show(persian(make_cross(rcross), 5));
const paw = from_url("https://i.imgur.com/GJg95B8.png");
show(persian(paw, 5));
