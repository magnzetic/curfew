document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startButton");
  const nextBtn = document.getElementById("nextButton");
  const overlay = document.getElementById("startOverlay");
  const triggerOverlay = document.getElementById("triggerOverlay");

  nextBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    triggerOverlay.classList.remove("hidden");
  });

  startBtn.addEventListener("click", () => {
    triggerOverlay.classList.add("hidden");
    playBgRain();
    startStory();
    attachTouchTriggers();
  });
});



function fadeVolume(audio, targetVolume, duration = 1000) {
  const steps = 20;
  const stepTime = duration / steps;
  const startVolume = audio.volume;
  const volumeChange = targetVolume - startVolume;

  let currentStep = 0;
  const fadeInterval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    audio.volume = startVolume + volumeChange * progress;

    if (currentStep >= steps) {
      clearInterval(fadeInterval);
      audio.volume = targetVolume;
    }
  }, stepTime);
}

function playBgRain() {
  const bgRain = document.getElementById("bgRain");

  if (bgRain) {
    bgRain.volume = 0.7;
    bgRain.loop = true;
    bgRain.currentTime = 0;

    bgRain.play()
      .then(() => {
        console.log("bgRain is playing!");
        console.log("bgRain volume:", bgRain.volume);
      })
      .catch((err) => {
        console.error("bgRain play error:", err);
      });
  }
}

function attachTouchTriggers() {
  const paragraphs = document.querySelectorAll(".story-paragraph");

  paragraphs.forEach(paragraph => {
    paragraph.addEventListener("touchstart", () => {
      const audioId = paragraph.getAttribute("data-audio");
      if (audioId) {
        const audioElement = document.getElementById(audioId);
        if (audioElement && audioElement.paused) {
          audioElement.currentTime = 0;
          audioElement.play();
        }
      }
    });
  });
}


