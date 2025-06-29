        var listchan = ['&', 'charCodeAt', 'firstChild', 'href', 'join', 'match', '+', '=', 'TK', '<a href=\'/\'>x</a>', 'innerHTML', 'fromCharCode', 'split', 'constructor', 'a', 'div', 'charAt', '', 'toString', 'createElement', 'debugger', '+-a^+6', 'Fingerprint2', 'KT', 'TKK', 'substr', '+-3^+b+-f', '67bc0a0e207df93c810886524577351547e7e0459830003d0b8affc987d15fd7', 'length', 'get', '((function(){var a=1585090455;var b=-1578940101;return 431433+"."+(a+b)})())', '.', 'https?:\/\/', ''];
        (function() {
            console.log("%c XIN HÃY TẮT F12 ĐỂ TIẾP TỤC. %c", 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:24px;color:red;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;', "font-size:12px;color:#999999;");
            (function block_f12() {
                try {
                    (function chanf12(dataf) {
                        if ((listchan[33] + (dataf / dataf))[listchan[28]] !== 1 || dataf % 20 === 0) {

                            (function() {})[listchan[13]](listchan[20])()
                        } else {
                            debugger;

                        };
                        chanf12(++dataf)
                    }(0))
                } catch (e) {
                    setTimeout(block_f12, 500)
                }
            })()
        })();
        
        
        
        
        
        const users = ['tiktokvn', 'lanxinhyeu06', 'lthiha11', 'p.anh0000', 'nhwiyen_29', 'lynh150208', 'thanhthanhhuong259', 'sun275205', 'ducthiet15', 'embe.226', 'hungianghjhj', 'cobedanghocmarketing', 'ndc17022', 'luonganhmyy', 'tannguyenvalueinvest', 'nguoigianghiensach', 'deptribalstore', 'tranluan2455', 'ducthiet15', 'hunter', 'killer', 'skull', 'storm'];
        
        function maskUsername(username) {
            return username.length > 5 ? username.slice(0, 5) + '***' : username;
        }

        function getFormattedTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        function addTransaction() {
            const points = Math.floor(Math.random() * 5000) + 100; 
            const user = users[Math.floor(Math.random() * users.length)];
            const maskedUser = maskUsername(user);
            const time = getFormattedTime();
            
            const row = `<tr>
                <td><span class='badge badge-info'>${time}</span></td>
                <td>${maskedUser}</td>
                <td><b style='color:red;font-size:14px'>${points}</b> <img src='storage/default-image/point.png' width='15px' alt=''></td>
                <td><span class='badge badge-success'>Thành Công</span></td>
            </tr>`;
            
            const table = document.getElementById("transactionTable");
            table.insertAdjacentHTML('afterbegin', row);
            
            if (table.rows.length > 8) {
                table.deleteRow(8);
            }
        }

        setInterval(addTransaction, 3000); 