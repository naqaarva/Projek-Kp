// =====================================
// DATABASE
// =====================================

let users =
JSON.parse(
localStorage.getItem("users")
) || [];

let keluhanData =
JSON.parse(
localStorage.getItem("keluhanData")
) || [];

let kritikData =
JSON.parse(
localStorage.getItem("kritikData")
) || [];

let notifikasiData =
JSON.parse(
localStorage.getItem("notifikasiData")
) || [];

let currentUser =

JSON.parse(
localStorage.getItem("currentUser")
) || null;

let selectedKeluhan = null;


// =====================================
// SAVE DATA
// =====================================

function saveUsers(){

localStorage.setItem(
"users",
JSON.stringify(users)
);

}

function saveKeluhan(){

localStorage.setItem(
"keluhanData",
JSON.stringify(keluhanData)
);

}

function saveKritik(){

localStorage.setItem(
"kritikData",
JSON.stringify(kritikData)
);

}

function saveNotifikasi(){

localStorage.setItem(
"notifikasiData",
JSON.stringify(notifikasiData)
);

}


// =====================================
// TOAST
// =====================================

function showToast(message){

const toast =
document.getElementById(
"toast"
);

if(!toast)
return;

toast.innerText =
message;

toast.classList.add(
"show"
);

setTimeout(()=>{

toast.classList.remove(
"show"
);

},3000);

}


// =====================================
// LOADING
// =====================================

window.addEventListener(
"load",
()=>{

const loading =
document.getElementById(
"loading"
);

if(loading){

setTimeout(()=>{

loading.style.display =
"none";

},1000);

}

}
);


// =====================================
// LOGIN REGISTER PAGE
// =====================================

function showRegister(){

document.getElementById(
"loginPage"
).style.display =
"none";

document.getElementById(
"registerPage"
).style.display =
"flex";

}

function showLogin(){

document.getElementById(
"registerPage"
).style.display =
"none";

document.getElementById(
"loginPage"
).style.display =
"flex";

}


// =====================================
// DEFAULT ADMIN
// =====================================

function createDefaultAdmin(){

const adaPetugas =

users.some(
u=>u.role==="petugas"
);

if(!adaPetugas){

users.push({

id:Date.now(),

nama:"Administrator",

username:"admin",

password:"admin123",

role:"petugas",

wa:"081234567890"

});

saveUsers();

}

}

createDefaultAdmin();


// =====================================
// FORMAT TANGGAL
// =====================================

function getTanggal(){

return new Date()
.toLocaleDateString(
"id-ID",
{
day:"2-digit",
month:"long",
year:"numeric"
}
);

}


// =====================================
// JAM REALTIME
// =====================================

setInterval(()=>{

const jam =
document.getElementById(
"jamRealtime"
);

if(jam){

jam.innerText =
new Date()
.toLocaleTimeString(
"id-ID"
);

}

},1000);


// =====================================
// TANGGAL HARI INI
// =====================================

document.addEventListener(
"DOMContentLoaded",
()=>{

const tanggal =
document.getElementById(
"tanggalHariIni"
);

if(tanggal){

tanggal.innerText =
getTanggal();

}

}
);


// =====================================
// NOTIFIKASI
// =====================================

function tambahNotifikasi(

judul,
pesan

){

const data = {

id:Date.now(),

judul,

pesan,

tanggal:
new Date()
.toLocaleString(
"id-ID"
)

};

notifikasiData.push(
data
);

saveNotifikasi();

loadNotifikasi();

}


// =====================================
// LOAD NOTIFIKASI
// =====================================

function loadNotifikasi(){

const list =
document.getElementById(
"notificationList"
);

if(!list)
return;

if(
notifikasiData.length===0
){

list.innerHTML =

`

<div class="notification-item">

<h4>
Belum ada notifikasi
</h4>

<p>
Tidak ada data
</p>

</div>

`;

return;

}

list.innerHTML = "";

[...notifikasiData]
.reverse()
.forEach(item=>{

list.innerHTML +=

`

<div class="notification-item">

<h4>

${item.judul}

</h4>

<p>

${item.pesan}

</p>

<small>

${item.tanggal}

</small>

</div>

`;

});


// badge

const badge =
document.getElementById(
"badgeNotifikasi"
);

if(badge){

badge.innerText =
notifikasiData.length;

}

}

// =====================================
// REGISTER
// =====================================

function registerUser(){

const nama =
document.getElementById(
"regNama"
)?.value.trim();

const username =
document.getElementById(
"regUser"
)?.value.trim();

const password =
document.getElementById(
"regPass"
)?.value.trim();

const wa =
document.getElementById(
"regWa"
)?.value.trim();

const role =
document.getElementById(
"regRole"
)?.value;

if(
!nama ||
!username ||
!password ||
!wa
){

showToast(
"Lengkapi semua data"
);

return;

}

const cekUser =

users.find(
u=>u.username===username
);

if(cekUser){

showToast(
"Username sudah digunakan"
);

return;

}

users.push({

id:Date.now(),

nama,
username,
password,
wa,
role

});

saveUsers();

showToast(
"Registrasi berhasil"
);

showLogin();

}


