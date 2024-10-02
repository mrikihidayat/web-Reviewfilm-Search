// Ambil elemen input pencarian
const searchInput = document.querySelector('#searchFilmTitle');

// Ambil elemen section hasil pencarian
const hasilSection = document.querySelector('.hasil');

// Ambil data semua film dalam bentuk array
const movieData = Array.from(document.querySelectorAll('.movie'));

// Ambil elemen untuk section trending dan latest
const trendingSection = document.querySelector('.role h3:nth-child(1)');
const latestSection = document.querySelector('.role h3:nth-child(3)');
const trendingMovies = document.querySelector('.movies:nth-child(2)');
const latestMovies = document.querySelector('.movies:nth-child(4)');

// Ambil elemen untuk hasil pencarian
const hasilSearchElement = document.querySelector('h3.hasil-search');

// Sembunyikan elemen hasil pencarian di awal
hasilSearchElement.style.display = 'none';

let timeoutId = null;

// Tambahkan event listener untuk input pencarian
searchInput.addEventListener('input', (e) => {
  const inputValue = searchInput.value.trim(); // Ambil nilai input dan hilangkan spasi kosong
  if (inputValue !== '') {
    // Sembunyikan section trending dan latest jika ada input
    trendingSection.style.display = 'none';
    latestSection.style.display = 'none';
    trendingMovies.style.display = 'none';
    latestMovies.style.display = 'none';
    hasilSearchElement.style.display = 'block';
  } else {
    // Tampilkan kembali section trending dan latest jika input kosong
    trendingSection.style.display = 'block';
    latestSection.style.display = 'block';
    trendingMovies.style.display = 'flex';
    latestMovies.style.display = 'flex';
    hasilSearchElement.style.display = 'none';
  }

  // Hapus timeout sebelumnya jika ada
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  // Set timeout untuk mengurangi jumlah pemanggilan fungsi filter
  timeoutId = setTimeout(() => {
    // Filter film berdasarkan input
    const filteredMovies = movieData.filter((movie) => {
      const movieTitle = movie.querySelector('p').textContent;
      return movieTitle.toLowerCase().includes(inputValue.toLowerCase());
    });

    if (inputValue !== '') {
      if (!filteredMovies.length) {
        // Tampilkan pesan jika film tidak ditemukan
        hasilSection.innerHTML = '<h4>Mohon maap cuy, film yang di cari ga ada</h4>';
      } else {
        // Tampilkan film yang cocok dengan input
        hasilSection.innerHTML = ''; // Kosongkan hasil sebelumnya
        filteredMovies.forEach((movie) => {
          const movieElement = document.createElement('div');
          movieElement.classList.add('movie');
          const imgElement = document.createElement('img');
          imgElement.src = movie.querySelector('img').src;
          const pElement = document.createElement('p');
          pElement.textContent = movie.querySelector('p').textContent;
          movieElement.appendChild(imgElement);
          movieElement.appendChild(pElement);
          hasilSection.appendChild(movieElement);
        });
      }
    } else {
      hasilSection.innerHTML = ''; // Kosongkan hasil jika input kosong
    }
  }, 100); // Delay selama 100ms sebelum melakukan pencarian
});

// Membuat fungsi Hamburger
document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById("menu-icon");
  const menuList = document.getElementById("menu-list");

  // Tambahkan event listener untuk ikon menu
  menuIcon.addEventListener("click", (e) => {
    menuList.classList.toggle("hidden");
  });

  // Sembunyikan menu jika klik di luar menu
  document.addEventListener('click', function (e) {
    if (!menuIcon.contains(e.target) && !menuList.contains(e.target)) {
      menuList.classList.add('hidden'); // Gunakan 'hidden' untuk konsistensi
    }
  });
});
