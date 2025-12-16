// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // 从本地存储加载主题
    const savedTheme = localStorage.getItem('theme') || 'wine';
    body.className = `theme-${savedTheme}`;
    updateActiveThemeButton(savedTheme);
    
    // 主题按钮点击事件
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            body.className = `theme-${theme}`;
            localStorage.setItem('theme', theme);
            updateActiveThemeButton(theme);
        });
    });
    
    function updateActiveThemeButton(theme) {
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // 登录/注册表单切换
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        // 更新宣传语和表单为注册页的默认角色
        const defaultRoleBtn = registerForm.querySelector('.role-btn.active');
        if (defaultRoleBtn) {
            const role = defaultRoleBtn.getAttribute('data-role');
            updateSlogan(role);
            updateRegisterForm(role);
        }
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        // 更新宣传语和表单为登录页的默认角色
        const defaultRoleBtn = loginForm.querySelector('.role-btn.active');
        if (defaultRoleBtn) {
            const role = defaultRoleBtn.getAttribute('data-role');
            updateSlogan(role);
            updateLoginForm(role);
        }
    });
    
    // 黑板宣传语元素
    const chalkSlogan = document.getElementById('chalkSlogan');
    
    // 更新黑板宣传语的函数
    function updateSlogan(role) {
        if (chalkSlogan) {
            if (role === 'student') {
                chalkSlogan.textContent = '你的线上学习好伙伴';
            } else if (role === 'teacher') {
                chalkSlogan.textContent = '你的线上教学好伙伴';
            }
        }
    }
    
    // 更新登录表单标签和占位符
    function updateLoginForm(role) {
        const loginLabel = document.getElementById('loginLabel');
        const loginInput = document.getElementById('loginEmail');
        if (role === 'student') {
            loginLabel.textContent = '邮箱或学号';
            loginInput.placeholder = '请输入邮箱或学号';
        } else {
            loginLabel.textContent = '邮箱或工号';
            loginInput.placeholder = '请输入邮箱或工号';
        }
    }
    
    // 更新注册表单学号/工号标签和占位符
    function updateRegisterForm(role) {
        const registerIdLabel = document.getElementById('registerIdLabel');
        const registerIdInput = document.getElementById('registerId');
        if (role === 'student') {
            registerIdLabel.textContent = '学号';
            registerIdInput.placeholder = '请输入学号';
        } else {
            registerIdLabel.textContent = '工号';
            registerIdInput.placeholder = '请输入工号';
        }
    }
    
    // 角色选择器（登录页和注册页）
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const formContainer = this.closest('.form-container');
            const roleButtonsInContainer = formContainer.querySelectorAll('.role-btn');
            roleButtonsInContainer.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新黑板宣传语
            const role = this.getAttribute('data-role');
            updateSlogan(role);
            
            // 更新表单标签和占位符
            if (formContainer.id === 'loginForm') {
                updateLoginForm(role);
            } else if (formContainer.id === 'registerForm') {
                updateRegisterForm(role);
            }
        });
    });
    
    // 页面加载时初始化表单（根据默认角色）
    const defaultLoginRoleBtn = loginForm.querySelector('.role-btn.active');
    if (defaultLoginRoleBtn) {
        updateLoginForm(defaultLoginRoleBtn.getAttribute('data-role'));
    }
    
    const defaultRegisterRoleBtn = registerForm.querySelector('.role-btn.active');
    if (defaultRegisterRoleBtn) {
        updateRegisterForm(defaultRegisterRoleBtn.getAttribute('data-role'));
    }
    
    // 页面加载时初始化宣传语（根据登录页的默认角色）
    const defaultRoleBtn = loginForm.querySelector('.role-btn.active');
    if (defaultRoleBtn) {
        updateSlogan(defaultRoleBtn.getAttribute('data-role'));
    }
    
    // 登录表单提交
    const loginFormElement = document.getElementById('loginFormElement');
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const loginInput = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        const activeRole = loginForm.querySelector('.role-btn.active').getAttribute('data-role');
        
        // 验证输入（邮箱或学号/工号）
        if (!loginInput) {
            alert(activeRole === 'student' ? '请输入邮箱或学号！' : '请输入邮箱或工号！');
            return;
        }
        
        // 判断是邮箱还是学号/工号
        const isEmail = validateEmail(loginInput);
        const loginType = isEmail ? 'email' : (activeRole === 'student' ? 'studentId' : 'teacherId');
        
        // 验证密码
        if (password.length < 6) {
            alert('密码长度至少为6位！');
            return;
        }
        
        // 验证用户是否存在（实际项目中应该查询数据库）
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        let user = null;
        
        if (isEmail) {
            // 通过邮箱查找
            user = existingUsers.find(u => u.email === loginInput && u.role === activeRole);
        } else {
            // 通过学号/工号查找
            user = existingUsers.find(u => u.id === loginInput && u.role === activeRole);
        }
        
        // 验证密码（如果用户存在）
        if (user && user.password !== password) {
            alert('密码错误！');
            return;
        }
        
        // 如果用户不存在，显示提示（演示版本允许登录）
        if (!user) {
            const loginTypeText = isEmail ? '邮箱' : (activeRole === 'student' ? '学号' : '工号');
            const confirmLogin = confirm(`未找到该${loginTypeText}的注册信息。\n\n这是演示版本，是否继续登录？\n（实际项目中会提示用户先注册）`);
            if (!confirmLogin) {
                return;
            }
        }
        
        // 保存登录信息（实际项目中应该发送到服务器）
        const loginData = {
            loginValue: loginInput,
            loginType: loginType,
            role: activeRole,
            rememberMe: rememberMe,
            timestamp: new Date().toISOString()
        };
        
        if (rememberMe) {
            localStorage.setItem('loginData', JSON.stringify(loginData));
        } else {
            sessionStorage.setItem('loginData', JSON.stringify(loginData));
        }
        
        // 显示成功消息
        const loginTypeText = isEmail ? '邮箱' : (activeRole === 'student' ? '学号' : '工号');
        alert(`登录成功！\n${loginTypeText}：${loginInput}\n角色：${activeRole === 'student' ? '学生' : '教师'}\n\n正在跳转...`);
        
        // 跳转到仪表板页面
        setTimeout(function() {
            window.location.href = `dashboard.html?role=${activeRole}`;
        }, 500);
    });
    
    // 生成6位随机验证码
    function generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    
    // 验证码输入框只允许数字
    const verificationCodeInput = document.getElementById('verificationCode');
    if (verificationCodeInput) {
        verificationCodeInput.addEventListener('input', function(e) {
            // 只允许输入数字
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // 发送验证码功能
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    let countdownTimer = null;
    let countdownSeconds = 0;
    
    sendCodeBtn.addEventListener('click', function() {
        const email = document.getElementById('registerEmail').value.trim();
        
        // 验证邮箱格式
        if (!validateEmail(email)) {
            alert('请先输入有效的邮箱地址！');
            document.getElementById('registerEmail').focus();
            return;
        }
        
        // 检查邮箱是否已注册
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (existingUsers.some(user => user.email === email)) {
            alert('该邮箱已被注册，请使用其他邮箱或直接登录！');
            return;
        }
        
        // 生成验证码
        const verificationCode = generateVerificationCode();
        
        // 保存验证码到sessionStorage（实际项目中应该发送到服务器，由服务器发送邮件）
        sessionStorage.setItem('verificationCode', verificationCode);
        sessionStorage.setItem('verificationEmail', email);
        sessionStorage.setItem('verificationTime', Date.now().toString());
        
        // 显示验证码（演示版本，实际项目中不会显示）
        alert(`验证码已发送到：${email}\n\n验证码：${verificationCode}\n\n（这是演示版本，实际项目中验证码会通过邮件发送，不会在此显示）`);
        
        // 开始倒计时
        startCountdown();
    });
    
    // 倒计时功能
    function startCountdown() {
        countdownSeconds = 60;
        sendCodeBtn.disabled = true;
        
        countdownTimer = setInterval(function() {
            countdownSeconds--;
            sendCodeBtn.textContent = `${countdownSeconds}秒后重发`;
            
            if (countdownSeconds <= 0) {
                clearInterval(countdownTimer);
                sendCodeBtn.disabled = false;
                sendCodeBtn.textContent = '发送验证码';
            }
        }, 1000);
    }
    
    // 验证验证码
    function validateVerificationCode(inputCode, email) {
        const savedCode = sessionStorage.getItem('verificationCode');
        const savedEmail = sessionStorage.getItem('verificationEmail');
        const savedTime = sessionStorage.getItem('verificationTime');
        
        // 检查验证码是否存在
        if (!savedCode || !savedEmail || !savedTime) {
            return false;
        }
        
        // 检查邮箱是否匹配
        if (savedEmail !== email) {
            return false;
        }
        
        // 检查验证码是否过期（5分钟）
        const currentTime = Date.now();
        const codeTime = parseInt(savedTime);
        if (currentTime - codeTime > 5 * 60 * 1000) {
            sessionStorage.removeItem('verificationCode');
            sessionStorage.removeItem('verificationEmail');
            sessionStorage.removeItem('verificationTime');
            return false;
        }
        
        // 检查验证码是否正确
        return savedCode === inputCode;
    }
    
    // 注册表单提交
    const registerFormElement = document.getElementById('registerFormElement');
    registerFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('registerEmail').value.trim();
        const verificationCode = document.getElementById('verificationCode').value.trim();
        const id = document.getElementById('registerId').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const activeRole = registerForm.querySelector('.role-btn.active').getAttribute('data-role');
        const idType = activeRole === 'student' ? '学号' : '工号';
        
        // 验证邮箱格式
        if (!validateEmail(email)) {
            alert('请输入有效的邮箱地址！');
            return;
        }
        
        // 验证验证码
        if (!verificationCode) {
            alert('请输入邮箱验证码！');
            return;
        }
        
        if (verificationCode.length !== 6) {
            alert('验证码必须是6位数字！');
            return;
        }
        
        if (!validateVerificationCode(verificationCode, email)) {
            alert('验证码错误或已过期，请重新获取验证码！');
            return;
        }
        
        // 验证学号/工号
        if (!id) {
            alert(`请输入${idType}！`);
            return;
        }
        
        // 验证学号/工号格式（至少3位数字或字母数字组合）
        if (id.length < 3) {
            alert(`${idType}长度至少为3位！`);
            return;
        }
        
        // 验证密码长度
        if (password.length < 6) {
            alert('密码长度至少为6位！');
            return;
        }
        
        // 验证密码确认
        if (password !== confirmPassword) {
            alert('两次输入的密码不一致！');
            return;
        }
        
        // 检查邮箱是否已注册（实际项目中应该查询数据库）
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (existingUsers.some(user => user.email === email)) {
            alert('该邮箱已被注册，请使用其他邮箱或直接登录！');
            return;
        }
        
        // 检查学号/工号是否已注册
        if (existingUsers.some(user => user.id === id && user.role === activeRole)) {
            alert(`该${idType}已被注册，请使用其他${idType}或直接登录！`);
            return;
        }
        
        // 清除验证码（验证成功后）
        sessionStorage.removeItem('verificationCode');
        sessionStorage.removeItem('verificationEmail');
        sessionStorage.removeItem('verificationTime');
        
        // 保存注册信息（实际项目中应该发送到服务器）
        const userData = {
            email: email,
            id: id,
            password: password, // 实际项目中应该加密存储
            role: activeRole,
            registerTime: new Date().toISOString()
        };
        
        existingUsers.push(userData);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
        
        // 显示成功消息
        alert(`注册成功！\n邮箱：${email}\n${idType}：${id}\n角色：${activeRole === 'student' ? '学生' : '教师'}\n\n（这是演示版本，实际项目中会发送欢迎邮件）`);
        
        // 清除倒计时
        if (countdownTimer) {
            clearInterval(countdownTimer);
            sendCodeBtn.disabled = false;
            sendCodeBtn.textContent = '发送验证码';
        }
        
        // 切换到登录页面
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        
        // 自动填充登录信息
        document.getElementById('loginEmail').value = email;
    });
    
    // 邮箱验证函数
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 忘记密码功能（演示）
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            const loginInput = document.getElementById('loginEmail').value.trim();
            const activeRole = loginForm.querySelector('.role-btn.active').getAttribute('data-role');
            
            if (!loginInput) {
                alert('请先输入您的邮箱或' + (activeRole === 'student' ? '学号' : '工号') + '！');
                document.getElementById('loginEmail').focus();
                return;
            }
            
            if (validateEmail(loginInput)) {
                alert(`密码重置链接已发送到：${loginInput}\n\n（这是演示版本，实际项目中会发送真实的重置邮件）`);
            } else {
                alert('忘记密码功能需要使用邮箱，请输入您的邮箱地址！');
                document.getElementById('loginEmail').focus();
            }
        });
    }
    
    // 页面加载时检查是否有保存的登录信息
    const savedLoginData = localStorage.getItem('loginData') || sessionStorage.getItem('loginData');
    if (savedLoginData) {
        try {
            const loginData = JSON.parse(savedLoginData);
            if (loginData.loginValue) {
                document.getElementById('loginEmail').value = loginData.loginValue;
            }
            if (loginData.rememberMe) {
                document.getElementById('rememberMe').checked = true;
            }
        } catch (e) {
            console.error('加载保存的登录信息失败', e);
        }
    }
});