// =====================================
// LOGIN
// =====================================

function login(){

const username =
document.getElementById(
"loginUser"
)?.value.trim();

const password =
document.getElementById(
"loginPass"
)?.value.trim();

const role =
document.getElementById(
"role"
)?.value;

const user =

users.find(u=>

u.username===username

&&

u.password===password

&&

u.role===role

);

if(!user){

showToast(
"Login gagal"
);

return;

}

currentUser = user;

localStorage.setItem(

"currentUser",

JSON.stringify(
currentUser
)

);

showToast(
"Login berhasil"
);

masukDashboard();

}

// =====================================
// SESSION LOGIN
// =====================================

function cekSession(){

const data =

JSON.parse(
localStorage.getItem(
"currentUser"
)
);

if(data){

currentUser =
data;

masukDashboard();

}

}


// =====================================
// MASUK DASHBOARD
// =====================================

function masukDashboard(){

const loginPage =
document.getElementById(
"loginPage"
);

const registerPage =
document.getElementById(
"registerPage"
);

const dashboard =
document.getElementById(
"dashboard"
);

if(loginPage)
loginPage.style.display =
"none";

if(registerPage)
registerPage.style.display =
"none";

if(dashboard)
dashboard.style.display =
"flex";

if(currentUser){

const welcome =
document.getElementById(
"welcomeText"
);

if(welcome){

welcome.innerText =

"Selamat Datang, " +

currentUser.nama;

}

}

aturSidebar();

showMenu("home");

loadNotifikasi();

}

// =====================================
// SIDEBAR ROLE
// =====================================

function aturSidebar(){

if(!currentUser)
return;

const masyarakat =
document.getElementById(
"sidebarMasyarakat"
);

const petugas =
document.getElementById(
"sidebarPetugas"
);

if(
currentUser.role ===
"masyarakat"
){

if(masyarakat)
masyarakat.style.display =
"block";

if(petugas)
petugas.style.display =
"none";

}else{

if(masyarakat)
masyarakat.style.display =
"none";

if(petugas)
petugas.style.display =
"block";

}

}


// =====================================
// MENU
// =====================================

function showMenu(menuId){

document
.querySelectorAll(".menu")
.forEach(menu=>{

menu.style.display =
"none";

});
const menus = [
    'kelolaKritikSaran',
]
const halaman =
document.getElementById(
menuId
);

if(halaman){

halaman.style.display =
"block";

}

}

// =====================================
// LOGOUT
// =====================================

// =====================================
// LOGOUT
// =====================================

function logout(){

localStorage.removeItem(
"currentUser"
);

currentUser = null;

showToast(
"Logout berhasil"
);

setTimeout(()=>{

location.reload();

},500);

}


// =====================================
// PROFILE MODAL
// =====================================

function openProfileModal(){

if(!currentUser)
return;

const modal =
document.getElementById(
"profileModal"
);

if(modal){

modal.style.display =
"block";

}

const nama =
document.getElementById(
"modalProfileNama"
);

const user =
document.getElementById(
"modalProfileUsername"
);

const wa =
document.getElementById(
"modalProfileWA"
);

if(nama)
nama.innerText =
currentUser.nama;

if(user)
user.innerText =
currentUser.username;

if(wa)
wa.innerText =
currentUser.wa;

}


function closeProfileModal(){

const modal =
document.getElementById(
"profileModal"
);

if(modal){

modal.style.display =
"none";

}

}


// =====================================
// START APP
// =====================================

document.addEventListener(
"DOMContentLoaded",
()=>{

cekSession();

}
);

// =====================================
// DASHBOARD MASYARAKAT
// =====================================

function updateDashboard(){

if(!currentUser)
return;

const dataSaya =

keluhanData.filter(k=>

k.userId ===
currentUser.id

);

const total =
dataSaya.length;

const menunggu =

dataSaya.filter(k=>

k.status ===
"Menunggu"

).length;

const diproses =

dataSaya.filter(k=>

k.status ===
"Diproses"

).length;

const selesai =

dataSaya.filter(k=>

k.status ===
"Selesai"

).length;

const totalEl =
document.getElementById(
"totalKeluhan"
);

const menungguEl =
document.getElementById(
"totalMenunggu"
);

const diprosesEl =
document.getElementById(
"totalDiproses"
);

const selesaiEl =
document.getElementById(
"totalSelesai"
);

if(totalEl)
totalEl.innerText =
total;

if(menungguEl)
menungguEl.innerText =
menunggu;

if(diprosesEl)
diprosesEl.innerText =
diproses;

if(selesaiEl)
selesaiEl.innerText =
selesai;

updateProgressBar(
total,
selesai
);

updateBadgeKeluhan();

}

