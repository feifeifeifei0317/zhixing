// 课程详情页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取课程ID
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('courseId')) || 1;
    const role = urlParams.get('role') || 'student';

    // 课程详细数据
    const courseDetails = {
        1: {
            title: '高等数学',
            cover: 'https://via.placeholder.com/400x300/8B1538/FFFFFF?text=高等数学',
            students: 5000,
            courseCount: 24,
            rating: 4.8,
            instructor: {
                name: '张教授',
                title: '数学系教授',
                avatar: 'https://via.placeholder.com/100/8B1538/FFFFFF?text=张',
                desc: '从事高等数学教学20余年，具有丰富的教学经验。曾获得多项教学奖项，擅长将复杂的数学概念用通俗易懂的方式讲解。'
            },
            description: `
                <p>本课程是大学数学的基础课程，主要讲解微积分、极限、导数等核心概念。通过系统的学习，学生将掌握高等数学的基本理论和方法，为后续专业课程打下坚实基础。</p>
                <p>课程内容包括：函数与极限、导数与微分、积分学、级数理论等。每个章节都配有丰富的例题和练习题，帮助学生深入理解数学概念。</p>
                <p>适合对象：大一、大二学生，以及对数学感兴趣的学习者。</p>
            `,
            chapters: [
                {
                    title: '第一章 函数与极限',
                    lessons: [
                        { name: '1.1 函数的概念', duration: '15:30' },
                        { name: '1.2 极限的定义', duration: '20:45' },
                        { name: '1.3 极限的运算', duration: '18:20' },
                        { name: '1.4 无穷小与无穷大', duration: '16:10' }
                    ]
                },
                {
                    title: '第二章 导数与微分',
                    lessons: [
                        { name: '2.1 导数的概念', duration: '22:15' },
                        { name: '2.2 求导法则', duration: '25:30' },
                        { name: '2.3 高阶导数', duration: '19:45' },
                        { name: '2.4 微分的应用', duration: '21:20' }
                    ]
                },
                {
                    title: '第三章 积分学',
                    lessons: [
                        { name: '3.1 不定积分', duration: '24:10' },
                        { name: '3.2 定积分', duration: '26:30' },
                        { name: '3.3 换元积分法', duration: '23:45' },
                        { name: '3.4 分部积分法', duration: '20:15' }
                    ]
                }
            ]
        },
        2: {
            title: '线性代数',
            cover: 'https://via.placeholder.com/400x300/1E3A8A/FFFFFF?text=线性代数',
            students: 4200,
            courseCount: 20,
            rating: 4.7,
            instructor: {
                name: '李教授',
                title: '数学系副教授',
                avatar: 'https://via.placeholder.com/100/1E3A8A/FFFFFF?text=李',
                desc: '专注于线性代数教学与研究，发表多篇学术论文。教学风格严谨，注重培养学生的抽象思维能力。'
            },
            description: `
                <p>线性代数是现代数学的重要分支，广泛应用于计算机科学、物理学、工程学等领域。本课程将系统讲解矩阵运算、向量空间、特征值等核心知识。</p>
                <p>通过本课程的学习，学生将掌握线性代数的基本理论和方法，培养抽象思维能力，为后续专业课程的学习奠定基础。</p>
            `,
            chapters: [
                {
                    title: '第一章 矩阵与行列式',
                    lessons: [
                        { name: '1.1 矩阵的概念', duration: '18:20' },
                        { name: '1.2 矩阵的运算', duration: '22:30' },
                        { name: '1.3 行列式', duration: '20:15' }
                    ]
                },
                {
                    title: '第二章 向量空间',
                    lessons: [
                        { name: '2.1 向量的概念', duration: '19:45' },
                        { name: '2.2 向量空间', duration: '24:20' },
                        { name: '2.3 基与维数', duration: '21:10' }
                    ]
                }
            ]
        },
        3: {
            title: '数据结构与算法',
            cover: 'https://via.placeholder.com/400x300/166534/FFFFFF?text=数据结构',
            students: 6800,
            courseCount: 32,
            rating: 4.9,
            instructor: {
                name: '王教授',
                title: '计算机系教授',
                avatar: 'https://via.placeholder.com/100/166534/FFFFFF?text=王',
                desc: '计算机科学领域资深专家，拥有丰富的算法设计经验。曾参与多个大型软件项目的开发，擅长将理论与实践相结合。'
            },
            description: `
                <p>数据结构与算法是计算机科学的核心课程，本课程将系统讲解常用数据结构（数组、链表、栈、队列、树、图等）和经典算法设计方法。</p>
                <p>通过大量的编程实践和算法分析，帮助学生提升编程能力和问题解决技巧，为软件开发打下坚实基础。</p>
            `,
            chapters: [
                {
                    title: '第一章 线性数据结构',
                    lessons: [
                        { name: '1.1 数组', duration: '20:30' },
                        { name: '1.2 链表', duration: '25:45' },
                        { name: '1.3 栈与队列', duration: '22:20' }
                    ]
                },
                {
                    title: '第二章 树形结构',
                    lessons: [
                        { name: '2.1 二叉树', duration: '28:15' },
                        { name: '2.2 二叉搜索树', duration: '26:40' },
                        { name: '2.3 平衡树', duration: '24:30' }
                    ]
                }
            ]
        }
    };

    // 获取课程数据（如果不存在则使用默认数据）
    const courseData = courseDetails[courseId] || courseDetails[1];

    // 加载课程信息
    function loadCourseData() {
        document.getElementById('courseTitle').textContent = courseData.title;
        document.getElementById('courseCover').src = courseData.cover;
        document.getElementById('courseStudents').textContent = courseData.students;
        document.getElementById('courseCount').textContent = courseData.courseCount;
        document.getElementById('courseRating').textContent = courseData.rating;

        // 讲师信息
        document.getElementById('instructorName').textContent = courseData.instructor.name;
        document.getElementById('instructorTitle').textContent = courseData.instructor.title;
        document.getElementById('instructorAvatar').src = courseData.instructor.avatar;
        document.getElementById('instructorDesc').textContent = courseData.instructor.desc;

        // 课程描述
        document.getElementById('courseDescription').innerHTML = courseData.description;

        // 课程目录
        renderChapters(courseData.chapters);
    }

    // 渲染课程目录
    function renderChapters(chapters) {
        const chaptersContainer = document.getElementById('courseChapters');
        chaptersContainer.innerHTML = '';

        chapters.forEach((chapter, index) => {
            const chapterItem = document.createElement('div');
            chapterItem.className = 'chapter-item';
            chapterItem.innerHTML = `
                <div class="chapter-header">
                    <div class="chapter-title">
                        <span class="chapter-number">${index + 1}</span>
                        <span>${chapter.title}</span>
                    </div>
                    <div class="chapter-info">
                        <span>${chapter.lessons.length} 节课程</span>
                        <span class="chapter-toggle">▼</span>
                    </div>
                </div>
                <div class="chapter-lessons">
                    ${chapter.lessons.map((lesson, lessonIndex) => `
                        <div class="lesson-item">
                            <div class="lesson-icon">▶</div>
                            <div class="lesson-name">${lesson.name}</div>
                            <div class="lesson-duration">${lesson.duration}</div>
                        </div>
                    `).join('')}
                </div>
            `;

            // 章节展开/收起
            const chapterHeader = chapterItem.querySelector('.chapter-header');
            chapterHeader.addEventListener('click', function() {
                chapterItem.classList.toggle('expanded');
            });

            chaptersContainer.appendChild(chapterItem);
        });
    }

    // 返回按钮
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', function() {
        const from = urlParams.get('from');
        if (from === 'learning') {
            window.location.href = `course-learning.html?role=${role}`;
        } else {
            window.location.href = `courses.html?role=${role}`;
        }
    });

    // 喜欢按钮
    const likeBtn = document.getElementById('likeBtn');
    let isLiked = false;
    likeBtn.addEventListener('click', function() {
        isLiked = !isLiked;
        this.classList.toggle('active');
        const btnText = this.querySelector('.btn-text');
        btnText.textContent = isLiked ? '已喜欢' : '喜欢';
    });

    // 收藏按钮
    const favoriteBtn = document.getElementById('favoriteBtn');
    let isFavorited = false;
    favoriteBtn.addEventListener('click', function() {
        isFavorited = !isFavorited;
        this.classList.toggle('active');
        const btnText = this.querySelector('.btn-text');
        btnText.textContent = isFavorited ? '已收藏' : '收藏';
    });

    // 选择课程按钮
    const enrollBtn = document.getElementById('enrollBtn');
    enrollBtn.addEventListener('click', function() {
        alert(`已成功选择课程：${courseData.title}\n\n开始你的学习之旅吧！`);
        // 这里可以添加跳转到学习页面的逻辑
        // window.location.href = `course-study.html?courseId=${courseId}&role=${role}`;
    });

    // 初始化
    loadCourseData();
});

