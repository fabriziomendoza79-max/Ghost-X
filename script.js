document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const loginScreen =
        document.getElementById("loginScreen");

    const mainPanel =
        document.getElementById("mainPanel");

    const continueBtn =
        document.getElementById("continueBtn");

    const loginForm =
        document.getElementById("loginForm");

    const registerForm =
        document.getElementById("registerForm");

    const loginFormContainer =
        document.getElementById("loginFormContainer");

    const registerFormContainer =
        document.getElementById("registerFormContainer");

    const showRegisterBtn =
        document.getElementById("showRegister");

    const backLoginBtn =
        document.getElementById("showLogin");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const userDisplay =
        document.getElementById("userDisplay");

    const musica =
        document.getElementById("musica");

    const customCursor =
        document.getElementById("customCursor");

    const modal =
        document.getElementById("modal");

    const closeModal =
        document.getElementById("closeModal");

    const modalButton =
        document.getElementById("modalButton");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalMessage =
        document.getElementById("modalMessage");

    const loadingOverlay =
        document.getElementById("loadingOverlay");


    /* =====================================================
       USUARIOS
    ====================================================== */

    const users = {
        admin: "1234"
    };


    /* =====================================================
       MÚSICA
    ====================================================== */

    let musicaIniciada = false;

    function iniciarMusica() {

        if (!musica) {
            return;
        }

        musica.volume = 0.35;

        musica.play()
            .then(() => {

                musicaIniciada = true;

            })
            .catch(() => {

                /*
                   El navegador puede bloquear el audio
                   hasta que exista una interacción.
                */

            });

    }


    /* =====================================================
       CURSOR
    ====================================================== */

    document.addEventListener(
        "mousemove",
        (event) => {

            if (customCursor) {

                customCursor.style.left =
                    event.clientX + "px";

                customCursor.style.top =
                    event.clientY + "px";

            }

            /*
               Intentamos activar la música al mover
               el cursor.
            */

            if (!musicaIniciada) {
                iniciarMusica();
            }

        }
    );


    /* =====================================================
       CLIC PARA MÚSICA
    ====================================================== */

    document.addEventListener(
        "click",
        () => {

            if (!musicaIniciada) {
                iniciarMusica();
            }

        }
    );


    /* =====================================================
       MODAL
    ====================================================== */

    function showModal(title, message) {

        if (!modal) {
            return;
        }

        if (modalTitle) {
            modalTitle.textContent = title;
        }

        if (modalMessage) {
            modalMessage.textContent = message;
        }

        modal.style.display = "flex";

    }


    function closeModalWindow() {

        if (modal) {
            modal.style.display = "none";
        }

    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeModalWindow
        );

    }


    if (modalButton) {

        modalButton.addEventListener(
            "click",
            closeModalWindow
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (event.target === modal) {

                    closeModalWindow();

                }

            }
        );

    }


    /* =====================================================
       LOADING
    ====================================================== */

    function showLoading() {

        if (loadingOverlay) {

            loadingOverlay.style.display =
                "flex";

        }

    }


    function hideLoading() {

        if (loadingOverlay) {

            loadingOverlay.style.display =
                "none";

        }

    }


    /* =====================================================
       CONTINUAR
    ====================================================== */

    if (continueBtn) {

        continueBtn.addEventListener(
            "click",
            () => {

                iniciarMusica();

                if (welcomeScreen) {

                    welcomeScreen.style.display =
                        "none";

                }

                if (loginScreen) {

                    loginScreen.style.display =
                        "flex";

                }

                const loginVideo =
                    document.getElementById("loginVideo");

                if (loginVideo) {

                    loginVideo.play()
                        .catch(() => {});

                }

            }
        );

    }


    /* =====================================================
       MOSTRAR REGISTRO
    ====================================================== */

    if (showRegisterBtn) {

        showRegisterBtn.addEventListener(
            "click",
            () => {

                if (loginFormContainer) {

                    loginFormContainer.style.display =
                        "none";

                }

                if (registerFormContainer) {

                    registerFormContainer.style.display =
                        "block";

                }

            }
        );

    }


    /* =====================================================
       VOLVER AL LOGIN
    ====================================================== */

    if (backLoginBtn) {

        backLoginBtn.addEventListener(
            "click",
            () => {

                if (registerFormContainer) {

                    registerFormContainer.style.display =
                        "none";

                }

                if (loginFormContainer) {

                    loginFormContainer.style.display =
                        "block";

                }

            }
        );

    }


    /* =====================================================
       REGISTRO
    ====================================================== */

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const usernameInput =
                    document.getElementById(
                        "regUsername"
                    );

                const passwordInput =
                    document.getElementById(
                        "regPassword"
                    );

                const confirmInput =
                    document.getElementById(
                        "regConfirmPassword"
                    );


                const username =
                    usernameInput
                        ? usernameInput.value.trim()
                        : "";

                const password =
                    passwordInput
                        ? passwordInput.value
                        : "";

                const confirmPassword =
                    confirmInput
                        ? confirmInput.value
                        : "";


                if (username.length < 3) {

                    showModal(
                        "USUARIO INVÁLIDO",
                        "El usuario debe tener al menos 3 caracteres."
                    );

                    return;
                }


                if (password.length < 4) {

                    showModal(
                        "CONTRASEÑA INVÁLIDA",
                        "La contraseña debe tener al menos 4 caracteres."
                    );

                    return;
                }


                if (password !== confirmPassword) {

                    showModal(
                        "CONTRASEÑAS DIFERENTES",
                        "Las contraseñas no coinciden."
                    );

                    return;
                }


                if (users[username]) {

                    showModal(
                        "USUARIO EXISTENTE",
                        "Ese usuario ya está registrado."
                    );

                    return;
                }


                users[username] =
                    password;


                if (usernameInput) {
                    usernameInput.value = "";
                }

                if (passwordInput) {
                    passwordInput.value = "";
                }

                if (confirmInput) {
                    confirmInput.value = "";
                }


                if (registerFormContainer) {

                    registerFormContainer.style.display =
                        "none";

                }

                if (loginFormContainer) {

                    loginFormContainer.style.display =
                        "block";

                }


                showModal(
                    "CUENTA CREADA",
                    "Tu cuenta fue creada correctamente. Ahora puedes iniciar sesión."
                );

            }
        );

    }


    /* =====================================================
       LOGIN
    ====================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const usernameInput =
                    document.getElementById(
                        "usernameInput"
                    );

                const passwordInput =
                    document.getElementById(
                        "passwordInput"
                    );


                const username =
                    usernameInput
                        ? usernameInput.value.trim()
                        : "";

                const password =
                    passwordInput
                        ? passwordInput.value
                        : "";


                if (
                    users[username] &&
                    users[username] === password
                ) {

                    showLoading();


                    setTimeout(
                        () => {

                            hideLoading();

                            openPanel(
                                username
                            );

                        },
                        700
                    );


                } else {

                    showModal(
                        "DATOS INCORRECTOS",
                        "El usuario o la contraseña no son correctos."
                    );

                }

            }
        );

    }


    /* =====================================================
       ABRIR PANEL
    ====================================================== */

    function openPanel(username) {

        if (welcomeScreen) {

            welcomeScreen.style.display =
                "none";

        }

        if (loginScreen) {

            loginScreen.style.display =
                "none";

        }

        if (mainPanel) {

            mainPanel.style.display =
                "block";

        }


        if (userDisplay) {

            userDisplay.textContent =
                username;

        }


        showStoreView(
            "home"
        );

    }


    /* =====================================================
       CAMBIAR VISTAS
    ====================================================== */

    function showStoreView(viewName) {

        const views = {

            home:
                document.getElementById(
                    "homeView"
                ),

            features:
                document.getElementById(
                    "featuresView"
                ),

            panel:
                document.getElementById(
                    "panelView"
                ),

            prices:
                document.getElementById(
                    "pricesView"
                )

        };


        Object.values(views)
            .forEach(
                (view) => {

                    if (view) {

                        view.classList
                            .remove("active");

                    }

                }
            );


        if (views[viewName]) {

            views[viewName]
                .classList
                .add("active");

        }


        const navButtons = {

            home:
                document.getElementById(
                    "homeNavBtn"
                ),

            features:
                document.getElementById(
                    "featuresNavBtn"
                ),

            panel:
                document.getElementById(
                    "panelNavBtn"
                ),

            prices:
                document.getElementById(
                    "pricesNavBtn"
                )

        };


        Object.values(navButtons)
            .forEach(
                (button) => {

                    if (button) {

                        button.classList
                            .remove("active");

                    }

                }
            );


        if (navButtons[viewName]) {

            navButtons[viewName]
                .classList
                .add("active");

        }

    }


    /* =====================================================
       NAVEGACIÓN
    ====================================================== */

    const homeNavBtn =
        document.getElementById(
            "homeNavBtn"
        );

    const featuresNavBtn =
        document.getElementById(
            "featuresNavBtn"
        );

    const panelNavBtn =
        document.getElementById(
            "panelNavBtn"
        );

    const pricesNavBtn =
        document.getElementById(
            "pricesNavBtn"
        );


    if (homeNavBtn) {

        homeNavBtn.addEventListener(
            "click",
            () => {

                showStoreView(
                    "home"
                );

            }
        );

    }


    if (featuresNavBtn) {

        featuresNavBtn.addEventListener(
            "click",
            () => {

                showStoreView(
                    "features"
                );

            }
        );

    }


    if (panelNavBtn) {

        panelNavBtn.addEventListener(
            "click",
            () => {

                showStoreView(
                    "panel"
                );

            }
        );

    }


    if (pricesNavBtn) {

        pricesNavBtn.addEventListener(
            "click",
            () => {

                showStoreView(
                    "prices"
                );

            }
        );

    }


    /* =====================================================
       VER PANEL DESDE HOME
    ====================================================== */

    const homePanelBtn =
        document.getElementById(
            "homePanelBtn"
        );

    if (homePanelBtn) {

        homePanelBtn.addEventListener(
            "click",
            () => {

                showStoreView(
                    "panel"
                );

            }
        );

    }


    /* =====================================================
       VER PRECIOS
    ====================================================== */

    document
        .querySelectorAll(".go-prices")
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        showStoreView(
                            "prices"
                        );

                    }
                );

            }
        );


    /* =====================================================
       BOTONES DE COMPRA
    ====================================================== */

    document
        .querySelectorAll(".buy-price")
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const product =
                            button.dataset.product;

                        const price =
                            button.dataset.price;


                        const phone =
                            "51937074085";


                        const message =
                            `Hola, quiero comprar el plan ${product} de Ghost X por S/ ${price}.`;


                        const whatsappURL =
                            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


                        window.open(
                            whatsappURL,
                            "_blank"
                        );

                    }
                );

            }
        );


    /* =====================================================
       CERRAR SESIÓN
    ====================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                showLoading();


                setTimeout(
                    () => {

                        hideLoading();


                        if (mainPanel) {

                            mainPanel.style.display =
                                "none";

                        }


                        if (loginScreen) {

                            loginScreen.style.display =
                                "flex";

                        }


                        if (loginFormContainer) {

                            loginFormContainer.style.display =
                                "block";

                        }


                        if (registerFormContainer) {

                            registerFormContainer.style.display =
                                "none";

                        }


                        const usernameInput =
                            document.getElementById(
                                "usernameInput"
                            );

                        const passwordInput =
                            document.getElementById(
                                "passwordInput"
                            );


                        if (usernameInput) {

                            usernameInput.value =
                                "";

                        }

                        if (passwordInput) {

                            passwordInput.value =
                                "";

                        }

                    },
                    500
                );

            }
        );

    }


    /* =====================================================
       PARTÍCULAS AL HACER CLICK
    ====================================================== */

    document.addEventListener(
        "click",
        (event) => {

            for (
                let i = 0;
                i < 5;
                i++
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );


                particle.style.position =
                    "fixed";

                particle.style.left =
                    event.clientX + "px";

                particle.style.top =
                    event.clientY + "px";

                particle.style.width =
                    "5px";

                particle.style.height =
                    "5px";

                particle.style.borderRadius =
                    "50%";

                particle.style.background =
                    "#a78bfa";

                particle.style.pointerEvents =
                    "none";

                particle.style.zIndex =
                    "999999";


                const angle =
                    Math.random() *
                    Math.PI *
                    2;

                const distance =
                    20 +
                    Math.random() *
                    35;


                const x =
                    Math.cos(angle) *
                    distance;

                const y =
                    Math.sin(angle) *
                    distance;


                particle.animate(
                    [
                        {
                            transform:
                                "translate(0, 0) scale(1)",

                            opacity: 1
                        },

                        {
                            transform:
                                `translate(${x}px, ${y}px) scale(0)`,

                            opacity: 0
                        }
                    ],
                    {
                        duration: 500,

                        easing:
                            "ease-out"
                    }
                );


                document.body.appendChild(
                    particle
                );


                setTimeout(
                    () => {

                        particle.remove();

                    },
                    500
                );

            }

        }
    );

});