// =====================================
// PROGRESS BAR
// =====================================

function updateProgressBar(

total,
selesai

){

const progress =

document.getElementById(
"progressKeluhan"
);

if(
!progress ||
total === 0
){

if(progress){

progress.style.width =
"0%";

}

return;

}

const persen =

Math.round(

(selesai / total)

* 100

);

progress.style.width =

persen + "%";

progress.innerText =

persen + "%";

}


// =====================================
// BADGE KELUHAN
// =====================================

function updateBadgeKeluhan(){

if(!currentUser)
return;

const dataSaya =

keluhanData.filter(k=>

k.userId ===
currentUser.id

);

const badge =
document.getElementById(
"badgeKeluhanSaya"
);

if(badge){

badge.innerText =

dataSaya.length;

}

}

// =====================================
// DASHBOARD PETUGAS
// =====================================

function updateDashboardPetugas(){

const total =
keluhanData.length;

const menunggu =

keluhanData.filter(k=>

k.status ===
"Menunggu"

).length;

const diproses =

keluhanData.filter(k=>

k.status ===
"Diproses"

).length;

const selesai =

keluhanData.filter(k=>

k.status ===
"Selesai"

).length;

const totalEl =
document.getElementById(
"petugasTotal"
);

const menungguEl =
document.getElementById(
"petugasMenunggu"
);

const diprosesEl =
document.getElementById(
"petugasDiproses"
);

const selesaiEl =
document.getElementById(
"petugasSelesai"
);

if(totalEl)
totalEl.innerText =
total;

if(menungguEl)
menungguEl.innerText =
menunggu;

if(diprosesEl)
diprosesEl.innerText =
diproses;

if(selesaiEl)
selesaiEl.innerText =
selesai;

updateBadgeKeluhanMasuk();

loadPrioritasTinggi();

}

// =====================================
// BADGE PETUGAS
// =====================================

function updateBadgeKeluhanMasuk(){

const badge =

document.getElementById(
"badgeKeluhanMasuk"
);

if(!badge)
return;

badge.innerText =

keluhanData.length;

}


// =====================================
// PRIORITAS TINGGI
// =====================================

function loadPrioritasTinggi(){

const tbody =

document.getElementById(
"prioritasTableBody"
);

if(!tbody)
return;

const prioritas =

keluhanData.filter(k=>

k.prioritas ===
"Tinggi"

);

if(
prioritas.length === 0
){

tbody.innerHTML =

`

<tr>

<td colspan="5">

Belum ada data

</td>

</tr>

`;

return;

}

tbody.innerHTML = "";

prioritas.forEach(item=>{

tbody.innerHTML +=

`

<tr>

<td>${item.id}</td>

<td>${item.nama}</td>

<td>${item.judul}</td>

<td>${item.prioritas}</td>

<td>${item.status}</td>

</tr>

`;

});

}

// =====================================
// REFRESH DASHBOARD
// =====================================

function refreshDashboard(){

updateDashboard();

updateDashboardPetugas();

loadNotifikasi();

}


// =====================================
// AUTO REFRESH
// =====================================

setInterval(()=>{

if(currentUser){

refreshDashboard();

}

},3000);


// =====================================
// UPDATE SAAT LOGIN
// =====================================

const oldMasukDashboard =
masukDashboard;

masukDashboard = function(){

oldMasukDashboard();

updateDashboard();

updateDashboardPetugas();

refreshDashboard();

};

// =====================================
// PREVIEW FOTO
// =====================================

function previewFotoKeluhan(){

const input =
document.getElementById(
"fotoKeluhan"
);

const preview =
document.getElementById(
"previewFoto"
);

if(
!input ||
!preview
)
return;

const file =
input.files[0];

if(!file)
return;

const reader =
new FileReader();

reader.onload =
function(e){

preview.src =
e.target.result;

preview.style.display =
"block";

};

reader.readAsDataURL(
file
);

}


// =====================================
// AMBIL FOTO
// =====================================

function getFotoKeluhan(){

const preview =
document.getElementById(
"previewFoto"
);

if(
preview &&
preview.src
){

return preview.src;

}

return "";

}

// =====================================
// GPS LOKASI
// =====================================

function ambilLokasi(){

if(
!navigator.geolocation
){

showToast(
"GPS tidak didukung"
);

return;

}

navigator.geolocation
.getCurrentPosition(

(position)=>{

const lokasi =

position.coords.latitude +
", " +
position.coords.longitude;

const input =
document.getElementById(
"lokasiKeluhan"
);

if(input){

input.value =
lokasi;

}

showToast(
"Lokasi berhasil diambil"
);

},

()=>{

showToast(
"Gagal mengambil lokasi"
);

}

);

}

