// 通用导航栏更新函数
function updateNavigationForRole(role) {
    const learningLink = document.getElementById('learningLink') || document.getElementById('learningLinkAI') || document.getElementById('learningLinkProfile') || document.getElementById('learningLinkQuiz');
    const schoolLink = document.getElementById('schoolLink') || document.getElementById('schoolLinkAI') || document.getElementById('schoolLinkProfile') || document.getElementById('schoolLinkQuiz');
    const examLink = document.getElementById('examLink') || document.getElementById('examLinkAI') || document.getElementById('examLinkProfile') || document.getElementById('examLinkQuiz');

    if (role === 'teacher') {
        // 教师端：隐藏课程学习、学校，但保留课程考试（功能不同）
        if (learningLink) learningLink.style.display = 'none';
        if (schoolLink) schoolLink.style.display = 'none';
        // 教师端的课程考试在课程中心内，导航栏的考试链接可以跳转到课程中心
        if (examLink) examLink.style.display = '';
    } else {
        // 学生端：显示所有导航项
        if (learningLink) learningLink.style.display = '';
        if (schoolLink) schoolLink.style.display = '';
        if (examLink) examLink.style.display = '';
    }
}

// 更新课程链接跳转
function updateCoursesLink(role) {
    const coursesLink = document.getElementById('coursesLink') || document.getElementById('coursesLinkAI') || document.getElementById('coursesLinkProfile');
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
}

