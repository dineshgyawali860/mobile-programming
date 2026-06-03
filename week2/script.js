function calculateGrade() {

    let total = 0;

    for (let i = 1; i <= 9; i++) {
        let marks = parseInt(document.getElementById("sub" + i).value) || 0;
        total += marks;
    }

    document.getElementById("totalMarks").innerHTML =
        "Total Marks: " + total;

    let result = document.getElementById("result");

    if (total > 700) {
        result.innerHTML = "Distinction";
        result.style.color = "green";
    }
    else if (total > 600) {
        result.innerHTML = "First Division";
        result.style.color = "black";
    }
    else if (total > 500) {
        result.innerHTML = "Second Division";
        result.style.color = "black";
    }
    else if (total > 400) {
        result.innerHTML = "Third Division";
        result.style.color = "black";
    }
    else {
        result.innerHTML = "Fail";
        result.style.color = "red";
    }
}