// =====================================
// KIRIM KELUHAN
// =====================================

function kirimKeluhan(){

if(!currentUser){

showToast(
"Silakan login"
);

return;

}

const judul =
document.getElementById(
"judulKeluhan"
)?.value.trim();

const kategori =
document.getElementById(
"kategoriKeluhan"
)?.value;

const prioritas =
document.getElementById(
"prioritasKeluhan"
)?.value;

const tanggal =
document.getElementById(
"tanggalKeluhan"
)?.value;

const lokasi =
document.getElementById(
"lokasiKeluhan"
)?.value.trim();

const deskripsi =
document.getElementById(
"deskripsiKeluhan"
)?.value.trim();

const foto =
getFotoKeluhan();

if(
!judul ||
!kategori ||
!tanggal ||
!lokasi ||
!deskripsi
){

showToast(
"Lengkapi data keluhan"
);

return;

}

const data = {

id:
"KLH" +
Date.now(),

userId:
currentUser.id,

nama:
currentUser.nama,

wa:
currentUser.wa,

judul,
kategori,
prioritas,
tanggal,
lokasi,
deskripsi,
foto,

status:
"Menunggu",

petugas:
"-",

estimasi:
"-",

dibuat:
new Date()
.toLocaleString(
"id-ID"
)

};

keluhanData.push(
data
);

saveKeluhan();

tambahNotifikasi(
"Keluhan Baru",
judul
);

showToast(
"Keluhan berhasil dikirim"
);

resetFormKeluhan();

loadKeluhanSaya();

updateDashboard();

updateDashboardPetugas();

}

// =====================================
// RESET FORM
// =====================================

function resetFormKeluhan(){

const ids = [

"judulKeluhan",
"kategoriKeluhan",
"prioritasKeluhan",
"tanggalKeluhan",
"lokasiKeluhan",
"deskripsiKeluhan"

];

ids.forEach(id=>{

const el =
document.getElementById(id);

if(el){

el.value = "";

}

});

const preview =
document.getElementById(
"previewFoto"
);

if(preview){

preview.style.display =
"none";

preview.src = "";

}

}

// =====================================
// LOAD KELUHAN SAYA
// =====================================

function loadKeluhanSaya(){

const tbody =
document.getElementById(
"tabelKeluhanSaya"
);

if(
!tbody ||
!currentUser
)
return;

const dataSaya =

keluhanData.filter(k=>

k.userId ===
currentUser.id

);

if(
dataSaya.length===0
){

tbody.innerHTML =

`

<tr>

<td colspan="7">

Belum ada keluhan

</td>

</tr>

`;

return;

}

tbody.innerHTML = "";

dataSaya.forEach(
(item,index)=>{

tbody.innerHTML +=

`

<tr>

<td>${index+1}</td>

<td>${item.tanggal}</td>

<td>${item.judul}</td>

<td>${item.kategori}</td>

<td>${item.prioritas}</td>

<td>${item.status}</td>

<td>

<button
onclick="lihatDetail('${item.id}')">

Detail

</button>

<button
onclick="trackingKeluhan('${item.id}')">

Tracking

</button>

</td>

</tr>

`;

});

}

// =====================================
// DETAIL KELUHAN
// =====================================

function lihatDetail(id){

const data =

keluhanData.find(
k=>k.id===id
);

if(!data)
return;

alert(

"Judul : " +
data.judul +

"\n\nKategori : " +
data.kategori +

"\n\nStatus : " +
data.status +

"\n\nPetugas : " +
data.petugas +

"\n\nEstimasi : " +
data.estimasi +

"\n\nLokasi : " +
data.lokasi

);

}


// =====================================
// TRACKING
// =====================================

function trackingKeluhan(id){

const data =

keluhanData.find(
k=>k.id===id
);

if(!data)
return;

const container =
document.getElementById(
"trackingContainer"
);

if(!container)
return;

container.innerHTML =

`

<div class="tracking-item">

<div class="tracking-icon">

📝

</div>

<div>

<h4>

Keluhan Dikirim

</h4>

<p>

${data.dibuat}

</p>

</div>

</div>

<div class="tracking-item">

<div class="tracking-icon">

⚙️

</div>

<div>

<h4>

Status Saat Ini

</h4>

<p>

${data.status}

</p>

</div>

</div>

<div class="tracking-item">

<div class="tracking-icon">

👨‍💼

</div>

<div>

<h4>

Petugas

</h4>

<p>

${data.petugas}

</p>

</div>

</div>

`;

showMenu(
"trackingKeluhan"
);

}

// =====================================
// KRITIK DAN SARAN
// =====================================

