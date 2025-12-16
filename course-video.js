// 视频播放页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取参数
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('courseId')) || 1;
    const chapterNum = parseInt(urlParams.get('chapter')) || 1;
    const lessonNum = parseInt(urlParams.get('lesson')) || 1;
    const role = urlParams.get('role') || 'student';

    // 课程数据
    const courseDetails = {
        1: {
            title: '高等数学',
            instructor: '张教授',
            chapters: [
                {
                    title: '第一章 函数与极限',
                    lessons: [
                        { name: '1.1 函数的概念', duration: '15:30', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
                        { name: '1.2 极限的定义', duration: '20:45', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
                        { name: '1.3 极限的运算', duration: '18:20', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
                        { name: '1.4 无穷小与无穷大', duration: '16:10', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }
                    ]
                },
                {
                    title: '第二章 导数与微分',
                    lessons: [
                        { name: '2.1 导数的概念', duration: '22:15', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
                        { name: '2.2 求导法则', duration: '25:30', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
                        { name: '2.3 高阶导数', duration: '19:45', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
                        { name: '2.4 微分的应用', duration: '21:20', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' }
                    ]
                },
                {
                    title: '第三章 积分学',
                    lessons: [
                        { name: '3.1 不定积分', duration: '24:10', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
                        { name: '3.2 定积分', duration: '26:30', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
                        { name: '3.3 换元积分法', duration: '23:45', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' },
                        { name: '3.4 分部积分法', duration: '20:15', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' }
                    ]
                }
            ]
        },
        3: {
            title: '数据结构与算法',
            instructor: '王教授',
            chapters: [
                {
                    title: '第一章 线性数据结构',
                    lessons: [
                        { name: '1.1 数组', duration: '20:30', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
                        { name: '1.2 链表', duration: '25:45', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
                        { name: '1.3 栈与队列', duration: '22:20', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
                    ]
                },
                {
                    title: '第二章 树形结构',
                    lessons: [
                        { name: '2.1 二叉树', duration: '28:15', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
                        { name: '2.2 二叉搜索树', duration: '26:40', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }
                    ]
                }
            ]
        },
        5: {
            title: '机器学习基础',
            instructor: '陈教授',
            chapters: [
                {
                    title: '第一章 机器学习概述',
                    lessons: [
                        { name: '1.1 什么是机器学习', duration: '18:20', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
                        { name: '1.2 机器学习的类型', duration: '22:30', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
                        { name: '1.3 应用场景', duration: '20:15', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' }
                    ]
                },
                {
                    title: '第二章 监督学习',
                    lessons: [
                        { name: '2.1 线性回归', duration: '25:45', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
                        { name: '2.2 逻辑回归', duration: '24:20', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
                        { name: '2.3 决策树', duration: '26:10', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' }
                    ]
                }
            ]
        }
    };

    const courseData = courseDetails[courseId] || courseDetails[1];
    const currentChapter = courseData.chapters[chapterNum - 1];
    const currentLesson = currentChapter.lessons[lessonNum - 1];

    // 视频元素
    const video = document.getElementById('courseVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const speedBtn = document.getElementById('speedBtn');
    const speedMenu = document.getElementById('speedMenu');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fullscreenBtnBottom = document.getElementById('fullscreenBtnBottom');
    const videoWrapper = document.querySelector('.video-wrapper');
    const videoControls = document.getElementById('videoControls');

    // 当前播放速度
    let currentSpeed = 1.0;

    // 初始化视频
    function initVideo() {
        if (!currentLesson || !currentLesson.videoUrl) {
            alert('视频加载失败，请稍后再试');
            return;
        }
        
        video.src = currentLesson.videoUrl;
        video.removeAttribute('controls'); // 移除原生控制栏
        document.getElementById('videoTitle').textContent = currentLesson.name;
        document.getElementById('videoInstructor').textContent = courseData.instructor;
        document.getElementById('videoChapter').textContent = currentChapter.title;

        // 视频加载完成
        video.addEventListener('loadedmetadata', function() {
            durationDisplay.textContent = formatTime(video.duration);
        });

        // 视频时间更新
        video.addEventListener('timeupdate', function() {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.value = progress || 0;
            currentTimeDisplay.textContent = formatTime(video.currentTime);
        });

        // 视频播放/暂停
        video.addEventListener('play', function() {
            playPauseBtn.textContent = '⏸';
        });

        video.addEventListener('pause', function() {
            playPauseBtn.textContent = '▶';
        });

        // 点击视频播放/暂停
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        // 视频结束
        video.addEventListener('ended', function() {
            playPauseBtn.textContent = '▶';
            // 标记为已完成
            markLessonAsCompleted(chapterNum, lessonNum);
        });
    }

    // 格式化时间
    function formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // 播放/暂停
    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // 进度条
    progressBar.addEventListener('input', function() {
        const time = (this.value / 100) * video.duration;
        video.currentTime = time;
    });

    // 倍速控制
    speedBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        speedMenu.style.display = speedMenu.style.display === 'none' ? 'block' : 'none';
    });

    // 点击外部关闭倍速菜单
    document.addEventListener('click', function(e) {
        if (!speedBtn.contains(e.target) && !speedMenu.contains(e.target)) {
            speedMenu.style.display = 'none';
        }
    });

    // 选择倍速
    const speedOptions = speedMenu.querySelectorAll('.speed-option');
    speedOptions.forEach(option => {
        option.addEventListener('click', function() {
            const speed = parseFloat(this.getAttribute('data-speed'));
            currentSpeed = speed;
            video.playbackRate = speed;
            speedBtn.textContent = `${speed}x`;
            
            speedOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            speedMenu.style.display = 'none';
        });
    });

    // 全屏功能
    function toggleFullscreen() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && !document.msFullscreenElement) {
            // 进入全屏
            if (videoWrapper.requestFullscreen) {
                videoWrapper.requestFullscreen();
            } else if (videoWrapper.webkitRequestFullscreen) {
                videoWrapper.webkitRequestFullscreen();
            } else if (videoWrapper.mozRequestFullScreen) {
                videoWrapper.mozRequestFullScreen();
            } else if (videoWrapper.msRequestFullscreen) {
                videoWrapper.msRequestFullscreen();
            }
        } else {
            // 退出全屏
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    fullscreenBtn.addEventListener('click', toggleFullscreen);
    fullscreenBtnBottom.addEventListener('click', toggleFullscreen);

    // 全屏退出按钮（右下角）
    const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
    exitFullscreenBtn.addEventListener('click', toggleFullscreen);

    // 监听全屏状态变化
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('mozfullscreenchange', updateFullscreenButton);
    document.addEventListener('MSFullscreenChange', updateFullscreenButton);

    function updateFullscreenButton() {
        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || 
                            document.mozFullScreenElement || document.msFullscreenElement;
        exitFullscreenBtn.style.display = isFullscreen ? 'flex' : 'none';
    }

    // ESC键退出全屏
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.fullscreenElement || document.webkitFullscreenElement || 
                document.mozFullScreenElement || document.msFullscreenElement) {
                toggleFullscreen();
            }
        }
    });

    // 鼠标移动显示/隐藏控制栏
    let controlsTimeout;
    videoWrapper.addEventListener('mousemove', function() {
        videoWrapper.classList.add('controls-visible');
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(function() {
            if (video.paused === false) {
                videoWrapper.classList.remove('controls-visible');
            }
        }, 3000);
    });

    // 加载课程目录
    function loadChapters() {
        const container = document.getElementById('chaptersList');
        container.innerHTML = '';

        courseData.chapters.forEach((chapter, chapterIndex) => {
            const chapterItem = document.createElement('div');
            chapterItem.className = 'chapter-item-video';
            
            const chapterNumber = chapterIndex + 1;
            const isCurrentChapter = chapterNumber === chapterNum;
            
            if (isCurrentChapter) {
                chapterItem.classList.add('expanded');
            }

            chapterItem.innerHTML = `
                <div class="chapter-header-video">
                    <div class="chapter-title-video">${chapter.title}</div>
                    <span class="chapter-toggle-video">▼</span>
                </div>
                <div class="lessons-list-video">
                    ${chapter.lessons.map((lesson, lessonIndex) => {
                        const lessonNumber = lessonIndex + 1;
                        const isCurrent = isCurrentChapter && lessonNumber === lessonNum;
                        const isCompleted = isLessonCompleted(chapterNumber, lessonNumber);
                        
                        let lessonClass = 'lesson-item-video';
                        if (isCompleted) {
                            lessonClass += ' completed';
                        } else if (isCurrent) {
                            lessonClass += ' current';
                        }

                        return `
                            <div class="${lessonClass}" data-chapter="${chapterNumber}" data-lesson="${lessonNumber}">
                                <div class="lesson-icon-video">${isCompleted ? '✓' : isCurrent ? '▶' : '○'}</div>
                                <div class="lesson-name-video">${lesson.name}</div>
                                <div class="lesson-duration-video">${lesson.duration}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            // 章节展开/收起
            const chapterHeader = chapterItem.querySelector('.chapter-header-video');
            chapterHeader.addEventListener('click', function() {
                chapterItem.classList.toggle('expanded');
            });

            // 课程点击
            const lessonItems = chapterItem.querySelectorAll('.lesson-item-video');
            lessonItems.forEach(lessonItem => {
                lessonItem.addEventListener('click', function() {
                    const ch = this.getAttribute('data-chapter');
                    const le = this.getAttribute('data-lesson');
                    window.location.href = `course-video.html?courseId=${courseId}&chapter=${ch}&lesson=${le}&role=${role}`;
                });
            });

            container.appendChild(chapterItem);
        });
    }

    // 检查课程是否已完成
    function isLessonCompleted(chapterNum, lessonNum) {
        const key = `course_${courseId}_progress`;
        const stored = localStorage.getItem(key);
        if (stored) {
            const progress = JSON.parse(stored);
            const lessonKey = `${chapterNum}.${lessonNum}`;
            return progress.completedLessons && progress.completedLessons.includes(lessonKey);
        }
        return false;
    }

    // 标记课程为已完成
    function markLessonAsCompleted(chapterNum, lessonNum) {
        const key = `course_${courseId}_progress`;
        const stored = localStorage.getItem(key);
        let progress = stored ? JSON.parse(stored) : { currentChapter: 1, currentLesson: 1, completedLessons: [] };
        
        const lessonKey = `${chapterNum}.${lessonNum}`;
        if (!progress.completedLessons) {
            progress.completedLessons = [];
        }
        if (!progress.completedLessons.includes(lessonKey)) {
            progress.completedLessons.push(lessonKey);
            localStorage.setItem(key, JSON.stringify(progress));
        }
    }

    // 视图切换
    const chaptersView = document.getElementById('chaptersView');
    const aiChatView = document.getElementById('aiChatView');
    const noteView = document.getElementById('noteView');

    function showView(viewName) {
        chaptersView.style.display = 'none';
        aiChatView.style.display = 'none';
        noteView.style.display = 'none';

        if (viewName === 'chapters') {
            chaptersView.style.display = 'flex';
        } else if (viewName === 'ai') {
            aiChatView.style.display = 'flex';
        } else if (viewName === 'note') {
            noteView.style.display = 'flex';
        }
    }

    // AI回答按钮
    const aiAnswerBtn = document.getElementById('aiAnswerBtn');
    const aiQuestionInput = document.getElementById('aiQuestionInput');
    const sendAiQuestion = document.getElementById('sendAiQuestion');
    const aiChatArea = document.getElementById('aiChatArea');
    const backFromAiBtn = document.getElementById('backFromAiBtn');

    aiAnswerBtn.addEventListener('click', function() {
        showView('ai');
        // 重置聊天区域（可选，保留历史对话）
        if (aiChatArea.children.length === 1) {
            // 只有初始消息，保持
        }
    });

    backFromAiBtn.addEventListener('click', function() {
        showView('chapters');
    });

    // 发送问题
    function sendQuestion() {
        const question = aiQuestionInput.value.trim();
        if (!question) return;

        // 添加用户消息
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `
            <div class="chat-bubble">${question}</div>
        `;
        aiChatArea.appendChild(userMessage);
        aiQuestionInput.value = '';
        aiChatArea.scrollTop = aiChatArea.scrollHeight;

        // 模拟AI回复（参考ai.js的逻辑）
        setTimeout(function() {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'chat-message ai';
            aiMessage.innerHTML = `
                <div class="chat-bubble">收到！正在为你生成回复（演示）。关于"${question}"，这是一个很好的问题。在实际应用中，这里会调用AI接口获取真实的回答。</div>
            `;
            aiChatArea.appendChild(aiMessage);
            aiChatArea.scrollTop = aiChatArea.scrollHeight;
        }, 500);
    }

    sendAiQuestion.addEventListener('click', sendQuestion);
    aiQuestionInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendQuestion();
        }
    });

    // 记笔记按钮
    const noteBtn = document.getElementById('noteBtn');
    const noteContent = document.getElementById('noteContent');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const backFromNoteBtn = document.getElementById('backFromNoteBtn');

    noteBtn.addEventListener('click', function() {
        // 加载已有笔记
        const noteKey = `course_${courseId}_chapter_${chapterNum}_lesson_${lessonNum}_note`;
        const savedNote = localStorage.getItem(noteKey);
        if (savedNote) {
            noteContent.value = savedNote;
        } else {
            noteContent.value = '';
        }
        showView('note');
    });

    backFromNoteBtn.addEventListener('click', function() {
        showView('chapters');
    });

    // 保存笔记
    saveNoteBtn.addEventListener('click', function() {
        const note = noteContent.value.trim();
        const noteKey = `course_${courseId}_chapter_${chapterNum}_lesson_${lessonNum}_note`;
        localStorage.setItem(noteKey, note);
        alert('笔记已保存！');
    });

    // 初始化
    initVideo();
    loadChapters();
});

