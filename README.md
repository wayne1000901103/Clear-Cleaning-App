# 清理應用自動卸載工具

這是一款基於 Node.js 的自動卸載工具，可使用 ADB (Android Debug Bridge) 來卸載與清理、加速、優化相關的應用程式。

## 需求環境

1. **確保 ADB (adb.exe) 已放置於專案根目錄**
2. **已啟用開發者模式的 Android 設備**
   - 允許 USB 偵錯
   - 設備已連接至電腦

## 使用方法

### 1. 下載專案

```sh
# 使用 Git 下載
git clone https://github.com/wayne1000901103/Pixiv-Automatic-download.git
cd Pixiv-Automatic-download
```

或手動下載 ZIP 並解壓縮。

### 2. 確保 ADB 連線成功

請輸入```cmd```，以開啟終端機視窗並執行：

```sh
adb devices
```

應該會顯示已連接的 Android 設備，例如：

```
List of devices attached
1234567890abcdef    device
```

如果沒有設備出現，請確認 USB 連線與開發者模式是否正確設定。

### 3. 運行工具

```sh
node index.js
```

## 功能說明

- 自動搜尋與 **清理、加速、優化** 相關的應用程式
- 透過 Google Play 搜尋對應的應用包名
- 過濾系統應用，確保不會誤刪必要的應用程式
- 自動執行 ADB 指令來卸載目標應用
- 定期檢測新的應用，確保手機保持最佳狀態

## 注意事項

- 若應用程式未能成功卸載，可能需要手動授予 ADB 權限
- **本工具僅適用於已開發者解鎖的設備**
- 在使用前，請確認你了解應用的運作方式，以避免誤刪重要應用

## 貢獻

如果你有改進建議或功能需求，歡迎提交 PR 或在 Issues 中討論！
