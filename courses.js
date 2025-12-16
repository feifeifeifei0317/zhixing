// 课程中心页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 课程数据
    const coursesData = [
        { id: 1, title: '高等数学', subject: 'math', difficulty: 'intermediate', instructor: 'zhang', students: 5000, image: 'https://via.placeholder.com/300x200/8B1538/FFFFFF?text=高等数学' },
        { id: 2, title: '线性代数', subject: 'math', difficulty: 'intermediate', instructor: 'li', students: 4200, image: 'https://via.placeholder.com/300x200/1E3A8A/FFFFFF?text=线性代数' },
        { id: 3, title: '数据结构与算法', subject: 'cs', difficulty: 'advanced', instructor: 'wang', students: 6800, image: 'https://via.placeholder.com/300x200/166534/FFFFFF?text=数据结构' },
        { id: 4, title: '英语学术写作', subject: 'english', difficulty: 'beginner', instructor: 'sarah', students: 3500, image: 'https://via.placeholder.com/300x200/7C2D12/FFFFFF?text=英语写作' },
        { id: 5, title: '机器学习基础', subject: 'cs', difficulty: 'advanced', instructor: 'chen', students: 8900, image: 'https://via.placeholder.com/300x200/581C87/FFFFFF?text=机器学习' },
        { id: 6, title: '音乐理论基础', subject: 'music', difficulty: 'beginner', instructor: 'liu', students: 2100, image: 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=音乐理论' },
        { id: 7, title: '心理学导论', subject: 'psychology', difficulty: 'beginner', instructor: 'zhao', students: 3200, image: 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=心理学' },
        { id: 8, title: '职业生涯规划', subject: 'career', difficulty: 'beginner', instructor: 'sun', students: 2800, image: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=生涯规划' },
        { id: 9, title: '大学物理', subject: 'physics', difficulty: 'intermediate', instructor: 'zhou', students: 4100, image: 'https://via.placeholder.com/300x200/0284C7/FFFFFF?text=大学物理' },
        { id: 10, title: '有机化学', subject: 'chemistry', difficulty: 'advanced', instructor: 'wu', students: 2900, image: 'https://via.placeholder.com/300x200/EA580C/FFFFFF?text=有机化学' },
        { id: 11, title: '细胞生物学', subject: 'biology', difficulty: 'intermediate', instructor: 'zheng', students: 2600, image: 'https://via.placeholder.com/300x200/16A34A/FFFFFF?text=细胞生物学' },
        { id: 12, title: '中国近现代史', subject: 'history', difficulty: 'beginner', instructor: 'li', students: 1800, image: 'https://via.placeholder.com/300x200/B91C1C/FFFFFF?text=近现代史' },
        { id: 13, title: '数字艺术设计', subject: 'art', difficulty: 'intermediate', instructor: 'wang', students: 3400, image: 'https://via.placeholder.com/300x200/DB2777/FFFFFF?text=数字艺术' },
        { id: 14, title: '钢琴基础教程', subject: 'music', difficulty: 'beginner', instructor: 'liu', students: 2200, image: 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=钢琴基础' },
        { id: 15, title: '认知心理学', subject: 'psychology', difficulty: 'advanced', instructor: 'zhao', students: 1900, image: 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=认知心理' },
        { id: 16, title: '就业指导与规划', subject: 'career', difficulty: 'beginner', instructor: 'sun', students: 3100, image: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=就业指导' },
        { id: 17, title: '量子物理导论', subject: 'physics', difficulty: 'advanced', instructor: 'zhou', students: 1500, image: 'https://via.placeholder.com/300x200/0284C7/FFFFFF?text=量子物理' },
        { id: 18, title: '分析化学', subject: 'chemistry', difficulty: 'intermediate', instructor: 'wu', students: 2400, image: 'https://via.placeholder.com/300x200/EA580C/FFFFFF?text=分析化学' },
        { id: 19, title: '遗传学', subject: 'biology', difficulty: 'advanced', instructor: 'zheng', students: 2100, image: 'https://via.placeholder.com/300x200/16A34A/FFFFFF?text=遗传学' },
        { id: 20, title: '世界古代史', subject: 'history', difficulty: 'beginner', instructor: 'li', students: 1600, image: 'https://via.placeholder.com/300x200/B91C1C/FFFFFF?text=古代史' },
        { id: 21, title: '素描基础', subject: 'art', difficulty: 'beginner', instructor: 'wang', students: 2700, image: 'https://via.placeholder.com/300x200/DB2777/FFFFFF?text=素描基础' },
        { id: 22, title: '微积分进阶', subject: 'math', difficulty: 'advanced', instructor: 'zhang', students: 3800, image: 'https://via.placeholder.com/300x200/8B1538/FFFFFF?text=微积分' },
        { id: 23, title: 'Java编程基础', subject: 'cs', difficulty: 'beginner', instructor: 'chen', students: 5200, image: 'https://via.placeholder.com/300x200/166534/FFFFFF?text=Java编程' },
        { id: 24, title: '商务英语', subject: 'english', difficulty: 'intermediate', instructor: 'sarah', students: 2900, image: 'https://via.placeholder.com/300x200/7C2D12/FFFFFF?text=商务英语' }
    ];

    // 讲师名称映射
    const instructorNames = {
        'zhang': '张教授',
        'li': '李教授',
        'wang': '王教授',
        'chen': '陈教授',
        'sarah': 'Sarah老师',
        'liu': '刘老师',
        'zhao': '赵教授',
        'sun': '孙老师',
        'zhou': '周教授',
        'wu': '吴老师',
        'zheng': '郑教授'
    };

    // 学科名称映射
    const subjectNames = {
        'math': '数学',
        'cs': '计算机',
        'english': '英语',
        'music': '音乐',
        'psychology': '心理',
        'career': '生涯规划',
        'physics': '物理',
        'chemistry': '化学',
        'biology': '生物',
        'history': '历史',
        'art': '艺术'
    };

    // 难度名称映射
    const difficultyNames = {
        'beginner': '初级',
        'intermediate': '中级',
        'advanced': '高级'
    };

    // 当前筛选条件
    let currentFilters = {
        subject: 'all',
        difficulty: 'all',
        instructor: 'all'
    };

    // 渲染课程列表
    function renderCourses() {
        const coursesGrid = document.getElementById('coursesGrid');
        const filteredCourses = coursesData.filter(course => {
            if (currentFilters.subject !== 'all' && course.subject !== currentFilters.subject) {
                return false;
            }
            if (currentFilters.difficulty !== 'all' && course.difficulty !== currentFilters.difficulty) {
                return false;
            }
            if (currentFilters.instructor !== 'all' && course.instructor !== currentFilters.instructor) {
                return false;
            }
            return true;
        });

        coursesGrid.innerHTML = '';

        if (filteredCourses.length === 0) {
            coursesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">暂无符合条件的课程</div>';
            return;
        }

        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card-item';
            courseCard.innerHTML = `
                <div class="course-card-image">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="course-card-content">
                    <h3 class="course-card-title">${course.title}</h3>
                    <div class="course-card-meta">
                        <div class="course-card-instructor">${instructorNames[course.instructor]}</div>
                        <div class="course-card-subject">${subjectNames[course.subject]}</div>
                        <div class="course-card-difficulty">${difficultyNames[course.difficulty]}</div>
                    </div>
                    <div class="course-card-footer">
                        <span class="course-card-students">${course.students}+ 人学习</span>
                        <button class="course-card-button">立即学习</button>
                    </div>
                </div>
            `;
            
            courseCard.addEventListener('click', function() {
                const urlParams = new URLSearchParams(window.location.search);
                const role = urlParams.get('role') || 'student';
                window.location.href = `course-detail.html?courseId=${course.id}&role=${role}`;
            });

            coursesGrid.appendChild(courseCard);
        });
    }

    // 筛选按钮点击事件
    function setupFilters() {
        const filterGroups = ['subject', 'difficulty', 'instructor'];
        
        filterGroups.forEach(group => {
            const filterButtons = document.querySelectorAll(`#${group}Filter .filter-btn`);
            filterButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    // 移除同组其他按钮的active类
                    filterButtons.forEach(b => b.classList.remove('active'));
                    // 添加当前按钮的active类
                    this.classList.add('active');
                    // 更新筛选条件
                    currentFilters[group] = this.getAttribute('data-value');
                    // 重新渲染课程列表
                    renderCourses();
                });
            });
        });
    }

    // 初始化
    setupFilters();
    renderCourses();
});