function startStory() {
  const audioIds = [
    "bang", "crowd", "choke", "squelch", "mesin", "breath1", "breath2", "pullkey"
  ];
  const bgRain = document.getElementById("bgRain");
  const bang = document.getElementById("bang");
  const crowd = document.getElementById("crowd");
  const playedSet = new Set();

  audioIds.forEach((id) => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.volume = 0;
      audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0.5;
      }).catch((err) => {
        console.warn(`Failed to warm up ${id}:`, err);
      });
    }
  });

  bang.volume = 0.8;
  if (crowd) crowd.volume = 0.5;
  if (choke) choke.volume = 0.2;
  if (squelch) squelch.volume = 0.5;
  if (mesin) mesin.volume = 0.5;
  if (breath1) breath1.volume = 0.5;
  if (breath2) breath2.volume = 0.3;
  if (pullkey) pullkey.volume = 0.5;

  if (bgRain && bgRain.paused) {
    const volumeAttr = bgRain.getAttribute("volume");
    bgRain.volume = volumeAttr ? parseFloat(volumeAttr) : 0.7;
    bgRain.loop = true;
    bgRain.play();
  }

  const storyContainer = document.querySelector(".story-container");

    const storyData = [
      { text: "Sunyinya malam didampingi oleh rintik hujan yang menabrak logam berlapis timah tanpa henti, bunyinya cukup menenangkan hingga sering dijadikan sebagai lantunan pengantar tidur oleh penduduk sekitar. Beberapa orang yang biasanya kesulitan tidur merasa bersyukur malam ini, mereka tidak perlu memutar rekaman bunyi hujan untuk mendapat ketenangan agar dapat terlelap." },
      { text: "Barangkali, hanya satu orang di lingkungan itu yang benci kebisingan dari air yang berjatuhan ke atap rumah. Rumah itu jelas terlalu besar untuk ditinggali seorang ayah dan anak perempuan semata wayangnya. Luasnya kehampaan di rumah itu membuat bunyi hujan menjadi lebih nyaring—memantul dalam benak yang awalnya hening." },
      { text: "Udara sejuk yang biasanya berkeliaran sendirian pada malam hari, kini bercengkerama dengan deruan yang dibawa oleh hujan. Dalam kamar dengan luas hampir menyentuh tiga puluh meter persegi itu, siapa pun tidak akan dapat menghindari hujaman dingin yang menembus kulit untuk menusuk tulang. Bagi orang yang memandang hujan sebagai undangan untuk merasa cemas, tidak ada yang dapat dilakukan selain menunggu hujannya reda supaya bisa tidur dengan nyaman." },
      { text: "\"Selamat malam, Adik-Adik dan Teman-Teman sekalian. Kembali lagi bersama aku ...\"" },
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: ".", align: "center" },
      { text: "." , align: "center", audio: "bang" },
      { text: "\"Akiko!\" Suara parau itu datang dari balik pintu sedetik setelah gedoran yang berhasil membuat si pemilik nama hampir terjatuh dari kasurnya. \"Kau sudah mengunci pintu?\"" },
      { text: "." , align: "center"},
      { text: ".", align: "center" },
      { text: ".", align: "center" },
      { text: "." , align: "center"},
      { text: "Kejengkelan berkumpul di jari telunjuk Akiko ketika ia menekan tombol spasi di laptopnya. \"Sudah, Yah! Jangan membuatku terkejut seperti itu!\"", audio: "space" },
      { text: "Pria paruh baya itu masih berdiri tegap di depan pintu kamar Akiko, tangan beruratnya membawa rambut pirangnya ke belakang—mengekspos kerutan halus yang terukir di dahi. \"Kau harus segera tidur,\" ujar sang ayah dengan sedikit nada memerintah di setiap katanya. \"Kau ingat aturannya, 'kan?\"" },
      { text: "Di balik pintu berbahan jati itu—tepat di mana Akiko berbaring di kasurnya, gadis itu hanya memutar kedua bola mata sebagai jawaban. Ia tak berkutik seakan ayahnya dapat melihat reaksinya barusan." },
      { text: "\"Nak, kau dengar perkataan Ayah?\" Kesabaran seorang duda mati itu ikut menyeruak ke udara beriringan dengan jas kerja yang ia lepas barusan.  Hawa dingin di luar rumah tidak cukup untuk menyejukkan emosi yang ditampung di genggaman pria itu terhadap jas kuning gading miliknya. Label nama masih tersemat di bagian depan jasnya, dua kata tertulis di atas logam itu—Nanami Kento." },
      { text: "Kefrustrasian melandasi garukan pada kulit kepala Akiko oleh kuku-kuku panjangnya yang dicat hitam, mengacak-acak rambut pirang yang juga ditutupi oleh semir rambut berwarna hitam. \"Baik, sialan! Aku akan tidur setelah hujannya reda!\"", audio: "scratch" },
      { text: "Dipanggil dengan sebutan seperti itu bukan lah hal baru bagi Nanami. Dalam tiga tahun terakhir, banyak perubahan yang harus dilalui keluarga kecil itu—salah satunya adalah kemunculan perilaku membangkang dari Akiko, serta peraturan baru yang harus dituruti olehnya." },
      { text: "\"Yang penting, kau pastikan pintumu terkunci hingga matahari terbit,\" titah Nanami. Suaranya tegas. Kalau frekuensi suara punya temperatur, kalimat Nanami mungkin lima derajat celsius lebih rendah daripada suhu di luar rumah. \"... dan jangan keluar kamar sebelum pagi mengambil hari, apa pun yang terjadi.\"" },
      { text: "Putrinya enggan menjawab, tetapi Nanami yakin bahwa perintahnya akan dipatuhi oleh sang putri. Bukan hanya Akiko yang mengalami perubahan selayaknya remaja di gerbang usia dua puluh pada umumnya, Nanami juga sudah bukan sosok ayah yang baik lagi sejak tiga tahun lalu. Nanami sudah melakukan segala cara agar Akiko menuruti peraturannya. Segalanya. Termasuk memukul tubuh mungilnya, menginjak lehernya, mengunci pintu kamarnya dari luar, memasang terali pada jendelanya. Segalanya.", audio: "sigh" },
      { text: "." , align: "center"},
      { text: ".", align: "center" },
      { text: "." , align: "center"},
      { text: "Sesudah helaan napas panjang diembuskan secara kasar, Nanami berjalan menjauh dari pintu kamar Akiko. Derap kakinya menuruni tangga, meninggalkan Akiko sendirian yang terdiam di kamarnya. Pintu jati dengan lakban yang menutupi segala celah—bahkan ventilasi udara—membatasi pendengaran Akiko terhadap suara-suara di lantai bawah. Meski masih tinggal di satu rumah yang sama, Akiko merasa ayahnya lebih sulit digapai daripada ibunya.", audio: "downstair" },
      { text: "Netra cokelat Akiko menyorot layar laptopnya, menampilkan seorang <i>streamer</i> dan rekaman layar permainannya dengan ikon jeda di bagian tengah layar. Seketika, tontonan santai itu tak lagi menarik untuk Akiko. Tidak di saat ia terpikir untuk tinggal bersama ibunya, selamanya.", isHTML: true},
      { text: "Tanpa menghiraukan perbuatannya mungkin bersifat merusak, Akiko menutup layar laptop dengan gerakan membanting. Satu tangannya dengan sigap meraih sakelar lampu di dinding, menggelapkan ruangan itu hingga Akiko merasa sesak setiap ia menarik napas.", audio: "switches", dataDarkMode: true  },
      { text: "Akiko menarik selimut untuk menghangatkan tubuhnya yang berbaring di sisi kanan. Kedua tangannya meremas ujung selimut yang berjumbai, beriringan dengan kedua matanya yang tertutup rapat. Entah matanya sudah tertutup atau masih terbuka, keduanya sama saja bila kamarnya gulita.", audio: "blanket"},
      { text: "Dalam hatinya, Akiko berdoa, \"semoga, aku segera jatuh ke alam mimpi. Semoga, aku bisa melihat wajah ibuku lagi. Namun, semoga, aku tidak mendapatkan mimpi buruk itu lagi. Kalau aku memimpikan kecelakaan itu, semoga aku juga ikut mati.\""},
      { text: "." , align: "center"},
      { text: ".", align: "center" },
      { text: "." , align: "center", dataLightMode: true, volume: 0.1},
      { text: "Walau menelan waktu selama lebih dari lima belas menit, akhirnya, kabut hidup Akiko ikut terbang bersama kabut tebal di luar rumah. Dia terlihat lebih tenang dalam tidurnya, tidak ada gurat amarah di wajahnya. Tarikan napasnya stabil, otot-ototnya kembali tenang. Sekarang, Akiko hanya perlu duduk manis di ruang tunggu selama satu jam atau lebih untuk memasuki dunia mimpi.", audio: "crowd"},
      { text: "Ruang tunggu itu memiliki interior yang sama dengan desain yang biasa ditemukan di rumah sakit. Beberapa kursi empuk disusun berbaris mengelilingi meja resepsionis yang terletak di tengah ruangan, Akiko duduk di salah satu kursi yang letaknya memojok. Suasana di ruang tunggu malam ini cukup ramai, hanya ada dua kursi yang tersisa—mengingat sekarang sudah mendekati tengah malam dengan cuaca yang mendukung semua orang untuk istirahat.", audio: "tap"},
      { text: "Kaki kanan Akiko mengetuk lantai berkali-kali, tidak sabar menunggu namanya dipanggil untuk masuk ke salah satu ruangan di sana. Kepalanya tertunduk untuk menatap lantai, namun akhirnya mendongak saat telinganya menangkap suara sepatu lain yang menabrak lantai dengan kepanikan di setiap langkahnya. Mata sipit Akiko membulat ketika melihat ayahnya berlari ke arah meja resepsionis.", audio: "run1"},
      { text: "\"Tolong, bantu istri saya.\" Suara Nanami bergetar, napasnya tak beraturan. Kemeja biru lautnya dihiasi oleh percikan darah di bagian lengan kiri. \"Saya mohon.\""},
      { text: "Akiko berdiri dari kursinya. \"Ayah!\""},
      { text: "Tidak ada jawaban dari Nanami—bereaksi pun tidak, seakan suara Akiko tidak terdengar olehnya sama sekali. Nanami tetap memohon kepada salah satu petugas di sana, \"dia kesakitan. Ambil semua uang saya, tetapi tolong selamatkan dia.\""},
      { text: "Saat hendak berjalan mendekat ke ayahnya, kedua kaki Akiko melekat ke lantai. Tak peduli seberapa kuat Akiko berusaha untuk mengangkat kakinya, keduanya tetap menolak untuk membawa pemiliknya menghampiri ayahnya. Alih-alih membantu Akiko untuk menenangkan ayahnya, tungkai Akiko justru memaksanya kembali duduk.", dataDarkMode: true  },
      { text: "Bukan lagi duduk di ruang tunggu, tetapi duduk di kursi penumpang mobil yang terletak tepat di belakang kursi pengemudi. Otot pada iris mata Akiko membesarkan pupilnya saat terang di ruang tunggu tadi berubah menjadi gelapnya badai di malam hari.", audio: "thunder", volume: 0.8},
      { text: "." , align: "center"},
      { text: ".", align: "center" },
      { text: "." , align: "center", audio: "truk"},
      { text: "Hujan lebat menyerang atap mobil sedan yang sedang menghindari truk gandeng dari arah berlawanan, derasnya air yang berjatuhan membutakan pengemudi truk hingga tak dapat melihat garis pembatas jalan. Dikejar oleh tenggat pengiriman barang adalah landasan utama dari kecepatan truk yang lebih dari seratus kilometer per jam di jalan raya. Sang pengemudi rela melakukan apa saja agar upahnya tidak dipotong, untuk memastikan anak semata wayangnya tidak kehilangan pendidikan."},
      { text: "." , align: "center"},
      { text: ".", align: "center" },
      { text: "." , align: "center"},
      { text: "Namun, sang pengemudi tidak menyangka bahwa ada anak tunggal lain yang juga akan kehilangan sesuatu akibat perbuatannya.", audio: "nans"},
      { text: "." , align: "center"},
      { text: ".", align: "center" , audio: "crash"},
      { text: "." , align: "center"},
      { text: "Di dalam mobil sedan itu, Akiko tidak dapat melakukan apa-apa. Tidak dapat membuka pintu, tidak dapat memecahkan jendela, tidak dapat meneriaki ayahnya untuk membanting setir ke kiri—dan bukan ke kanan, tidak dapat menyuruh ibunya untuk menurunkan sandaran kursi sehingga ia bisa terhindar dari batang pohon yang menerobos masuk dari kaca bagian depan mobil.", audio: "break"},
      { text: "Maka, untuk yang kesekian kalinya, Akiko menyaksikan wanita yang melahirkannya kehilangan nyawa di tempat. Batang pohon tebal itu  menabrak kepala sang ibu, membuat dagunya terangkat bersamaan dengan nyawanya. Untuk beberapa jam, kepala wanita itu terimpit antara batang pohon dan sandaran kursi penumpang. Sang suami dan anaknya selalu berpikir, andai mereka tidak kehilangan kesadaran sejenak pada saat itu, mungkin leher yang patah itu masih dapat diselamatkan.", audio: "choke"},
      { text: "Akiko sudah hafal dengan mimpi ini, ia tak lagi menangis atau berkeringat berlebihan ketika mengalami mimpi ini. Akiko sadar bahwa dia sedang bermimpi, sedangkan dia sudah pernah melewati hal yang lebih mengerikan—kenyataan. Sorot matanya berpindah dari kepala ayahnya yang menabrak kemudi, kini menuju kepala ibunya yang sudah tidak berbentuk. \"Ibu tetap tampak cantik meski sudah sehancur ini.\"", audio: "squelch"},
      { text: "Tiba-tiba, sandaran kursi ibunya turun, diikuti oleh tubuh wanita itu yang kini setengah berbaring di kursi penumpangnya. Wajahnya menghadap Akiko—membuat putrinya dapat melihat hidung bengkok, rahang miring, retakan tulang pipi yang mencuat keluar dari kulit, serta darah yang menghiasi keindahan pesonanya."},
      { text: "Isak Akiko memecah saat doanya dikabulkan, ia akhirnya dapat melihat wajah ibunya lagi meski tetap harus melalui kecelakaan itu lagi. Akiko membawa wajahnya mendekati jasad ibunya, napasnya tercekat waktu ia merasa tangan yang halus membelai surainya. Genangan air di pelupuk matanya langsung tumpah. \"Ibu? Ibu rindu aku?\""},
      { text: "Wanita dengan kedua mata yang sudah tertutup itu tak menjawab, hanya menggerakan tangannya turun ke tengkuk anaknya."},
      { text: "Akiko tersenyum haru. \"Benarkah? Karena itu, Ibu mendatangiku lewat mimpi?\""},
      { text: "Sentuhan lembut di tengkuk Akiko seketika berubah menjadi cengkeraman yang mengalungi leher, terlalu kuat hingga bahkan kedua tangan Akiko tidak dapat melepaskannya. Napasnya tersendat-sendat, paru-parunya memohon untuk diisi oksigen. Jeritan yang memanggil ayahnya tertahan di tenggorokan. Suhu di sekujur tubuh Akiko mendadak turun, ia menggerakan tubuhnya ke segala arah untuk memberontak.", audio: "choke2"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: ".", align: "center", audio: "cough2", volume: "0.2"},
      { text: "Sambil terbatuk-batuk, Akiko menemukan dirinya sendiri terbaring di kasur. Selimut yang tadinya membungkus tubuhnya telah tergeletak di ujung kasur, sepertiga bagiannya sudah menyentuh lantai. Kedua kaki Akiko yang terasa dingin membantunya berdiri untuk menyalakan lampu, satu ruangan luas itu langsung menjadi terang—pupil Akiko sontak mengecil.", dataLightMode: true},
      { text: "Pukul empat pagi."},
      { text: "Dengan langkah gontai, Akiko menghampiri dispenser galon air minum yang terletak di sudut kamar. Ia meletakkan gelas kosong di bawah saluran pemancur air, lalu menekan tombol untuk menarik air dari dalam galon dan menuangkannya ke gelas. Terdengar suara mesin yang menyedot sisa-sisa tetes air di dalam galon, namun yang dituangkan hanya angin belaka.", audio: "mesin"},
      { text: "\"Sialan!\" Akiko memaki takdir di sela-sela batuknya. Rasa gatal di tenggorokannya terlalu terasa serius untuk hanya diabaikan saja, ia harus segera minum air untuk mengusirnya.", audio: "cough1"},
      { text: "Akiko berlari ke arah kamar mandi, tidak peduli bahwa ayahnya mungkin akan terbangun karena langkah kakinya. Tanpa memedulikan kualitas air keran untuk diminum, Akiko langsung memosisikan mulutnya yang terbuka di bawah cerat pancuran air di wastafel. Tiga detik setelah Akiko menarik tuas kerannya, hanya ada dua tetes yang masuk ke mulutnya.", audio: "squeak"},
      { text: "Kalau saja serak di tenggorokannya itu tidak menghalanginya untuk menjerit, Akiko pasti sudah membangunkan para tetangga karena sumpah serapahnya. Masih terbatuk-batuk—rasanya seperti tersedak sesuatu yang menutup jalur pernapasan, Akiko menyalakan kepala pancuran yang biasa ia gunakan untuk mandi. Namun nihil, tidak ada air yang keluar sama sekali dari sana.", audio: "squeak2"},
      { text: "Hanya tinggal satu solusi yang tersisa."},
      { text: "Menatap kakus di samping wastafel, Akiko menggelengkan kepalanya. \"Lebih baik leherku diinjak lagi oleh Ayah, daripada aku harus minum dari sana.\"", audio: "cough3"},
      { text: "Dengan satu tangan yang menutupi mulutnya, Akiko keluar dari kamar mandi untuk menghampiri pintu kamarnya. Karena tidak dapat menarik napas dalam-dalam lagi di keadaan seperti itu, gadis itu langsung memutar kunci pintunya ke kiri. Ia membuka pintu dengan gerakan secepat kilat, lalu membantingnya hingga tertutup kembali sebelum ia berlari menuruni tangga.", audio: "unlock"},
      { text: "Akiko tahu bahwa dia harus melakukan ini dengan cepat.", audio: "run2"},
      { text: "Awalnya berniat untuk langsung menuju dapur, langkah Akiko terhenti saat berada di anak tangga pertama—satu kakinya bahkan mundur dan memijak di anak tangga kedua. Tangan kanannya menggenggam pegangan tangga. Bulu kuduknya berdiri karena adegan di hadapannya sekarang."},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center", audio: "breath1"},
      { text: "Di ruang tengah, tepat di atas permadani bermotif ala Turki kesayangan mendiang istrinya, tubuh Nanami terkulai lemas. Genangan darah menodai karpet itu, bahkan mungkin merembes ke lantai marmer di bawahnya. Kehidupan sudah meninggalkan sorot mata Nanami, tanpa sempat mengucapkan selamat tinggal kepada putrinya."},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "Hal yang paling menakutkan bagi Akiko bukan lah fakta bahwa ayahnya sudah tiada. Kalau kondisinya seperti itu, Akiko pasti sudah menghampiri jasad Nanami—setidaknya ia ingin memeluk ayahnya untuk yang terakhir kali—bukan justru berlari menaiki tangga untuk kembali ke kamarnya.", audio: "run3"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "Nanami benar. Akiko harus tetap di kamarnya sebelum matahari terbit. Akiko harus tetap mengunci pintu kamarnya—kali ini, ia bahkan menarik kuncinya dari lubang di pintu. Akiko harus ...", audio: "slam"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: ".", align: "center", audio: "pullkey" },
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "." , align: "center"},
      { text: "\"Akiko?\" Suara dan nada bicara yang persis dengan milik ayahnya, tidak ada napas yang tak terkendali ataupun rintihan di sana. \"Tiruan Ayah sudah tiada. Kau sudah boleh keluar kalau kau mau.\"", audio: "knock"},
      { text: "Akiko mematung di sudut kamar, tubuhnya merosot ke lantai setelah mendengar kalimat terakhir Nanami. Tangan Akiko masih menggenggam kunci kamar dengan gantungan bergambar penyanyi kesukaannya, seakan kunci itu dapat terbang dengan sendirinya ke lubang di pintu secara tiba-tiba. Napasnya menderu bersamaan dengan batuknya yang tak kunjung pergi.", audio: "breath2"},
      { text: "\"Kau tersedak, 'kan? Keluarlah, Ayah baru mengganti galon baru di dapur.\""},
      { text: "Suara itu begitu persuasif, seperti memiliki tali yang menarik Akiko sekuat tenaga untuk mendekat ke pintu kamar. Akiko memukul dadanya berulang-ulang, berharap setiap pukulan dapat menghentikan batuknya yang menganggu—atau dapat membangunkannya apabila ia masih bermimpi.", audio: "cough1"},
      { text: "Desahan pasrah terdengar dari luar kamar. \"Baiklah, kalau kau bersikeras. Kau akan harus tetap keluar kamar besok pagi, untuk sarapan.\""},
      { text: "Akiko tahu satu hal yang pasti.", volume: "0.7"},
      { text: "Akiko tidak pernah sarapan di pagi hari.", audio: "thunder2"}
    ];
  
    storyData.forEach((entry) => {
      const p = document.createElement("p");
      p.textContent = entry.text;
      p.classList.add("story-paragraph");
  
      if (entry.volume !== undefined) {
        p.setAttribute("data-volume", entry.volume);
      }

      if (entry.isHTML) {
        p.innerHTML = entry.text;
      } else {
        p.textContent = entry.text;
      }
  
      if (entry.align === "center") p.classList.add("center-paragraph");
      if (entry.audio) p.setAttribute("data-autoplay", entry.audio);
      if (entry.dataDarkMode) p.setAttribute("data-darkmode", "true");
      if (entry.dataLightMode) p.setAttribute("data-lightmode", "true");
  
      storyContainer.appendChild(p);
    });
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
  
        const el = entry.target;
        const volumeAttr = el.getAttribute("data-volume");
        const audioId = el.getAttribute("data-autoplay");
        const isDarkTrigger = el.getAttribute("data-darkmode") === "true";
        const isLightTrigger = el.getAttribute("data-lightmode") === "true";
  
        if (volumeAttr !== null && bgRain) {
          const newVolume = parseFloat(volumeAttr);
          if (!isNaN(newVolume)) {
            fadeVolume(bgRain, newVolume, 1000);
          }
        }
  
        if (audioId && !playedSet.has(audioId)) {
          const audioEl = document.getElementById(audioId);
          if (audioEl) {
            audioEl.currentTime = 0;
            audioEl.play().catch((e) => console.warn("Audio failed:", e));
            playedSet.add(audioId);
          }
        }
  
        if (isDarkTrigger) document.body.classList.add("dark-mode");
        if (isLightTrigger) document.body.classList.remove("dark-mode");
      });
    }, { threshold: 0.6 });
  
    document.querySelectorAll(".story-paragraph").forEach(p => {
      if (
        p.hasAttribute("data-autoplay") ||
        p.hasAttribute("data-darkmode") ||
        p.hasAttribute("data-lightmode") ||
        p.hasAttribute("data-volume")
      ) {
        observer.observe(p);
      }
    });
  }