function kirimKritikSaran(){

const nama =
document.getElementById(
"kritikNama"
)?.value.trim();

const kritik =
document.getElementById(
"kritikText"
)?.value.trim();

const saran =
document.getElementById(
"saranText"
)?.value.trim();

if(
!nama ||
!kritik ||
!saran
){

showToast(
"Lengkapi kritik dan saran"
);

return;

}

const data = {

id:Date.now(),

nama,
kritik,
saran,

tanggal:
new Date()
.toLocaleString(
"id-ID"
)

};

kritikData.push(
data
);

saveKritik();

tambahNotifikasi(
"Masukan Baru",
nama +
" mengirim kritik dan saran"
);

loadKritikSaran();

showToast(
"Masukan berhasil dikirim"
);

document.getElementById(
"kritikNama"
).value="";

document.getElementById(
"kritikText"
).value="";

document.getElementById(
"saranText"
).value="";

}


// =====================================
// LOAD KRITIK SARAN
// =====================================

function loadKritikSaran(){

const tbody =
document.getElementById(
"tabelKritik"
);

if(!tbody)
return;

if(
kritikData.length===0
){

tbody.innerHTML =

`
<tr>
<td colspan="5">
Belum ada data
</td>
</tr>
`;

return;

}

tbody.innerHTML="";

kritikData.forEach(
(item,index)=>{

tbody.innerHTML +=

`
<tr>

<td>${index+1}</td>

<td>${item.nama}</td>

<td>${item.kritik}</td>

<td>${item.saran}</td>

<td>${item.tanggal}</td>

</tr>
`;

});

}

// =====================================
// KELOLA KELUHAN PETUGAS
// =====================================

function loadKelolaKeluhan(){

const tbody =
document.getElementById(
"kelolaKeluhanTableBody"
);

if(!tbody)
return;

if(
keluhanData.length===0
){

tbody.innerHTML=

`
<tr>

<td colspan="8">

Belum ada keluhan

</td>

</tr>
`;

return;

}

tbody.innerHTML="";

keluhanData.forEach(
(item,index)=>{

tbody.innerHTML +=

`

<tr>

<td>${index+1}</td>

<td>${item.id}</td>

<td>${item.nama}</td>

<td>${item.judul}</td>

<td>${item.deskripsi}</td>

<td>${item.kategori}</td>

<td>${item.prioritas}</td>

<td>${item.status}</td>

<td>

<button
onclick="bukaKeluhan('${item.id}')">

Kelola

</button>

</td>

</tr>

`;

});

}

// =====================================
// BUKA DETAIL KELUHAN
// =====================================

function bukaKeluhan(id){

const data =

keluhanData.find(
k=>k.id===id
);

if(!data)
return;

selectedKeluhan =
data;

document.getElementById(
"modalId"
).innerText =
data.id;

document.getElementById(
"modalNama"
).innerText =
data.nama;

document.getElementById(
"modalWa"
).innerText =
data.wa;

document.getElementById(
"modalJudul"
).innerText =
data.judul;

document.getElementById(
"modalKategori"
).innerText =
data.kategori;

document.getElementById(
"modalPrioritas"
).innerText =
data.prioritas;

document.getElementById(
"modalStatus"
).innerText =
data.status;

document.getElementById(
"modalLokasi"
).innerText =
data.lokasi;

document.getElementById(
"modalDeskripsi"
).innerText =
data.deskripsi;

document.getElementById(
"modalKeluhan"
).style.display =
"block";

}

// =====================================
// TUTUP MODAL
// =====================================

function tutupModalKeluhan(){

document.getElementById(
"modalKeluhan"
).style.display =
"none";

}


// =====================================
// UPDATE STATUS
// =====================================

function simpanStatusKeluhan(){

if(!selectedKeluhan)
return;

const petugas =
document.getElementById(
"namaPetugas"
)?.value.trim();

const status =
document.getElementById(
"updateStatus"
)?.value;

const estimasi =
document.getElementById(
"estimasiSelesai"
)?.value;

if(!petugas){

showToast(
"Isi nama petugas"
);

return;

}

selectedKeluhan.petugas =
petugas;

selectedKeluhan.status =
status;

selectedKeluhan.estimasi =
estimasi;

saveKeluhan();

tambahNotifikasi(

"Status Keluhan",

selectedKeluhan.judul +

" menjadi " +

status

);

loadKelolaKeluhan();

loadKeluhanSaya();

updateDashboard();

updateDashboardPetugas();

tutupModalKeluhan();

showToast(
"Status berhasil diperbarui"
);

}

// =====================================
// OVERRIDE SHOW MENU
// =====================================

const oldShowMenuPart5 =
showMenu;

showMenu = function(id){

oldShowMenuPart5(id);

switch(id){

case "keluhanSaya":

loadKeluhanSaya();

break;

case "kritikSaran":

loadKritikSaran();

break;

case "kelolaKeluhan":

loadKelolaKeluhan();

break;

case "petugasDashboard":

updateDashboardPetugas();

break;

}

};


// =====================================
// LOAD AWAL
// =====================================

