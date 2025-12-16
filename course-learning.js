// 课程学习页面脚本
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student';

    // 课程数据
    const coursesData = {
        1: { title: '高等数学', image: 'https://via.placeholder.com/300x180/8B1538/FFFFFF?text=高等数学', instructor: '张教授', students: 5000 },
        2: { title: '线性代数', image: 'https://via.placeholder.com/300x180/1E3A8A/FFFFFF?text=线性代数', instructor: '李教授', students: 4200 },
        3: { title: '数据结构与算法', image: 'https://via.placeholder.com/300x180/166534/FFFFFF?text=数据结构', instructor: '王教授', students: 6800 },
        4: { title: '英语学术写作', image: 'https://via.placeholder.com/300x180/7C2D12/FFFFFF?text=英语写作', instructor: 'Sarah老师', students: 3500 },
        5: { title: '机器学习基础', image: 'https://via.placeholder.com/300x180/581C87/FFFFFF?text=机器学习', instructor: '陈教授', students: 8900 }
    };

    // 从本地存储获取数据（模拟数据）
    function getEnrolledCourses() {
        // 从localStorage获取，如果没有则使用默认数据
        const stored = localStorage.getItem('enrolledCourses');
        if (stored) {
            return JSON.parse(stored);
        }
        // 默认已选择课程
        return [
            { id: 1, progress: 65 },
            { id: 3, progress: 30 },
            { id: 5, progress: 80 }
        ];
    }

    function getLikedCourses() {
        const stored = localStorage.getItem('likedCourses');
        if (stored) {
            return JSON.parse(stored);
        }
        return [2, 4];
    }

    function getFollowedCourses() {
        const stored = localStorage.getItem('followedCourses');
        if (stored) {
            return JSON.parse(stored);
        }
        return [1, 2, 3];
    }

    // 渲染已选择课程
    function renderEnrolledCourses() {
        const container = document.getElementById('enrolledCourses');
        const enrolled = getEnrolledCourses();

        if (enrolled.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📚</div>
                    <div class="empty-state-text">还没有选择任何课程</div>
                    <div class="empty-state-hint">去课程中心选择你感兴趣的课程吧</div>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        enrolled.forEach(item => {
            const course = coursesData[item.id];
            if (!course) return;

            const card = document.createElement('div');
            card.className = 'enrolled-course-card';
            card.innerHTML = `
                <div class="enrolled-course-image">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="enrolled-course-content">
                    <h3 class="enrolled-course-title">${course.title}</h3>
                    <div class="progress-section">
                        <div class="progress-header">
                            <span class="progress-label">学习进度</span>
                            <span class="progress-percentage">${item.progress}%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${item.progress}%"></div>
                        </div>
                    </div>
                    <div class="enrolled-course-meta">
                        <span class="enrolled-course-instructor">${course.instructor}</span>
                        <button class="continue-btn">继续学习</button>
                    </div>
                </div>
            `;

            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('continue-btn')) {
                    window.location.href = `course-detail.html?courseId=${item.id}&role=${role}`;
                }
            });

            const continueBtn = card.querySelector('.continue-btn');
            continueBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                window.location.href = `course-study.html?courseId=${item.id}&role=${role}`;
            });

            container.appendChild(card);
        });
    }

    // 渲染喜欢的课程
    function renderLikedCourses() {
        const container = document.getElementById('likedCourses');
        const liked = getLikedCourses();

        if (liked.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">❤️</div>
                    <div class="empty-state-text">还没有喜欢的课程</div>
                    <div class="empty-state-hint">在课程详情页点击"喜欢"按钮收藏课程</div>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        liked.forEach(courseId => {
            const course = coursesData[courseId];
            if (!course) return;

            const card = document.createElement('div');
            card.className = 'liked-course-card';
            card.innerHTML = `
                <div class="liked-course-image">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="liked-course-content">
                    <h3 class="liked-course-title">${course.title}</h3>
                    <div class="liked-course-meta">
                        <span class="liked-course-students">${course.students}+ 人学习</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', function() {
                window.location.href = `course-detail.html?courseId=${courseId}&role=${role}&from=learning`;
            });

            container.appendChild(card);
        });
    }

    // 渲染关注的课程
    function renderFollowedCourses() {
        const container = document.getElementById('followedCourses');
        const followed = getFollowedCourses();

        if (followed.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⭐</div>
                    <div class="empty-state-text">还没有关注的课程</div>
                    <div class="empty-state-hint">在课程详情页点击"收藏"按钮关注课程</div>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        followed.forEach(courseId => {
            const course = coursesData[courseId];
            if (!course) return;

            const card = document.createElement('div');
            card.className = 'followed-course-card';
            card.innerHTML = `
                <div class="followed-course-image">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="followed-course-content">
                    <h3 class="followed-course-title">${course.title}</h3>
                    <div class="followed-course-meta">
                        <span class="followed-course-students">${course.students}+ 人学习</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', function() {
                window.location.href = `course-detail.html?courseId=${courseId}&role=${role}&from=learning`;
            });

            container.appendChild(card);
        });
    }

    // 初始化
    renderEnrolledCourses();
    renderLikedCourses();
    renderFollowedCourses();
});

