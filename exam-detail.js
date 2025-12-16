// 考试详情页面脚本
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const examId = urlParams.get('examId');
    const courseId = parseInt(urlParams.get('courseId')) || 1;
    const examType = urlParams.get('type') || 'midterm';
    const role = urlParams.get('role') || 'student';

    // 考试数据
    const examDetails = {
        'midterm_1': {
            courseTitle: '高等数学',
            type: 'midterm',
            duration: 120,
            date: '2024-12-15',
            time: '14:00'
        },
        'final_1': {
            courseTitle: '高等数学',
            type: 'final',
            duration: 150,
            date: '2025-01-10',
            time: '09:00'
        },
        'midterm_3': {
            courseTitle: '数据结构与算法',
            type: 'midterm',
            duration: 90,
            date: '2024-12-18',
            time: '14:00'
        },
        'final_3': {
            courseTitle: '数据结构与算法',
            type: 'final',
            duration: 120,
            date: '2025-01-12',
            time: '14:00'
        },
        'midterm_5': {
            courseTitle: '机器学习基础',
            type: 'midterm',
            duration: 100,
            date: '2024-12-20',
            time: '09:00'
        },
        'final_5': {
            courseTitle: '机器学习基础',
            type: 'final',
            duration: 120,
            date: '2025-01-15',
            time: '09:00'
        }
    };

    // 如果URL传入了具体信息，则以URL为准，未传入时使用默认数据
    const examInfo = {
        courseTitle: urlParams.get('title') || (examDetails[examId]?.courseTitle) || '课程',
        type: examType,
        duration: parseInt(urlParams.get('duration')) || (examDetails[examId]?.duration) || 120,
        date: urlParams.get('date') || (examDetails[examId]?.date) || '2024-12-15',
        time: urlParams.get('time') || (examDetails[examId]?.time) || '14:00'
    };

    // 加载考试信息
    function loadExamInfo() {
        const typeText = examInfo.type === 'midterm' ? '期中考试' : '期末考试';
        document.getElementById('examTypeBadge').textContent = typeText;
        document.getElementById('examTypeBadge').className = `exam-type-badge ${examInfo.type}`;
        document.getElementById('examTitle').textContent = `${examInfo.courseTitle}${typeText}`;
        document.getElementById('examSubject').textContent = examInfo.courseTitle;
        document.getElementById('examDuration').textContent = `${examInfo.duration} 分钟`;
        document.getElementById('examTime').textContent = `${examInfo.date} ${examInfo.time}`;
        document.getElementById('noticeDuration').textContent = examInfo.duration;
    }

    // 阅读计时器
    let readSeconds = 5;
    const readTimer = document.getElementById('readTimer');
    const startExamBtn = document.getElementById('startExamBtn');
    let timerInterval;

    function startReadTimer() {
        timerInterval = setInterval(function() {
            readSeconds--;
            readTimer.textContent = readSeconds;
            
            if (readSeconds <= 0) {
                clearInterval(timerInterval);
                startExamBtn.disabled = false;
                startExamBtn.textContent = '开始考试';
            }
        }, 1000);
    }

    // 开始考试按钮
    startExamBtn.addEventListener('click', function() {
        if (!this.disabled) {
            const params = new URLSearchParams({
                examId: examId,
                courseId: courseId,
                type: examType,
                duration: examInfo.duration,
                role: role,
                title: examInfo.courseTitle
            });
            window.location.href = `exam-taking.html?${params.toString()}`;
        }
    });

    // 返回按钮
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', function() {
        window.location.href = `exam.html?role=${role}`;
    });

    // 确保考试须知弹窗在页面加载时显示
    const noticeModal = document.getElementById('noticeModal');
    if (noticeModal) {
        noticeModal.style.display = 'flex';
    }

    // 初始化
    loadExamInfo();
    startReadTimer();
});

