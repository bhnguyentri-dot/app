/* Service Worker - Xử lý thông báo chạy ngầm */
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Lắng nghe lệnh từ App chính gửi sang
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const title = event.data.title || 'Thông báo mới';
        const options = {
            body: event.data.body || 'Bạn có thông báo mới từ lịch công tác.',
            icon: 'https://drive.google.com/uc?export=download&id=16GLGOJ6r9kM9qEtkCdTiRpvDNDUksuQI', // Icon BHS
            badge: 'https://drive.google.com/uc?export=download&id=16GLGOJ6r9kM9qEtkCdTiRpvDNDUksuQI',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        
        // Hiển thị thông báo hệ thống
        self.registration.showNotification(title, options);
    }
});

// Khi người dùng click vào thông báo
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
