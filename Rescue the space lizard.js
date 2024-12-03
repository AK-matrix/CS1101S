// TASK 2

let mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function memo_max_flies_to_eat(tile_flies) {
    mem = [];
    function flies(a, n) {
        let comb1 = 0;
        let comb2 = 0;
        let comb3 = 0;
        // Check if `a` and `n` are within bounds
        if (a >= array_length(tile_flies) ||
        n < 0 ||
        n >= array_length(tile_flies[0])) {
            return 0;  
        }

        let elem = tile_flies[a][n];

        if (n > 0 && n < array_length(tile_flies[0]) - 1) {
            
            if(read(a + 1, n) !== undefined){
                
                 comb1 = read(a + 1, n);
            } else{
                 comb1 = flies(a + 1, n); 
                 write(a + 1, n, comb1);
            }
            
            
             // Next row, same column
            if(read(a + 1, n - 1) !== undefined){
                
                 comb2 = read(a + 1, n - 1);
            } else{
                 comb2 = flies(a + 1, n - 1); 
                 write(a + 1, n - 1, comb2);
            }    // Next row, left column
            
            
            if(read(a + 1, n + 1) !== undefined){
                
                 comb3 = read(a + 1, n + 1);
            } else{
                 comb3 = flies(a + 1, n + 1); 
                 write(a + 1, n + 1, comb3);
            }
            

            if (comb1 >= comb2 && comb1 >= comb3) {
                return elem + comb1;
            } else if (comb2 >= comb1 && comb2 >= comb3) {
                return elem + comb2;
            } else {
                return elem + comb3;
            }
        } 
        
        
        else if (n === 0) {  // Left edge column
        
            if(read(a + 1, n) !== undefined){
                
                 comb1 = read(a + 1, n);
            } else{
                 comb1 = flies(a + 1, n); 
                 write(a + 1, n, comb1);
            }
            
             if(read(a + 1, n + 1) !== undefined){
                
                 comb2 = read(a + 1, n + 1);
            } else{
                 comb2 = flies(a + 1, n + 1); 
                 write(a + 1, n + 1, comb2);
            }
            
            if (comb1 >= comb2) {
                return elem + comb1;
            } else {
                return elem + comb2;
            }
        } 
        
        
        else {  // Right edge column
            if(read(a + 1, n) !== undefined){
                
                 comb1 = read(a + 1, n);
            } else{
                 comb1 = flies(a + 1, n); 
                 write(a + 1, n, comb1);
            }
            
             // Next row, same column
            if(read(a + 1, n - 1) !== undefined){
                
                 comb2 = read(a + 1, n - 1);
            } else{
                 comb2 = flies(a + 1, n - 1); 
                 write(a + 1, n - 1, comb2);
            }
            
            if (comb1 >= comb2) {
                return elem + comb1;
            } else {
                return elem + comb2;
            }
        }
    }
    
    let sum = 0;
    for (let h = 0; h < array_length(tile_flies[0]); h = h + 1) {
        let c1 = flies(0, h);
        if (c1 > sum) {
            sum = c1;
        }
    }
    
    return sum;
    

}

// TEST:
// const tile_flies = [[3, 1, 7, 4, 2],
//                     [2, 1, 3, 1, 1],
//                     [1, 2, 2, 1, 8],
//                     [2, 2, 1, 5, 3],
//                     [2, 1, 4, 4, 4],
//                     [5, 7, 2, 5, 1]];
//
// memo_max_flies_to_eat(tile_flies); // Expected result: 32
