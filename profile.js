// 个人中心页面脚本
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
    
    // 更新ID标签
    const idLabel = document.getElementById('idLabel');
    const studentIdInput = document.getElementById('studentId');
    if (role === 'teacher') {
        idLabel.textContent = '工号';
        studentIdInput.placeholder = '请输入工号';
    }
    
    // 主页链接处理（返回仪表板）
    const homeLink = document.getElementById('homeLinkProfile');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `dashboard.html?role=${role}`;
        });
    }

    // AI 助手入口
    const aiLink = document.getElementById('aiLinkProfile');
    if (aiLink) {
        aiLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `ai.html?role=${role}`;
        });
    }

    // 课程中心链接
    const coursesLink = document.getElementById('coursesLinkProfile');
    if (coursesLink) {
        coursesLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `courses.html?role=${role}`;
        });
    }

    // 课程学习链接
    const learningLink = document.getElementById('learningLinkProfile');
    if (learningLink) {
        learningLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `course-learning.html?role=${role}`;
        });
    }

    // 学校链接
    const schoolLink = document.getElementById('schoolLinkProfile');
    if (schoolLink) {
        schoolLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `school.html?role=${role}`;
        });
    }

    // 其他导航项点击（演示）
    const navItems = document.querySelectorAll('.nav-item:not(.ai-assistant):not(#homeLinkProfile):not(#coursesLinkProfile):not(#learningLinkProfile):not(#schoolLinkProfile):not(#aiLinkProfile)');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();
            if (text !== 'Hi，小智！') {
                alert(`${text}功能正在开发中...\n\n（这是演示版本）`);
            }
        });
    });

    // 从本地存储加载用户信息
    loadUserProfile();
    
    // 加载头像
    loadAvatar();
    
    // 更换头像按钮
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const avatarInput = document.getElementById('avatarInput');
    
    changeAvatarBtn.addEventListener('click', function() {
        avatarInput.click();
    });
    
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('图片大小不能超过5MB！');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                // 保存头像
                localStorage.setItem('userAvatar', imageUrl);
                // 更新显示
                updateAvatar(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 表单提交
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const profileData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            id: document.getElementById('studentId').value,
            phone: document.getElementById('phone').value,
            bio: document.getElementById('bio').value,
            role: role
        };
        
        // 保存到本地存储
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        
        alert('个人信息保存成功！');
    });
    
    // 加载用户信息
    function loadUserProfile() {
        const savedProfile = localStorage.getItem('userProfile');
        const loginData = JSON.parse(localStorage.getItem('loginData') || sessionStorage.getItem('loginData') || '{}');
        
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            document.getElementById('username').value = profile.username || '';
            document.getElementById('email').value = profile.email || loginData.loginValue || '';
            document.getElementById('studentId').value = profile.id || '';
            document.getElementById('phone').value = profile.phone || '';
            document.getElementById('bio').value = profile.bio || '';
        } else {
            // 如果没有保存的信息，尝试从登录数据填充
            if (loginData.loginValue) {
                document.getElementById('email').value = loginData.loginValue;
            }
        }
    }
    
    // 加载头像
    function loadAvatar() {
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            updateAvatar(savedAvatar);
        }
    }
    
    // 更新头像显示
    function updateAvatar(imageUrl) {
        const profileAvatar = document.getElementById('profileAvatar');
        const navUserAvatar = document.getElementById('navUserAvatar');
        const avatarWrapper = document.getElementById('avatarWrapper');
        const navAvatar = document.getElementById('navAvatar');
        
        if (profileAvatar) {
            profileAvatar.src = imageUrl;
            avatarWrapper.classList.add('has-avatar');
        }
        
        if (navUserAvatar) {
            navUserAvatar.src = imageUrl;
            navAvatar.classList.add('has-avatar');
        }
    }
    
    // 主题切换功能
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 'wine';
    body.className = `theme-${savedTheme}`;
    updateActiveThemeOption(savedTheme);
    
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            body.className = `theme-${theme}`;
            localStorage.setItem('theme', theme);
            updateActiveThemeOption(theme);
        });
    });
    
    function updateActiveThemeOption(theme) {
        themeOptions.forEach(option => {
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    // 主页链接处理
    const homeLinkProfile = document.getElementById('homeLinkProfile');
    if (homeLinkProfile) {
        homeLinkProfile.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `dashboard.html?role=${role}`;
        });
    }

    // AI助手链接处理
    const aiLinkProfile = document.getElementById('aiLinkProfile');
    if (aiLinkProfile) {
        aiLinkProfile.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `ai.html?role=${role}`;
        });
    }

    // 其他导航项点击事件（演示）
    const navItems = document.querySelectorAll('.nav-item:not(.ai-assistant):not(#homeLinkProfile):not(#aiLinkProfile)');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();
            alert(`${text}功能正在开发中...\n\n（这是演示版本）`);
        });
    });
});

