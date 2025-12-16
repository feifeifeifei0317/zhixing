// 学校详情页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取学校ID
    const urlParams = new URLSearchParams(window.location.search);
    const schoolId = parseInt(urlParams.get('schoolId')) || 1;
    const role = urlParams.get('role') || 'student';

    // 学校详细数据
    const schoolDetails = {
        1: {
            name: '清华大学',
            logo: 'https://via.placeholder.com/150/8B1538/FFFFFF?text=清华',
            banner: 'https://via.placeholder.com/1200x400/8B1538/FFFFFF?text=清华大学',
            description: '清华大学是中国著名高等学府，坐落于北京西北郊风景秀丽的清华园。学校秉持"自强不息、厚德载物"的校训，致力于培养具有全球视野和创新精神的高素质人才。',
            courses: [
                { id: 1, title: '高等数学', image: 'https://via.placeholder.com/280x160/8B1538/FFFFFF?text=高等数学', students: 5000 },
                { id: 2, title: '线性代数', image: 'https://via.placeholder.com/280x160/1E3A8A/FFFFFF?text=线性代数', students: 4200 },
                { id: 3, title: '数据结构与算法', image: 'https://via.placeholder.com/280x160/166534/FFFFFF?text=数据结构', students: 6800 },
                { id: 5, title: '机器学习基础', image: 'https://via.placeholder.com/280x160/581C87/FFFFFF?text=机器学习', students: 8900 }
            ]
        },
        2: {
            name: '北京大学',
            logo: 'https://via.placeholder.com/150/1E3A8A/FFFFFF?text=北大',
            banner: 'https://via.placeholder.com/1200x400/1E3A8A/FFFFFF?text=北京大学',
            description: '北京大学是中国第一所国立综合性大学，也是新文化运动的中心和"五四"运动的策源地。学校以"思想自由、兼容并包"为办学理念，培养了大批杰出人才。',
            courses: [
                { id: 4, title: '英语学术写作', image: 'https://via.placeholder.com/280x160/7C2D12/FFFFFF?text=英语写作', students: 3500 },
                { id: 7, title: '心理学导论', image: 'https://via.placeholder.com/280x160/7C3AED/FFFFFF?text=心理学', students: 3200 },
                { id: 12, title: '中国近现代史', image: 'https://via.placeholder.com/280x160/B91C1C/FFFFFF?text=近现代史', students: 1800 },
                { id: 20, title: '世界古代史', image: 'https://via.placeholder.com/280x160/B91C1C/FFFFFF?text=古代史', students: 1600 }
            ]
        },
        3: {
            name: '复旦大学',
            logo: 'https://via.placeholder.com/150/166534/FFFFFF?text=复旦',
            banner: 'https://via.placeholder.com/1200x400/166534/FFFFFF?text=复旦大学',
            description: '复旦大学是一所世界知名、国内顶尖的综合性研究型大学。学校坚持"博学而笃志，切问而近思"的校训，致力于培养具有人文情怀、科学精神、专业素养、国际视野的领袖人才。',
            courses: [
                { id: 9, title: '大学物理', image: 'https://via.placeholder.com/280x160/0284C7/FFFFFF?text=大学物理', students: 4100 },
                { id: 17, title: '量子物理导论', image: 'https://via.placeholder.com/280x160/0284C7/FFFFFF?text=量子物理', students: 1500 },
                { id: 18, title: '分析化学', image: 'https://via.placeholder.com/280x160/EA580C/FFFFFF?text=分析化学', students: 2400 },
                { id: 10, title: '有机化学', image: 'https://via.placeholder.com/280x160/EA580C/FFFFFF?text=有机化学', students: 2900 }
            ]
        },
        4: {
            name: '上海交通大学',
            logo: 'https://via.placeholder.com/150/7C2D12/FFFFFF?text=交大',
            banner: 'https://via.placeholder.com/1200x400/7C2D12/FFFFFF?text=上海交通大学',
            description: '上海交通大学是我国历史最悠久、享誉海内外的高等学府之一。学校以"饮水思源、爱国荣校"为校训，培养了大批杰出的科学家、教育家、企业家和社会活动家。',
            courses: [
                { id: 23, title: 'Java编程基础', image: 'https://via.placeholder.com/280x160/166534/FFFFFF?text=Java编程', students: 5200 },
                { id: 3, title: '数据结构与算法', image: 'https://via.placeholder.com/280x160/166534/FFFFFF?text=数据结构', students: 6800 },
                { id: 5, title: '机器学习基础', image: 'https://via.placeholder.com/280x160/581C87/FFFFFF?text=机器学习', students: 8900 },
                { id: 13, title: '数字艺术设计', image: 'https://via.placeholder.com/280x160/DB2777/FFFFFF?text=数字艺术', students: 3400 }
            ]
        },
        5: {
            name: '浙江大学',
            logo: 'https://via.placeholder.com/150/581C87/FFFFFF?text=浙大',
            banner: 'https://via.placeholder.com/1200x400/581C87/FFFFFF?text=浙江大学',
            description: '浙江大学是一所历史悠久、声誉卓著的高等学府，坐落于中国历史文化名城、风景旅游胜地杭州。学校以"求是创新"为校训，致力于培养具有国际视野的高素质创新人才。',
            courses: [
                { id: 11, title: '细胞生物学', image: 'https://via.placeholder.com/280x160/16A34A/FFFFFF?text=细胞生物学', students: 2600 },
                { id: 19, title: '遗传学', image: 'https://via.placeholder.com/280x160/16A34A/FFFFFF?text=遗传学', students: 2100 },
                { id: 15, title: '认知心理学', image: 'https://via.placeholder.com/280x160/7C3AED/FFFFFF?text=认知心理', students: 1900 },
                { id: 8, title: '职业生涯规划', image: 'https://via.placeholder.com/280x160/059669/FFFFFF?text=生涯规划', students: 2800 }
            ]
        },
        6: {
            name: '南京大学',
            logo: 'https://via.placeholder.com/150/DC2626/FFFFFF?text=南大',
            banner: 'https://via.placeholder.com/1200x400/DC2626/FFFFFF?text=南京大学',
            description: '南京大学是一所历史悠久、声誉卓著的百年名校。学校以"诚朴雄伟、励学敦行"为校训，培养了大批杰出人才，为国家和社会做出了重要贡献。',
            courses: [
                { id: 6, title: '音乐理论基础', image: 'https://via.placeholder.com/280x160/DC2626/FFFFFF?text=音乐理论', students: 2100 },
                { id: 14, title: '钢琴基础教程', image: 'https://via.placeholder.com/280x160/DC2626/FFFFFF?text=钢琴基础', students: 2200 },
                { id: 21, title: '素描基础', image: 'https://via.placeholder.com/280x160/DB2777/FFFFFF?text=素描基础', students: 2700 },
                { id: 13, title: '数字艺术设计', image: 'https://via.placeholder.com/280x160/DB2777/FFFFFF?text=数字艺术', students: 3400 }
            ]
        },
        7: {
            name: '中山大学',
            logo: 'https://via.placeholder.com/150/7C3AED/FFFFFF?text=中大',
            banner: 'https://via.placeholder.com/1200x400/7C3AED/FFFFFF?text=中山大学',
            description: '中山大学由孙中山先生创办，有着一百多年办学传统。学校以"博学、审问、慎思、明辨、笃行"为校训，致力于培养具有国际视野、创新精神和实践能力的高素质人才。',
            courses: [
                { id: 7, title: '心理学导论', image: 'https://via.placeholder.com/280x160/7C3AED/FFFFFF?text=心理学', students: 3200 },
                { id: 15, title: '认知心理学', image: 'https://via.placeholder.com/280x160/7C3AED/FFFFFF?text=认知心理', students: 1900 },
                { id: 16, title: '就业指导与规划', image: 'https://via.placeholder.com/280x160/059669/FFFFFF?text=就业指导', students: 3100 },
                { id: 8, title: '职业生涯规划', image: 'https://via.placeholder.com/280x160/059669/FFFFFF?text=生涯规划', students: 2800 }
            ]
        },
        8: {
            name: '华中科技大学',
            logo: 'https://via.placeholder.com/150/059669/FFFFFF?text=华科',
            banner: 'https://via.placeholder.com/1200x400/059669/FFFFFF?text=华中科技大学',
            description: '华中科技大学是国家教育部直属重点综合性大学，由原华中理工大学、同济医科大学、武汉城市建设学院合并成立。学校以"明德厚学、求是创新"为校训。',
            courses: [
                { id: 3, title: '数据结构与算法', image: 'https://via.placeholder.com/280x160/166534/FFFFFF?text=数据结构', students: 6800 },
                { id: 23, title: 'Java编程基础', image: 'https://via.placeholder.com/280x160/166534/FFFFFF?text=Java编程', students: 5200 },
                { id: 5, title: '机器学习基础', image: 'https://via.placeholder.com/280x160/581C87/FFFFFF?text=机器学习', students: 8900 },
                { id: 9, title: '大学物理', image: 'https://via.placeholder.com/280x160/0284C7/FFFFFF?text=大学物理', students: 4100 }
            ]
        }
    };

    // 获取学校数据
    const schoolData = schoolDetails[schoolId] || schoolDetails[1];

    // 加载学校信息
    function loadSchoolData() {
        document.getElementById('schoolName').textContent = schoolData.name;
        document.getElementById('schoolLogo').src = schoolData.logo;
        document.getElementById('schoolBanner').src = schoolData.banner;
        document.getElementById('schoolDescription').textContent = schoolData.description;

        // 渲染课程列表
        renderCourses(schoolData.courses);
    }

    // 渲染课程列表
    function renderCourses(courses) {
        const coursesGrid = document.getElementById('schoolCoursesGrid');
        coursesGrid.innerHTML = '';

        if (courses.length === 0) {
            coursesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">该学校暂无课程</div>';
            return;
        }

        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <div class="course-card-image">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="course-card-content">
                    <h3 class="course-card-title">${course.title}</h3>
                    <div class="course-card-meta">
                        <span class="course-card-students">${course.students}+ 人学习</span>
                    </div>
                </div>
            `;

            courseCard.addEventListener('click', function() {
                window.location.href = `course-detail.html?courseId=${course.id}&role=${role}`;
            });

            coursesGrid.appendChild(courseCard);
        });
    }

    // 返回按钮
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', function() {
        window.location.href = `school.html?role=${role}`;
    });

    // 初始化
    loadSchoolData();
});

