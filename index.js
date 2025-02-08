const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");
const axios = require("axios");

// 內建 ADB 路徑
const ADB_PATH = path.join(__dirname, "adb", "adb.exe");

// 清理應用關鍵字
const keywords = ["clean", "booster", "optimizer", "antivirus", "junk", "cache"];

// 排除的系統應用
const excludeApps = [
    "com.google.android.gms", "com.android.vending", "com.google.android.youtube",
    "com.google.android.googlequicksearchbox", "com.google.android.gm", "com.google.android.apps.maps",
    "com.google.android.apps.photos", "com.google.android.apps.docs", "com.google.android.apps.translate",
    "com.google.android.inputmethod.latin", "com.google.android.apps.nbu.files",
    "com.android.settings", "com.android.systemui", "com.samsung.android.messaging",
    "com.whatsapp", "com.facebook.orca", "com.facebook.katana"
];

// Google Play 搜尋關鍵字
const queries = ["垃圾清理", "手機加速", "病毒清理", "系統優化"];

// 自動解碼過程：根據多種編碼格式自動解碼
function autoDecode(buffer, encodings = ["utf8", "gbk", "cp936"]) {
    let decoded = null;
    let encoding = null;

    for (let enc of encodings) {
        try {
            decoded = buffer.toString(enc);
            if (decoded && decoded.trim()) {
                encoding = enc;
                break;
            }
        } catch (err) {
            continue;
        }
    }

    return { decoded, encoding };
}

// 執行 ADB 指令，並且不顯示 ADB 輸出
function runADBCommand(command, callback) {
    console.log(`🚀 執行 ADB 命令: ${command}`);
    exec(`"${ADB_PATH}" ${command}`, { encoding: "buffer" }, (error, stdout, stderr) => {
        callback(error, null);
    });
}

// 讀取應用列表
function loadPackageList() {
    try {
        console.log("📂 讀取應用列表...");
        const data = fs.readFileSync("packages.json", "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("❌ 讀取應用列表失敗:", error.message);
        return [];
    }
}

// 過濾可卸載的清理應用
function filterApps(apps) {
    console.log("🔍 過濾符合條件的應用...");
    return apps.filter(app =>
        keywords.some(keyword => app.includes(keyword)) && !excludeApps.includes(app)
    );
}

// 執行卸載
function uninstallApps(packageNames) {
    console.log("🚚 開始卸載應用...");
    packageNames.forEach((packageName) => {
        console.log(`🚀 嘗試卸載 ${packageName}...`);
        runADBCommand(`shell pm uninstall ${packageName}`, (error, output) => {
            if (error) {
                // 只顯示卸載失敗訊息
                console.error(`❌ 卸載失敗: ${packageName}`);
            }
        });
    });
}

// 獲取 Google Play 應用列表
async function fetchPackageNames(query) {
    console.log(`🔍 正在搜尋 Google Play 應用: ${query}...`);
    const url = `https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=apps&hl=zh_TW`;
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
        'Accept-Language': 'zh-TW,zh;q=0.9',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br'
    };

    try {
        const response = await axios.get(url, { headers });
        const html = response.data;
        const packages = [];

        const regex = /\/store\/apps\/details\?id=([a-zA-Z0-9_.]+)/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
            if (!packages.includes(match[1])) {
                packages.push(match[1]);
            }
        }

        return packages;
    } catch (error) {
        // 只顯示獲取應用包名的錯誤訊息
        console.error(`❌ 獲取 Google Play 應用包名失敗: ${error.message}`);
        return [];
    }
}

// 取得所有關鍵字的應用包名
async function fetchAllPackages() {
    console.log("🔄 開始獲取所有關鍵字的應用包名...");
    let allPackages = [];

    for (const query of queries) {
        const packages = await fetchPackageNames(query);
        allPackages = [...new Set([...allPackages, ...packages])];
    }

    // 將 package 名稱存入 JSON 檔案
    fs.writeFileSync("packages.json", JSON.stringify(allPackages, null, 2));
    console.log("✅ 所有應用包名已儲存至 packages.json");
}

// 自動監測並卸載應用
async function autoUninstallLoop() {
    while (true) {
        console.log("⏳ 等待 5 秒後重新檢查...");
        await fetchAllPackages(); // 確保最新應用列表
        const allApps = loadPackageList();
        const filteredApps = filterApps(allApps);

        if (filteredApps.length > 0) {
            console.log(`🔍 發現 ${filteredApps.length} 個可卸載的清理應用`);
            uninstallApps(filteredApps);
        } else {
            console.log("✅ 沒有發現需要卸載的清理應用。");
        }

        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

// 開始監測並卸載應用
autoUninstallLoop();