document.addEventListener(
"DOMContentLoaded",
()=>{

loadKritikSaran();

loadKelolaKeluhan();

});

// =====================================
// DATA MASYARAKAT
// =====================================

function loadDataMasyarakat(){

const tbody =
document.getElementById(
"tabelMasyarakat"
);

if(!tbody)
return;

const masyarakat =

users.filter(
u=>u.role==="masyarakat"
);

if(
masyarakat.length===0
){

tbody.innerHTML =

`
<tr>
<td colspan="4">
Belum ada data
</td>
</tr>
`;

return;

}

tbody.innerHTML = "";

masyarakat.forEach(
(item,index)=>{

tbody.innerHTML +=

`
<tr>

<td>${index+1}</td>

<td>${item.nama}</td>

<td>${item.username}</td>

<td>${item.wa}</td>

</tr>
`;

});

}


// =====================================
// DATA PETUGAS
// =====================================

function loadDataPetugas(){

const tbody =
document.getElementById(
"tabelPetugas"
);

if(!tbody)
return;

const petugas =

users.filter(
u=>u.role==="petugas"
);

if(
petugas.length===0
){

tbody.innerHTML =

`
<tr>
<td colspan="4">
Belum ada data
</td>
</tr>
`;

return;

}

tbody.innerHTML = "";

petugas.forEach(
(item,index)=>{

tbody.innerHTML +=

`
<tr>

<td>${index+1}</td>

<td>${item.nama}</td>

<td>${item.username}</td>

<td>${item.wa}</td>

</tr>
`;

});

}

// =====================================
// GRAFIK STATUS KELUHAN
// =====================================

let chartStatus = null;

function buatGrafikStatus(){

const canvas =
document.getElementById(
"chartKeluhanCanvas"
);

if(!canvas)
return;

if(chartStatus){

chartStatus.destroy();

}

const menunggu =

keluhanData.filter(
k=>k.status==="Menunggu"
).length;

const diproses =

keluhanData.filter(
k=>k.status==="Diproses"
).length;

const selesai =

keluhanData.filter(
k=>k.status==="Selesai"
).length;

chartStatus =
new Chart(canvas,{

type:"doughnut",

data:{

labels:[
"Menunggu",
"Diproses",
"Selesai"
],

datasets:[{

data:[
menunggu,
diproses,
selesai
]

}]

}

});

}

// =====================================
// GRAFIK KATEGORI
// =====================================

let chartKategori = null;

function buatGrafikKategori(){

const canvas =
document.getElementById(
"chartKategoriCanvas"
);

if(!canvas)
return;

if(chartKategori){

chartKategori.destroy();

}

const kategoriMap = {};

keluhanData.forEach(item=>{

if(
!kategoriMap[
item.kategori
]
){

kategoriMap[
item.kategori
] = 0;

}

kategoriMap[
item.kategori
]++;

});

chartKategori =
new Chart(canvas,{

type:"bar",

data:{

labels:
Object.keys(
kategoriMap
),

datasets:[{

label:
"Jumlah Keluhan",

data:
Object.values(
kategoriMap
)

}]

}

});

}

// =====================================
// LAPORAN
// =====================================

function loadLaporan(){

const total =
keluhanData.length;

const menunggu =

keluhanData.filter(
k=>k.status==="Menunggu"
).length;

const diproses =

keluhanData.filter(
k=>k.status==="Diproses"
).length;

const selesai =

keluhanData.filter(
k=>k.status==="Selesai"
).length;

const laporanTotal =
document.getElementById(
"laporanTotal"
);

const laporanMenunggu =
document.getElementById(
"laporanMenunggu"
);

const laporanDiproses =
document.getElementById(
"laporanDiproses"
);

const laporanSelesai =
document.getElementById(
"laporanSelesai"
);

if(laporanTotal)
laporanTotal.innerText =
total;

if(laporanMenunggu)
laporanMenunggu.innerText =
menunggu;

if(laporanDiproses)
laporanDiproses.innerText =
diproses;

if(laporanSelesai)
laporanSelesai.innerText =
selesai;

loadTabelLaporan();

}

// =====================================
// TABEL LAPORAN
// =====================================

function loadTabelLaporan(){

const tbody =
document.getElementById(
"laporanTableBody"
);

if(!tbody)
return;

if(
keluhanData.length===0
){

tbody.innerHTML =

`
<tr>

<td colspan="7">

Belum ada data

</td>

</tr>
`;

return;

}

tbody.innerHTML = "";

keluhanData.forEach(item=>{

tbody.innerHTML +=

`

<tr>

<td>${item.id}</td>

<td>${item.nama}</td>

<td>${item.wa}</td>

<td>${item.judul}</td>

<td>${item.kategori}</td>

<td>${item.status}</td>

<td>${item.petugas}</td>

</tr>

`;

});

}

// =====================================
// OVERRIDE SHOW MENU
// =====================================

