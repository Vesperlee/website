// x is temperature, y is fan speed, z is the cost (per 15min averaged)
// 15 < x < 31 && 0 < y < 4
// Temperature range imposes a flat cost.
function tempCost(x) {
    if (x >= 28 && x <= 30) {
        return (0.045);
    }
    else if (x >= 25 && x <= 27) {
        return (0.05);
    }
    else if (x >= 21 && x <= 24) {
        return (0.055);
    }
    else if (x >= 16 && x <= 20) {
        return (0.06);
    }
    else {
        alert("Invalid temperature value (value should range between 16 to 30)")
        return false;
    }
}

// Fan speed imposes small addition on cost, scaling on temperature.
function fanCost(x, y) {
    if (y === 1) {
        return 0;
    }
    else if (y === 2) {
        return 0.01;
    }
    else if (y === 3) {
        return false;
    }
    else {
        alert("Invalid fan speed value (value should range between 1 to 3)")
        return false;
    }
}

// Final cost of all factors included.
function totalCost() {
    let temp = Number(document.getElementById("temperature").value);
    let fan = Number(document.getElementById("fanSpeed").value);
    let hours = Number(document.getElementById("hours").value);
    let costString1 = `${(tempCost(temp) + fanCost(temp, fan)).toFixed(2)}`;
    let costString2 = `${(4 * hours * (tempCost(temp) + fanCost(temp, fan))).toFixed(2)}`
    let output = "$" + costString2 + " or " + "$" + costString1 + " every 15mins.";
    document.getElementById('output')
        .innerText = output;
}