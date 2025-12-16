// 仪表板页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 从URL参数或本地存储获取角色信息
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student';
    
    // 根据角色更新导航栏显示
    function updateNavForRole(role) {
        const learningLink = document.getElementById('learningLink') || document.getElementById('learningLinkAI');
        const schoolLink = document.getElementById('schoolLink') || document.getElementById('schoolLinkAI');
        const examLink = document.getElementById('examLink') || document.getElementById('examLinkAI');

        if (role === 'teacher') {
            // 教师端：隐藏课程学习、学校，但保留课程考试（功能不同）
            if (learningLink) learningLink.style.display = 'none';
            if (schoolLink) schoolLink.style.display = 'none';
            // 教师端的课程考试在课程中心内，导航栏的考试链接可以隐藏或跳转到课程中心
            // if (examLink) examLink.style.display = 'none';
        } else {
            // 学生端：显示所有导航项
            if (learningLink) learningLink.style.display = '';
            if (schoolLink) schoolLink.style.display = '';
            if (examLink) examLink.style.display = '';
        }
    }
    
    // 检测当前页面并更新导航栏active状态
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    updateNavActiveState(currentPage);
    
    // 根据角色更新导航栏显示
    updateNavForRole(role);
    
    // 如果通用函数已加载，也调用它（双重保险）
    if (typeof updateNavigationForRole === 'function') {
        updateNavigationForRole(role);
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
    
    // 主题切换功能
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;
    
    // 从本地存储加载主题
    const savedTheme = localStorage.getItem('theme') || 'wine';
    body.className = `theme-${savedTheme}`;
    updateActiveThemeOption(savedTheme);
    
    // 主题选项点击事件
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

    // 更新导航栏active状态的函数
    function updateNavActiveState(currentPage) {
        // 移除所有active类
        const allNavItems = document.querySelectorAll('.nav-item');
        allNavItems.forEach(item => item.classList.remove('active'));
        
        // 根据当前页面设置active状态
        if (currentPage.includes('dashboard.html')) {
            const homeLink = document.getElementById('homeLink') || document.getElementById('homeLinkAI');
            if (homeLink) homeLink.classList.add('active');
        } else if (currentPage.includes('courses.html') || currentPage.includes('course-detail.html') || currentPage.includes('teacher-courses.html')) {
            const coursesLink = document.getElementById('coursesLink') || document.getElementById('coursesLinkAI');
            if (coursesLink) coursesLink.classList.add('active');
        } else if (currentPage.includes('course-learning.html')) {
            const learningLink = document.getElementById('learningLink') || document.getElementById('learningLinkAI');
            if (learningLink) learningLink.classList.add('active');
        } else if (currentPage.includes('school.html') || currentPage.includes('school-detail.html')) {
            const schoolLink = document.getElementById('schoolLink') || document.getElementById('schoolLinkAI');
            if (schoolLink) schoolLink.classList.add('active');
        } else if (currentPage.includes('exam.html') || currentPage.includes('exam-detail.html') || currentPage.includes('exam-taking.html')) {
            const examLink = document.getElementById('examLink') || document.getElementById('examLinkAI');
            if (examLink) examLink.classList.add('active');
        } else if (currentPage.includes('ai.html')) {
            const aiLink = document.getElementById('aiLink') || document.getElementById('aiLinkAI');
            if (aiLink) aiLink.classList.add('active');
        }
    }

    // 导航项点击事件
    // 主页链接
    const homeLink = document.getElementById('homeLink') || document.getElementById('homeLinkAI');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `dashboard.html?role=${role}`;
        });
    }

    // 课程链接
    const coursesLink = document.getElementById('coursesLink') || document.getElementById('coursesLinkAI');
    if (coursesLink) {
        coursesLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (role === 'teacher') {
                window.location.href = `teacher-courses.html?role=${role}`;
            } else {
                window.location.href = `courses.html?role=${role}`;
            }
        });
    }

    // 课程学习链接
    const learningLink = document.getElementById('learningLink') || document.getElementById('learningLinkAI');
    if (learningLink) {
        learningLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `course-learning.html?role=${role}`;
        });
    }

    // 学校链接
    const schoolLink = document.getElementById('schoolLink') || document.getElementById('schoolLinkAI');
    if (schoolLink) {
        schoolLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `school.html?role=${role}`;
        });
    }

    // 课程考试链接
    const examLink = document.getElementById('examLink') || document.getElementById('examLinkAI');
    
    if (examLink) {
        examLink.addEventListener('click', function(e) {
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

    // AI助手链接
    const aiLink = document.getElementById('aiLink') || document.getElementById('aiLinkAI');
    if (aiLink) {
        aiLink.addEventListener('click', function(e) {
            e.preventDefault();
            const currentPage = window.location.pathname.split('/').pop() || '';
            if (!currentPage.includes('ai.html')) {
                window.location.href = `ai.html?role=${role}`;
            }
        });
    }

    // 搜索功能
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchDropdown = document.getElementById('searchDropdown');
    const hotSearchItems = document.querySelectorAll('.hot-search-item');

    if (searchContainer && searchInput && searchBtn) {
        // 点击搜索框显示下拉框
        searchInput.addEventListener('focus', function() {
            searchContainer.classList.add('active');
        });

        // 点击搜索按钮
        searchBtn.addEventListener('click', function() {
            performSearch();
        });

        // 按Enter键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // 热门搜索项点击
        hotSearchItems.forEach(item => {
            item.addEventListener('click', function() {
                const keyword = this.getAttribute('data-keyword');
                searchInput.value = keyword;
                performSearch();
            });
        });

        // 点击外部关闭下拉框
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });

        function performSearch() {
            const keyword = searchInput.value.trim();
            if (keyword) {
                window.location.href = `search.html?q=${encodeURIComponent(keyword)}&role=${role}`;
            }
        }
    }
    
    // 用户头像点击事件
    const userAvatar = document.querySelector('.user-avatar-container');
    if (userAvatar) {
        userAvatar.addEventListener('click', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const role = urlParams.get('role') || 'student';
            window.location.href = `profile.html?role=${role}`;
        });
    }
    
    // 加载头像
    loadAvatar();
    
    function loadAvatar() {
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            const avatarImg = document.getElementById('userAvatar');
            const avatarContainer = document.querySelector('.user-avatar-container');
            if (avatarImg && avatarContainer) {
                avatarImg.src = savedAvatar;
                avatarContainer.classList.add('has-avatar');
            }
        }
    }

    // 如果是教师端，替换首页展示内容（课程推荐、直播、评价）
    if (role === 'teacher') {
        // 教师端课程推荐数据
        const teacherCourses = [
            {
                id: 101,
                title: '课堂互动工具实战',
                desc: '提升课堂参与度的互动玩法与工具选型，含案例示范。',
                instructor: '李老师',
                cover: 'https://via.placeholder.com/400x250/0F172A/FFFFFF?text=%E8%AF%BE%E5%A0%82%E4%BA%92%E5%8A%A8',
                stats: '适合：教学设计 / 课堂管理'
            },
            {
                id: 102,
                title: '作业批改与反馈效率提升',
                desc: '批改提效技巧、Rubric设计、AI辅助点评的实践指南。',
                instructor: '王老师',
                cover: 'https://via.placeholder.com/400x250/047857/FFFFFF?text=%E4%BD%9C%E4%B8%9A%E6%89%B9%E6%94%B9',
                stats: '适合：评估 / 形成性评价'
            },
            {
                id: 103,
                title: '直播授课运营与课堂控场',
                desc: '直播课控场、互动、复盘全流程，提升在线授课表现力。',
                instructor: '陈老师',
                cover: 'https://via.placeholder.com/400x250/7C2D12/FFFFFF?text=%E7%9B%B4%E6%92%AD%E6%95%99%E5%AD%A6',
                stats: '适合：线上授课 / 运营'
            },
            {
                id: 104,
                title: '教学评估与数据驱动改进',
                desc: '如何用数据发现课堂问题，设计改进方案并跟踪效果。',
                instructor: '刘老师',
                cover: 'https://via.placeholder.com/400x250/1E3A8A/FFFFFF?text=%E6%95%99%E5%AD%A6%E8%AF%84%E4%BC%B0',
                stats: '适合：教学评估 / 质量保障'
            },
            {
                id: 105,
                title: '课程资源建设与版权合规',
                desc: '课程素材选用、版权合规与资源管理的实用指南。',
                instructor: '赵老师',
                cover: 'https://via.placeholder.com/400x250/8B1538/FFFFFF?text=%E8%B5%84%E6%BA%90%E5%BB%BA%E8%AE%BE',
                stats: '适合：资源管理 / 合规'
            }
        ];

        const courseCarouselEl = document.getElementById('courseCarousel');
        const indicatorsEl = document.getElementById('carouselIndicators');
        if (courseCarouselEl && indicatorsEl) {
            courseCarouselEl.innerHTML = teacherCourses.map(c => `
                <div class="course-card" data-course-id="${c.id}">
                    <div class="course-image">
                        <img src="${c.cover}" alt="${c.title}">
                    </div>
                    <div class="course-info">
                        <h3 class="course-title">${c.title}</h3>
                        <p class="course-description">${c.desc}</p>
                        <div class="course-meta">
                            <span class="course-instructor">主讲：${c.instructor}</span>
                            <span class="course-students">${c.stats}</span>
                        </div>
                    </div>
                </div>
            `).join('');
            indicatorsEl.innerHTML = teacherCourses.map((_, idx) => `<span class="indicator ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>`).join('');
        }

        // 教师端直播内容
        const liveTitle = document.querySelector('.live-section-title');
        const liveThumb = document.querySelector('.live-thumbnail img');
        const liveViewers = document.querySelector('.live-viewers');
        const liveTitleText = document.querySelector('.live-title');
        const liveInstructor = document.querySelector('.live-instructor');
        const liveTime = document.querySelector('.live-time');
        if (liveTitle) liveTitle.textContent = '教师研修直播';
        if (liveThumb) liveThumb.src = 'https://via.placeholder.com/600x400/0F172A/FFFFFF?text=%E6%95%99%E5%B8%88%E7%A0%94%E4%BF%AE';
        if (liveViewers) liveViewers.textContent = '👁 856 人观看';
        if (liveTitleText) liveTitleText.textContent = '课堂互动设计与教学提问技巧';
        if (liveInstructor) liveInstructor.textContent = '主讲：资深教研员 李老师';
        if (liveTime) liveTime.textContent = '已直播 45 分钟';

        // 教师端未直播/回放
        const upcomingList = document.querySelector('.upcoming-list');
        if (upcomingList) {
            upcomingList.innerHTML = `
                <div class="upcoming-item"><div class="upcoming-time">今天 20:00</div><div class="upcoming-name">作业批改提效：Rubric 与AI点评</div></div>
                <div class="upcoming-item"><div class="upcoming-time">明天 15:00</div><div class="upcoming-name">线上课堂控场与互动策略</div></div>
                <div class="upcoming-item"><div class="upcoming-time">后天 10:00</div><div class="upcoming-name">数据驱动的教学改进案例</div></div>
            `;
        }
        const replayList = document.querySelector('.replay-list');
        if (replayList) {
            replayList.innerHTML = `
                <div class="replay-item">
                    <div class="replay-thumbnail">
                        <img src="https://via.placeholder.com/120x80/047857/FFFFFF?text=%E5%9B%9E%E6%94%BE" alt="回放">
                        <div class="replay-duration">58:12</div>
                    </div>
                    <div class="replay-info">
                        <div class="replay-name">教学评估：课堂反馈的采集与应用</div>
                        <div class="replay-meta"><span>李老师</span><span>2天前</span><span>4.2千次观看</span></div>
                    </div>
                </div>
                <div class="replay-item">
                    <div class="replay-thumbnail">
                        <img src="https://via.placeholder.com/120x80/1E3A8A/FFFFFF?text=%E5%9B%9E%E6%94%BE" alt="回放">
                        <div class="replay-duration">1:12:40</div>
                    </div>
                    <div class="replay-info">
                        <div class="replay-name">直播授课复盘：从数据到改进</div>
                        <div class="replay-meta"><span>王老师</span><span>3天前</span><span>3.8千次观看</span></div>
                    </div>
                </div>
                <div class="replay-item">
                    <div class="replay-thumbnail">
                        <img src="https://via.placeholder.com/120x80/8B1538/FFFFFF?text=%E5%9B%9E%E6%94%BE" alt="回放">
                        <div class="replay-duration">45:20</div>
                    </div>
                    <div class="replay-info">
                        <div class="replay-name">课程资源建设与版权合规案例</div>
                        <div class="replay-meta"><span>赵老师</span><span>5天前</span><span>2.6千次观看</span></div>
                    </div>
                </div>
            `;
        }

        // 教师端精彩评价
        const reviewsContainer = document.querySelector('.reviews-scroll-container');
        if (reviewsContainer) {
            reviewsContainer.innerHTML = `
                <div class="review-item">
                    <div class="review-avatar"><img src="https://via.placeholder.com/50/0F172A/FFFFFF?text=%E6%9D%8E" alt="用户头像"></div>
                    <div class="review-content">
                        <div class="review-header"><span class="review-name">李老师</span></div>
                        <div class="review-text">课堂互动工具的案例很实用，现场就用到了提问板和弹幕，学生参与度明显提升。</div>
                        <div class="review-course">来自《课堂互动工具实战》</div>
                    </div>
                </div>
                <div class="review-item">
                    <div class="review-avatar"><img src="https://via.placeholder.com/50/047857/FFFFFF?text=%E7%8E%8B" alt="用户头像"></div>
                    <div class="review-content">
                        <div class="review-header"><span class="review-name">王老师</span></div>
                        <div class="review-text">Rubric设计模板非常清晰，还教了如何用AI给出个性化点评，大幅节省批改时间。</div>
                        <div class="review-course">来自《作业批改与反馈效率提升》</div>
                    </div>
                </div>
                <div class="review-item">
                    <div class="review-avatar"><img src="https://via.placeholder.com/50/7C2D12/FFFFFF?text=%E5%BC%A0" alt="用户头像"></div>
                    <div class="review-content">
                        <div class="review-header"><span class="review-name">张老师</span></div>
                        <div class="review-text">直播控场与复盘方法很落地，照着清单就能快速发现问题并迭代课程。</div>
                        <div class="review-course">来自《直播授课运营与课堂控场》</div>
                    </div>
                </div>
                <div class="review-item">
                    <div class="review-avatar"><img src="https://via.placeholder.com/50/1E3A8A/FFFFFF?text=%E8%8B%8F" alt="用户头像"></div>
                    <div class="review-content">
                        <div class="review-header"><span class="review-name">苏老师</span></div>
                        <div class="review-text">数据驱动的课堂改进很有启发，学会了如何用数据说话，与教研团队沟通更有据。</div>
                        <div class="review-course">来自《教学评估与数据驱动改进》</div>
                    </div>
                </div>
            `;
        }
    }

    // 直播区域功能
    // 更多类型按钮点击事件
    const moreCategoriesBtn = document.getElementById('moreCategoriesBtn');
    const moreCategoriesMenu = document.getElementById('moreCategoriesMenu');
    
    if (moreCategoriesBtn && moreCategoriesMenu) {
        moreCategoriesBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = moreCategoriesMenu.style.display !== 'none';
            moreCategoriesMenu.style.display = isVisible ? 'none' : 'flex';
        });

        // 点击外部关闭菜单
        document.addEventListener('click', function(e) {
            if (!moreCategoriesBtn.contains(e.target) && !moreCategoriesMenu.contains(e.target)) {
                moreCategoriesMenu.style.display = 'none';
            }
        });
    }

    // 分类按钮点击事件
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有active类
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加active类到当前按钮
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            // 这里可以添加根据分类筛选直播内容的逻辑
            console.log('切换到分类:', category);
        });
    });

    // 进入直播间按钮
    const liveEnterBtn = document.querySelector('.live-enter-btn');
    if (liveEnterBtn) {
        liveEnterBtn.addEventListener('click', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const role = urlParams.get('role') || 'student';
            // 跳转到直播间页面
            window.location.href = `live-room.html?role=${role}`;
        });
    }

    // 回放项点击事件
    const replayItems = document.querySelectorAll('.replay-item');
    replayItems.forEach(item => {
        item.addEventListener('click', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const role = urlParams.get('role') || 'student';
            // 跳转到回放页面
            window.location.href = `live-replay.html?role=${role}`;
        });
    });

    // 课程轮播功能
    const courseCarousel = document.getElementById('courseCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (courseCarousel && prevBtn && nextBtn && indicators.length > 0) {
        let currentIndex = 0;
        const totalCourses = courseCards.length;
        let autoPlayInterval = null;
        const autoPlayDelay = 3000; // 3秒自动播放

        // 更新轮播位置和指示器状态
        function updateCarousel() {
            // 移动轮播容器
            courseCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // 更新指示器状态
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        // 启动自动播放
        function startAutoPlay() {
            // 清除之前的定时器
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
            // 启动新的自动播放
            autoPlayInterval = setInterval(function() {
                currentIndex = (currentIndex + 1) % totalCourses;
                updateCarousel();
            }, autoPlayDelay);
        }

        // 停止自动播放
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // 上一张
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalCourses) % totalCourses;
            updateCarousel();
            // 用户操作后重新启动自动播放
            stopAutoPlay();
            startAutoPlay();
        });

        // 下一张
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalCourses;
            updateCarousel();
            // 用户操作后重新启动自动播放
            stopAutoPlay();
            startAutoPlay();
        });

        // 指示器点击切换
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
                // 用户操作后重新启动自动播放
                stopAutoPlay();
                startAutoPlay();
            });
        });

        // 课程卡片点击跳转
        courseCards.forEach(card => {
            card.addEventListener('click', function() {
                const courseId = this.getAttribute('data-course-id');
                const urlParams = new URLSearchParams(window.location.search);
                const role = urlParams.get('role') || 'student';
                // 跳转到课程介绍页面，传递课程ID和角色参数
                window.location.href = `course-detail.html?courseId=${courseId}&role=${role}`;
            });
        });

        // 鼠标悬停时暂停自动轮播
        const carouselWrapper = document.querySelector('.course-carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', function() {
                stopAutoPlay();
            });

            carouselWrapper.addEventListener('mouseleave', function() {
                startAutoPlay();
            });
        }

        // 初始化
        updateCarousel();
        // 启动自动播放
        startAutoPlay();
    }
});

