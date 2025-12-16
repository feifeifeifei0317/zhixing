// 课程考试页面脚本
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student';

    // 从localStorage获取已选课程
    function getEnrolledCourses() {
        const stored = localStorage.getItem('enrolledCourses');
        if (stored) {
            return JSON.parse(stored);
        }
        return [
            { id: 1, progress: 65 },
            { id: 3, progress: 30 },
            { id: 5, progress: 80 }
        ];
    }

    // 生成未来几天内的日期，确保考试处于“未开始”状态
    function getDateAfterDays(daysOffset) {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 考试数据（动态生成时间）
    function generateExamData() {
        return {
            1: { // 高等数学
                title: '高等数学',
                midterm: {
                    id: 'midterm_1',
                    date: getDateAfterDays(1),
                    time: '14:00',
                    duration: 120,
                    type: 'midterm'
                },
                final: {
                    id: 'final_1',
                    date: getDateAfterDays(4),
                    time: '09:00',
                    duration: 150,
                    type: 'final'
                }
            },
            3: { // 数据结构与算法
                title: '数据结构与算法',
                midterm: {
                    id: 'midterm_3',
                    date: getDateAfterDays(2),
                    time: '14:00',
                    duration: 90,
                    type: 'midterm'
                },
                    final: {
                    id: 'final_3',
                    date: getDateAfterDays(5),
                    time: '14:00',
                    duration: 120,
                    type: 'final'
                }
            },
            5: { // 机器学习基础
                title: '机器学习基础',
                midterm: {
                    id: 'midterm_5',
                    date: getDateAfterDays(3),
                    time: '09:00',
                    duration: 100,
                    type: 'midterm'
                },
                final: {
                    id: 'final_5',
                    date: getDateAfterDays(6),
                    time: '09:00',
                    duration: 120,
                    type: 'final'
                }
            }
        };
    }

    // 获取考试状态
    function getExamStatus(examDate, examTime) {
        const now = new Date();
        const examDateTime = new Date(`${examDate} ${examTime}`);
        const diff = examDateTime - now;
        
        if (diff < 0) {
            return 'completed';
        } else if (diff < 3600000) { // 1小时内
            return 'in-progress';
        } else {
            return 'upcoming';
        }
    }

    // 格式化日期
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}月${day}日`;
    }

    // 渲染单个考试卡片
    function renderExamCard(exam, container) {
        const status = getExamStatus(exam.date, exam.time);
        const examTypeText = exam.type === 'midterm' ? '期中考试' : '期末考试';
        
        const card = document.createElement('div');
        card.className = 'exam-card';
        card.innerHTML = `
            <div class="exam-type ${exam.type}">${examTypeText}</div>
            <h3 class="exam-title">${exam.courseTitle}</h3>
            <div class="exam-course">${examTypeText}</div>
            <div class="exam-time">${formatDate(exam.date)} ${exam.time}</div>
            <div class="exam-duration">考试时长：${exam.duration} 分钟</div>
            <div class="exam-status ${status}">
                ${status === 'upcoming' ? '即将开始' : status === 'in-progress' ? '进行中' : '已结束'}
            </div>
        `;

        card.addEventListener('click', function() {
            if (status !== 'completed') {
                const params = new URLSearchParams({
                    examId: exam.id,
                    courseId: exam.courseId,
                    type: exam.type,
                    role,
                    date: exam.date,
                    time: exam.time,
                    duration: exam.duration,
                    title: exam.courseTitle
                });
                window.location.href = `exam-detail.html?${params.toString()}`;
            }
        });

        container.appendChild(card);
    }

    // 渲染空状态
    function renderEmptyState(container, message) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: white; border-radius: 16px;">
                <div style="font-size: 64px; margin-bottom: 20px;">📝</div>
                <div style="color: #999; font-size: 16px;">${message}</div>
            </div>
        `;
    }

    // 渲染考试列表
    function renderExams() {
        const midtermContainer = document.getElementById('midtermExamList');
        const finalContainer = document.getElementById('finalExamList');
        const enrolled = getEnrolledCourses();

        if (enrolled.length === 0) {
            midtermContainer.innerHTML = '';
            finalContainer.innerHTML = '';
            renderEmptyState(midtermContainer, '还没有选择任何课程，去课程中心选择课程后，这里会显示相应的考试安排');
            renderEmptyState(finalContainer, '还没有选择任何课程，去课程中心选择课程后，这里会显示相应的考试安排');
            return;
        }

        const examData = generateExamData();
        const midtermExams = [];
        const finalExams = [];

        enrolled.forEach(item => {
            const course = examData[item.id];
            if (course) {
                if (course.midterm) {
                    midtermExams.push({
                        ...course.midterm,
                        courseTitle: course.title,
                        courseId: item.id
                    });
                }
                if (course.final) {
                    finalExams.push({
                        ...course.final,
                        courseTitle: course.title,
                        courseId: item.id
                    });
                }
            }
        });

        // 按日期排序
        midtermExams.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateA - dateB;
        });

        finalExams.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateA - dateB;
        });

        // 渲染期中考试
        midtermContainer.innerHTML = '';
        if (midtermExams.length === 0) {
            renderEmptyState(midtermContainer, '暂无期中考试安排');
        } else {
            midtermExams.forEach(exam => {
                renderExamCard(exam, midtermContainer);
            });
        }

        // 渲染期末考试
        finalContainer.innerHTML = '';
        if (finalExams.length === 0) {
            renderEmptyState(finalContainer, '暂无期末考试安排');
        } else {
            finalExams.forEach(exam => {
                renderExamCard(exam, finalContainer);
            });
        }
    }

    // 初始化
    renderExams();
});

