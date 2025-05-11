document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData || !userData.name || !userData.email) {
        alert('Anda belum login atau data tidak lengkap.');
        window.location.href = 'user.html'; // Redirect ke login/register page
        return;
    }

    // Tampilkan data user
    document.getElementById('profile-name').textContent = userData.name;
    document.getElementById('profile-name-detail').textContent = userData.name;
    document.getElementById('profile-email').textContent = userData.email;

    // === Handler UI Interaksi ===
    document.querySelector('.edit-profile')?.addEventListener('click', () => {
        alert('Fitur edit profil akan dibuka');
    });

    document.querySelector('.settings')?.addEventListener('click', () => {
        alert('Pengaturan akun akan dibuka');
    });

    document.querySelector('.edit-avatar')?.addEventListener('click', () => {
        alert('Anda dapat mengubah foto profil di sini');
    });

    document.querySelectorAll('.change-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const section = this.closest('.security-item')?.querySelector('h3')?.textContent;
            alert(`Anda akan mengubah ${section}`);
        });
    });

    document.querySelectorAll('.profile-nav li').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.profile-nav li').forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            const tabName = this.querySelector('a')?.textContent.trim();
            console.log(`Menampilkan tab ${tabName}`);
        });
    });

    // Edit profil
document.getElementById('edit-profile-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
  
    try {
      const res = await fetch('http://localhost:3000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ name, email })
      });
      const data = await res.json();
      alert(data.message);
      location.reload();
    } catch (err) {
      console.error(err);
      alert('Gagal update profil');
    }
  });
  
  // Ubah password
  document.getElementById('change-password-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
  
    try {
      const res = await fetch('http://localhost:3000/api/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Gagal ubah password');
    }
  });
  
  // Upload foto profil
  document.getElementById('avatar-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const fileInput = document.getElementById('avatar-file');
    const formData = new FormData();
    formData.append('avatar', fileInput.files[0]);
  
    try {
      const res = await fetch('http://localhost:3000/api/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: formData
      });
      const data = await res.json();
      alert(data.message);
      location.reload();
    } catch (err) {
      console.error(err);
      alert('Gagal upload foto');
    }
  });  
});
