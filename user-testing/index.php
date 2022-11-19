<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>EDGE Learning System</title>
    <meta name="description" content="EDGE - User Testing Annoucement">
    <base href="/">
    <!-- <base href="/edge/"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#002A53">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="styles/main.css" rel="stylesheet">
    <link href="styles/style.css" rel="stylesheet">
    <link href="styles/gallery.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
        crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />

</head>

<body class="mat-typography">
    <div class="app-root">
        <div id="top-gradient">
            <div id="grad-left">
                <div id="grad-left-container">
                    <p id="edge">EDGE</p>
                    <p id="sub-bold">The Game Based e-Learning Platform</p>
                    <p id="sub">Alpha Testing Announcement</p>
                </div>
            </div>
            <div id="grad-right">
                <div id="links">
                    <a href="#section-annoncement">
                        <div class="link" id="link-announcement">
                            <span class="link-name">Annoucement</span>
                            <span class="link-img"><img class="noselect" src="assets/next.png" /></span>
                        </div>
                    </a>
                    <a href="#section-howtojoin">
                        <div class="link" id="link-join">
                            <span class="link-name">How to Join</span>
                            <span class="link-img"><img class="noselect" src="assets/next.png" /></span>
                        </div>
                    </a>
                    <a href="#section-faq">
                        <div class="link" id="link-faq">
                            <span class="link-name">F.A.Q.</span>
                            <span class="link-img"><img class="noselect" src="assets/next.png" /></span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <img class="no-select" id="bottom-image" src="assets/btmimg_faded.jpg" />
    </div>

    <!-- Section: Announcement -->

    <div id="section-annoncement" class="section">
        <h3>📣 Annoucement</h3>
        <div class="section-heading-underline"></div>
        <div class="section-body">
            <p>
                EDGE is a platform to create, play and manage game-based e-learning content.
            </p>

            <p>
                EDGE was created as a Postgraduate student project for the <a
                    href="https://ucsc.cmb.ac.lk/mit/">University of Colombo School of Computing.</a>
            </p>

            <p class="d-none d-md-block">
                The system is now ready to be tested, but <span class="bold">we need your help!</span>
            </p>

            <p class="d-block d-md-none">
                The system is now ready to be tested, <br>
                but <span class="bold">we need your help!</span>
            </p>

            <br>

            <p>
                If you are a <span class="bold">Teacher, Student or Parent</span> you can help shape the future of Sri
                Lankan Education, by helping test the EDGE system.
            </p>

            <p>
            <div class="footer-elem-btn" onclick="goTohowToJoin()">Yes, I want to help</div>
            </p>
        </div>
    </div>

    <!-- Section: Screenshots -->

    <div id="section-screenshots" class="section">
        <h3>📸 Screenshots</h3>
        <div class="section-heading-underline"></div>
        <div class="section-body">

            <p>
                Here's what EDGE looks like today
            </p>

            <div class="gallery">
                <a href="assets/screenshots/1.png" class="glightbox" data-gallery="1">
                    <img src="assets/screenshots/thumbs/1.png" />
                </a>

                <a href="assets/screenshots/2.png" class="glightbox" data-gallery="1">
                    <img src="assets/screenshots/thumbs/2.png" />
                </a>

                <a href="assets/screenshots/3.png" class="glightbox" data-gallery="1">
                    <img src="assets/screenshots/thumbs/3.png" />
                </a>

                <a href="assets/screenshots/4.png" class="glightbox" data-gallery="1">
                    <img src="assets/screenshots/thumbs/4.png" />
                </a>

                <a href="assets/screenshots/5.png" class="glightbox" data-gallery="1">
                    <img src="assets/screenshots/thumbs/5.png" />
                </a>

                <a href="assets/screenshots/6.png" class="glightbox" data-gallery="1">
                    <img src="assets/screenshots/thumbs/6.png" />
                </a>

                <a href="assets/screenshots/7.png" class="glightbox" data-gallery="1">
                    <img src="assets/screenshots/thumbs/7.png" />
                </a>

                <a href="assets/screenshots/8.png" class="glightbox" data-gallery="1">
                    <img src="assets/screenshots/thumbs/8.png" />
                </a>

                <a href="assets/screenshots/9.png" class="glightbox" data-gallery="1">
                    <img src="assets/screenshots/thumbs/9.png" />
                </a>
            </div>

            <br>

        </div>
    </div>

    <!-- Section: Eligibility -->

    <div id="section-eligibility" class="section">
        <h3>🪜 Eligibility</h3>
        <div class="section-heading-underline"></div>
        <div class="section-body">
            <p>
                To join the user testing session, you must be either a Teacher, Student or Parent.
            </p>
            <p>
                You must also be able to speak and understand basic English.
            </p>
            <p>
            <div id="eligibility-req" class="bullet-list">
                <ul>
                    <li>If you are Teacher,</li>
                    <ul>
                        <li>You must be teaching in a Sri Lankan School</li>
                        <li>You must be literate in basic IT skills</li>
                    </ul>
                    <li>If you are Student,</li>
                    <ul>
                        <li>You must be studying in a Sri Lankan School</li>
                        <li>You must be between ages 12 - 14 (inclusive)</li>
                        <li>You must be accompanied by your parent</li>
                        <li>You cannot join the session by yourself</li>
                    </ul>
                    <li>If you are Parent,</li>
                    <ul>
                        <li>You must have a child studying in a Sri Lankan School</li>
                        <li>You can register with your child if they are eligibile, but this is not required</li>
                        <li>You can join the session by yourself</li>
                    </ul>
                </ul>
            </div>
            </p>
            <p>
                Please explore the F.A.Q. section if you need more information.
            </p>
        </div>
    </div>

    <!-- Section: How to Join -->

    <div id="section-howtojoin" class="section">
        <h3>🤝 How to Join</h3>
        <div class="section-heading-underline"></div>
        <div class="section-body">
            <p>
                At the time of the event, all registered users will receive a Google Meet link via email.
            </p>
            <p>
                All users will be provided exclusive access to the new system via a URL.
            </p>
            <p>
                You will be guided by our team, and we will collect feedback at the end of the session.
            </p>
            <p>
                Afterwards, all testers will be rewarded with a small non-montary gift via the same email your
                reigstered with.
            </p>
            <br>
            <div id="event-details" class="emphasis-box">
                <div class="emphasis-box-inner">
                    <p>
                        <span class="bold">Date:</span> 21<sup>st</sup> (Monday) November 2022
                    </p>
                    <p>
                        <span class="bold">Time:</span> 06:00 PM - 08:00 PM (2 hours)
                    </p>
                    <p>
                        <span class="bold">Meeting Platform: </span><span class="gmeet-icon"> <img
                                src="assets/googlemeet.png" /> Google Meet</span>
                    </p>
                </div>
            </div>
            <br>
            <p>
                Register on the below form to be invited to the User Testing Google Meet session.
            </p>
            <p>
            <div class="footer-elem-btn" onclick="register()">I want to Register</div>
            </p>
        </div>
    </div>

    <!-- Section: How to Join -->

    <div id="section-faq" class="section">
        <h3>🧐 Frequently Asked Questions</h3>
        <div class="section-heading-underline"></div>
        <div class="section-body">
            <div class="accordion accordion-flush" id="faq-accordion">

                <!-- FAQ 1 -->

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                            Who is conducting this session?
                        </button>
                    </h2>
                    <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                        <div class="accordion-body">
                            <p>
                                The user testing session will be conducted by <a href="https://www.linkedin.com/in/thisura-dodangoda/" class="no-decoration">Thisura Dodangoda</a>, the creator of the 'EDGE' - a game-based E-Learning system.
                            </p>
                            <p>
                                The EDGE system was created as the thesis project for the Master of Information Technology programme at University of Colombo School of Computing. The project is supervised by, <span>Dr. M. I. E. Wickramasinghe</span>. of the UCSC.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- FAQ 2 -->

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                            How should I test the system?
                        </button>
                    </h2>
                    <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                        <div class="accordion-body">
                            <p>
                                <ol>
                                    <li>You will be first provided information about the system during the online session.</li>
                                    <li>A link will be given and you need to open it in your Web Browser.</li>
                                    <li>Login with the email and password provided by us.</li>
                                    <li>Our team will guide you, and you just need to test out the system.</li>
                                    <li>Finally, we will hand out a Google Form to collect your feedback.</li>
                                </ol>
                            </p>
                            <p>
                                If you encounter a problem, just raise your hand 🖐 in the Google Meet. Someone from the moderation team will help you out.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- FAQ 3 -->

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                            Privacy concerns
                        </button>
                    </h2>
                    <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                        <div class="accordion-body">
                            <p>
                                The EDGE system is designed to never collect personal user information other than user's name and email. For example, the system does not store the age of students.
                            </p>
                            <p>
                                While we recommend you provide your given name, it is entirely possible to provide a fake name (e.g. User001) during testing. Further, the email you register will not be your real email. It will be a fake email provided by us.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- FAQ 4 -->

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                            What rewards do I get for testing?
                        </button>
                    </h2>
                    <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                        <div class="accordion-body">
                            <p>
                                The EDGE system is a postgraduate thesis project and is not funded by any institution as of November 2022. That being said, I (Thisura) am hoping to provide a small non-monetary reward (e.g. a voucher / gift card) to all users who complete the user testing process.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- FAQ 5 -->

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                            I want to ask you a question. How can I contact you?
                        </button>
                    </h2>
                    <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                        <div class="accordion-body">
                            <p>
                                You can reach me (Thisura) using my email address: thisura1998@gmail.com
                            </p>
                            <p>
                                You can also reach me on <a href="https://www.linkedin.com/in/thisura-dodangoda/">LinkedIn</a> and <a href="https://www.facebook.com/thisura.dodangoda">Facebook</a>.
                            </p>
                            <p>
                                If you would like to contact me via mobile, please reach me on Whatsapp: +94 77 336 1054
                            </p>
                            <p>
                                <img class="thisura_whatsapp mx-auto d-block" src="assets/thisura_whatsapp.jpeg"/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <br>
    <br>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
    <script src="scripts/main.js"></script>
    <script src="scripts/gallery.js"></script>

</body>

</html>