// 通用搜索功能脚本（可在所有页面使用）
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student';

    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchDropdown = document.getElementById('searchDropdown');
    const hotSearchItems = document.querySelectorAll('.hot-search-item');

    if (searchContainer && searchInput && searchBtn) {
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
            const keyword = searchInput.value.trim();
            if (keyword) {
                window.location.href = `search.html?q=${encodeURIComponent(keyword)}&role=${role}`;
            }
        }
    }
});

