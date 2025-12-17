// 小智对话页
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student';

    // 更新导航栏
    if (typeof updateNavigationForRole === 'function') {
        updateNavigationForRole(role);
    }

    // 应用主题
    const savedTheme = localStorage.getItem('theme') || 'wine';
    document.body.className = `theme-${savedTheme}`;

    // 头像性别切换
    const avatarIllustration = document.getElementById('aiAvatarIllustration');
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

    // 标语与快捷分类
    const subtitle = document.getElementById('aiSubtitle');
    const quickActions = document.getElementById('aiQuickActions');
    const studentActions = ['知识答疑', '题目解析', '学习规划'];
    const teacherActions = ['教案分析', '教学规划', '文案转ppt', 'ppt转视频'];

    function renderActions(list) {
        quickActions.innerHTML = '';
        list.forEach(text => {
            const btn = document.createElement('button');
            btn.className = 'quick-btn';
            btn.textContent = text;
            btn.addEventListener('click', () => {
                appendUserMessage(`我想要 ${text}`);
            });
            quickActions.appendChild(btn);
        });
    }

    if (role === 'teacher') {
        subtitle.textContent = '我可以利用全国高校精品学习资源，为你提供专业可信的个性化备课服务，让我辅助你完成教学吧';
        renderActions(teacherActions);
    } else {
        subtitle.textContent = '我可以利用全国高校精品学习资源，为你提供专业可信的个性化辅导服务，让我辅助你完成学习吧';
        renderActions(studentActions);
    }

    // 更新标语
    const platformSlogan = document.getElementById('platformSlogan');
    if (platformSlogan) {
        if (role === 'student') {
            platformSlogan.textContent = '你的线上学习好伙伴';
        } else if (role === 'teacher') {
            platformSlogan.textContent = '你的线上教学好伙伴';
        }
    }

    // 显示/隐藏教师专用导航项
    const textToPptNavBtn = document.getElementById('textToPptNavBtn');
    const pptToVideoNavBtn = document.getElementById('pptToVideoNavBtn');
    if (role === 'teacher') {
        if (textToPptNavBtn) textToPptNavBtn.style.display = 'block';
        if (pptToVideoNavBtn) pptToVideoNavBtn.style.display = 'block';
    } else {
        if (textToPptNavBtn) textToPptNavBtn.style.display = 'none';
        if (pptToVideoNavBtn) pptToVideoNavBtn.style.display = 'none';
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
    const homeLinkAI = document.getElementById('homeLinkAI');
    if (homeLinkAI) {
        homeLinkAI.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `dashboard.html?role=${role}`;
        });
    }

    // 课程链接
    const coursesLinkAI = document.getElementById('coursesLinkAI');
    if (coursesLinkAI) {
        coursesLinkAI.addEventListener('click', function(e) {
            e.preventDefault();
            if (role === 'teacher') {
                window.location.href = `teacher-courses.html?role=${role}`;
            } else {
                window.location.href = `courses.html?role=${role}`;
            }
        });
    }

    // 更新导航栏
    if (typeof updateNavigationForRole === 'function') {
        updateNavigationForRole(role);
    }

    // AI助手链接（当前页面，不需要跳转）
    const aiLinkAI = document.getElementById('aiLinkAI');
    if (aiLinkAI) {
        aiLinkAI.addEventListener('click', function(e) {
            e.preventDefault();
            // 已经在AI页面，不需要跳转
        });
    }

    // 其他导航项（学校、期末考试）- 演示功能
    const schoolLinkAI = document.getElementById('schoolLinkAI');
    const examLinkAI = document.getElementById('examLinkAI');
    
    if (schoolLinkAI) {
        schoolLinkAI.addEventListener('click', function(e) {
            e.preventDefault();
            alert('学校功能正在开发中...\n\n（这是演示版本）');
        });
    }
    
    if (examLinkAI) {
        examLinkAI.addEventListener('click', function(e) {
            e.preventDefault();
            if (role === 'teacher') {
                // 教师端跳转到独立的考试页面
                window.location.href = `teacher-exam.html?role=${role}`;
            } else {
                // 学生端跳转到考试列表页
                window.location.href = `exam.html?role=${role}`;
            }
        });
    }

    // 用户头像点击事件
    const userAvatarContainer = document.getElementById('userAvatarContainerAI');
    if (userAvatarContainer) {
        userAvatarContainer.addEventListener('click', function() {
            window.location.href = `profile.html?role=${role}`;
        });
    }

    // 加载头像
    function loadAvatar() {
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            const avatarImg = document.getElementById('userAvatarAI');
            const avatarContainer = document.getElementById('userAvatarContainerAI');
            if (avatarImg && avatarContainer) {
                avatarImg.src = savedAvatar;
                avatarContainer.classList.add('has-avatar');
            }
        }
    }
    loadAvatar();

    // 导航按钮
    const newChatBtn = document.getElementById('newChatBtn');
    if (newChatBtn) newChatBtn.addEventListener('click', resetChat);
    
    // AI出题导航按钮
    const aiQuizNavBtn = document.getElementById('aiQuizNavBtn');
    if (aiQuizNavBtn) {
        aiQuizNavBtn.addEventListener('click', function() {
            window.location.href = `ai-quiz.html?role=${role}`;
        });
    }

    // 发送与对话
    const chatWindow = document.getElementById('chatWindow');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const deepThinkToggle = document.getElementById('deepThinkToggle');
    const webSearchToggle = document.getElementById('webSearchToggle');
    const fileInput = document.getElementById('fileInput');
    const imageInput = document.getElementById('imageInput');

    function appendMessage(text, sender = 'user', attachments = []) {
        const msg = document.createElement('div');
        msg.className = `chat-message ${sender}`;
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.textContent = text;
        msg.appendChild(bubble);

        if (attachments.length) {
            attachments.forEach(name => {
                const chip = document.createElement('div');
                chip.className = 'file-chip';
                chip.textContent = name;
                bubble.appendChild(chip);
            });
        }

        chatWindow.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function appendUserMessage(text) {
        appendMessage(text, 'user');
        setTimeout(() => {
            const thinking = deepThinkToggle.checked ? '已开启深度思考；' : '';
            const search = webSearchToggle.checked ? '已开启联网搜索；' : '';
            appendMessage(`收到！${thinking}${search}正在为你生成回复（演示）。`, 'ai');
        }, 500);
    }

    // 文本转PPT导航按钮
    if (textToPptNavBtn) {
        textToPptNavBtn.addEventListener('click', function() {
            // 切换到文本转PPT功能
            appendUserMessage('我想要将文本转换为PPT');
        });
    }

    // PPT转视频导航按钮
    if (pptToVideoNavBtn) {
        pptToVideoNavBtn.addEventListener('click', function() {
            // 切换到PPT转视频功能
            appendUserMessage('我想要将PPT转换为视频');
        });
    }

    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (!text) return;
        appendUserMessage(text);
        chatInput.value = '';
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    function handleFiles(input, label) {
        if (!input.files || !input.files.length) return;
        const names = Array.from(input.files).map(f => `${label}:${f.name}`);
        appendMessage('已上传', 'user', names);
        input.value = '';
    }

    fileInput.addEventListener('change', () => handleFiles(fileInput, '文件'));
    imageInput.addEventListener('change', () => handleFiles(imageInput, '图片'));

    function resetChat() {
        chatWindow.innerHTML = '';
        appendMessage('你好，我是小智，很高兴为你服务！请选择一个分类开始，或直接输入你的问题。', 'ai');
    }
});
