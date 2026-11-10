const quoteElement = document.querySelector('#quote');
const authorElement = document.querySelector('#author');
const statusElement = document.querySelector('#status');
const refreshButton = document.querySelector('#refresh-btn');

// 使用免費公開 API，不需要 API Key
const API_URL = 'https://dummyjson.com/quotes/random';

async function getQuote() {
  refreshButton.disabled = true;
  statusElement.textContent = '正在取得新的名言……';

  try {
    // fetch 發送請求，await 等待 API 回傳資料
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`資料讀取失敗（HTTP ${response.status}）`);
    }

    const data = await response.json();

    // 將 API 回傳的內容更新到網頁
    quoteElement.textContent = `「${data.quote}」`;
    authorElement.textContent = data.author || '未知作者';
    statusElement.textContent = '更新完成！再按一次按鈕，就能換一句名言。';
  } catch (error) {
    console.error('取得名言時發生錯誤：', error);
    statusElement.textContent = '目前無法取得資料，請確認網路後再試一次。';
    quoteElement.textContent = '每一次嘗試，都是新的開始。';
    authorElement.textContent = '每日靈感';
  } finally {
    refreshButton.disabled = false;
  }
}

// 點擊按鈕時，重新呼叫 API
refreshButton.addEventListener('click', getQuote);

// 網頁載入後先取得第一句名言
getQuote();
