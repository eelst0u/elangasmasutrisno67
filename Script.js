
        const nations = [
            { n: "Indonesia", f: "Rendang", d: "Es Kelapa Muda", s: "Bali & Borobudur", i: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2", b: "5-15 Juta IDR / Minggu", lat: -0.7893, lng: 113.9213 },
            { n: "Japan", f: "Sushi", d: "Sake", s: "Mount Fuji", i: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e", b: "25-50 Juta IDR / Minggu", lat: 36.2048, lng: 138.2529 },
            { n: "Switzerland", f: "Fondue", d: "Rivella", s: "Zermatt", i: "https://images.unsplash.com/photo-1506466010722-395aa2bef877", b: "40-80 Juta IDR / Minggu", lat: 46.8182, lng: 8.2275 },
            { n: "Italy", f: "Pasta Carbonara", d: "Aperol Spritz", s: "Venice Canals", i: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9", b: "20-45 Juta IDR / Minggu", lat: 41.8719, lng: 12.5674 },
            { n: "Thailand", f: "Pad Thai", d: "Thai Milk Tea", s: "Phi Phi Islands", i: "https://images.unsplash.com/photo-1528181304800-2f140819898f", b: "7-20 Juta IDR / Minggu", lat: 15.87, lng: 100.99 }
        ];

        function switchAuth(mode) {
            document.querySelectorAll('.auth-content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            document.getElementById('form-' + mode).classList.add('active');
            document.getElementById('tab-' + (mode === 'signin' ? 'in' : 'up')).classList.add('active');
        }

        function authorize() { document.getElementById('authLayer').style.display = 'none'; init(); }

        function showPage(id, el) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
            el.classList.add('active');
        }

        function init() {
            const tops = [nations[0], nations[1], nations[2]]; 
            document.getElementById('topThree').innerHTML = tops.map(n => cardHtml(n)).join('');
            renderAtlas(nations);
        }

        function cardHtml(n) {
            return `
                <div class="n-card animate__animated animate__fadeInUp">
                    <div class="n-img-wrapper"><img src="${n.i}"></div>
                    <div class="card-body">
                        <h3>${n.n}</h3>
                        <p style="font-size:0.75rem; color:var(--gold); font-weight:800; letter-spacing:2px; margin-bottom:20px;">VAULT SECURED</p>
                        <div class="card-actions">
                            <button class="action-btn" onclick="openAI('${n.n}')"><i class="fas fa-microchip"></i> AI Analysis</button>
                            <button class="action-btn" onclick="openMaps(${n.lat}, ${n.lng})"><i class="fas fa-map"></i> Maps</button>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderAtlas(data) { document.getElementById('fullAtlas').innerHTML = data.map(n => cardHtml(n)).join(''); }
        function searchCountry(v) { renderAtlas(nations.filter(n => n.n.toLowerCase().includes(v.toLowerCase()))); }
        function openMaps(lat, lng) { window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank'); }

        function openAI(name) {
            const n = nations.find(x => x.n === name);
            document.getElementById('aiTitle').innerText = name + " Protocol";
            document.getElementById('aiContent').innerHTML = `
                <p><strong>Estimated Weekly Budget:</strong> ${n.b}</p>
                <p><strong>Cuisine Protocol:</strong> ${n.f} & ${n.d}</p>
                <p><strong>Security Rating:</strong> <span style="color:var(--gold);">Sovereign Verified</span></p>
                <p style="margin-top:20px; font-style:italic;">"${name} menawarkan stabilitas ekonomi yang baik untuk pelancong. Direkomendasikan untuk mencoba ${n.f} di restoran lokal yang memiliki sertifikasi Sovereign."</p>
            `;
            document.getElementById('aiOverlay').style.display = 'flex';
        }

        function toggleRara() {
            const w = document.getElementById('raraWin');
            w.style.display = (w.style.display === 'flex') ? 'none' : 'flex';
        }

        function raraAsk() {
            const inp = document.getElementById('chatIn');
            const flow = document.getElementById('chatFlow');
            if(!inp.value) return;
            
            flow.innerHTML += `<div class="bubble user">${inp.value}</div>`;
            const q = inp.value.toLowerCase();
            inp.value = "";

            setTimeout(() => {
                let ans = "Protokol Gemini saya sedang mencari data tambahan untuk permintaan tersebut. Mohon sebutkan nama negara yang terdaftar di Atlas.";
                const found = nations.find(n => q.includes(n.n.toLowerCase()));
                
                if(found) {
                    ans = `Menganalisis <strong>${found.n}</strong> untuk Anda...<br><br>
                           🍴 <strong>Makanan:</strong> ${found.f}<br>
                           🍹 <strong>Minuman:</strong> ${found.d}<br>
                           💰 <strong>Estimasi Budget:</strong> ${found.b}<br>
                           📍 <strong>Top Spot:</strong> ${found.s}<br><br>
                           Apakah Anda ingin saya memesankan rute perjalanan ke ${found.n}?`;
                }
                flow.innerHTML += `<div class="bubble ai">${ans}</div>`;
                flow.scrollTop = flow.scrollHeight;
            }, 1000);
        }