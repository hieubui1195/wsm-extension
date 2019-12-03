(function () {
    const data = [
        {
            question_id: 3410,
            question_vi: 'Core value số 5 của Sun* là gì?',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Core value số 5 của Sun* là gì?</span></p>',
            answer_ids: [11795],
            answer_contents: [
                'Go fast'
            ]
        },
        {
            question_id: 3407,
            question_vi: 'Một thành viên luôn hành động đúng chuẩn mực đạo đức và theo sứ mệnh của công ty, bạn ấy đang hành động theo core value nào?',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Một thành viên luôn hành động đúng chuẩn mực đạo đức và theo sứ mệnh của công ty, bạn ấy đang hành động theo core value nào?</span></p>',
            answer_ids: [11783],
            answer_contents: [
                'Stay focused'
            ]
        },
        {
            question_id: 3411,
            question_vi: 'Ai cần thấm nhuần core values?',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Ai cần thấm nhuần core values?</span></p>',
            answer_ids: [11799],
            answer_contents: [
                'Tất cả thành viên của một tổ chức'
            ]
        },
        {
            question_id: 3413,
            question_vi: 'Những hành động nào thể hiện Be optimistic? (Multiple choices)',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Những hành động nào thể hiện Be optimistic? (Multiple choices)</span></p>',
            answer_ids: [11806, 11807],
            answer_contents: [
                'Suy nghĩ lạc quan',
                'Suy nghĩ vượt khỏi những thói quen thông lệ'
            ]
        },
        {
            question_id: 3404,
            question_vi: 'Đâu không phải là core values của Sun*?',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Đâu không phải là core values của Sun*?</span></p>',
            answer_ids: [11771],
            answer_contents: [
                'Innovation'
            ]
        },
        {
            question_id: 3405,
            question_vi: 'Tư duy vượt giới hạn là gì?',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Tư duy vượt giới hạn là gì?</span></p>',
            answer_ids: [11772],
            answer_contents: [
                'Là những suy nghĩ khác biệt, sáng tạo, không bị bó hẹp trong giới hạn nào cả. Nó đối lập hoàn toàn với tư duy rập khuôn, lối mòn thông thường.'
            ]
        },
        {
            question_id: 3409,
            question_vi: 'Get risky là core value số mấy tại Sun*?',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Get risky là core value số mấy tại Sun*?</span></p>',
            answer_ids: [11791],
            answer_contents: [
                'Số 3'
            ]
        },
        {
            question_id: 3412,
            question_vi: 'Sắp xếp nào sau đây là đúng với thứ tự 7 core values của Sun*?',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Sắp xếp nào sau đây là đúng với thứ tự 7 core values của Sun*?</span></p>',
            answer_ids: [11802],
            answer_contents: [
                '1-Be A Team, 2-Think Outside The Box, 3-Get risky, 4-Be Optimistic, 5-Go Fast, 6-Be Professional, 7-Stay Focused'
            ]
        },
        {
            question_id: 3406,
            question_vi: 'Thấu hiểu đồng đội và "Sẵn sàng giúp đỡ" là những nội dung trong core value nào?',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Thấu hiểu đồng đội và "Sẵn sàng giúp đỡ" là những nội dung trong core value nào?</span></p>',
            answer_ids: [11777],
            answer_contents: [
                'Be a team'
            ]
        },
        {
            question_id: 3408,
            question_vi: 'Làm thế nào để trở thành một người luôn "Be professional"?',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Làm thế nào để trở thành một người luôn \"Be professional\"?</span></p>',
            answer_ids: [11784],
            answer_contents: [
                'Tôn trọng thời gian, nỗ lực hết mình & đặt trọn tâm huyết.'
            ]
        },
        {
            question_id: 3414,
            question_vi: 'Lựa chọn các core values tại Sun*? (Multiple choices)',
            question_content: '<p><span style="font-size:15px; font-family:Arial">Lựa chọn các core values tại Sun*? (Multiple choices)</span></p>',
            answer_ids: [
                11808,
                11810,
                11812,
                11813
            ],
            answer_contents: [
                'Stay focused',
                'Get risky',
                'Go fast',
                'Be optimistic'
            ]
        },
    ];

    const getQuestionFromAPI = async () => {
        try {
            const questionResponse = await axios.get('https://fitm.sun-asterisk.vn//core_values/questions/random_question?language=vi');
            const questionData = questionResponse.data.data;
            const questionContent = questionData.question.content;
            const answerContents = data.find(item => item.question_content == questionContent) ? data.find(item => item.question_content == questionContent).answer_contents : null;

            return {
                questionData,
                answerContents
            }
        } catch (e) {
            console.error(e);
        }
      };

    document.getElementById('wsm-login-button').onclick = async (event) => {
        event.preventDefault();
        let dataFromAPI = null;

        while (!dataFromAPI || (dataFromAPI.hasOwnProperty('answerContents') && !dataFromAPI.answerContents)) {
            dataFromAPI = await getQuestionFromAPI();
        }

        const { question_token } = dataFromAPI.questionData.question;
        const answer_tokens = dataFromAPI.questionData.answers.filter(item => dataFromAPI.answerContents.includes(item.content)).map(answer => answer.answer_token);

        const { data: resp } = await axios.post('https://fitm.sun-asterisk.vn//core_values/questions/valid_answer', {
            question_token,
            answer_tokens,
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
