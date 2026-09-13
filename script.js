document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SUPABASE
    ====================================================== */
const SUPABASE_URL = "https://vumpklurbsybsiimivjx.supabase.co";
const SUPABASE_KEY = "sb_publishable_V-d8DkvBE4kd5As2dhLxPw_7grfO9aQ";

    const supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


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
       MÚSICA
    ====================================================== */

    let musicaIniciada = false;

    function iniciarMusica() {

        if (!musica) {
            return;
        }

        if (musicaIniciada) {
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
       RESGUARDO LOCAL DE CUENTAS
    ====================================================== */

    const accountsKey = "ghostx_accounts";

    function guardarCuentaLocal(username, email) {

        try {

            const stored = JSON.parse(
                localStorage.getItem(accountsKey) || "{}"
            );

            const clave = username.toLowerCase();

            stored[clave] = email;

            localStorage.setItem(
                accountsKey,
                JSON.stringify(stored)
            );

        } catch (error) {

            console.error(
                "Error guardando cuenta local:",
                error
            );

        }

    }

    function obtenerCorreoLocal(username) {

        try {

            const stored = JSON.parse(
                localStorage.getItem(accountsKey) || "{}"
            );

            const clave = username.toLowerCase();

            if (stored[clave]) {

                return stored[clave];

            }

            for (const key in stored) {

                if (
                    stored[key] &&
                    key.toLowerCase() === clave
                ) {

                    return stored[key];

                }

            }

            return null;

        } catch (error) {

            console.error(
                "Error leyendo cuenta local:",
                error
            );

            return null;

        }

    }


    /* =====================================================
       REGISTRO CON SUPABASE
    ====================================================== */

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const usernameInput =
                    document.getElementById("regUsername");

                const emailInput =
                    document.getElementById("regEmail");

                const passwordInput =
                    document.getElementById("regPassword");

                const confirmInput =
                    document.getElementById(
                        "regConfirmPassword"
                    );


                const username =
                    usernameInput
                        ? usernameInput.value.trim()
                        : "";

                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";

                const password =
                    passwordInput
                        ? passwordInput.value
                        : "";

                const confirmPassword =
                    confirmInput
                        ? confirmInput.value
                        : "";


                /* =================================================
                   VALIDACIONES
                ================================================== */

                if (username.length < 3) {

                    showModal(
                        "USUARIO INVÁLIDO",
                        "El usuario debe tener al menos 3 caracteres."
                    );

                    return;
                }


                if (!email || !email.includes("@")) {

                    showModal(
                        "CORREO INVÁLIDO",
                        "Introduce un correo electrónico válido."
                    );

                    return;
                }


                if (password.length < 6) {

                    showModal(
                        "CONTRASEÑA INVÁLIDA",
                        "La contraseña debe tener al menos 6 caracteres."
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


                showLoading();


                try {

                    /* =================================================
                       COMPROBAR USERNAME
                    ================================================== */

                    let usuarioExiste = false;

                    try {

                        const {
                            data: existingProfile,
                            error: profileError
                        } = await supabaseClient
                            .from("profiles")
                            .select("id")
                            .eq("username", username)
                            .maybeSingle();


                        if (profileError) {

                            console.error(
                                "Error comprobando usuario:",
                                profileError
                            );

                        }


                        if (existingProfile) {

                            usuarioExiste = true;

                        }

                    } catch (error) {

                        console.error(
                            "Error comprobando el usuario:",
                            error
                        );

                    }


                    if (usuarioExiste) {

                        hideLoading();

                        showModal(
                            "USUARIO EXISTENTE",
                            "Ese usuario ya está registrado."
                        );

                        return;
                    }


                    /* =================================================
                       CREAR CUENTA
                    ================================================== */

                    const {
                        data,
                        error
                    } = await supabaseClient.auth.signUp({

                        email: email,

                        password: password,

                        options: {
                            data: {
                                username: username
                            }
                        }

                    });


                    if (error) {

                        console.error(
                            "Error registrando:",
                            error
                        );

                        const esCorreoUsado =
                            error.message
                                .toLowerCase()
                                .includes("already registered");


                        if (esCorreoUsado) {

                            /*
                                Si la cuenta ya existe,
                                se intenta entrar con
                                los mismos datos.
                            */

                            const {
                                data: loginData,
                                error: loginError
                            } = await supabaseClient.auth.signInWithPassword({

                                email: email,

                                password: password

                            });


                            if (!loginError) {

                                guardarCuentaLocal(
                                    username,
                                    email
                                );


                                if (
                                    loginData &&
                                    loginData.user
                                ) {

                                    try {

                                        await supabaseClient
                                            .from("profiles")
                                            .insert({

                                                id: loginData.user.id,

                                                username: username,

                                                email: email

                                            });

                                    } catch (perfilError) {

                                        console.error(
                                            "Error creando perfil:",
                                            perfilError
                                        );

                                    }

                                }


                                hideLoading();

                                openPanel(
                                    username
                                );

                                showModal(
                                    "BIENVENIDO",
                                    "Tu cuenta ya existía y entraste correctamente."
                                );

                                return;
                            }


                            hideLoading();

                            showModal(
                                "ERROR DE REGISTRO",
                                "Ese correo ya está registrado pero la contraseña no coincide. Entra con tu contraseña real."
                            );

                            return;
                        }


                        hideLoading();

                        showModal(
                            "ERROR DE REGISTRO",
                            "No se pudo crear la cuenta."
                        );

                        return;
                    }


                    /* =================================================
                       GUARDAR PERFIL
                    ================================================== */

                    if (data.user) {

                        const {
                            error: insertError
                        } = await supabaseClient
                            .from("profiles")
                            .insert({

                                id: data.user.id,

                                username: username,

                                email: email

                            });


                        if (insertError) {

                            console.error(
                                "Error creando perfil:",
                                insertError
                            );

                            /*
                                Si el correo requiere confirmación,
                                el usuario puede necesitar confirmar
                                su correo antes de iniciar sesión.
                            */

                        }

                    }


                    if (data.user) {

                        guardarCuentaLocal(
                            username,
                            email
                        );

                    }


                    if (usernameInput) {
                        usernameInput.value = "";
                    }

                    if (emailInput) {
                        emailInput.value = "";
                    }

                    if (passwordInput) {
                        passwordInput.value = "";
                    }

                    if (confirmInput) {
                        confirmInput.value = "";
                    }


                    hideLoading();

                    openPanel(
                        username
                    );

                    showModal(
                        "CUENTA CREADA",
                        "Tu cuenta fue creada. Bienvenido a Ghost X."
                    );


                } catch (error) {

                    console.error(
                        "Error inesperado:",
                        error
                    );

                    hideLoading();

                    showModal(
                        "ERROR",
                        "Ocurrió un error al crear la cuenta."
                    );

                }

            }
        );

    }


    /* =====================================================
       LOGIN CON SUPABASE
    ====================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async (event) => {

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


                if (!username || !password) {

                    showModal(
                        "DATOS INCOMPLETOS",
                        "Introduce tu usuario y contraseña."
                    );

                    return;
                }


                showLoading();


                try {

                    /* =================================================
                       BUSCAR USUARIO POR USERNAME
                    ================================================== */

                    let emailCuenta = null;

                    if (username.includes("@")) {

                        emailCuenta = username;

                    } else {

                        try {

                            const {
                                data: profile,
                                error: profileError
                            } = await supabaseClient
                                .from("profiles")
                                .select("email, username")
                                .eq("username", username)
                                .maybeSingle();


                            if (profileError) {

                                console.error(
                                    "Error buscando usuario:",
                                    profileError
                                );

                            }


                            if (profile) {

                                emailCuenta = profile.email;

                            }

                        } catch (error) {

                            console.error(
                                "Error consultando la cuenta:",
                                error
                            );

                        }


                        if (!emailCuenta) {

                            emailCuenta =
                                obtenerCorreoLocal(
                                    username
                                );

                        }

                    }


                    if (!emailCuenta) {

                        hideLoading();

                        showModal(
                            "DATOS INCORRECTOS",
                            "El usuario o la contraseña no son correctos."
                        );

                        return;
                    }


                    /* =================================================
                       INICIAR SESIÓN
                    ================================================== */

                    const {
                        data,
                        error
                    } = await supabaseClient.auth.signInWithPassword({

                        email: emailCuenta,

                        password: password

                    });


                    if (error) {

                        console.error(
                            "Error iniciando sesión:",
                            error
                        );

                        hideLoading();

                        showModal(
                            "DATOS INCORRECTOS",
                            "El usuario o la contraseña no son correctos."
                        );

                        return;
                    }


                    /* =================================================
                       ENTRAR AL PANEL
                    ================================================== */

                    hideLoading();

                    openPanel(
                        username
                    );


                } catch (error) {

                    console.error(
                        "Error inesperado:",
                        error
                    );

                    hideLoading();

                    showModal(
                        "ERROR",
                        "Ocurrió un error al iniciar sesión."
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


        showStoreView("home");

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

                showStoreView("home");

            }
        );

    }


    if (featuresNavBtn) {

        featuresNavBtn.addEventListener(
            "click",
            () => {

                showStoreView("features");

            }
        );

    }


    if (panelNavBtn) {

        panelNavBtn.addEventListener(
            "click",
            () => {

                showStoreView("panel");

            }
        );

    }


    if (pricesNavBtn) {

        pricesNavBtn.addEventListener(
            "click",
            () => {

                showStoreView("prices");

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

                showStoreView("panel");

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

                        showStoreView("prices");

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
       CERRAR SESIÓN CON SUPABASE
    ====================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            async () => {

                showLoading();


                try {

                    await supabaseClient.auth.signOut();

                } catch (error) {

                    console.error(
                        "Error cerrando sesión:",
                        error
                    );

                }


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


                        /*
                            La música NO se detiene.
                        */

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


    /* =====================================================
       COMPROBAR SESIÓN ACTUAL
    ====================================================== */

    async function comprobarSesion() {

        try {

            const {
                data: {
                    session
                }
            } = await supabaseClient.auth.getSession();


            if (!session) {
                return;
            }


            let username =
                null;

            try {

                const {
                    data: profile
                } = await supabaseClient
                    .from("profiles")
                    .select("username")
                    .eq("id", session.user.id)
                    .maybeSingle();


                if (profile) {

                    username =
                        profile.username;

                }

            } catch (error) {

                console.error(
                    "Error consultando el perfil:",
                    error
                );

            }


            if (
                !username &&
                session.user.user_metadata &&
                session.user.user_metadata.username
            ) {

                username =
                    session.user.user_metadata.username;

            }


            if (username) {

                openPanel(
                    username
                );

            }

        } catch (error) {

            console.error(
                "Error comprobando sesión:",
                error
            );

        }

    }


    comprobarSesion();


});