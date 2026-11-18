(function () {
    var HOLD = 3000;
    var section = document.getElementById("avaliacoes");
    var stage = document.getElementById("avaliacoes-conteudo");
    var nav = document.getElementById("avaliacoes-nav");
    if (!section || !stage) return;

    var reviews = (window.REVIEWS || []).filter(isValid);
    if (!reviews.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var index = 0;
    var timer = 0;
    var focused = false;
    var track = document.createElement("div");
    track.className = "reviews-track";
    track.innerHTML = reviews.map(slideMarkup).join("");
    if (reviews.length > 1) track.insertAdjacentHTML("beforeend", slideMarkup(reviews[0]));
    stage.appendChild(track);

    var slides = Array.prototype.slice.call(track.querySelectorAll(".review"));
    section.hidden = false;
    place(false);
    if (reviews.length > 1) schedule();
    window.addEventListener("resize", function () {
        place(false);
    });

    if (reviews.length > 1 && nav) {
        if (reduceMotion) nav.hidden = false;
        nav.addEventListener("click", function (event) {
            var button = event.target.closest("[data-review]");
            if (!button) return;
            step(button.getAttribute("data-review") === "next" ? 1 : -1);
        });
        section.addEventListener("focusin", function () {
            focused = true;
            window.clearTimeout(timer);
        });
        section.addEventListener("focusout", function (event) {
            if (section.contains(event.relatedTarget)) return;
            focused = false;
            schedule();
        });
        window.addEventListener("pagehide", function () {
            window.clearTimeout(timer);
        });
    }

    function step(direction) {
        window.clearTimeout(timer);
        var last = reviews.length - 1;
        if (direction < 0 && index === 0) index = last;
        else if (direction > 0 && index === last) index = reviews.length;
        else index += direction;
        place(true);
    }

    function place(animate) {
        var width = stage.clientWidth;
        var slide = !reduceMotion && animate;
        slides.forEach(function (item) {
            item.style.width = width + "px";
        });
        track.classList.toggle("is-instant", !slide);
        if (!slide) track.getBoundingClientRect();
        track.style.transform = "translate3d(" + (-index * width) + "px, 0, 0)";
        if (!slide) {
            track.getBoundingClientRect();
            track.classList.remove("is-instant");
        }
        var visible = index === reviews.length ? slides.length - 1 : index;
        slides.forEach(function (item, position) {
            var current = position === visible;
            item.setAttribute("aria-hidden", current ? "false" : "true");
            item.querySelectorAll("a").forEach(function (link) {
                if (current) link.removeAttribute("tabindex");
                else link.tabIndex = -1;
            });
        });
        if (!slide) {
            if (animate) schedule();
            return;
        }
        window.clearTimeout(timer);
        var finished = false;
        function settle(event) {
            if (finished) return;
            if (event && (event.target !== track || event.propertyName !== "transform")) return;
            finished = true;
            track.removeEventListener("transitionend", settle);
            if (index === reviews.length) {
                index = 0;
                place(false);
            }
            schedule();
        }
        track.addEventListener("transitionend", settle);
        timer = window.setTimeout(settle, 1600);
    }

    function schedule() {
        window.clearTimeout(timer);
        if (focused || reviews.length < 2) return;
        timer = window.setTimeout(function () {
            index += 1;
            place(true);
        }, HOLD);
    }

    function isValid(review) {
        var rating = Number(review && review.rating);
        return Boolean(
            review &&
            String(review.message || "").trim() &&
            String(review.author || "").trim() &&
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
        var value = String(text || "").trim();
        if (!value) return "";
        var label = escapeHtml(value);
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