const oldShowMenuPart6 =
showMenu;

showMenu = function(id){

oldShowMenuPart6(id);

switch(id){

case "dataMasyarakat":

loadDataMasyarakat();

break;

case "dataPetugas":

loadDataPetugas();

break;

case "laporan":

loadLaporan();

break;

case "petugasDashboard":

buatGrafikStatus();

buatGrafikKategori();

break;

}

};


// =====================================
// REFRESH GRAFIK
// =====================================

function refreshGrafik(){

buatGrafikStatus();

buatGrafikKategori();

}


// =====================================
// AUTO REFRESH
// =====================================

setInterval(()=>{

if(currentUser){

refreshGrafik();

}

},5000);

// =====================================
// EXPORT EXCEL
// =====================================

function exportCSV(){

if(
keluhanData.length===0
){

showToast(
"Tidak ada data"
);

return;

}

const wb =
XLSX.utils.book_new();

const ws =
XLSX.utils.json_to_sheet(
keluhanData
);

XLSX.utils.book_append_sheet(
wb,
ws,
"Keluhan"
);

XLSX.writeFile(
wb,
"Laporan_Keluhan.xlsx"
);

showToast(
"Excel berhasil dibuat"
);

}

// =====================================
// EXPORT PDF
// =====================================

function exportPDF(){

if(
keluhanData.length===0
){

showToast(
"Tidak ada data"
);

return;

}

const { jsPDF } =
window.jspdf;

const doc =
new jsPDF();

doc.setFontSize(16);

doc.text(
"LAPORAN KELUHAN",
20,
20
);

let y = 40;

keluhanData.forEach(
(item,index)=>{

doc.text(

(index+1)+
". "+item.judul,

20,
y

);

y += 10;

doc.text(

"Pelapor : "+
item.nama,

25,
y

);

y += 10;

doc.text(

"Status : "+
item.status,

25,
y

);

y += 15;

if(y>260){

doc.addPage();

y = 20;

}

});

doc.save(
"Laporan_Keluhan.pdf"
);

showToast(
"PDF berhasil dibuat"
);

}

// =====================================
// PENGATURAN
// =====================================

function simpanPengaturan(){

const data = {

instansi:
document.getElementById(
"namaInstansi"
)?.value ||

"",

alamat:
document.getElementById(
"alamatInstansi"
)?.value ||

"",

email:
document.getElementById(
"emailInstansi"
)?.value ||

"",

wa:
document.getElementById(
"waAdmin"
)?.value ||

""

};

localStorage.setItem(

"pengaturan",

JSON.stringify(data)

);

showToast(
"Pengaturan disimpan"
);

}


function loadPengaturan(){

const data =

JSON.parse(

localStorage.getItem(
"pengaturan"
)

) || {};

const nama =
document.getElementById(
"namaInstansi"
);

const alamat =
document.getElementById(
"alamatInstansi"
);

const email =
document.getElementById(
"emailInstansi"
);

const wa =
document.getElementById(
"waAdmin"
);

if(nama)
nama.value =
data.instansi || "";

if(alamat)
alamat.value =
data.alamat || "";

if(email)
email.value =
data.email || "";

if(wa)
wa.value =
data.wa || "";

}

// =====================================
// SEARCH KELUHAN
// =====================================

function cariKeluhanSaya(){

const keyword =

document.getElementById(
"searchKeluhan"
)?.value
.toLowerCase();

const tbody =
document.getElementById(
"tabelKeluhanSaya"
);

if(
!tbody ||
!currentUser
)
return;

const dataSaya =

keluhanData.filter(k=>

k.userId ===
currentUser.id

&&

(
k.judul
.toLowerCase()
.includes(keyword)

||

k.kategori
.toLowerCase()
.includes(keyword)

)

);

tbody.innerHTML = "";

if(
dataSaya.length===0
){

tbody.innerHTML =

`
<tr>
<td colspan="7">
Data tidak ditemukan
</td>
</tr>
`;

return;

}

dataSaya.forEach(
(item,index)=>{

tbody.innerHTML +=

`

<tr>

<td>${index+1}</td>

<td>${item.tanggal}</td>

<td>${item.judul}</td>

<td>${item.kategori}</td>

<td>${item.prioritas}</td>

<td>${item.status}</td>

<td>

<button
onclick="lihatDetail('${item.id}')">

Detail

</button>

</td>

</tr>

`;

});

}

// =====================================
// NOTIFIKASI DASHBOARD
// =====================================

function loadNotifikasiDashboard(){

const box =
document.getElementById(
"notifikasiMasyarakat"
);

if(!box)
return;

if(
notifikasiData.length===0
){

box.innerHTML =

`
<div class="notification-item">

<h4>
Belum ada notifikasi
</h4>

</div>
`;

return;

}

box.innerHTML = "";

const terbaru =

[...notifikasiData]
.reverse()
.slice(0,5);

terbaru.forEach(item=>{

box.innerHTML +=

`

<div class="notification-item">

<h4>

${item.judul}

</h4>

<p>

${item.pesan}

</p>

</div>

`;

});

}

