// All written by Caedan — involved lots of research, much trial and error, and great loss of hair, but no 'copying and pasting' :)

// ================================
// ================================
// GENERAL FUNCTIONS
// ================================
// ================================

//  Function that returns an array of classes by passing a class name
function getClassList(classKey) {
	return document.getElementsByClassName(classKey);
}

// Returns the user to the top of the page
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}

// Scrolls to a particular section based on an elements ID (to be passed into function)
function scrollToSection(elementID) {
	document.getElementById(elementID).scrollIntoView({
		behavior: 'smooth'
	});
}

// List of functions to be run on each scroll
function scrollRoutine() {
	parallaxRoutine()
	toggleTopButtonVisibility();
}

// ================================
// 'Back to top' button visiblity
// ================================

// Determines — based on scroll distance down page — whether or not the 'back to top' button should be visible and adjusts it accordingly
// Classes are used so as to allow for a transition (may remove in favor of some vanilla JS to handle the transitions in the future)
// TODO need to split into two functions, one to assign the class, and the other to detect which class should be applied
function toggleTopButtonVisibility() {
	if (window.scrollY > window.innerHeight / 2) {
		// toggleVisibility(backToTopButton, "show");
		toggleVisibility(rightRailCluster, "show");
	} else {
		// toggleVisibility(backToTopButton, "hide");
		toggleVisibility(rightRailCluster, "hide");
	}
}

// Requires DOM object and "show" | "hide" as string
function toggleVisibility(targetID, state) {
	if (state === "show") {
		targetID.classList.add("show");
		targetID.classList.remove("hide");
	} else if (state === "hide") {
		targetID.classList.add("hide");
		targetID.classList.remove("show");
	} else {
		console.log("Invalid state, must be a string, either 'show' or 'hide");
	}
}


function toggleHamburger() {
	const x = hamburgerInner;
	const y = hamburgerButton;
	const z = displayDim;
	if (x.style.display === "none") {
		x.style.display = "flex";
		y.classList.add('permanent');
		z.style.removeProperty("display");
	} else {
		x.style.display = "none";
		y.classList.remove('permanent');
		z.style.display = "none";
	}
}

// ================================
// Parallax functions
// ================================

//  A routine that runs to update all elements of class 'parallax' with their new background image positions based on how far down the page the user has scrolled
function parallaxRoutine() {
	// only runs at certain width — primarily because my parallax function in it's current iteration doesn't look great on tall skinny display sizes :p
	for (element of ParallaxList) {
		if (window.innerWidth > 1200) {
			parallaxAdjust(element, 3);
		} else {
			element.style.backgroundPosition = 'center';
		}
	}
}

// Determines the appropriate background position based on the target element, rate, and the user's scroll position on the page
function parallaxAdjust(element, rate) {
	const givenPosition = element.getBoundingClientRect().y / rate;
	element.style.backgroundPositionY = (`${givenPosition}px`);
}

// ================================
// Landing functions
// ================================

function returnToLanding() {
	outerNavTarget.classList.add('navInitial');
	outerNavTarget.classList.remove('mainNav');

	landing.classList.remove('mainHeader');
	for (i of HideAfterLandingList) {
		i.style.visibility = "visible";
	}
	setTimeout(function () {
		for (i of HideAfterLandingList) {
			i.classList.add('visibleInLanding');
			i.classList.remove('hiddenFromLanding');
		}
	}, 500);
}

function leaveLanding() {
	// landing.classList.add('headerTransition');
	outerNavTarget.classList.add('mainNav');
	outerNavTarget.classList.remove('navInitial');
	// outerNavTarget.classList.add('mainNav');

	for (i of HideAfterLandingList) {
		i.classList.add("hiddenFromLanding");
		
	}
	landing.classList.add('mainHeader');
		setTimeout(function () {
			for (i of HideAfterLandingList) {
				i.classList.remove('visibleInLanding');
				i.style.visibility = "hidden";
			}
		}, 500);
		setTimeout(function () {
			toggleVisibility(rightRailParent, "show");
		}, 1000)
		
	}


// ================================
// ON PAGE LOAD BELOW
// ================================

// Sets the button with the ID 'backToTopButton' to a variable for use later
const displayDim = document.getElementById('displayDim');
const hamburgerButton = document.getElementById('hamburgerButton');
const hamburgerInner = document.getElementById('hamburgerInnerTarget');
const backToTopButton = document.getElementById('backToTopButton');
const rightRailCluster = document.getElementById('rightRailTarget');

const landing = document.getElementById("landing");
const outerNavTarget = document.getElementById("outerNavTarget");
const navTarget = document.getElementById("navTarget");

const rightRailParent = document.getElementById('rightRailParent');

//  Makes a list of all elements that are of class 'parallax'
//  used to perform background image adjustments to create the parallax effect
const ParallaxList = getClassList('parallax');

const HideAfterLandingList = getClassList('hideAfterLanding');




