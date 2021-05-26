setTimeout(showModal, 1000);

function showModal() {
    var modal = $(".modal");
    var backdropModal = $(".modal-wrapper");
    var modalClose = $(".modal-close");
    backdropModal.addClass("show");
    modal.on("click", function (event) {
        event.stopPropagation();
    });
    modalClose.on("click", function (event) {
        continueToSite();
    });
    backdropModal.on("click", function (event) {
        continueToSite();
    });
}

function continueToSite() {
    hideModal();
    loadSite();
}

function hideModal() {
    var modal = $(".modal-wrapper");
    modal.removeClass("show");
}

function loadSite() {
    var elementsThatToggle = document.querySelectorAll(".can-toggle-nav");
    elementsThatToggle.forEach(function (element) {
        element.addEventListener("click", function () {
            document.querySelector("nav").classList.toggle("open");
            document.querySelector(".backdrop").classList.toggle("open");
        });
    });
}
