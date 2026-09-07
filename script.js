(function () {

    'use strict';


    /* ========================================
       ELEMENTOS DOM
    ======================================== */

    const welcomeScreen =
        document.getElementById('welcomeScreen');

    const continueBtn =
        document.getElementById('continueBtn');

    const musica =
        document.getElementById('musica');


    const loginForm =
        document.getElementById('loginForm');

    const registerForm =
        document.getElementById('registerForm');

    const loginScreen =
        document.getElementById('loginScreen');

    const mainPanel =
        document.getElementById('mainPanel');

    const usernameInput =
        document.getElementById('usernameInput');

    const passwordInput =
        document.getElementById('passwordInput');

    const userDisplay =
        document.getElementById('userDisplay');

    const logoutBtn =
        document.getElementById('logoutBtn');

    const loginBtn =
        document.getElementById('loginBtn');

    const registerBtn =
        document.getElementById('registerBtn');


    const loginContainer =
        document.getElementById('loginFormContainer');

    const registerContainer =
        document.getElementById('registerFormContainer');

    const showRegisterLink =
        document.getElementById('showRegister');

    const showLoginLink =
        document.getElementById('showLogin');


    const regUsername =
        document.getElementById('regUsername');

    const regEmail =
        document.getElementById('regEmail');

    const regPassword =
        document.getElementById('regPassword');

    const regConfirmPassword =
        document.getElementById('regConfirmPassword');


    const modalOverlay =
        document.getElementById('modalOverlay');

    const modalIcon =
        document.getElementById('modalIcon');

    const modalTitle =
        document.getElementById('modalTitle');

    const modalMessage =
        document.getElementById('modalMessage');

    const modalBtn =
        document.getElementById('modalBtn');


    const loadingOverlay =
        document.getElementById('loadingOverlay');


    const loginVideo =
        document.querySelector(
            '.login-video-bg video'
        );

    const productsVideo =
        document.querySelector(
            '.products-video-bg video'
        );


    /* ========================================
       MÚSICA
    ======================================== */

    let musicStarted = false;

    if (musica) {
        musica.volume = 0.5;
    }


    /*
       IMPORTANTE:

       La música NO se inicia con mousemove.

       Solamente se inicia cuando el usuario
       pulsa el botón de bienvenida.
    */

    if (continueBtn && welcomeScreen) {

        continueBtn.addEventListener(
            'click',
            async function () {

                continueBtn.classList.add('loading');

                /*
                   El play ocurre directamente dentro
                   del click del usuario, por lo que
                   cumple con las restricciones de
                   autoplay de los navegadores.
                */

                if (musica && !musicStarted) {

                    try {

                        musica.volume = 0.5;

                        await musica.play();

                        musicStarted = true;

                        console.log(
                            '🎵 Música iniciada correctamente'
                        );

                    } catch (error) {

                        console.log(
                            'No se pudo iniciar la música:',
                            error
                        );

                    }

                }


                /*
                   Ocultar pantalla de bienvenida.
                */

                welcomeScreen.classList.add('hidden');


                /*
                   Eliminamos completamente la pantalla
                   después de la animación.
                */

                setTimeout(function () {

                    welcomeScreen.style.display = 'none';

                }, 900);

            }
        );

    }


    /* ========================================
       BASE DE DATOS DE USUARIOS
    ======================================== */

    let users = {

        'admin': '1234'

    };


    /* ========================================
       CURSOR PERSONALIZADO
    ======================================== */

    const customCursor =
        document.getElementById('customCursor');

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    document.addEventListener(
        'mousemove',
        function (e) {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorX +=
                (mouseX - cursorX) * 0.3;

            cursorY +=
                (mouseY - cursorY) * 0.3;

            if (customCursor) {

                customCursor.style.left =
                    cursorX + 'px';

                customCursor.style.top =
                    cursorY + 'px';

            }

        }
    );


    /* ========================================
       ELEMENTOS INTERACTIVOS
    ======================================== */

    const interactiveElements =
        document.querySelectorAll(
            'button, a, .btn-login, .btn-buy, ' +
            '.register-link, .btn-logout, ' +
            '.input-group input, .welcome-btn'
        );


    interactiveElements.forEach(
        function (el) {

            el.addEventListener(
                'mouseenter',
                function () {

                    if (customCursor) {

                        customCursor.classList.add(
                            'aiming'
                        );

                    }

                }
            );


            el.addEventListener(
                'mouseleave',
                function () {

                    if (customCursor) {

                        customCursor.classList.remove(
                            'aiming'
                        );

                    }

                }
            );

        }
    );


    /* ========================================
       CLICK
    ======================================== */

    document.addEventListener(
        'mousedown',
        function (e) {

            if (customCursor) {

                customCursor.classList.add(
                    'clicking'
                );

            }

            createClickEffect(
                e.clientX,
                e.clientY
            );

        }
    );


    document.addEventListener(
        'mouseup',
        function () {

            if (customCursor) {

                customCursor.classList.remove(
                    'clicking'
                );

            }

        }
    );


    document.addEventListener(
        'mouseleave',
        function () {

            if (customCursor) {

                customCursor.style.opacity = '0';

            }

        }
    );


    document.addEventListener(
        'mouseenter',
        function () {

            if (customCursor) {

                customCursor.style.opacity = '1';

            }

        }
    );


    /* ========================================
       EFECTO CLICK
    ======================================== */

    const canvas =
        document.getElementById('clickCanvas');

    const ctx =
        canvas.getContext('2d');


    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resizeCanvas();

    window.addEventListener(
        'resize',
        resizeCanvas
    );


    let particles = [];
    let shockRings = [];


    class Particle {

        constructor(x, y) {

            this.x = x;
            this.y = y;

            const angle =
                Math.random() *
                Math.PI * 2;

            const speed =
                Math.random() * 10 + 3;

            this.vx =
                Math.cos(angle) * speed;

            this.vy =
                Math.sin(angle) * speed;

            this.size =
                Math.random() * 5 + 2;


            const colors = [

                '#ff1744',
                '#ff6b6b',
                '#ff4081',
                '#ffd700',
                '#ffea00',
                '#ff9100',
                '#00d4ff',
                '#00e676',
                '#7b2ffc'

            ];


            this.color =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            this.life = 1;

            this.decay =
                Math.random() * 0.02 + 0.015;

            this.gravity = 0.08;

            this.friction = 0.97;

        }


        update() {

            this.vx *=
                this.friction;

            this.vy *=
                this.friction;

            this.vy +=
                this.gravity;

            this.x +=
                this.vx;

            this.y +=
                this.vy;

            this.life -=
                this.decay;

            this.size *= 0.99;

        }


        draw() {

            ctx.save();

            ctx.globalAlpha =
                this.life;

            ctx.shadowColor =
                this.color;

            ctx.shadowBlur =
                15;

            ctx.fillStyle =
                this.color;

            ctx.beginPath();


            if (this.size > 3) {

                const spikes = 5;

                const outerRadius =
                    this.size;

                const innerRadius =
                    this.size * 0.4;


                for (
                    let i = 0;
                    i < spikes * 2;
                    i++
                ) {

                    const radius =
                        i % 2 === 0
                            ? outerRadius
                            : innerRadius;

                    const angle =
                        (i * Math.PI) /
                        spikes -
                        Math.PI / 2;


                    const x =
                        Math.cos(angle) *
                        radius;

                    const y =
                        Math.sin(angle) *
                        radius;


                    if (i === 0) {

                        ctx.moveTo(x, y);

                    } else {

                        ctx.lineTo(x, y);

                    }

                }


                ctx.closePath();
                ctx.fill();

            } else {

                ctx.arc(
                    0,
                    0,
                    this.size,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }


            ctx.restore();

        }

    }


    function createClickEffect(x, y) {

        const count =
            Math.floor(
                Math.random() * 20
            ) + 25;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            particles.push(
                new Particle(x, y)
            );

        }


        shockRings.push({

            x: x,
            y: y,
            radius: 5,
            maxRadius: 40,
            life: 1,
            decay: 0.03

        });

    }


    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        for (
            let i = particles.length - 1;
            i >= 0;
            i--
        ) {

            particles[i].update();

            particles[i].draw();


            if (
                particles[i].life <= 0 ||
                particles[i].size < 0.5
            ) {

                particles.splice(i, 1);

            }

        }


        for (
            let i = shockRings.length - 1;
            i >= 0;
            i--
        ) {

            const ring =
                shockRings[i];

            ring.radius += 2;

            ring.life -=
                ring.decay;


            ctx.save();

            ctx.globalAlpha =
                ring.life * 0.5;

            ctx.strokeStyle =
                '#ff1744';

            ctx.lineWidth = 2;

            ctx.shadowColor =
                '#ff1744';

            ctx.shadowBlur = 20;

            ctx.beginPath();

            ctx.arc(
                ring.x,
                ring.y,
                ring.radius,
                0,
                Math.PI * 2
            );

            ctx.stroke();

            ctx.restore();


            if (ring.life <= 0) {

                shockRings.splice(i, 1);

            }

        }


        requestAnimationFrame(
            animateParticles
        );

    }


    animateParticles();


    /* ========================================
       MODAL
    ======================================== */

    function showModal(
        type,
        title,
        message
    ) {

        modalIcon.className =
            'modal-icon ' + type;


        if (type === 'success') {

            modalIcon.innerHTML =
                '<i class="fas fa-check-circle"></i>';

        } else if (type === 'error') {

            modalIcon.innerHTML =
                '<i class="fas fa-times-circle"></i>';

        } else {

            modalIcon.innerHTML =
                '<i class="fas fa-info-circle"></i>';

        }


        modalTitle.textContent =
            title;

        modalMessage.textContent =
            message;

        modalOverlay.classList.add(
            'active'
        );

    }


    modalBtn.addEventListener(
        'click',
        function () {

            modalOverlay.classList.remove(
                'active'
            );

        }
    );


    modalOverlay.addEventListener(
        'click',
        function (e) {

            if (
                e.target === modalOverlay
            ) {

                modalOverlay.classList.remove(
                    'active'
                );

            }

        }
    );


    /* ========================================
       LOADING
    ======================================== */

    function showLoading() {

        loadingOverlay.classList.add(
            'active'
        );

    }


    function hideLoading() {

        loadingOverlay.classList.remove(
            'active'
        );

    }


    /* ========================================
       LOGIN / REGISTRO
    ======================================== */

    if (showRegisterLink) {

        showRegisterLink.addEventListener(
            'click',
            function (e) {

                e.preventDefault();

                loginContainer.style.display =
                    'none';

                registerContainer.style.display =
                    'block';

            }
        );

    }


    if (showLoginLink) {

        showLoginLink.addEventListener(
            'click',
            function (e) {

                e.preventDefault();

                registerContainer.style.display =
                    'none';

                loginContainer.style.display =
                    'block';

            }
        );

    }


    /* ========================================
       ABRIR PANEL
    ======================================== */

    function openPanel(username) {

        loginScreen.classList.add(
            'hidden'
        );

        mainPanel.classList.add(
            'active'
        );

        userDisplay.textContent =
            username;


        if (loginVideo) {

            loginVideo.pause();

        }


        if (productsVideo) {

            productsVideo
                .play()
                .catch(function () {});

        }


        console.log(
            '✅ Panel abierto para: ' +
            username
        );

    }


    /* ========================================
       LOGIN
    ======================================== */

    if (loginForm) {

        loginForm.addEventListener(
            'submit',
            function (e) {

                e.preventDefault();


                const username =
                    usernameInput.value.trim();

                const password =
                    passwordInput.value.trim();


                if (!username || !password) {

                    showModal(
                        'error',
                        'Campos incompletos',
                        'Por favor, completa todos los campos.'
                    );

                    return;

                }


                loginBtn.classList.add(
                    'loading'
                );

                showLoading();


                setTimeout(
                    function () {

                        if (
                            users[username] &&
                            users[username] === password
                        ) {

                            hideLoading();

                            loginBtn.classList.remove(
                                'loading'
                            );

                            loginBtn.classList.add(
                                'success'
                            );


                            setTimeout(
                                function () {

                                    loginBtn.classList.remove(
                                        'success'
                                    );

                                    openPanel(
                                        username
                                    );

                                },
                                500
                            );


                        } else {

                            hideLoading();

                            loginBtn.classList.remove(
                                'loading'
                            );

                            loginBtn.classList.add(
                                'error'
                            );


                            setTimeout(
                                function () {

                                    loginBtn.classList.remove(
                                        'error'
                                    );

                                },
                                600
                            );


                            showModal(
                                'error',
                                'Acceso denegado',
                                'Usuario o contraseña incorrectos.'
                            );

                        }

                    },
                    1200
                );

            }
        );

    }


    /* ========================================
       REGISTRO
    ======================================== */

    if (registerForm) {

        registerForm.addEventListener(
            'submit',
            function (e) {

                e.preventDefault();


                const username =
                    regUsername.value.trim();

                const email =
                    regEmail.value.trim();

                const password =
                    regPassword.value.trim();

                const confirmPassword =
                    regConfirmPassword.value.trim();


                if (
                    !username ||
                    !email ||
                    !password ||
                    !confirmPassword
                ) {

                    showModal(
                        'error',
                        'Campos incompletos',
                        'Por favor, completa todos los campos.'
                    );

                    return;

                }


                if (password.length < 4) {

                    showModal(
                        'error',
                        'Contraseña corta',
                        'La contraseña debe tener al menos 4 caracteres.'
                    );

                    return;

                }


                if (
                    password !==
                    confirmPassword
                ) {

                    showModal(
                        'error',
                        'Contraseñas no coinciden',
                        'Las contraseñas ingresadas no son iguales.'
                    );

                    return;

                }


                if (users[username]) {

                    showModal(
                        'error',
                        'Usuario existente',
                        'El usuario "' +
                        username +
                        '" ya está registrado.'
                    );

                    return;

                }


                registerBtn.classList.add(
                    'loading'
                );

                showLoading();


                setTimeout(
                    function () {

                        users[username] =
                            password;


                        hideLoading();

                        registerBtn.classList.remove(
                            'loading'
                        );


                        showModal(
                            'success',
                            '¡Registro exitoso!',
                            'Tu cuenta ha sido creada correctamente. Ahora inicia sesión.'
                        );


                        const modalClose =
                            function () {

                                registerContainer.style.display =
                                    'none';

                                loginContainer.style.display =
                                    'block';


                                regUsername.value =
                                    '';

                                regEmail.value =
                                    '';

                                regPassword.value =
                                    '';

                                regConfirmPassword.value =
                                    '';


                                usernameInput.value =
                                    username;

                                passwordInput.value =
                                    '';


                                modalBtn.removeEventListener(
                                    'click',
                                    modalClose
                                );

                            };


                        modalBtn.addEventListener(
                            'click',
                            modalClose
                        );


                        console.log(
                            '✅ Nuevo usuario registrado: ' +
                            username
                        );

                    },
                    1200
                );

            }
        );

    }


    /* ========================================
       LOGOUT
       LA MÚSICA NO SE DETIENE
    ======================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            'click',
            function () {

                showModal(
                    'info',
                    'Cerrar sesión',
                    '¿Estás seguro de que quieres cerrar sesión?'
                );


                modalBtn.textContent =
                    'Sí, cerrar sesión';


                modalBtn.style.background =
                    'linear-gradient(135deg, #ff1744, #d50000)';


                const confirmLogout =
                    function () {

                        modalOverlay.classList.remove(
                            'active'
                        );


                        mainPanel.classList.remove(
                            'active'
                        );

                        loginScreen.classList.remove(
                            'hidden'
                        );


                        usernameInput.value =
                            '';

                        passwordInput.value =
                            '';


                        if (productsVideo) {

                            productsVideo.pause();

                        }


                        if (loginVideo) {

                            loginVideo
                                .play()
                                .catch(function () {});

                        }


                        modalBtn.textContent =
                            'Aceptar';

                        modalBtn.style.background =
                            'linear-gradient(135deg, rgba(0, 212, 255, 0.6), rgba(123, 47, 252, 0.6))';


                        console.log(
                            '👋 Sesión cerrada'
                        );

                    };


                const originalModalClick =
                    function () {

                        modalOverlay.classList.remove(
                            'active'
                        );

                    };


                modalBtn.onclick =
                    function (e) {

                        e.stopPropagation();

                        confirmLogout();

                        modalBtn.onclick =
                            originalModalClick;

                    };

            }
        );

    }


    /* ========================================
       BOTONES DE COMPRA
    ======================================== */

    const buyButtons =
        document.querySelectorAll(
            '.btn-buy'
        );


    buyButtons.forEach(
        function (btn) {

            btn.addEventListener(
                'click',
                function (e) {

                    e.stopPropagation();


                    const productName =
                        this.getAttribute(
                            'data-product'
                        ) || 'Producto';


                    const productPrice =
                        this.getAttribute(
                            'data-price'
                        ) || '0';


                    /*
                       CAMBIA ESTE NÚMERO POR EL TUYO
                    */

                    const phoneNumber =
                        '51937074085';


                    const message =
                        encodeURIComponent(

                            `🔥 *COMPRA DE PRODUCTO* 🔥\n\n` +

                            `✅ *Producto:* ${productName}\n` +

                            `💰 *Precio:* S/ ${productPrice}\n` +

                            `🛡️ *Tienda:* Ghost X\n` +

                            `📅 *Fecha:* ${new Date().toLocaleDateString()}\n\n` +

                            `👋 ¡Hola! Quiero comprar este producto.\n` +

                            `¿Cómo puedo realizar el pago?`

                        );


                    const whatsappURL =
                        `https://wa.me/${phoneNumber}?text=${message}`;


                    showModal(
                        'info',
                        'Redirigiendo a WhatsApp',
                        `Serás redirigido para comprar:\n${productName} - S/ ${productPrice}`
                    );


                    const redirect =
                        function () {

                            modalOverlay.classList.remove(
                                'active'
                            );


                            window.open(
                                whatsappURL,
                                '_blank'
                            );


                            modalBtn.removeEventListener(
                                'click',
                                redirect
                            );

                        };


                    modalBtn.addEventListener(
                        'click',
                        redirect
                    );

                }
            );

        }
    );


    /* ========================================
       MENSAJES DE CONSOLA
    ======================================== */

    console.log(
        '🖱️ Cursor personalizado activado'
    );

    console.log(
        '🎵 Música: se inicia únicamente al pulsar continuar'
    );

    console.log(
        '👤 Usuario: admin / 1234'
    );

    console.log(
        '📁 Cursor: cursor/mi-cursor.png'
    );

})();