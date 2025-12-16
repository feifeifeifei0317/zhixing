// 考试界面脚本
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const examId = urlParams.get('examId');
    const courseId = parseInt(urlParams.get('courseId')) || 1;
    const examType = urlParams.get('type') || 'midterm';
    const duration = parseInt(urlParams.get('duration')) || 120;
    const role = urlParams.get('role') || 'student';
    const courseTitleParam = urlParams.get('title');

    // 考试题目数据
    const examQuestions = {
        'midterm_1': [
            {
                id: 1,
                type: 'choice',
                content: '函数 f(x) = x² 在 x = 0 处的导数是？',
                options: ['0', '1', '2', '不存在'],
                answer: ''
            },
            {
                id: 2,
                type: 'choice',
                content: '下列哪个是极限 lim(x→0) sin(x)/x 的值？',
                options: ['0', '1', '∞', '不存在'],
                answer: ''
            },
            {
                id: 3,
                type: 'fill',
                content: '函数 f(x) = e^x 的导数是 ______。',
                answer: ''
            },
            {
                id: 4,
                type: 'fill',
                content: '定积分 ∫₀¹ x dx 的值是 ______。',
                answer: ''
            },
            {
                id: 5,
                type: 'short',
                content: '请简述导数的几何意义，并举例说明。',
                answer: '',
                images: []
            },
            {
                id: 6,
                type: 'short',
                content: '计算函数 f(x) = x³ - 3x + 1 的极值点，并说明判断方法。',
                answer: '',
                images: []
            }
        ],
        'final_1': [
            {
                id: 1,
                type: 'choice',
                content: '下列哪个是函数 f(x) = ln(x) 的定义域？',
                options: ['(-∞, +∞)', '(0, +∞)', '[0, +∞)', '(-∞, 0)'],
                answer: ''
            },
            {
                id: 2,
                type: 'fill',
                content: '不定积分 ∫ x dx = ______。',
                answer: ''
            },
            {
                id: 3,
                type: 'short',
                content: '请详细说明微积分基本定理的内容和应用。',
                answer: '',
                images: []
            }
        ]
    };

    const questions = examQuestions[examId] || examQuestions['midterm_1'];
    let timeRemaining = duration * 60; // 转换为秒
    let timerInterval;

    // 初始化考试
    function initExam() {
        const courseNames = {
            1: '高等数学',
            3: '数据结构与算法',
            5: '机器学习基础'
        };
        const typeText = examType === 'midterm' ? '期中考试' : '期末考试';
        const courseName = courseTitleParam || courseNames[courseId] || '课程';
        document.getElementById('examTitle').textContent = `${courseName}${typeText}`;
        
        renderQuestions();
        startTimer();
    }

    // 渲染题目
    function renderQuestions() {
        const container = document.getElementById('examQuestions');
        container.innerHTML = '';

        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'exam-question';
            questionDiv.setAttribute('data-question-id', question.id);

            let html = `
                <div class="question-header">
                    <span class="question-number">${index + 1}</span>
                    <span class="question-type">${question.type === 'choice' ? '选择题' : question.type === 'fill' ? '填空题' : '简答题'}</span>
                </div>
                <div class="question-content">${question.content}</div>
            `;

            if (question.type === 'choice') {
                html += '<div class="question-options">';
                question.options.forEach((option, optIndex) => {
                    const label = String.fromCharCode(65 + optIndex);
                    html += `
                        <label class="option-item">
                            <input type="radio" name="question-${question.id}" value="${label}" class="question-answer">
                            <span class="option-label">${label}. ${option}</span>
                        </label>
                    `;
                });
                html += '</div>';
            } else if (question.type === 'fill') {
                html += `
                    <input type="text" class="fill-input question-answer" data-question-id="${question.id}" placeholder="请输入答案">
                `;
            } else if (question.type === 'short') {
                html += `
                    <textarea class="short-answer-textarea question-answer" data-question-id="${question.id}" placeholder="请输入你的答案..."></textarea>
                    <div class="photo-upload-section">
                        <label class="upload-label">
                            📷 上传手写过程照片
                            <input type="file" accept="image/*" class="photo-upload-input" data-question-id="${question.id}" multiple>
                        </label>
                        <div class="uploaded-images" id="images-${question.id}"></div>
                    </div>
                `;
            }

            questionDiv.innerHTML = html;
            container.appendChild(questionDiv);

            // 照片上传处理
            if (question.type === 'short') {
                const uploadInput = questionDiv.querySelector('.photo-upload-input');
                const imagesContainer = questionDiv.querySelector(`#images-${question.id}`);
                
                uploadInput.addEventListener('change', function(e) {
                    const files = Array.from(e.target.files);
                    files.forEach(file => {
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = function(event) {
                                const imageItem = document.createElement('div');
                                imageItem.className = 'uploaded-image-item';
                                imageItem.innerHTML = `
                                    <img src="${event.target.result}" alt="上传的图片">
                                    <button type="button" class="remove-image-btn" onclick="this.parentElement.remove()">×</button>
                                `;
                                imagesContainer.appendChild(imageItem);
                                
                                // 保存到题目数据
                                if (!question.images) question.images = [];
                                question.images.push(event.target.result);
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                    e.target.value = ''; // 清空input，允许重复上传同一文件
                });
            }
        });
    }

    // 倒计时
    function startTimer() {
        updateTimerDisplay();
        timerInterval = setInterval(function() {
            timeRemaining--;
            updateTimerDisplay();

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                alert('考试时间到，系统将自动提交试卷！');
                submitExam(true);
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const timerValue = document.getElementById('timerValue');
        timerValue.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // 时间警告
        if (timeRemaining <= 300) { // 5分钟
            timerValue.classList.add('danger');
        } else if (timeRemaining <= 600) { // 10分钟
            timerValue.classList.add('warning');
        }
    }

    // 提交试卷
    const submitExamBtn = document.getElementById('submitExamBtn');
    const submitModal = document.getElementById('submitModal');
    const continueExamBtn = document.getElementById('continueExamBtn');
    const confirmSubmitBtn = document.getElementById('confirmSubmitBtn');

    submitExamBtn.addEventListener('click', function() {
        submitModal.style.display = 'flex';
    });

    continueExamBtn.addEventListener('click', function() {
        submitModal.style.display = 'none';
    });

    confirmSubmitBtn.addEventListener('click', function() {
        submitExam(false);
    });

    // 点击遮罩层关闭
    submitModal.addEventListener('click', function(e) {
        if (e.target === submitModal) {
            submitModal.style.display = 'none';
        }
    });

    function submitExam(isAuto) {
        clearInterval(timerInterval);
        
        // 收集答案
        const answers = {};
        questions.forEach(question => {
            if (question.type === 'choice') {
                const selected = document.querySelector(`input[name="question-${question.id}"]:checked`);
                answers[question.id] = selected ? selected.value : '';
            } else if (question.type === 'fill') {
                const input = document.querySelector(`.fill-input[data-question-id="${question.id}"]`);
                answers[question.id] = input ? input.value : '';
            } else if (question.type === 'short') {
                const textarea = document.querySelector(`.short-answer-textarea[data-question-id="${question.id}"]`);
                const images = question.images || [];
                answers[question.id] = {
                    text: textarea ? textarea.value : '',
                    images: images
                };
            }
        });

        // 保存答案（实际应用中应该提交到服务器）
        localStorage.setItem(`exam_${examId}_answers`, JSON.stringify(answers));
        
        if (isAuto) {
            alert('考试时间到，试卷已自动提交！');
        } else {
            alert('试卷提交成功！');
        }
        
        // 跳转回考试列表
        window.location.href = `exam.html?role=${role}`;
    }

    // 初始化
    initExam();
});

