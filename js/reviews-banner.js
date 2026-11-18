(function () {
    var section = document.getElementById("avaliacoes");
    var stage = document.getElementById("avaliacoes-conteudo");
    var nav = document.getElementById("avaliacoes-nav");
    if (!section || !stage) return;

    var reviews = (window.REVIEWS || []).filter(isValid);
    if (!reviews.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var index = 0;
    var timer = 0;
    var hovering = false;
    var focused = false;
    var slides = [];

    stage.innerHTML = reviews.map(slideMarkup).join("");
    slides = Array.prototype.slice.call(stage.querySelectorAll(".review"));
    section.hidden = false;
    show(0);

    if (reduceMotion && reviews.length > 1 && nav) {
        nav.hidden = false;
        nav.addEventListener("click", function (event) {
            var button = event.target.closest("[data-review]");
            if (!button) return;
            show(index + (button.getAttribute("data-review") === "next" ? 1 : -1));
        });
    }

    if (!reduceMotion && reviews.length > 1) {
        section.addEventListener("pointerenter", function () {
            hovering = true;
            stop();
        });
        section.addEventListener("pointerleave", function () {
            hovering = false;
            schedule();
        });
        section.addEventListener("focusin", function () {
            focused = true;
            stop();
        });
        section.addEventListener("focusout", function (event) {
            if (section.contains(event.relatedTarget)) return;
            focused = false;
            schedule();
        });
        schedule();
        window.addEventListener("pagehide", stop);
    }

    function show(next) {
        index = (next + reviews.length) % reviews.length;
        slides.forEach(function (slide, position) {
            var current = position === index;
            slide.classList.toggle("is-current", current);
            slide.setAttribute("aria-hidden", current ? "false" : "true");
            slide.querySelectorAll("a").forEach(function (link) {
                if (current) link.removeAttribute("tabindex");
                else link.tabIndex = -1;
            });
        });
    }

    function schedule() {
        stop();
        if (hovering || focused || reduceMotion || reviews.length < 2) return;
        timer = window.setTimeout(function () {
            show(index + 1);
            schedule();
        }, 3000);
    }

    function stop() {
        window.clearTimeout(timer);
        timer = 0;
    }

    function isValid(review) {
        var rating = Number(review && review.rating);
        return Boolean(
            review &&
            String(review.message || "").trim() &&
            String(review.author || "").trim() &&
            String(review.platform || "").trim() &&
            rating >= 1 &&
            rating <= 5 &&
            rating === Math.round(rating)
        );
    }

    function slideMarkup(review) {
        var href = safeUrl(review.url);
        return (
            '<article class="review">' +
                stars(Number(review.rating)) +
                '<p class="review-message">“' + escapeHtml(review.message) + '”</p>' +
                person("review-author", review.author, href) +
                person("review-platform", review.platform, href) +
            "</article>"
        );
    }

    function person(className, text, href) {
        var label = escapeHtml(text);
        if (!href) return '<p class="' + className + '">' + label + "</p>";
        return '<a class="' + className + '" href="' + href + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
    }

    function stars(rating) {
        var star = '<svg viewBox="0 0 22 20" aria-hidden="true" focusable="false"><path fill="#FFB800" d="M11 1.15 13.18 7.55h6.72l-5.44 3.95 2.08 6.4L11 13.95 5.46 17.9l2.08-6.4L2.1 7.55h6.72z"/></svg>';
        var marks = "";
        var count = 0;
        while (count < rating) {
            marks += star;
            count += 1;
        }
        return '<div class="review-stars" role="img" aria-label="' + rating + ' de 5 estrelas">' + marks + "</div>";
    }

    function safeUrl(url) {
        var value = String(url || "").trim();
        if (!/^https?:\/\//i.test(value)) return "";
        return escapeHtml(value);
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
        });
    }
}());
