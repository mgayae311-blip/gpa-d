// Array ya kuhifadhi kozi zote
let allCourses = [];

function createGPA() {
    // Kuchukua data kutoka kwenye input za HTML
    let courseName = document.getElementById("course-name").value;
    let marks = parseFloat(document.getElementById("marks").value);
    let credits = parseFloat(document.getElementById("credits").value);

    // Uhakiki wa data zilizojazwa
    if (courseName === "" || isNaN(marks) || isNaN(credits)) {
        alert("Tafadhali jaza nafasi zote: Jina la kozi, Alama, na Credits!");
        return;
    }
    if (marks < 0 || marks > 100) {
        alert("Alama lazima ziwe kati ya 0 na 100!");
        return;
    }

    // Kupanga Gredi na Pointi zake
    let grade = "";
    let points = 0;

    if (marks >= 70 && marks <= 100) {
        grade = "A";
        points = 5;
    } else if (marks >= 60 && marks < 70) {
        grade = "B+";
        points = 4;
    } else if (marks >= 50 && marks < 60) {
        grade = "B";
        points = 3;
    } else if (marks >= 40 && marks < 50) {
        grade = "C";
        points = 2;
    } else if (marks >= 35 && marks < 40) {
        grade = "D";
        points = 1;
    } else {
        grade = "F";
        points = 0;
    }

    // Kuhifadhi kozi mpya kwenye list
    let newCourse = {
        name: courseName,
        marks: marks,
        grade: grade,
        credits: credits,
        points: points
    };
    allCourses.push(newCourse);

    // Kusafisha input boxes
    document.getElementById("course-name").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("credits").value = "";

    // Ku-update muonekano wa jedwali na GPA
    updateTableAndGPA();
}

function updateTableAndGPA() {
    let tableBody = document.getElementById("course-rows");
    tableBody.innerHTML = ""; // Kufuta vilivyopo ili kuandika upya list nzima

    let totalCredits = 0;
    let totalWeightedPoints = 0;

    // Kupita kwenye kila kozi na kuionyesha kwenye jedwali
    for (let i = 0; i < allCourses.length; i++) {
        let course = allCourses[i];

        totalCredits += course.credits;
        totalWeightedPoints += (course.points * course.credits);

        let row = `<tr>
            <td>${course.name}</td>
            <td>${course.marks}</td>
            <td><strong>${course.grade}</strong></td>
            <td>${course.credits}</td>
            <td>${course.points * course.credits}</td>
        </tr>`;
        tableBody.innerHTML += row;
    }

    // Kokotoa GPA ya jumla
    let finalGPA = 0;
    if (totalCredits > 0) {
        finalGPA = totalWeightedPoints / totalCredits;
    }

    // Onyesha matokeo kwenye screen
    document.getElementById("total-credits").innerText = totalCredits;
    document.getElementById("final-gpa").innerText = finalGPA.toFixed(2);
}