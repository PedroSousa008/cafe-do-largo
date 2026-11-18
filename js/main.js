(function () {
    var cafe = window.CAFE || {};

    document.querySelectorAll("[data-field='name']").forEach(function (node) {
        if (cafe.name) node.textContent = cafe.name;
    });

    var tagline = document.querySelector("[data-field='tagline']");
    if (tagline && cafe.tagline) tagline.textContent = cafe.tagline;

    var about = document.querySelector("[data-field='about']");
    if (about && cafe.about) about.textContent = cafe.about;

    if (cafe.name) document.title = cafe.name;

    var year = document.getElementById("ano");
    if (year) year.textContent = String(new Date().getFullYear());

    renderMenu(cafe);
    renderVisit(cafe);
    renderFooter(cafe);
    initNav();
    initHeader();
    initReveal();

    function renderMenu(data) {
        var root = document.getElementById("ementa-conteudo");
        if (!root) return;

        var groups = (data.menu || []).filter(function (group) {
            return group && group.items && group.items.length;
        });

        if (!groups.length) return;

        root.innerHTML = groups.map(function (group) {
            var items = group.items.map(function (item) {
                var note = item.description
                    ? "<p class='menu-note'>" + escapeHtml(item.description) + "</p>"
                    : "";
                var price = item.price
                    ? "<span class='menu-price'>" + escapeHtml(item.price) + "</span>"
                    : "";
                return (
                    "<li class='menu-item'>" +
                        "<div>" +
                            "<p class='menu-name'>" + escapeHtml(item.name || "") + "</p>" +
                            note +
                        "</div>" +
                        price +
                    "</li>"
                );
            }).join("");

            return (
                "<section class='menu-group'>" +
                    "<h3>" + escapeHtml(group.category || "") + "</h3>" +
                    "<ul>" + items + "</ul>" +
                "</section>"
            );
        }).join("");
    }

    function renderVisit(data) {
        var address = data.address || {};
        var line1 = [address.street, address.postalCode].filter(Boolean).join(", ");
        var line2 = [address.city, address.country].filter(Boolean).join(", ");
        var lines = [line1, line2].filter(Boolean);

        var hours = (data.hours || []).filter(function (row) {
            return row && (row.days || row.time);
        });

        var hoursRoot = document.getElementById("horario-conteudo");
        if (hoursRoot) {
            hoursRoot.innerHTML = hours.map(function (row) {
                var closed = /encerr/i.test(row.time || "");
                return "<div" + (closed ? " class='is-closed'" : "") + ">" +
                    "<span>" + escapeHtml(row.days || "") + "</span>" +
                    "<span>" + escapeHtml(row.time || "") + "</span>" +
                "</div>";
            }).join("");
        }

        var addressLink = document.getElementById("morada-link");
        if (addressLink && lines.length) {
            addressLink.innerHTML = lines.map(escapeHtml).join("<br>");
            var maps = mapsLink(data, lines);
            if (maps) {
                addressLink.href = maps;
                addressLink.target = "_blank";
                addressLink.rel = "noopener noreferrer";
            }
        }

        var emailLink = document.getElementById("email-link");
        if (emailLink && data.email) {
            emailLink.href = "mailto:" + data.email;
            emailLink.setAttribute("aria-label", "Enviar email para " + data.email);
        }

        var facebookLink = document.getElementById("facebook-link");
        if (facebookLink && isUrl(data.facebook)) {
            facebookLink.href = data.facebook;
        }

        var pin = document.getElementById("pin-link");
        var directions = directionsLink(data);
        if (pin && directions) pin.href = directions;
    }

    function renderFooter(data) {
        var address = data.address || {};
        var line = [address.street, [address.postalCode, address.city].filter(Boolean).join(" ")]
            .filter(Boolean)
            .join(", ");
        var slot = document.getElementById("rodape-morada");
        if (slot && line) {
            slot.textContent = line;
            slot.hidden = false;
        }

        var nav = document.querySelector(".footer-nav");
        if (nav && isUrl(data.instagram) && !nav.querySelector("[data-instagram]")) {
            var instagram = document.createElement("a");
            instagram.href = data.instagram;
            instagram.textContent = "Instagram";
            instagram.setAttribute("data-instagram", "");
            nav.appendChild(instagram);
        }

        if (nav && isUrl(data.facebook) && !nav.querySelector("[data-facebook]")) {
            var facebook = document.createElement("a");
            facebook.href = data.facebook;
            facebook.textContent = "Facebook";
            facebook.target = "_blank";
            facebook.rel = "noopener noreferrer";
            facebook.setAttribute("data-facebook", "");
            nav.appendChild(facebook);
        }
    }

    function directionsLink(data) {
        if (isUrl(data.mapsUrl)) return data.mapsUrl;
        var address = data.address || {};
        var destination = [address.street, address.postalCode, address.city, address.country].filter(Boolean).join(", ");
        if (!destination) return "";
        return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(destination);
    }

    function mapsLink(data, lines) {
        if (isUrl(data.mapsUrl)) return data.mapsUrl;
        if (!lines.length) return "";
        return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(lines.join(", "));
    }

    function isUrl(value) {
        return typeof value === "string" && /^https?:\/\//i.test(value);
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function initNav() {
        var toggle = document.querySelector(".nav-toggle");
        var nav = document.getElementById("navegacao");
        if (!toggle || !nav) return;

        var desktop = window.matchMedia("(min-width: 46rem)");
        var motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
        var progress = 0;
        var velocity = 0;
        var target = 0;
        var frame = 0;
        var last = 0;
        var running = false;
        var omega = (2 * Math.PI) / 0.35;
        var stiffness = omega * omega;
        var damping = 2 * omega;

        function apply(value) {
            if (desktop.matches || !motionOk) {
                nav.style.transform = "";
                nav.style.opacity = "";
                nav.style.visibility = "";
                nav.style.pointerEvents = "";
                return;
            }

            var clamped = Math.max(0, Math.min(1, value));
            nav.style.transform = "translateY(" + ((1 - clamped) * -12).toFixed(2) + "px)";
            nav.style.opacity = clamped.toFixed(3);
            nav.style.visibility = clamped > 0.02 ? "visible" : "hidden";
            nav.style.pointerEvents = target === 1 || clamped > 0.08 ? "auto" : "none";
        }

        function stop() {
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
            running = false;
            last = 0;
        }

        function tick(now) {
            if (!last) last = now;
            var dt = Math.min(0.032, (now - last) / 1000);
            last = now;
            var force = -stiffness * (progress - target) - damping * velocity;
            velocity += force * dt;
            progress += velocity * dt;
            apply(progress);

            if (Math.abs(progress - target) < 0.004 && Math.abs(velocity) < 0.02) {
                progress = target;
                velocity = 0;
                apply(progress);
                running = false;
                frame = 0;
                return;
            }

            frame = requestAnimationFrame(tick);
        }

        function settle(next) {
            target = next;
            if (!motionOk || desktop.matches) {
                stop();
                progress = next;
                velocity = 0;
                apply(next);
                return;
            }

            if (!running) {
                last = 0;
                running = true;
                frame = requestAnimationFrame(tick);
            }
        }

        function setOpen(isOpen, restoreFocus) {
            nav.classList.toggle("is-open", isOpen);
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            toggle.textContent = isOpen ? "Fechar" : "Menu";
            document.body.classList.toggle("nav-open", isOpen && !desktop.matches);
            nav.setAttribute("aria-hidden", desktop.matches || isOpen ? "false" : "true");
            settle(isOpen ? 1 : 0);
            if (!isOpen && restoreFocus) toggle.focus();
        }

        apply(0);
        nav.setAttribute("aria-hidden", desktop.matches ? "false" : "true");

        toggle.addEventListener("click", function () {
            setOpen(!nav.classList.contains("is-open"), false);
        });

        nav.addEventListener("click", function (event) {
            if (event.target.closest("a")) setOpen(false, false);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && nav.classList.contains("is-open")) setOpen(false, true);
        });

        desktop.addEventListener("change", function (event) {
            if (event.matches) setOpen(false, false);
            else apply(nav.classList.contains("is-open") ? 1 : 0);
        });
    }

    function initHeader() {
        var header = document.querySelector(".site-header");
        if (!header) return;

        var ticking = false;

        function update() {
            ticking = false;
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        }

        window.addEventListener("scroll", function () {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        }, { passive: true });

        update();
    }

    function initReveal() {
        if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
        if (!("IntersectionObserver" in window)) return;

        var nodes = document.querySelectorAll(".menu .frame, .visit-hours, .visit-side");
        if (!nodes.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-in");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

        nodes.forEach(function (node) {
            var rect = node.getBoundingClientRect();
            var visible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
            node.classList.add("reveal");
            if (visible) node.classList.add("is-in");
            else observer.observe(node);
        });
    }
})();
