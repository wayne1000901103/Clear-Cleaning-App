# Clear Cleaning App

Clear Cleaning App 是一個自動卸載手機清理應用的工具，幫助用戶移除不必要的垃圾清理、優化、加速應用。它會根據特定關鍵字篩選應用，並自動使用 ADB 卸載，確保系統運行更順暢。

## 下載與使用

1. **下載** `Clear-Cleaning-App.exe`（請確保您已安裝 ADB）。
2. **執行** `Clear-Cleaning-App.exe`（請以**管理員身份**運行）。
3. **等待自動檢測與卸載**，應用程式將會：
   - 取得當前設備的應用列表
   - 比對清理、優化類應用
   - 自動卸載符合條件的應用程式
4. **完成**，系統將定期重新檢測，確保垃圾應用被移除。

## 注意事項

- **需啟用 ADB 調試模式**：請在手機的「開發者選項」中啟用「USB 調試」。
- **不會卸載系統應用**：如 Google 服務、常用社交應用（WhatsApp、Facebook 等）都在排除名單內。
- **建議使用 Windows 10/11**，並確保 ADB 可正常運行。

## 常見問題

### 1. 執行後沒反應？
- 請確保 ADB 已安裝並設置環境變數，或與手機連線正常。

### 2. 部分應用未被卸載？
- 可能該應用不符合篩選條件，或是系統應用，請手動確認。

### 3. 如何確認已成功卸載？
- 手機中搜尋該應用名稱，確認是否仍存在。

---
