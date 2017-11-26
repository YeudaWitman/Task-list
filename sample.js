
function recipe(name, time, difficulty, ingredient, instructions) {
    this.name = name;
    this.time = time;
    this.difficulty = difficulty;
    this.ingredient = ingredient;
    this.instructions = instructions;
}

//array with objects
var recipeArray = [
new recipe("Recipe1 ", 10, "easy", ["a1", "b1", "c1"], "Instructions..."),
new recipe("Recipe2 ", 20, "medium", ["a2", "b2", "c2"], "Instructions..."),
new recipe("Recipe3 ", 30, "hard", ["a3", "b3", "c3"], "Instructions..."),
new recipe("Recipe4 ", 40, "very hard", ["a4", "b4", "c4"], "Instructions..."),
new recipe("Recipe5 ", 50, "expert", ["a5", "b5", "c5"], "Instructions...")
];
//console.log(recipeArray[x].name, recipeArray[x].time + "Minutes", "Ingredient: " + recipeArray[x].ingredient); // TEST!!
var x = Math.floor(Math.random() * recipeArray.length);
var randomNumber = [];
var i;
for (i = 0; i < recipeArray.length; i++) {
    console.log(recipeArray[i]);
    //randomNumber.push(i);
}


//console.log("x =" + x);

/*
for (i = 0; i <= recipeArray.length; i++) {
    var randomNumber = [];
    var x = Math.floor(Math.random() * recipeArray.length)
    randomNumber.push(x)
    if (randomNumber.indexOf(x) === i) {
        console.log(randomNumber);
    }
    console.log("ran" = x);
}

*/






//create random element from array
var index = 0;
/*function getRandom () {
    if (index === recipeArray.length) {
        index = 0;
    }
    var x = Math.floor(Math.random() * recipeArray.length)
    document.getElementById("changeRecipes").innerHTML =
        '<h2>' + recipeArray[x].name + '</h2>' +
        '<span>' + recipeArray[x].time + '</span>' +
        '<span>' + recipeArray[x].difficulty + '</span>' +
        '<div>' + recipeArray[x].ingredient + '</div>' +
        '<p>' + recipeArray[x].instructions + '</p>';
    index++;
};*/
function getRandom() {
    if (recipeArray.length < 3) {
        var x = Math.floor(Math.random() * recipeArray.length)
        document.getElementById("changeRecipes").innerHTML =
            '<h2>' + recipeArray[x].name + '</h2>' +
            '<span>' + recipeArray[x].time + '</span>' +
            '<span>' + recipeArray[x].difficulty + '</span>' +
            '<div>' + recipeArray[x].ingredient + '</div>' +
            '<p>' + recipeArray[x].instructions + '</p>';
    }
    index++;
};
getRandom()