// =====================================
// LOAD SEMUA DATA
// =====================================

function loadSemuaData(){

loadNotifikasi();

loadNotifikasiDashboard();

loadKritikSaran();

loadKeluhanSaya();

loadKelolaKeluhan();

loadDataMasyarakat();

loadDataPetugas();

loadLaporan();

updateDashboard();

updateDashboardPetugas();

refreshGrafik();

loadPengaturan();

}


// =====================================
// STARTUP FINAL
// =====================================

document.addEventListener(
"DOMContentLoaded",
()=>{

createDefaultAdmin();

loadSemuaData();

cekSession();

});

function cariKnowledge(){

const keyword =
document.getElementById(
"kbSearch"
).value.trim();

if(!keyword){

showToast(
"Masukkan kata kunci"
);

return;

}

window.open(

"https://www.google.com/search?q=" +

encodeURIComponent(
keyword
),

"_blank"

);

}

function langsungLogout(){

localStorage.removeItem(
"currentUser"
);

location.reload();

}

// =====================================
// DATA KRITIK SARAN
// =====================================

let dataKritikSaran =
JSON.parse(localStorage.getItem("dataKritikSaran")) || [];

// =====================================
// KIRIM KRITIK SARAN
// =====================================

function kirimKritikSaran(){

    let nama =
    document.getElementById("kritikNama").value;

    let kritik =
    document.getElementById("kritikText").value;

    let saran =
    document.getElementById("saranText").value;

    if(
        nama === "" ||
        kritik === "" ||
        saran === ""
    ){

        alert("Semua field harus diisi!");
        return;
    }

    let data = {

        nama: nama,
        kritik: kritik,
        saran: saran,
        tanggal: new Date().toLocaleString(),
        status: "Baru"

    };

    dataKritikSaran.push(data);

    localStorage.setItem(
        "dataKritikSaran",
        JSON.stringify(dataKritikSaran)
    );

    renderKritikSaran();

    document.getElementById("kritikNama").value = "";
    document.getElementById("kritikText").value = "";
    document.getElementById("saranText").value = "";

    alert("Masukan berhasil dikirim!");
}

// =====================================
// RENDER KRITIK SARAN
// =====================================

function renderKritikSaran(){

    let tabelMasyarakat =
    document.getElementById("tabelKritik");

    let tabelPetugas =
    document.getElementById("tabelKelolaKritik");

    if(tabelMasyarakat){
        tabelMasyarakat.innerHTML = "";
    }

    if(tabelPetugas){
        tabelPetugas.innerHTML = "";
    }

    if(dataKritikSaran.length === 0){

        let kosong = `
        <tr>
            <td colspan="7">
                Belum ada data
            </td>
        </tr>
        `;

        if(tabelMasyarakat){
            tabelMasyarakat.innerHTML = kosong;
        }

        if(tabelPetugas){
            tabelPetugas.innerHTML = kosong;
        }

        return;
    }

    dataKritikSaran.forEach((item,index)=>{

        // TABEL MASYARAKAT
        if(tabelMasyarakat){

            tabelMasyarakat.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${item.nama}</td>

                <td>${item.kritik}</td>

                <td>${item.saran}</td>

                <td>${item.tanggal}</td>

            </tr>

            `;
        }

        // TABEL PETUGAS
        if(tabelPetugas){

            tabelPetugas.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${item.nama}</td>

                <td>${item.kritik}</td>

                <td>${item.saran}</td>

                <td>${item.tanggal}</td>

                <td>

                    <span class="status-kritik status-baru">

                        ${item.status}

                    </span>

                </td>

                <td>

                    <button
                    class="btn-hapus"
                    onclick="hapusKritik(${index})">

                    Hapus

                    </button>

                </td>

            </tr>

            `;
        }

    });

}

// =====================================
// HAPUS KRITIK
// =====================================

function hapusKritik(index){

    if(confirm("Hapus masukan ini?")){

        dataKritikSaran.splice(index,1);

        localStorage.setItem(
            "dataKritikSaran",
            JSON.stringify(dataKritikSaran)
        );

        renderKritikSaran();
    }
}

// =====================================
// SEARCH KRITIK
// =====================================

function cariKritikSaran(){

    let input =
    document.getElementById("searchKritik")
    .value
    .toLowerCase();

    let rows =
    document.querySelectorAll(
        "#tabelKelolaKritik tr"
    );

    rows.forEach((row)=>{

        let text =
        row.innerText.toLowerCase();

        row.style.display =
        text.includes(input)
        ? ""
        : "none";

    });

}

// =====================================
// LOAD PERTAMA
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        renderKritikSaran();

    }
);

