const profileContainer = document.getElementById("profile-container");
const educationContainer = document.getElementById("education-container");
const aboutContainer = document.getElementById("about-container");
const experienceContainer = document.getElementById("experience-container");
const projectContainer = document.getElementById("project-container");
const certificateContainer = document.getElementById("certificate-container");
const contactContainer = document.getElementById("contact-container");

Promise.all([
fetch("data/profile.json").then(res => res.json()),
fetch("data/education.json").then(res => res.json()),
fetch("data/experience.json").then(res => res.json()),
fetch("data/skill.json").then(res => res.json()),
fetch("data/project.json").then(res => res.json()),
fetch("data/activities.json").then(res => res.json())
])

.then(([profile, education, experience, skills, projects, activities]) => {


/* HERO */

profileContainer.innerHTML = `
    <div class="glass hero-card reveal">

        <img src="${profile.photo}"
             class="profile-img">

        <h1 class="hero-name">
            ${profile.name}
        </h1>

        <h3 class="hero-title">
            ${profile.title}
        </h3>

        <p class="hero-tagline">
            ${profile.tagline}
        </p>

        <div class="hero-buttons">

            <a href="${profile.resume}"
               target="_blank"
               class="btn btn-primary">

                View Resume

            </a>

            <a href="#project"
               class="btn btn-outline">

                My Projects

            </a>

        </div>

    </div>
`;

/* ABOUT */

educationContainer.innerHTML =
education.map(edu => `

<div class="glass reveal" style="margin-bottom:25px;">

    <img src="${edu.logo}"
         class="logo-campus">

    <h2 class="card-title">
        Education
    </h2>

    <h3>${edu.institution}</h3>

    <p>
        <strong>${edu.degree}</strong>
    </p>

    <p>${edu.period}</p>

    <br>

    <p>${edu.description}</p>

</div>

`).join("");


let skillHTML = skills.map(skill => `
    <span class="skill-item">
        ${skill.name}
    </span>
`).join("");

aboutContainer.innerHTML = `
    <div class="glass reveal">

        <h2 class="card-title">
            About me
        </h2>

        <p>
            ${profile.about}
        </p>

        <h2 class="card-title"
            style="margin-top:30px">
            Skills
        </h2>

        <div class="skill-grid">
            ${skillHTML}
        </div>

    </div>
`;

/* EXPERIENCE */
/* EXPERIENCE */

let expHTML = experience.map(exp => `

<div class="glass reveal">

    <h2 class="card-title">
        Professional Experience
    </h2>

    <h3>${exp.position}</h3>

    <p>
        <strong>${exp.company}</strong>
    </p>

    <small>${exp.period}</small>

    <br><br>

    <p>${exp.description}</p>

   <div class="experience-slider">

    <img
        src="${exp.images[0]}"
        class="experience-main-image"
        id="exp-slider-image">

    <div class="experience-dots">

        ${exp.images.map((img,index)=>`

            <span
                class="dot ${index===0 ? 'active' : ''}"
                data-image="${img}">
            </span>

        `).join('')}

    </div>

</div>

</div>

`).join("");

experienceContainer.innerHTML = expHTML;

/* PROJECT */

projectContainer.innerHTML =
projects.map(project => `

    <div class="glass project-card reveal">

        <img src="${project.image}">

        <h3>
            ${project.title}
        </h3>

        <p>
            ${project.description}
        </p>

        <br>

        <div class="skill-grid">

            ${project.technologies.map(tech => `
                <span class="skill-item">
                    ${tech}
                </span>
            `).join("")}

        </div>

    </div>

`).join("");

/* CERTIFICATE */

certificateContainer.innerHTML = `

    <div class="certificate-grid">

        ${activities.certificates.map(cert => `

            <div class="glass certificate-card reveal">

                <img src="${cert.image}">

                <h3>${cert.title}</h3>

                <p>${cert.issuer}</p>

                <small>${cert.year}</small>

                <br><br>

                <a href="${cert.file}"
                   target="_blank"
                   class="btn btn-primary">

                   View Certificate

                </a>

            </div>

        `).join("")}

    </div>

`;

/* CONTACT & ORGANIZATION  EXPERIENCE*/
let orgHTML =
activities.organizations.map(org => `

    <div class="timeline-item">

        <h4>${org.name}</h4>

        <p>${org.position}</p>

        <small>${org.period}</small>

    </div>

`).join("");

certificateContainer.innerHTML += `

    <br><br>

    <div class="glass reveal">

        <h2 class="card-title">
            Organization Experience
        </h2>

        ${orgHTML}

    </div>

`;
contactContainer.innerHTML = `

<div class="glass contact-card reveal">

    <div class="social-contact">

        <a href="mailto:whyu.hida098@gmail.com">
            <i class="fa-solid fa-envelope"></i>
        </a>

        <a href="https://wa.me/6285942271030" target="_blank">
            <i class="fa-brands fa-whatsapp"></i>
        </a>

        <a href="https://instagram.com/ayuhida___" target="_blank">
            <i class="fa-brands fa-instagram"></i>
        </a>

        <a href="https://linkedin.com/in/wahyu-hidayati-365381383" target="_blank">
            <i class="fa-brands fa-linkedin"></i>
        </a>

    </div>

</div>


`;

revealAnimation();


})

