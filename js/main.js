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
        var root = document.getElementById("visita-conteudo");
        if (!root) return;

        var address = data.address || {};
        var lines = [];
        if (address.street) lines.push(address.street);
        var locality = [address.postalCode, address.city].filter(Boolean).join(" ");
        if (locality) lines.push(locality);
        if ((address.street || address.city) && address.country) lines.push(address.country);

        var hours = (data.hours || []).filter(function (row) {
            return row && (row.days || row.time);
        });

        var blocks = [];

        if (lines.length) {
            var maps = mapsLink(data, lines);
            blocks.push(
                "<div><dt>Morada</dt><dd>" +
                    lines.map(escapeHtml).join("<br>") +
                    (maps ? "<br><a class='text-link' href='" + escapeHtml(maps) + "'>Indicações</a>" : "") +
                "</dd></div>"
            );
        }

        if (hours.length) {
            blocks.push(
                "<div><dt>Horário</dt><dd>" +
                    hours.map(function (row) {
                        return escapeHtml([row.days, row.time].filter(Boolean).join(" · "));
                    }).join("<br>") +
                "</dd></div>"
            );
        }

        if (data.phone) {
            var tel = String(data.phone).replace(/[^\d+]/g, "");
            blocks.push(
                "<div><dt>Telefone</dt><dd><a class='text-link' href='tel:" +
                    escapeHtml(tel) + "'>" + escapeHtml(data.phone) + "</a></dd></div>"
            );
        }

        if (data.email) {
            blocks.push(
                "<div><dt>Correio eletrónico</dt><dd><a class='text-link' href='mailto:" +
                    escapeHtml(data.email) + "'>" + escapeHtml(data.email) + "</a></dd></div>"
            );
        }

        if (isUrl(data.instagram)) {
            blocks.push(
                "<div><dt>Instagram</dt><dd><a class='text-link' href='" +
                    escapeHtml(data.instagram) + "'>Instagram</a></dd></div>"
            );
        }

        if (!blocks.length) return;

        root.innerHTML = "<dl class='visit-list'>" + blocks.join("") + "</dl>";
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

        if (isUrl(data.instagram)) {
            var nav = document.querySelector(".footer-nav");
            if (nav && !nav.querySelector("[data-instagram]")) {
                var link = document.createElement("a");
                link.href = data.instagram;
                link.textContent = "Instagram";
                link.setAttribute("data-instagram", "");
                nav.appendChild(link);
            }
        }
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

        function closeNav(restoreFocus) {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.textContent = "Menu";
            document.body.classList.remove("nav-open");
            if (restoreFocus) toggle.focus();
        }

        function openNav() {
            nav.classList.add("is-open");
            toggle.setAttribute("aria-expanded", "true");
            toggle.textContent = "Fechar";
            document.body.classList.add("nav-open");
        }

        toggle.addEventListener("click", function () {
            if (nav.classList.contains("is-open")) closeNav(false);
            else openNav();
        });

        nav.addEventListener("click", function (event) {
            if (event.target.closest("a")) closeNav(false);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && nav.classList.contains("is-open")) closeNav(true);
        });

        desktop.addEventListener("change", function (event) {
            if (event.matches) closeNav(false);
        });
    }
})();
