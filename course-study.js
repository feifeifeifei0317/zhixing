// 课程学习页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取课程ID
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('courseId')) || 1;
    const role = urlParams.get('role') || 'student';

    // 课程详细数据（与course-detail.js保持一致）
    const courseDetails = {
        1: {
            title: '高等数学',
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
        3: {
            title: '数据结构与算法',
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
                        { name: '2.2 二叉搜索树', duration: '26:40' }
                    ]
                }
            ]
        },
        5: {
            title: '机器学习基础',
            chapters: [
                {
                    title: '第一章 机器学习概述',
                    lessons: [
                        { name: '1.1 什么是机器学习', duration: '18:20' },
                        { name: '1.2 机器学习的类型', duration: '22:30' },
                        { name: '1.3 应用场景', duration: '20:15' }
                    ]
                },
                {
                    title: '第二章 监督学习',
                    lessons: [
                        { name: '2.1 线性回归', duration: '25:45' },
                        { name: '2.2 逻辑回归', duration: '24:20' },
                        { name: '2.3 决策树', duration: '26:10' }
                    ]
                }
            ]
        }
    };

    // 获取课程数据
    const courseData = courseDetails[courseId] || courseDetails[1];

    // 获取学习进度（从localStorage）
    function getLearningProgress() {
        const key = `course_${courseId}_progress`;
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored);
        }
        // 默认进度：根据课程ID设置不同的当前学习位置
        const defaultProgress = {
            1: { currentChapter: 1, currentLesson: 2, completedLessons: ['1.1'] }, // 高等数学：当前在1.2
            3: { currentChapter: 1, currentLesson: 1, completedLessons: [] }, // 数据结构：当前在1.1
            5: { currentChapter: 2, currentLesson: 1, completedLessons: ['1.1', '1.2', '1.3'] } // 机器学习：当前在2.1
        };
        return defaultProgress[courseId] || { currentChapter: 1, currentLesson: 1, completedLessons: [] };
    }

    // 加载课程目录
    function loadCourseChapters() {
        document.getElementById('courseTitle').textContent = courseData.title;

        const container = document.getElementById('courseChaptersContainer');
        container.innerHTML = '';

        const progress = getLearningProgress();

        courseData.chapters.forEach((chapter, chapterIndex) => {
            const chapterItem = document.createElement('div');
            chapterItem.className = 'chapter-item';
            
            // 默认展开第一个章节
            if (chapterIndex === 0) {
                chapterItem.classList.add('expanded');
            }

            const chapterNumber = chapterIndex + 1;
            const isCurrentChapter = chapterNumber === progress.currentChapter;

            chapterItem.innerHTML = `
                <div class="chapter-header">
                    <div class="chapter-title">
                        <span class="chapter-number">${chapterNumber}</span>
                        <span>${chapter.title}</span>
                    </div>
                    <div class="chapter-info">
                        <span>${chapter.lessons.length} 节课程</span>
                        <span class="chapter-toggle">▼</span>
                    </div>
                </div>
                <div class="chapter-lessons">
                    ${chapter.lessons.map((lesson, lessonIndex) => {
                        const lessonKey = `${chapterNumber}.${lessonIndex + 1}`;
                        const isCompleted = progress.completedLessons.includes(lessonKey);
                        const isCurrent = isCurrentChapter && (lessonIndex + 1) === progress.currentLesson;
                        
                        let lessonClass = 'lesson-item';
                        if (isCompleted) {
                            lessonClass += ' completed';
                        } else if (isCurrent) {
                            lessonClass += ' current';
                        }

                        return `
                            <div class="${lessonClass}" data-chapter="${chapterNumber}" data-lesson="${lessonIndex + 1}">
                                <div class="lesson-icon">${isCompleted ? '✓' : isCurrent ? '▶' : '○'}</div>
                                <div class="lesson-name">${lesson.name}</div>
                                <div class="lesson-duration">${lesson.duration}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            // 章节展开/收起
            const chapterHeader = chapterItem.querySelector('.chapter-header');
            chapterHeader.addEventListener('click', function() {
                chapterItem.classList.toggle('expanded');
            });

            // 如果当前章节，自动展开
            if (isCurrentChapter) {
                chapterItem.classList.add('expanded');
            }

            // 课程点击事件
            const lessonItems = chapterItem.querySelectorAll('.lesson-item');
            lessonItems.forEach(lessonItem => {
                lessonItem.addEventListener('click', function() {
                    const chapterNum = this.getAttribute('data-chapter');
                    const lessonNum = this.getAttribute('data-lesson');
                    window.location.href = `course-video.html?courseId=${courseId}&chapter=${chapterNum}&lesson=${lessonNum}&role=${role}`;
                });
            });

            container.appendChild(chapterItem);
        });
    }

    // 返回按钮
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', function() {
        window.location.href = `course-learning.html?role=${role}`;
    });

    // 初始化
    loadCourseChapters();
});