.catch(error => {
console.error(error);
});

/* ANIMATION */

function revealAnimation(){


const reveals =
document.querySelectorAll(".reveal");

function checkReveal(){

    reveals.forEach(item => {

        const top =
        item.getBoundingClientRect().top;

        const windowHeight =
        window.innerHeight;

        if(top < windowHeight - 100){

            item.classList.add("active");

        }

    });

}

checkReveal();

window.addEventListener(
    "scroll",
    checkReveal
);


}

/* PROGRESS BAR */

window.addEventListener(
"scroll",
() => {


    let scrollTop =
    document.documentElement.scrollTop;

    let docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    let progress =
    (scrollTop / docHeight) * 100;

    document.getElementById(
        "progress-bar"
    ).style.width =
    progress + "%";

}


);

/* ACTIVE MENU */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {


let current = "";

sections.forEach(section => {

    const sectionTop =
    section.offsetTop;

    if(
        pageYOffset >= sectionTop - 200
    ){
        current =
        section.getAttribute("id");
    }

});

navLinks.forEach(link => {

    link.classList.remove("active");

    if(
        link.getAttribute("href")
        === "#" + current
    ){
        link.classList.add("active");
    }

});


});
/* EXPERIENCE SLIDER */

document.addEventListener("click", function(e){

    if(e.target.classList.contains("dot")){

        document
        .querySelectorAll(".dot")
        .forEach(dot =>
            dot.classList.remove("active")
        );

        e.target.classList.add("active");

        document.getElementById(
            "exp-slider-image"
        ).src =
        e.target.dataset.image;

    }

});
/* PROJECT SLIDER */

window.addEventListener("load", () => {

    const slider =
    document.getElementById("project-container");

    const nextBtn =
    document.getElementById("nextProject");

    const prevBtn =
    document.getElementById("prevProject");

    const cards =
    document.querySelectorAll(".project-card");

    let currentIndex = 0;

    const visibleCards = 3;

    function updateSlider(){

        const gap = 25;

        const cardWidth =
        cards[0].offsetWidth + gap;

        slider.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;

    }

    nextBtn.addEventListener("click", () => {

        if(
            currentIndex <
            cards.length - visibleCards
        ){

            currentIndex++;

            updateSlider();

        }

    });

    prevBtn.addEventListener("click", () => {

        if(currentIndex > 0){

            currentIndex--;

            updateSlider();

        }

    });

    window.addEventListener(
        "resize",
        updateSlider
    );

});