// runs the parallax routine initially because the initial background image position is 'no offset', failure to run this function at least once on page load means that the images will appear to 'jump' to their 'parallax' positions the moment the user scrolls


// Event Listener that triggers the scrollRoutine function every time the user scrolls
window.addEventListener("scroll", scrollRoutine);

// const ulStruct = document.createElement('p');
// ulStruct.appendChild(document.createElement('li'));
const navigationArray = [["top", "Welcome"],["skills","Skills"],["projects", "Projects"],["future","Goals"],["contact","Contact"]];
const altNavigationArray = navigationArray.filter(x => x[1] !== "Welcome");
console.log(altNavigationArray);

//Top Navigation constructor
// for (i of navigationArray) {
// 	document.getElementById("navigationTarget").innerHTML += `<a onclick="scrollToSection('${i[0]}')"><li>${i[1]}</li></a>`;
// }

// Right Rail Navigation constructor
for (i of navigationArray) {
	document.getElementById("rightRailTarget").innerHTML += (
		`<div class="gotoButtonOuter" onclick="scrollToSection('${i[0]}')">
			<div class="gotoButton">
				<div class="gotoLabel">${i[1]}</div>
			</div>
		</div>`
	);
}

// Main navigation constructor
for (i of altNavigationArray) {
	document.getElementById("navTarget").innerHTML += (`<a onclick="scrollToSection('${i[0]}')"><li>${i[1]}</li></a>`);
}

// Hamburger constructor
for (i of navigationArray) {
	document.getElementById('hamburgerInnerTarget').innerHTML += (
		`<div class="hamburger__inner__item" onclick="scrollToSection('${i[0]}'); toggleHamburger();"><div>${i[1]}</div></div>`
	)
}

parallaxRoutine(); 

const projectsList = [{
    "id": 1,
    "name": "Calculator",
    "link": "./projects/calculator/index.html",
    "description": "A basic Javascript calculator with working buttons. Takes digit and operator input. AC and C buttons clear and backspace respectively.",
    "picture": "images/project_calculator.png",
    "language": "Javascript"
},
{
    "id": 2,
    "name": "Quiz",
    "link": "/projects/index.html",
    "description": "A quiz game",
    "picture": "images/red.jpg",
    "language": "Javascript"
}]

for (i of projectsList) {
	document.getElementById('projectsTarget').innerHTML += (
		`<div class="gridCard" style="background-image: url('${i.picture}')">
		<div class="card__title">
			<div class="card__title__inner">${i.name}</div>
		</div>
		<div class="card__content">
			<div class="card__content__upper">
				<p>${i.description}</p>
			</div>
			<div class="card__content__lower">
				<div class="card__content__lower__left">
					<a href="${i.link}" target="_blank">Demo</a>
				</div>
				<div class="card__content__lower__right">
					<div class="card__content__lower__right__button">${i.language}</div>
				</div>
			</div>
		</div>
	</div>`
	)
}

const skillsList = [{
	"id": 1,
	"title": "HTML",
	"titleColorClass": "htmlColor",
	"list": [
		"Basics",
		"Best practicies for tags",
		"linking to css and other resources"
	]
},
{
	"id": 2,
	"title": "CSS",
	"titleColorClass": "cssColor",
	"list": [
		"Specificity (try say that 10 times)",
		"Units, and best practices (e.g. 'rem' for fonts, 'em' for padding/margin)",
		"Flexbox and grid",
		"Selectors and selector logic",
		"Variables",
		"Media Queries",
		"SASS"
	]
},
{
	"id": 3,
	"title": "JavaScript",
	"titleColorClass": "javascriptColor",
	"list": [
		"Event listeners",
		"Querying the page for elements, classes, and IDs",
		"Adding, removing styles",
		"Constructing repeating sections of html",
		"Objects",
		"Loops"
	]
}]

for (i of skillsList) {
	document.getElementById('skillsTarget').innerHTML += (
		`<div class="card">
		<h3 class="${i.titleColorClass}">${i.title}</h3>
		<ul>
			${i.list.map(x => "<li>" + x + "</li>").join("")}
		</ul>
	</div>`
	)
}

const goalsList = [{
	"id": 1,
	"title": "Next",
	"titleColorClass": "",
	"list": [
		"React",
		"Databases"
	]
},
{
	"id": 2,
	"title": "This year",
	"titleColorClass": "",
	"list": [
		"Web apps",
		"Electron",
		"Create tools with Notion API"
	]
},
{
	"id": 3,
	"title": "Someday",
	"titleColorClass": "",
	"list": [

		"macOS apps (Swift)",
		"Raspberry Pi"	
	]
}]

for (i of goalsList) {
	document.getElementById('goalsTarget').innerHTML += (
		`<div class="card">
			<h3>${i.title}</h3>
				<ul>
					${i.list.map(x => "<li>" + x + "</li>").join("")}
				</ul>
		</div>`
	)
}