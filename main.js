//Splash screen code
document.querySelector(".control-buttons span").onclick = function() {
    //Get name from user
    let yourName = prompt("What's Your Name?");
    if(yourName == null || yourName == "") {
        //set name to Unknown
        document.querySelector(".title .name").innerHTML += 'Unknown';
    }else {
        //Set name to User
        document.querySelector(".title .name").innerHTML += yourName;
    }
    //Remove splash screen 
    document.querySelector(".control-buttons").remove();
    // All is flipped After Remove Splash screen
    blocks.forEach(block => {
        block.classList.add("is-flipped");
        setTimeout(() => {
            block.classList.remove("is-flipped");
        },duration * 6);
    });
    // Timer Function
    let time = document.querySelector(".time span");
    function timer() {
        time.innerHTML = parseInt(time.innerHTML) - 1;
            if(time.innerHTML === "0"){
                clearInterval(counter);
                document.querySelector(".result h2").innerHTML = "Game Over";
                document.querySelector(".result").style.background = "red";
                resultFun();
            }
    };
    let counter = setInterval(timer, (duration));
};
//Effect duration
let duration = 1000;
//Select blocks container
let blocksContainer = document.querySelector(".game-blocks");

//Creat array from game blocks
let blocks = Array.from(blocksContainer.children);

//Creat range of keys
let orderRange = [...Array(blocks.length).keys()];
Shuffle(orderRange);

blocks.forEach((block, index) =>{
    //Add order propraty to game blocks
    block.style.order = orderRange[index];
    //Add click events
    block.addEventListener('click', function(){
        //Trigger the flip block function
        flipBlock(block);
    })
});

//Flip block function
function flipBlock(selectedBlock){
    selectedBlock.classList.add("is-flipped");
    //Collect All Flippse Cards
    let allFlipBlocks = blocks.filter(flipbloch => flipbloch.classList.contains('is-flipped'));
    if(allFlipBlocks.length === 2) {
        //Stop clicing function
        stopClicking();
        //Check Matched block function
        checkMatchedBlock(allFlipBlocks[0],allFlipBlocks[1]);
    }
    let allHasFlip = blocks.filter(flipbloch => flipbloch.classList.contains('has-flipped'));
    if(allHasFlip.length === blocks.length){
        resultFun();
    }
};

//Stop clicing function
function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(()=>{
        blocksContainer.classList.remove("no-clicking");
    },duration)
}

//Check Matched block function
function checkMatchedBlock(fblock, sblock) {
    let tries = document.querySelector(".tries span");
    //Check if two blocks are equal
    if(fblock.dataset.nature === sblock.dataset.nature) {
        //Remove is-flipped  and add has-flipped if there are equal
        fblock.classList.remove("is-flipped");
        sblock.classList.remove("is-flipped");
        fblock.classList.add("has-flipped");
        sblock.classList.add("has-flipped");
    }else {
        //The Increase in tries
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        //Remove is-flipped if there aren't equal
        setTimeout(() => {
            fblock.classList.remove("is-flipped");
            sblock.classList.remove("is-flipped");
        },duration);
    }
};

//Shuffle function
function Shuffle(arr) {
    //Setting vars
    let current = arr.length;
    let temp;
    let random;
    while(current > 0) {
        //Get Random Namber
        random = Math.floor(Math.random() * current);
        current--;
        //Save current element in stash
        temp = arr[current];
        //Current element = Rundom element
        arr[current] = arr[random];
        //Rundom element = Temp
        arr[random] = temp;
    }
    return arr;
};

//Result Function
function resultFun() {
    setTimeout(() => {
            document.querySelector(".result").classList.remove("hide");
        },duration);
        setInterval(function(){
            document.querySelector(".result h2").innerHTML += '.';
        }, duration);
        setTimeout(function(){location.reload()},duration * 4);
};

