// 搜索结果页面脚本
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('q') || '';
    const role = urlParams.get('role') || 'student';
    let currentType = 'all';

    // 显示搜索关键词
    document.getElementById('searchKeyword').textContent = keyword || '无';

    // 搜索数据（模拟数据，实际应该从服务器获取）
    const searchData = {
        courses: [
            { id: 1, title: '高等数学', description: '系统学习高等数学的基础理论和应用，包括微积分、线性代数等内容。', image: 'https://via.placeholder.com/300x200?text=高等数学', students: 1250, rating: 4.8 },
            { id: 3, title: '数据结构与算法', description: '深入学习数据结构和算法的核心概念，提升编程能力。', image: 'https://via.placeholder.com/300x200?text=数据结构', students: 980, rating: 4.9 },
            { id: 5, title: '机器学习基础', description: '从零开始学习机器学习的基本原理和实践应用。', image: 'https://via.placeholder.com/300x200?text=机器学习', students: 1560, rating: 4.7 }
        ],
        teachers: [
            { id: 1, name: '张教授', title: '数学系教授', description: '从事数学教学20年，擅长高等数学、线性代数等课程。', avatar: 'https://via.placeholder.com/100?text=张', courses: 5 },
            { id: 2, name: '李教授', title: '计算机系教授', description: '计算机科学专家，专注于数据结构和算法研究。', avatar: 'https://via.placeholder.com/100?text=李', courses: 8 },
            { id: 3, name: '王教授', title: 'AI研究院教授', description: '人工智能领域专家，机器学习方向资深研究者。', avatar: 'https://via.placeholder.com/100?text=王', courses: 6 }
        ],
        schools: [
            { id: 1, name: '北京大学', description: '中国顶尖综合性大学，提供优质在线课程。', logo: 'https://via.placeholder.com/100?text=北大', courses: 45 },
            { id: 2, name: '清华大学', description: '世界知名学府，致力于培养优秀人才。', logo: 'https://via.placeholder.com/100?text=清华', courses: 52 },
            { id: 3, name: '复旦大学', description: '百年名校，学术氛围浓厚。', logo: 'https://via.placeholder.com/100?text=复旦', courses: 38 }
        ],
        lives: [
            { id: 1, title: '高等数学直播课', description: '实时讲解高等数学重点难点，互动答疑。', time: '今天 14:00', viewers: 320 },
            { id: 2, title: '机器学习实战', description: '通过实际案例学习机器学习应用。', time: '明天 10:00', viewers: 0 },
            { id: 3, title: '数据结构精讲', description: '深入解析常见数据结构的实现和应用。', time: '后天 16:00', viewers: 0 }
        ]
    };

    // 过滤搜索结果
    function filterResults(keyword) {
        if (!keyword) return { courses: [], teachers: [], schools: [], lives: [] };

        const results = {
            courses: searchData.courses.filter(item => 
                item.title.toLowerCase().includes(keyword.toLowerCase())
            ),
            teachers: searchData.teachers.filter(item => 
                item.name.toLowerCase().includes(keyword.toLowerCase()) ||
                item.title.toLowerCase().includes(keyword.toLowerCase())
            ),
            schools: searchData.schools.filter(item => 
                item.name.toLowerCase().includes(keyword.toLowerCase())
            ),
            lives: searchData.lives.filter(item => 
                item.title.toLowerCase().includes(keyword.toLowerCase())
            )
        };

        return results;
    }

    // 渲染搜索结果
    function renderResults(type) {
        const container = document.getElementById('searchResults');
        const results = filterResults(keyword);

        let itemsToShow = [];
        if (type === 'all') {
            itemsToShow = [
                ...results.courses.map(item => ({ ...item, type: 'course' })),
                ...results.teachers.map(item => ({ ...item, type: 'teacher' })),
                ...results.schools.map(item => ({ ...item, type: 'school' })),
                ...results.lives.map(item => ({ ...item, type: 'live' }))
            ];
        } else if (type === 'course') {
            itemsToShow = results.courses.map(item => ({ ...item, type: 'course' }));
        } else if (type === 'teacher') {
            itemsToShow = results.teachers.map(item => ({ ...item, type: 'teacher' }));
        } else if (type === 'school') {
            itemsToShow = results.schools.map(item => ({ ...item, type: 'school' }));
        } else if (type === 'live') {
            itemsToShow = results.lives.map(item => ({ ...item, type: 'live' }));
        }

        if (itemsToShow.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div class="empty-state-text">未找到相关结果</div>
                    <div class="empty-state-hint">请尝试其他关键词</div>
                </div>
            `;
            return;
        }

        container.innerHTML = itemsToShow.map(item => {
            if (item.type === 'course') {
                return `
                    <div class="result-item" data-type="course" data-id="${item.id}">
                        <div class="result-item-header">
                            <img src="${item.image}" alt="${item.title}" class="result-item-image">
                            <div class="result-item-content">
                                <div class="result-item-title">${item.title}</div>
                                <span class="result-item-type">课程</span>
                                <div class="result-item-description">${item.description}</div>
                                <div class="result-item-meta">
                                    <span>👥 ${item.students}人学习</span>
                                    <span>⭐ ${item.rating}分</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (item.type === 'teacher') {
                return `
                    <div class="result-item" data-type="teacher" data-id="${item.id}">
                        <div class="result-item-header">
                            <img src="${item.avatar}" alt="${item.name}" class="result-item-image">
                            <div class="result-item-content">
                                <div class="result-item-title">${item.name}</div>
                                <span class="result-item-type">老师</span>
                                <div class="result-item-description">${item.title} - ${item.description}</div>
                                <div class="result-item-meta">
                                    <span>📚 ${item.courses}门课程</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (item.type === 'school') {
                return `
                    <div class="result-item" data-type="school" data-id="${item.id}">
                        <div class="result-item-header">
                            <img src="${item.logo}" alt="${item.name}" class="result-item-image">
                            <div class="result-item-content">
                                <div class="result-item-title">${item.name}</div>
                                <span class="result-item-type">学校</span>
                                <div class="result-item-description">${item.description}</div>
                                <div class="result-item-meta">
                                    <span>📚 ${item.courses}门课程</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (item.type === 'live') {
                return `
                    <div class="result-item" data-type="live" data-id="${item.id}">
                        <div class="result-item-header">
                            <div class="result-item-content">
                                <div class="result-item-title">${item.title}</div>
                                <span class="result-item-type">直播</span>
                                <div class="result-item-description">${item.description}</div>
                                <div class="result-item-meta">
                                    <span>🕐 ${item.time}</span>
                                    <span>👁️ ${item.viewers}人观看</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }).join('');

        // 添加点击事件
        container.querySelectorAll('.result-item').forEach(item => {
            item.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                const id = this.getAttribute('data-id');
                
                if (type === 'course') {
                    window.location.href = `course-detail.html?courseId=${id}&role=${role}`;
                } else if (type === 'teacher') {
                    // 跳转到老师详情页（如果存在）
                    alert(`查看${searchData.teachers.find(t => t.id == id)?.name}的详细信息`);
                } else if (type === 'school') {
                    window.location.href = `school-detail.html?schoolId=${id}&role=${role}`;
                } else if (type === 'live') {
                    window.location.href = `live-room.html?liveId=${id}&role=${role}`;
                }
            });
        });
    }

    // 标签切换
    const resultTabs = document.querySelectorAll('.result-tab');
    resultTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            resultTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentType = this.getAttribute('data-type');
            renderResults(currentType);
        });
    });

    // 搜索功能（在搜索页面）
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchDropdown = document.getElementById('searchDropdown');
    const hotSearchItems = document.querySelectorAll('.hot-search-item');

    if (searchContainer && searchInput && searchBtn) {
        // 设置当前搜索关键词
        if (keyword) {
            searchInput.value = keyword;
        }

        // 点击搜索框显示下拉框
        searchInput.addEventListener('focus', function() {
            searchContainer.classList.add('active');
        });

        // 点击搜索按钮
        searchBtn.addEventListener('click', function() {
            performSearch();
        });

        // 按Enter键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // 热门搜索项点击
        hotSearchItems.forEach(item => {
            item.addEventListener('click', function() {
                const keyword = this.getAttribute('data-keyword');
                searchInput.value = keyword;
                performSearch();
            });
        });

        // 点击外部关闭下拉框
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });

        function performSearch() {
            const newKeyword = searchInput.value.trim();
            if (newKeyword) {
                window.location.href = `search.html?q=${encodeURIComponent(newKeyword)}&role=${role}`;
            }
        }
    }

    // 初始化渲染
    renderResults(currentType);
});

