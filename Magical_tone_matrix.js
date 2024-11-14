//task 1
// Question 1

function generate_list_of_note(letter_name, list_of_interval) {
    
    const new_list = pair(letter_name_to_midi_note(letter_name), list_of_interval);
    return reverse(accumulate((x, y) => is_null(y) ? pair(x, y) : pair(x + head(y), y), 
    null, reverse(new_list)));
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

// repeat_pattern from Lecture L2

function repeat_pattern(n, pattern, rune) {
    return n === 0 ? rune : repeat_pattern(n - 1, pattern, pattern(rune));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    function list_to_sound(list_of_midi_note, duration, instrument) {
        return map(x =>
        instrument(x, duration),
        list_of_midi_note);
}
    const new_interval = repeat_pattern(n - 1, x => append(x, list_of_interval), list_of_interval);
    return list_to_sound(generate_list_of_note(note, new_interval), duration, instrument);
}

play(consecutively(repeated_scale("C4", pentatonic_list_of_interval,
                                  2, 1, cello)));

//task 2
// Question 2

function play_matrix(duration, list_of_sounds) {
    
    //this function plays music across columns using set_timeout
    function music(row, column, list) {
        
        //this function prepares the sound list of a single column
        function make_list(row, column, list) {
            return row === 16 ?
                   null :
                   list_ref(list_ref(get_matrix(), row), column) ?
                   pair(list_ref(list_of_sounds, row), 
                   make_list(row + 1, column, list)) :
                   make_list(row + 1, column, list);
                   
    }   //checking if the entire matrix has been played,
        //replays it from the beginning if true
        if (column > 15) {
            return set_timeout(() => music(0, 0, list), 0); //0 delay accounts
                                                            //for runtime delay
        }
        
        //playing the current column and using set_timeout to play
        //the next one after 'duration' time
        else {
        
            play(simultaneously(make_list(0, column, list)));
            return set_timeout(() => music(0, column + 1, list),
                               1000 * duration);
    }
    }
    return music(0, 0, list);
}

function stop_matrix() {
    return clear_all_timeout();
}

function repeat_pattern(n, pattern, rune) {
    return n === 0 ? rune : repeat_pattern(n - 1, pattern, pattern(rune));
}
const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

function generate_list_of_note(letter_name, list_of_interval) {
    
    const new_list = pair(letter_name_to_midi_note(letter_name),
                          list_of_interval);
    return reverse(accumulate((x, y) => is_null(y) ?
                                        pair(x, y) :
                                        pair(x + head(y), y), 
                   null, reverse(new_list)));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    function list_to_sound(list_of_midi_note, duration, instrument) {
        return map(x =>
        instrument(x, duration),
        list_of_midi_note);
}
    const new_interval = repeat_pattern(n - 1, x => append(x, list_of_interval),
                                        list_of_interval);
    return list_to_sound(generate_list_of_note(note, new_interval),
                         duration, instrument);
}
const sounds = repeated_scale("C4", pentatonic_list_of_interval, 3, 0.2, piano);

play_matrix(0.5, sounds);
