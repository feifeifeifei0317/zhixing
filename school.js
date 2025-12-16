// 学校页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 学校数据
    const schoolsData = [
        {
            id: 1,
            name: '清华大学',
            logo: 'https://via.placeholder.com/120/8B1538/FFFFFF?text=清华',
            banner: 'https://via.placeholder.com/1200x400/8B1538/FFFFFF?text=清华大学',
            description: '清华大学是中国著名高等学府，坐落于北京西北郊风景秀丽的清华园。学校秉持"自强不息、厚德载物"的校训，致力于培养具有全球视野和创新精神的高素质人才。',
            courses: ['高等数学', '线性代数', '数据结构与算法', '机器学习基础']
        },
        {
            id: 2,
            name: '北京大学',
            logo: 'https://via.placeholder.com/120/1E3A8A/FFFFFF?text=北大',
            banner: 'https://via.placeholder.com/1200x400/1E3A8A/FFFFFF?text=北京大学',
            description: '北京大学是中国第一所国立综合性大学，也是新文化运动的中心和"五四"运动的策源地。学校以"思想自由、兼容并包"为办学理念，培养了大批杰出人才。',
            courses: ['英语学术写作', '心理学导论', '中国近现代史', '世界古代史']
        },
        {
            id: 3,
            name: '复旦大学',
            logo: 'https://via.placeholder.com/120/166534/FFFFFF?text=复旦',
            banner: 'https://via.placeholder.com/1200x400/166534/FFFFFF?text=复旦大学',
            description: '复旦大学是一所世界知名、国内顶尖的综合性研究型大学。学校坚持"博学而笃志，切问而近思"的校训，致力于培养具有人文情怀、科学精神、专业素养、国际视野的领袖人才。',
            courses: ['大学物理', '量子物理导论', '分析化学', '有机化学']
        },
        {
            id: 4,
            name: '上海交通大学',
            logo: 'https://via.placeholder.com/120/7C2D12/FFFFFF?text=交大',
            banner: 'https://via.placeholder.com/1200x400/7C2D12/FFFFFF?text=上海交通大学',
            description: '上海交通大学是我国历史最悠久、享誉海内外的高等学府之一。学校以"饮水思源、爱国荣校"为校训，培养了大批杰出的科学家、教育家、企业家和社会活动家。',
            courses: ['Java编程基础', '数据结构与算法', '机器学习基础', '数字艺术设计']
        },
        {
            id: 5,
            name: '浙江大学',
            logo: 'https://via.placeholder.com/120/581C87/FFFFFF?text=浙大',
            banner: 'https://via.placeholder.com/1200x400/581C87/FFFFFF?text=浙江大学',
            description: '浙江大学是一所历史悠久、声誉卓著的高等学府，坐落于中国历史文化名城、风景旅游胜地杭州。学校以"求是创新"为校训，致力于培养具有国际视野的高素质创新人才。',
            courses: ['细胞生物学', '遗传学', '认知心理学', '职业生涯规划']
        },
        {
            id: 6,
            name: '南京大学',
            logo: 'https://via.placeholder.com/120/DC2626/FFFFFF?text=南大',
            banner: 'https://via.placeholder.com/1200x400/DC2626/FFFFFF?text=南京大学',
            description: '南京大学是一所历史悠久、声誉卓著的百年名校。学校以"诚朴雄伟、励学敦行"为校训，培养了大批杰出人才，为国家和社会做出了重要贡献。',
            courses: ['音乐理论基础', '钢琴基础教程', '素描基础', '数字艺术设计']
        },
        {
            id: 7,
            name: '中山大学',
            logo: 'https://via.placeholder.com/120/7C3AED/FFFFFF?text=中大',
            banner: 'https://via.placeholder.com/1200x400/7C3AED/FFFFFF?text=中山大学',
            description: '中山大学由孙中山先生创办，有着一百多年办学传统。学校以"博学、审问、慎思、明辨、笃行"为校训，致力于培养具有国际视野、创新精神和实践能力的高素质人才。',
            courses: ['心理学导论', '认知心理学', '就业指导与规划', '职业生涯规划']
        },
        {
            id: 8,
            name: '华中科技大学',
            logo: 'https://via.placeholder.com/120/059669/FFFFFF?text=华科',
            banner: 'https://via.placeholder.com/1200x400/059669/FFFFFF?text=华中科技大学',
            description: '华中科技大学是国家教育部直属重点综合性大学，由原华中理工大学、同济医科大学、武汉城市建设学院合并成立。学校以"明德厚学、求是创新"为校训。',
            courses: ['数据结构与算法', 'Java编程基础', '机器学习基础', '大学物理']
        }
    ];

    // 渲染学校列表
    function renderSchools() {
        const schoolsGrid = document.getElementById('schoolsGrid');
        schoolsGrid.innerHTML = '';

        schoolsData.forEach(school => {
            const schoolCard = document.createElement('div');
            schoolCard.className = 'school-card';
            schoolCard.innerHTML = `
                <div class="school-logo">
                    <img src="${school.logo}" alt="${school.name}校徽">
                </div>
                <div class="school-name">${school.name}</div>
            `;

            schoolCard.addEventListener('click', function() {
                const urlParams = new URLSearchParams(window.location.search);
                const role = urlParams.get('role') || 'student';
                window.location.href = `school-detail.html?schoolId=${school.id}&role=${role}`;
            });

            schoolsGrid.appendChild(schoolCard);
        });
    }

    // 初始化
    renderSchools();
});

