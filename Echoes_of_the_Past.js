//Task 1
function backward(sound) {
    return make_sound(t => get_wave(sound)(get_duration(sound) - t),
    get_duration(sound));
}

//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(backward(my_voice()));          // step 3 in REPL

//Task 2
function repeat(n, sound) {
    function repeat_helper(n, count, sound) {
        return n === 0 ? list(silence_sound(0)) : count === 0 ? null : 
        pair(sound, repeat_helper(n, count - 1, sound));
    }
    return consecutively(repeat_helper(n, n, sound));
}

// Test
const my_sound = consecutively(
    list(sine_sound(400, 1), sine_sound(800, 1)));
const my_repeated = repeat(3, my_sound);
play(my_repeated);

//Task 3
function fast_forward(n, sound) {
    return make_sound(t => get_wave(sound)(n * t), get_duration(sound) / n );
}

//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(fast_forward(2, my_voice()));   // step 3 in REPL

//Task 4
function echo(n, d, sound) {
    function helper(n, d, sound, cur_delay) {
        return n === 0 ? null :
        /*consecutively adds the required delay behind
        each of the sounds (using silence_sound)
        so that they can all be played 
        simultaneously later on*/
        pair(consecutively(list(silence_sound(cur_delay), sound)),
        helper(n - 1, d,
        make_sound(t => 1 / 2 * get_wave(sound)(t),
        get_duration(sound)), cur_delay + d));
    }
    return simultaneously(helper(n + 1, d, sound, 0));
}

// Test
const test_sound = sine_sound(800, 0.2);
play(echo(2, 0.4, test_sound));

//Task 5
function backward(sound) {
    return make_sound(t => get_wave(sound)(get_duration(sound) - t),
    get_duration(sound));
}

function repeat(n, sound) {
    function repeat_helper(n, count, sound) {
        /* silence_sound(0) instead of null as
        it handles well if n is passed as 0*/
        return n === 0 ? list(silence_sound(0)) : count === 0 ? null : 
        pair(sound, repeat_helper(n, count - 1, sound));
    }
    return consecutively(repeat_helper(n, n, sound));
}

function fast_forward(n, sound) {
    return make_sound(t => get_wave(sound)(n * t), get_duration(sound) / n );
}

function echo(n, d, sound) {
    function helper(n, d, sound, cur_delay) {
        return n === 0 ? null :
        pair(consecutively(list(silence_sound(cur_delay), sound)),
        helper(n - 1, d,
        make_sound(t => 1 / 2 * get_wave(sound)(t),
        get_duration(sound)), cur_delay + d));
    }
    return simultaneously(helper(n + 1, d, sound, 0));
}

function make_alien_jukebox(sound) {
    const one = backward(sound);
    const two = fast_forward(1 / 2, sound);
    const three = repeat(3, fast_forward(2, sound));
    const four = echo(4, 0.3, backward(sound));
    const sounds = list(sound, one, two, three, four);
    return t => play(list_ref(sounds, t));
}

// Press "Run"

// Then test in REPL:

// init_record();

// const erksh_voice = record_for(1, 0.2);

// const j = make_alien_jukebox(erksh_voice());

// j(0);  // plays original recording

// j(1);  // plays it backward

// j(2);  // plays it at half speed

// j(3);  // plays it at double speed, three times in a row

// j(4);  // plays it backward with 4-times echo,
//        //     with 0.3 seconds echo delay
