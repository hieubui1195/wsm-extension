(function () {
    setTimeout(() => {
        const registerModal = document.getElementById('register-modal');
        if (registerModal) {

            registerModal.parentNode.removeChild(registerModal);

            const modalBackdrop = document.querySelector('.modal-backdrop');
            modalBackdrop.parentNode.removeChild(modalBackdrop);
        }
    }, 500);
})();
