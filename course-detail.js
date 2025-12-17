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
            cover: 'images/高等数学.jpg',
            students: 5000,
            courseCount: 24,
            rating: 4.8,
            instructor: {
                name: '张教授',
                title: '数学系教授',
                cover: 'images/高等数学.jpg',
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
            cover: 'images/线性代数.jpg',
            students: 4200,
            courseCount: 20,
            rating: 4.7,
            instructor: {
                name: '李教授',
                title: '数学系副教授',
                avatar: 'images/头像2.jpg',
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
            cover: 'images/数据结构与算法.jpg',
            students: 6800,
            courseCount: 32,
            rating: 4.9,
            instructor: {
                name: '王教授',
                title: '计算机系教授',
                avatar: 'images/头像3.jpg',
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

    // 课程名称到图片路径的映射
    const courseImageMap = {
        '高等数学': 'images/高等数学.jpg',
        '线性代数': 'images/线性代数.jpg',
        '数据结构与算法': 'images/数据结构与算法.jpg',
        '英语学术写作': 'images/英语学术写作.jpg',
        '机器学习基础': 'images/机器学习基础.jpg',
        '音乐理论基础': 'images/音乐理论基础.jpg',
        '心理学导论': 'images/心理学导论.jpg',
        '职业生涯规划': 'images/职业生涯规划.jpg',
        '大学物理': 'images/大学物理.jpg',
        '有机化学': 'images/有机化学.jpg',
        '细胞生物学': 'images/细胞生物学.jpg',
        '中国近现代史': 'images/中国近现代史.jpg',
        '数字艺术设计': 'images/数字艺术设计.jpg',
        '钢琴基础教程': 'images/钢琴基础教程.jpg',
        '认知心理学': 'images/认知心理学.jpg',
        '就业指导与规划': 'images/就业指导与规划.jpg',
        '量子物理导论': 'images/量子物理导论.jpg',
        '分析化学': 'images/分析化学.jpg',
        '遗传学': 'images/遗传学.jpg',
        '世界古代史': 'images/世界古代史.jpg',
        '素描基础': 'images/素描基础.jpg',
        '微积分进阶': 'images/微积分.jpg',
        'Java编程基础': 'images/Java编程基础.jpg',
        '商务英语': 'images/商务英语.jpg'
    };

    // 讲师名称到头像的映射
    const instructorAvatarMap = {
        '张教授': 'images/头像1.jpg',
        '李教授': 'images/头像2.jpg',
        '王教授': 'images/头像3.jpg',
        '陈教授': 'images/头像5.jpg',
        'Sarah老师': 'images/头像4.jpg',
        '刘老师': 'images/头像4.jpg',
        '赵教授': 'images/头像6.jpg',
        '孙老师': 'images/头像7.jpg',
        '周教授': 'images/头像1.jpg',
        '吴老师': 'images/头像2.jpg',
        '郑教授': 'images/头像3.jpg'
    };

    // 获取课程数据（如果不存在则使用默认数据）
    let courseData = courseDetails[courseId];
    
    // 如果课程数据不存在，创建默认数据
    if (!courseData) {
        // 从courses.js的数据中获取基本信息（这里需要手动匹配）
        const courseTitles = {
            4: '英语学术写作', 5: '机器学习基础', 6: '音乐理论基础',
            7: '心理学导论', 8: '职业生涯规划', 9: '大学物理',
            10: '有机化学', 11: '细胞生物学', 12: '中国近现代史',
            13: '数字艺术设计', 14: '钢琴基础教程', 15: '认知心理学',
            16: '就业指导与规划', 17: '量子物理导论', 18: '分析化学',
            19: '遗传学', 20: '世界古代史', 21: '素描基础',
            22: '微积分进阶', 23: 'Java编程基础', 24: '商务英语'
        };
        
        const title = courseTitles[courseId] || '高等数学';
        const coverImage = courseImageMap[title] || 'images/高等数学.jpg';
        
        courseData = {
            title: title,
            cover: coverImage,
            students: 3000,
            courseCount: 20,
            rating: 4.5,
            instructor: {
                name: '讲师',
                title: '专业讲师',
                avatar: 'images/头像1.jpg',
                desc: '具有丰富的教学经验，致力于为学生提供优质的教学服务。'
            },
            description: `<p>${title}是一门重要的课程，通过系统的学习，学生将掌握相关知识和技能。</p>`,
            chapters: [
                {
                    title: '第一章 课程导论',
                    lessons: [
                        { name: '1.1 课程介绍', duration: '15:30' },
                        { name: '1.2 学习目标', duration: '12:20' }
                    ]
                }
            ]
        };
    } else {
        // 如果课程数据存在，确保使用正确的图片路径
        if (courseImageMap[courseData.title]) {
            courseData.cover = courseImageMap[courseData.title];
        }
        if (instructorAvatarMap[courseData.instructor.name]) {
            courseData.instructor.avatar = instructorAvatarMap[courseData.instructor.name];
        }
    }

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


