(function () {
    document.getElementById('wsm-login-button').onclick = async (event) => {
        event.preventDefault();

        const form = document.getElementById('devise-login-form');
        document.querySelector('.loading-ajax').style.display = 'block';

        const { data: { message, success, link_redirect } } = await axios.post(form.action, new FormData(form));

        if (success) {
            const next = link_redirect || 'https://wsm.sun-asterisk.vn/dashboard/user_timesheets';
            window.location.href = next;
        } else {
            document.querySelector('.loading-ajax').style.display = 'none';
            document.querySelector('.login-error').style.display = 'block';
            document.querySelector('.login-error .alert').innerHTML = message;
        }
    };
})();
