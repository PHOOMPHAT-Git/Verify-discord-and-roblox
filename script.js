function loadcustomerData() {
    fetch('Users.txt')
        .then(response => response.text())
        .then(data => {
            const customerData = document.getElementById('customerData');
            let totalAccount = 0;
            let bannedCount = 0;
            let verifyCount = 0;
            let unverifyCount = 0;

            customerData.innerHTML = data;

            const rows = customerData.querySelectorAll('tr');

            rows.forEach(row => {
                const statusCell = row.querySelector('td:nth-child(3)');
                if (statusCell) {
                    totalAccount++;
                    const statusText = statusCell.textContent.trim();

                    if (statusText.includes('Verify 🟢')) {
                        verifyCount++;
                    } else if (statusText.includes('Not Verify 🟡')) {
                        unverifyCount++;
                    } else if (statusText.includes('Banned 🔴')) {
                        bannedCount++;
                    }
                }
            });

            document.getElementById('bannedCount').textContent = `Banned : ${bannedCount}`;
            document.getElementById('unverifyCount').textContent = `Not Verify : ${unverifyCount}`;
            document.getElementById('verifyCount').textContent = `Verify : ${verifyCount}`;
            document.getElementById('totalaccount').textContent = `${totalAccount.toLocaleString()} Accounts`;
        })
        .catch(error => {
            console.error('Error loading account data:', error);
        });
}

function filterData(status) {
    const customerData = document.getElementById('customerData');
    const rows = customerData.getElementsByTagName('tr');

    for (let row of rows) {
        const statusCell = row.cells[2];
        if (!statusCell) continue;

        const statusText = statusCell.textContent.trim().toLowerCase();
        if (status === 'all') {
            row.style.display = '';
        } else if (statusText.includes(status.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', loadcustomerData);