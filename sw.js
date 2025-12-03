const CACHE_NAME = 'lich-bhs-v2';
const urlsToCache = ['./app.html', './manifest.json'];

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Kích hoạt ngay lập tức
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim()); // Chiếm quyền kiểm soát ngay
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});

// --- PHẦN QUAN TRỌNG MỚI THÊM: LẮNG NGHE LỆNH BẮN THÔNG BÁO ---
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const title = event.data.title || 'Thông báo mới';
        const options = {
            body: event.data.body || 'Bạn có tin nhắn mới',
            icon: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
            badge: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
            requireInteraction: true, // Giữ thông báo không tự tắt
            vibrate: [200, 100, 200]
        };

        // Đây chính là lệnh gọi thông báo GỐC của hệ thống
        self.registration.showNotification(title, options);
    }
});
