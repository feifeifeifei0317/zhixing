// AI出题页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 从URL参数获取角色信息
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student';
    
    // 更新标语
    const platformSlogan = document.getElementById('platformSlogan');
    if (platformSlogan) {
        if (role === 'student') {
            platformSlogan.textContent = '你的线上学习好伙伴';
        } else if (role === 'teacher') {
            platformSlogan.textContent = '你的线上教学好伙伴';
        }
    }
    
    // 从本地存储加载主题
    const savedTheme = localStorage.getItem('theme') || 'wine';
    document.body.className = `theme-${savedTheme}`;
    
    // 头像性别切换
    const avatarIllustration = document.getElementById('aiAvatarIllustrationQuiz');
    const avatarBtns = document.querySelectorAll('.avatar-btn');
    avatarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            avatarBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const gender = btn.getAttribute('data-gender');
            avatarIllustration.classList.toggle('male', gender === 'male');
            avatarIllustration.classList.toggle('female', gender === 'female');
        });
    });

    // 左侧导航栏
    const backToAIBtn = document.getElementById('backToAIBtn');
    if (backToAIBtn) {
        backToAIBtn.addEventListener('click', function() {
            window.location.href = `ai.html?role=${role}`;
        });
    }

    // 主题切换功能
    const themeOptions = document.querySelectorAll('.theme-option');
    function updateActiveThemeOption(theme) {
        themeOptions.forEach(option => {
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    updateActiveThemeOption(savedTheme);
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            document.body.className = `theme-${theme}`;
            localStorage.setItem('theme', theme);
            updateActiveThemeOption(theme);
        });
    });

    // 主页链接处理
    const homeLinkQuiz = document.getElementById('homeLinkQuiz');
    if (homeLinkQuiz) {
        homeLinkQuiz.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `dashboard.html?role=${role}`;
        });
    }

    // AI助手链接处理
    const aiLinkQuiz = document.getElementById('aiLinkQuiz');
    if (aiLinkQuiz) {
        aiLinkQuiz.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `ai.html?role=${role}`;
        });
    }

    // 课程中心链接
    const coursesLinkQuiz = document.getElementById('coursesLinkQuiz');
    if (coursesLinkQuiz) {
        coursesLinkQuiz.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `courses.html?role=${role}`;
        });
    }

    // 课程学习链接
    const learningLinkQuiz = document.getElementById('learningLinkQuiz');
    if (learningLinkQuiz) {
        learningLinkQuiz.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `course-learning.html?role=${role}`;
        });
    }

    // 学校链接
    const schoolLinkQuiz = document.getElementById('schoolLinkQuiz');
    if (schoolLinkQuiz) {
        schoolLinkQuiz.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `school.html?role=${role}`;
        });
    }

    // 其他导航项点击事件（演示）
    const navItems = document.querySelectorAll('.nav-item:not(.ai-assistant):not(#homeLinkQuiz):not(#aiLinkQuiz):not(#coursesLinkQuiz):not(#learningLinkQuiz):not(#schoolLinkQuiz)');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();
            if (text !== 'Hi，小智！') {
                alert(`${text}功能正在开发中...\n\n（这是演示版本）`);
            }
        });
    });

    // 用户头像点击事件
    const userAvatarContainer = document.getElementById('userAvatarContainerQuiz');
    if (userAvatarContainer) {
        userAvatarContainer.addEventListener('click', function() {
            window.location.href = `profile.html?role=${role}`;
        });
    }

    // 加载头像
    function loadAvatar() {
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            const avatarImg = document.getElementById('userAvatarQuiz');
            const avatarContainer = document.getElementById('userAvatarContainerQuiz');
            if (avatarImg && avatarContainer) {
                avatarImg.src = savedAvatar;
                avatarContainer.classList.add('has-avatar');
            }
        }
    }
    loadAvatar();

    // 生成题目功能
    const generateBtn = document.getElementById('generateBtn');
    const knowledgePointInput = document.getElementById('knowledgePoint');
    const questionTypeSelect = document.getElementById('questionType');
    const questionCountSelect = document.getElementById('questionCount');
    const difficultySelect = document.getElementById('difficulty');
    const quizResultSection = document.getElementById('quizResultSection');
    const quizQuestions = document.getElementById('quizQuestions');

    generateBtn.addEventListener('click', function() {
        const knowledgePoint = knowledgePointInput.value.trim();
        
        if (!knowledgePoint) {
            alert('请输入知识点！');
            knowledgePointInput.focus();
            return;
        }

        // 禁用按钮，显示加载状态
        generateBtn.disabled = true;
        generateBtn.textContent = '正在生成题目...';

        // 模拟AI生成题目（实际项目中应该调用后端API）
        setTimeout(function() {
            const questionType = questionTypeSelect.value;
            const questionCount = parseInt(questionCountSelect.value);
            const difficulty = difficultySelect.value;

            // 生成示例题目
            const questions = generateQuestions(knowledgePoint, questionType, questionCount, difficulty);
            
            // 显示题目
            displayQuestions(questions);
            
            // 恢复按钮
            generateBtn.disabled = false;
            generateBtn.textContent = '生成题目';
        }, 1500);
    });

    // 存储题目数据
    let currentQuestions = [];

    // 生成题目函数（演示版本）
    function generateQuestions(knowledgePoint, type, count, difficulty) {
        const questions = [];

        for (let i = 1; i <= count; i++) {
            let question = {
                id: i,
                number: i,
                type: type === 'mixed' ? (i % 3 === 0 ? 'short' : i % 2 === 0 ? 'fill' : 'choice') : type,
                content: '',
                options: [],
                answer: '',
                explanation: ''
            };

            if (question.type === 'choice') {
                question.content = `关于"${knowledgePoint}"，以下哪个选项是正确的？`;
                question.options = [
                    '选项A：这是第一个选项',
                    '选项B：这是第二个选项（正确答案）',
                    '选项C：这是第三个选项',
                    '选项D：这是第四个选项'
                ];
                question.answer = 'B';
                question.explanation = '选项B是正确的，因为...（这里是详细的解析说明）';
            } else if (question.type === 'fill') {
                question.content = `请填写关于"${knowledgePoint}"的关键概念：______。`;
                question.answer = '正确答案';
                question.explanation = '该知识点涉及的核心概念是"正确答案"，这是因为...（这里是详细的解析说明）';
            } else {
                question.content = `请简要说明"${knowledgePoint}"的主要内容。`;
                question.answer = '这是关于该知识点的简要说明和要点。主要包括：1. 要点一；2. 要点二；3. 要点三。';
                question.explanation = '该知识点主要包含以下几个方面：1. 要点一的详细说明；2. 要点二的详细说明；3. 要点三的详细说明。';
            }

            questions.push(question);
        }

        return questions;
    }

    // 显示题目（不显示答案）
    function displayQuestions(questions) {
        currentQuestions = questions; // 保存题目数据
        quizQuestions.innerHTML = '';
        
        questions.forEach(q => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.setAttribute('data-question-id', q.id);
            
            let html = `<div class="question-content">
                <span class="question-number">${q.number}</span>
                <strong>${q.type === 'choice' ? '选择题' : q.type === 'fill' ? '填空题' : '简答题'}</strong>
                <div style="margin-top: 10px;">${q.content}</div>
            </div>`;

            // 选择题：显示单选按钮
            if (q.type === 'choice' && q.options && q.options.length > 0) {
                html += '<div class="question-options">';
                q.options.forEach((opt, idx) => {
                    const label = String.fromCharCode(65 + idx); // A, B, C, D
                    html += `<label class="question-option-label">
                        <input type="radio" name="question-${q.id}" value="${label}" class="question-input-radio">
                        <span class="question-option-text">
                            <span class="option-label">${label}</span>
                            <span class="option-content">${opt}</span>
                        </span>
                    </label>`;
                });
                html += '</div>';
            }
            // 填空题：显示输入框
            else if (q.type === 'fill') {
                html += `<div class="question-input-wrapper">
                    <input type="text" class="question-input-fill" data-question-id="${q.id}" placeholder="请输入答案">
                </div>`;
            }
            // 简答题：显示文本域
            else if (q.type === 'short') {
                html += `<div class="question-input-wrapper">
                    <textarea class="question-input-short" data-question-id="${q.id}" placeholder="请输入你的答案..." rows="4"></textarea>
                </div>`;
            }

            // 答案区域（初始隐藏）
            html += `<div class="question-answer-section" id="answer-${q.id}" style="display: none;">
                <div class="question-answer">
                    <div class="answer-label">正确答案：</div>
                    <div class="answer-content">${q.answer}</div>
                </div>
                <div class="question-explanation">
                    <div class="explanation-label">解析：</div>
                    <div class="explanation-content">${q.explanation}</div>
                </div>
            </div>`;
            
            questionDiv.innerHTML = html;
            quizQuestions.appendChild(questionDiv);
        });

        // 显示提交按钮
        const submitSection = document.getElementById('submitSection');
        if (submitSection) {
            submitSection.style.display = 'block';
        }

        quizResultSection.style.display = 'block';
        quizResultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 导出题目功能
    const exportBtn = document.getElementById('exportBtn');
    exportBtn.addEventListener('click', function() {
        const questions = quizQuestions.querySelectorAll('.quiz-question');
        if (questions.length === 0) {
            alert('没有可导出的题目！');
            return;
        }

        let exportText = 'AI生成的测试题目\n';
        exportText += '知识点：' + knowledgePointInput.value + '\n\n';
        
        questions.forEach(q => {
            const content = q.querySelector('.question-content').textContent.trim();
            const answer = q.querySelector('.question-answer').textContent.trim();
            exportText += content + '\n' + answer + '\n\n';
        });

        // 创建下载链接
        const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AI出题_${knowledgePointInput.value.substring(0, 10)}_${new Date().getTime()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('题目已导出！');
    });
});

