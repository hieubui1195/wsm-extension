(function () {
    document.getElementById('wsm-login-button').onclick = async (event) => {
        event.preventDefault();

        const { data: resp } = await axios.post('https://fitm.sun-asterisk.vn//core_values/questions/valid_answer', {
            question_id: 3400,
            answer_ids: [11753],
        });

        document.getElementById('token-core-value').value = resp.data.token;
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
