// Ayla OS Mini - 外壳 & 基础交互

const APPS_CONFIG = {
    page1: [
        { id: 'payflow-view', name: '知富宝', icon: 'feather:credit-card' },
        { id: 'filenexus-view', name: '文件管理', icon: 'feather:folder' },
        { id: 'system-settings-view', name: '系统设置', icon: 'feather:settings' },
        { id: 'api-config-view', name: 'API配置', icon: 'feather:cpu' },
        { id: 'shopsphere-view', name: '购购购', icon: 'feather:shopping-bag' },
        { id: 'lebotalk-view', name: '乐博通', icon: 'feather:hash' },
        { id: 'mishu-view', name: '密书', icon: 'feather:camera' },
        { id: 'theme-settings-view', name: '主题', icon: 'feather:image' }
    ],
    page2: [],
    dock: [
        { id: 'chatroom-list-view', name: '聊天室', icon: 'feather:message-square' },
        { id: 'codex-list-view', name: '通讯录', icon: 'feather:book-open' },
        { id: 'the-ego-view', name: '个人主页', icon: 'feather:user' },
        { id: 'the-salon-view', name: '社交空间', icon: 'feather:coffee' }
    ]
};

let currentPage = 1;
const totalPages = 2;
let lastHomePage = 1;

function navigateTo(viewId) {
    const homeView = document.getElementById('home-screen-view');
    if (homeView && !homeView.classList.contains('hidden')) {
        lastHomePage = currentPage;
    }

    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.add('hidden');
    });

    if (viewId === 'home-screen-view') {
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.remove('hidden');
            showPage(lastHomePage);
        }
        return;
    }

    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.remove('hidden');
    }
}

function createAppIconHTML(app) {
    return `
        <div class="app-icon" data-action="launch-app" data-app-id="${app.id}">
            <div class="icon-bg">
                <span class="iconify" data-icon="${app.icon}"></span>
            </div>
            <span>${app.name}</span>
        </div>
    `;
}

function createDockItemHTML(app) {
    return `
        <div class="app-icon" data-action="launch-app" data-app-id="${app.id}">
            <div class="icon-bg">
                <span class="iconify" data-icon="${app.icon}"></span>
            </div>
            <span>${app.name}</span>
        </div>
    `;
}

function renderHomeScreen() {
    const page1Top = document.getElementById('page1-apps-top');
    const page1Bottom = document.getElementById('page1-apps-bottom');
    const page2Apps = document.getElementById('page2-apps');
    const dock = document.getElementById('dock-bar');

    page1Top.innerHTML = APPS_CONFIG.page1.slice(0, 4).map(createAppIconHTML).join('');
    page1Bottom.innerHTML = APPS_CONFIG.page1.slice(4, 8).map(createAppIconHTML).join('');
    page2Apps.innerHTML = APPS_CONFIG.page2.map(createAppIconHTML).join('');
    dock.innerHTML = APPS_CONFIG.dock.map(createDockItemHTML).join('');
}

function initPagination() {
    const indicatorContainer = document.getElementById('page-indicator');
    indicatorContainer.innerHTML = Array.from({ length: totalPages }, (_, i) =>
        `<div class="dot ${i + 1 === currentPage ? 'active' : ''}" data-page="${i + 1}"></div>`
    ).join('');

    indicatorContainer.addEventListener('click', (e) => {
        if (e.target.matches('.dot')) {
            const page = parseInt(e.target.dataset.page);
            showPage(page);
        }
    });
}

function showPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    currentPage = pageNumber;

    const pagesContainer = document.getElementById('pages-container');
    if (!pagesContainer) return;

    const scrollLeft = (pageNumber - 1) * pagesContainer.offsetWidth;
    pagesContainer.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
    });

    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.toggle('active', parseInt(dot.dataset.page) === pageNumber);
    });
}

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const dateStr = now.toLocaleDateString('zh-CN', {
        month: 'long',
        day: 'numeric',
        weekday: 'short'
    });

    const timeText = `${hours}:${minutes}`;

    const lockTime = document.getElementById('lock-screen-time');
    const lockDate = document.getElementById('lock-screen-date');
    const lockStatusTime = document.getElementById('lock-status-time');
    const lockStatusDate = document.getElementById('lock-status-date');

    const statusTime = document.getElementById('status-time');
    const statusDate = document.getElementById('status-date');
    const chatStatusTime = document.getElementById('chatroom-status-time');
    const chatStatusDate = document.getElementById('chatroom-status-date');
    const codexStatusTime = document.getElementById('codex-status-time');
    const codexStatusDate = document.getElementById('codex-status-date');
    const egoStatusTime = document.getElementById('ego-status-time');
    const egoStatusDate = document.getElementById('ego-status-date');
    const salonStatusTime = document.getElementById('salon-status-time');
    const salonStatusDate = document.getElementById('salon-status-date');

    [lockTime, statusTime, chatStatusTime, codexStatusTime, egoStatusTime, salonStatusTime].forEach(el => {
        if (el) el.textContent = timeText;
    });

    [lockDate, lockStatusDate, statusDate, chatStatusDate, codexStatusDate, egoStatusDate, salonStatusDate].forEach(el => {
        if (el) el.textContent = dateStr;
    });

    // 模拟指针时钟
    const second = now.getSeconds();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();

    const secondAngle = second * 6;
    const minuteAngle = minute * 6 + second * 0.1;
    const hourAngle = hour * 30 + minute * 0.5;

    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    if (hourHand) {
        hourHand.style.transform = `translate(-50%, -90%) rotate(${hourAngle}deg)`;
    }
    if (minuteHand) {
        minuteHand.style.transform = `translate(-50%, -90%) rotate(${minuteAngle}deg)`;
    }
    if (secondHand) {
        secondHand.style.transform = `translate(-50%, -90%) rotate(${secondAngle}deg)`;
    }
}

function initClock() {
    updateTime();
    setInterval(updateTime, 1000);
}

function initLockScreen() {
    const lockScreen = document.getElementById('lock-screen-view');
    if (!lockScreen) return;

    lockScreen.addEventListener('click', () => {
        lockScreen.classList.add('unlocking');
        setTimeout(() => {
            navigateTo('home-screen-view');
            lockScreen.classList.remove('unlocking');
        }, 300);
    });

    navigateTo('lock-screen-view');
}

function initAppViews() {
    const chatroomContent = document.querySelector('#chatroom-list-view .app-content');
    if (chatroomContent) {
        chatroomContent.innerHTML = `
            <div class="empty-state">
                <span class="iconify" data-icon="feather:message-square" style="font-size: 42px; margin-bottom: 12px;"></span>
                <h3>聊天室</h3>
                <p>暂无聊天记录</p>
            </div>
        `;
    }

    const codexContent = document.querySelector('#codex-list-view .app-content');
    if (codexContent) {
        codexContent.innerHTML = `
            <div class="empty-state">
                <span class="iconify" data-icon="feather:book-open" style="font-size: 42px; margin-bottom: 12px;"></span>
                <h3>通讯录</h3>
                <p>暂无联系人</p>
            </div>
        `;
    }

    const egoContent = document.querySelector('#the-ego-view .app-content');
    if (egoContent) {
        egoContent.innerHTML = `
            <div class="empty-state">
                <span class="iconify" data-icon="feather:user" style="font-size: 42px; margin-bottom: 12px;"></span>
                <h3>个人主页</h3>
                <p>在这里定义 §USER§ 的档案</p>
            </div>
        `;
    }

    const salonContent = document.querySelector('#the-salon-view .app-content');
    if (salonContent) {
        salonContent.innerHTML = `
            <div class="empty-state">
                <span class="iconify" data-icon="feather:coffee" style="font-size: 42px; margin-bottom: 12px;"></span>
                <h3>社交空间</h3>
                <p>和角色们的私密朋友圈</p>
            </div>
        `;
    }
}

function initGlobalEventListeners() {
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        const actionTarget = target.closest('[data-action]');
        if (!actionTarget) return;

        const action = actionTarget.dataset.action;

        if (action === 'navigate-home') {
            navigateTo('home-screen-view');
            return;
        }

        if (action === 'launch-app') {
            const appId = actionTarget.dataset.appId;
            if (appId) {
                navigateTo(appId);
            }
            return;
        }

        if (action === 'close-modal') {
            const modal = document.getElementById('generic-modal');
            if (modal) modal.classList.add('hidden');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initLockScreen();
    renderHomeScreen();
    initPagination();
    initAppViews();
    initGlobalEventListeners();
});

